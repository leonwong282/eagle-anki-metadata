/**
 * Anki Metadata Parser
 * Extracts and processes metadata from Anki .apkg SQLite databases
 * Supports both legacy (Anki 2.1.x) and new (Anki 24.x+) schema formats
 */

const AnkiParser = {

  /**
   * Parse metadata from NEW Anki 24.x+ schema
   * New schema uses separate tables: notetypes, decks, notes, cards
   * @param {Database} db - sql.js Database instance
   * @returns {Object} Parsed metadata object
   */
  parseNewSchemaMetadata(db) {
    try {
      console.log('Parsing new Anki 24.x+ schema...');

      // Get deck info from 'decks' table
      // Schema: id, name, mtime_secs, usn, common, kind
      let decks = {};
      try {
        const decksResult = db.exec('SELECT id, name FROM decks');
        if (decksResult.length && decksResult[0].values.length) {
          decksResult[0].values.forEach(row => {
            decks[row[0]] = { name: row[1], id: row[0] };
          });
        }
      } catch (e) {
        console.error('Error reading decks table:', e);
      }

      // Get note types from 'notetypes' table
      // Schema: id, name, mtime_secs, usn, config
      let models = {};
      try {
        const notetypesResult = db.exec('SELECT id, name, config FROM notetypes');
        if (notetypesResult.length && notetypesResult[0].values.length) {
          notetypesResult[0].values.forEach(row => {
            const config = row[2] ? this.parseProtobufConfig(row[2]) : {};
            models[row[0]] = {
              name: row[1],
              id: row[0],
              flds: config.fields || [],
              tmpls: config.templates || [],
              type: config.isCloze ? 1 : 0
            };
          });
        }
      } catch (e) {
        console.error('Error reading notetypes table:', e);
      }

      // Get fields from 'fields' table if it exists
      try {
        const fieldsResult = db.exec('SELECT ntid, name, ord FROM fields ORDER BY ntid, ord');
        if (fieldsResult.length && fieldsResult[0].values.length) {
          fieldsResult[0].values.forEach(row => {
            const [ntid, name, ord] = row;
            if (models[ntid]) {
              if (!models[ntid].flds) models[ntid].flds = [];
              models[ntid].flds.push({ name, ord });
            }
          });
        }
      } catch (e) {
        // fields table might not exist
        console.log('No fields table found:', e.message);
      }

      // Get templates from 'templates' table if it exists
      try {
        const templatesResult = db.exec('SELECT ntid, name, ord FROM templates ORDER BY ntid, ord');
        if (templatesResult.length && templatesResult[0].values.length) {
          templatesResult[0].values.forEach(row => {
            const [ntid, name, ord] = row;
            if (models[ntid]) {
              if (!models[ntid].tmpls) models[ntid].tmpls = [];
              models[ntid].tmpls.push({ name, ord });
            }
          });
        }
      } catch (e) {
        // templates table might not exist
        console.log('No templates table found:', e.message);
      }

      // Get card statistics
      const cardStats = this.getCardStatistics(db);

      // Get note count
      const noteCount = this.getTotalNotes(db);

      // Get tags with counts
      const tags = this.getTagListNew(db);

      // Calculate average ease factor
      const avgEase = this.getAverageEaseFactor(db);

      // Get creation time from col table if exists, otherwise use first note time
      let created = Date.now();
      let modified = Date.now();
      try {
        const colResult = db.exec('SELECT crt, mod FROM col');
        if (colResult.length && colResult[0].values.length) {
          created = colResult[0].values[0][0] * 1000;
          modified = colResult[0].values[0][1];
        }
      } catch (e) {
        // Try to get from notes table
        try {
          const noteTimeResult = db.exec('SELECT MIN(id), MAX(mod) FROM notes');
          if (noteTimeResult.length && noteTimeResult[0].values.length) {
            created = noteTimeResult[0].values[0][0]; // Note IDs are epoch ms
            modified = noteTimeResult[0].values[0][1] * 1000;
          }
        } catch (e2) {
          console.log('Could not determine creation time');
        }
      }

      return {
        schema: 'Anki 24.x+',
        created: created,
        modified: modified,
        decks: this.getDeckSummaryNew(decks, cardStats),
        models: this.getNoteSummaryNew(models, db),
        tags: tags,
        statistics: {
          totalNotes: noteCount,
          totalCards: cardStats.total,
          averageEase: avgEase,
          cardDistribution: cardStats.distribution
        }
      };
    } catch (error) {
      console.error('Error parsing new Anki metadata:', error);
      throw error;
    }
  },

  /**
   * Parse protobuf config (simplified - just extract basic info)
   */
  parseProtobufConfig(configBlob) {
    // The config is stored as protobuf binary, which is complex to parse
    // For now, return empty and rely on fields/templates tables
    return { fields: [], templates: [], isCloze: false };
  },

  /**
   * Get deck summary for new schema
   */
  getDeckSummaryNew(decks, cardStats) {
    const deckList = [];

    for (const [deckId, deck] of Object.entries(decks)) {
      // Skip default deck if it has no cards
      const deckCards = cardStats.byDeck[deckId] || {
        new: 0,
        learning: 0,
        review: 0,
        total: 0
      };

      // Skip empty decks
      if (deckCards.total === 0) continue;

      deckList.push({
        id: deckId,
        name: deck.name || 'Unnamed Deck',
        description: '',
        newCards: deckCards.new,
        learningCards: deckCards.learning,
        reviewCards: deckCards.review,
        totalCards: deckCards.total,
        isDynamic: false
      });
    }

    return deckList.sort((a, b) => a.name.localeCompare(b.name));
  },

  /**
   * Get note type summary for new schema
   */
  getNoteSummaryNew(models, db) {
    const noteTypes = [];

    // Get note counts per model
    let modelCounts = {};
    try {
      const result = db.exec('SELECT mid, COUNT(*) as count FROM notes GROUP BY mid');
      if (result.length && result[0].values.length) {
        result[0].values.forEach(row => {
          modelCounts[row[0]] = row[1];
        });
      }
    } catch (error) {
      console.error('Error getting model counts:', error);
    }

    for (const [modelId, model] of Object.entries(models)) {
      const noteCount = modelCounts[modelId] || 0;

      // Skip models with no notes
      if (noteCount === 0) continue;

      noteTypes.push({
        id: modelId,
        name: model.name || 'Unnamed Note Type',
        fieldCount: (model.flds || []).length,
        templateCount: (model.tmpls || []).length,
        type: model.type === 1 ? 'Cloze' : 'Standard',
        fields: (model.flds || []).map(f => f.name || f),
        noteCount: noteCount
      });
    }

    return noteTypes.sort((a, b) => a.name.localeCompare(b.name));
  },

  /**
   * Get tags for new schema (from tags table)
   */
  getTagListNew(db) {
    try {
      const tagCounts = {};

      // Try tags table first (Anki 24.x+)
      try {
        const tagsTableResult = db.exec('SELECT tag FROM tags');
        if (tagsTableResult.length && tagsTableResult[0].values.length) {
          tagsTableResult[0].values.forEach(row => {
            const tag = row[0];
            if (tag) {
              tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            }
          });
        }
      } catch (e) {
        // Fall back to notes.tags column
        return this.getTagList(db, '');
      }

      // If tags table is empty, fall back to notes.tags
      if (Object.keys(tagCounts).length === 0) {
        return this.getTagList(db, '');
      }

      const tagList = Object.entries(tagCounts)
        .map(([tag, count]) => ({ tag, count }))
        .sort((a, b) => b.count - a.count);

      return tagList.slice(0, 20);
    } catch (error) {
      console.error('Error getting tags:', error);
      return [];
    }
  },

  /**
   * Parse complete Anki metadata from LEGACY SQLite database (Anki 2.1.x)
   * @param {Database} db - sql.js Database instance
   * @returns {Object} Parsed metadata object
   */
  parseAnkiMetadata(db) {
    try {
      // Query the col table for collection metadata
      const colResult = db.exec('SELECT * FROM col');
      if (!colResult.length || !colResult[0].values.length) {
        throw new Error('Empty collection table');
      }

      const colRow = colResult[0].values[0];
      const colColumns = colResult[0].columns;

      // Map columns to values
      const colData = {};
      colColumns.forEach((col, idx) => {
        colData[col] = colRow[idx];
      });

      // Parse JSON fields
      const decks = JSON.parse(colData.decks || '{}');
      const models = JSON.parse(colData.models || '{}');
      const conf = JSON.parse(colData.conf || '{}');

      // Get card statistics
      const cardStats = this.getCardStatistics(db);

      // Get note count
      const noteCount = this.getTotalNotes(db);

      // Get tags with counts
      const tags = this.getTagList(db, colData.tags || '');

      // Calculate average ease factor
      const avgEase = this.getAverageEaseFactor(db);

      return {
        schema: colData.ver,
        created: colData.crt * 1000, // Convert to milliseconds
        modified: colData.mod,
        decks: this.getDeckSummary(decks, cardStats),
        models: this.getNoteSummary(models, db),
        tags: tags,
        statistics: {
          totalNotes: noteCount,
          totalCards: cardStats.total,
          averageEase: avgEase,
          cardDistribution: cardStats.distribution
        }
      };
    } catch (error) {
      console.error('Error parsing Anki metadata:', error);
      throw error;
    }
  },

  /**
   * Extract deck summary from decks JSON and card statistics
   * @param {Object} decksJson - Parsed decks JSON from col.decks
   * @param {Object} cardStats - Card statistics object
   * @returns {Array} Array of deck objects with metadata
   */
  getDeckSummary(decksJson, cardStats) {
    const deckList = [];

    for (const [deckId, deck] of Object.entries(decksJson)) {
      if (deckId === '1') continue; // Skip default deck entry

      const deckCards = cardStats.byDeck[deckId] || {
        new: 0,
        learning: 0,
        review: 0,
        total: 0
      };

      deckList.push({
        id: deckId,
        name: deck.name || 'Unnamed Deck',
        description: deck.desc || '',
        newCards: deckCards.new,
        learningCards: deckCards.learning,
        reviewCards: deckCards.review,
        totalCards: deckCards.total,
        isDynamic: deck.dyn === 1
      });
    }

    // Sort by name
    return deckList.sort((a, b) => a.name.localeCompare(b.name));
  },

  /**
   * Extract note type (model) summary with usage counts
   * @param {Object} modelsJson - Parsed models JSON from col.models
   * @param {Database} db - sql.js Database instance to query note counts
   * @returns {Array} Array of note type objects (only those actually used)
   */
  getNoteSummary(modelsJson, db) {
    const noteTypes = [];

    // Get note counts per model
    let modelCounts = {};
    try {
      const result = db.exec('SELECT mid, COUNT(*) as count FROM notes GROUP BY mid');
      if (result.length && result[0].values.length) {
        result[0].values.forEach(row => {
          modelCounts[row[0]] = row[1];
        });
      }
    } catch (error) {
      console.error('Error getting model counts:', error);
    }

    // Only include models that are actually used
    for (const [modelId, model] of Object.entries(modelsJson)) {
      const noteCount = modelCounts[modelId] || 0;

      // Skip models with no notes
      if (noteCount === 0) continue;

      noteTypes.push({
        id: modelId,
        name: model.name || 'Unnamed Note Type',
        fieldCount: (model.flds || []).length,
        templateCount: (model.tmpls || []).length,
        type: model.type === 1 ? 'Cloze' : 'Standard',
        fields: (model.flds || []).map(f => f.name),
        noteCount: noteCount
      });
    }

    return noteTypes.sort((a, b) => a.name.localeCompare(b.name));
  },

  /**
   * Get tag list with counts from notes table
   * @param {Database} db - sql.js Database instance
   * @param {String} colTags - Space-separated tags from col.tags
   * @returns {Array} Array of tag objects with counts
   */
  getTagList(db, colTags) {
    try {
      const tagCounts = {};

      // Query all notes with tags
      const notesResult = db.exec('SELECT tags FROM notes WHERE tags != ""');

      if (notesResult.length && notesResult[0].values.length) {
        notesResult[0].values.forEach(row => {
          const tags = row[0].trim().split(/\s+/);
          tags.forEach(tag => {
            if (tag) {
              tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            }
          });
        });
      }

      // Convert to array and sort by count (descending)
      const tagList = Object.entries(tagCounts)
        .map(([tag, count]) => ({ tag, count }))
        .sort((a, b) => b.count - a.count);

      // Return top 20 tags
      return tagList.slice(0, 20);
    } catch (error) {
      console.error('Error getting tag list:', error);
      return [];
    }
  },

  /**
   * Get card statistics grouped by deck and type
   * @param {Database} db - sql.js Database instance
   * @returns {Object} Card statistics object
   */
  getCardStatistics(db) {
    try {
      const result = db.exec(`
        SELECT
          did AS deck_id,
          type,
          COUNT(*) AS count
        FROM cards
        GROUP BY did, type
      `);

      const stats = {
        byDeck: {},
        distribution: { new: 0, learning: 0, review: 0, relearning: 0 },
        total: 0
      };

      if (result.length && result[0].values.length) {
        result[0].values.forEach(row => {
          const [deckId, type, count] = row;

          if (!stats.byDeck[deckId]) {
            stats.byDeck[deckId] = { new: 0, learning: 0, review: 0, total: 0 };
          }

          stats.total += count;
          stats.byDeck[deckId].total += count;

          // Card type: 0=new, 1=learning, 2=review, 3=relearning
          switch (type) {
            case 0:
              stats.byDeck[deckId].new += count;
              stats.distribution.new += count;
              break;
            case 1:
              stats.byDeck[deckId].learning += count;
              stats.distribution.learning += count;
              break;
            case 2:
              stats.byDeck[deckId].review += count;
              stats.distribution.review += count;
              break;
            case 3:
              stats.distribution.relearning += count;
              break;
          }
        });
      }

      return stats;
    } catch (error) {
      console.error('Error getting card statistics:', error);
      return {
        byDeck: {},
        distribution: { new: 0, learning: 0, review: 0, relearning: 0 },
        total: 0
      };
    }
  },

  /**
   * Get total number of notes
   * @param {Database} db - sql.js Database instance
   * @returns {Number} Total note count
   */
  getTotalNotes(db) {
    try {
      const result = db.exec('SELECT COUNT(*) FROM notes');
      return result[0]?.values[0]?.[0] || 0;
    } catch (error) {
      console.error('Error getting note count:', error);
      return 0;
    }
  },

  /**
   * Get average ease factor for review cards
   * @param {Database} db - sql.js Database instance
   * @returns {Number} Average ease factor (as percentage)
   */
  getAverageEaseFactor(db) {
    try {
      const result = db.exec('SELECT AVG(factor) FROM cards WHERE type = 2 AND factor > 0');
      const avgFactor = result[0]?.values[0]?.[0];
      // Anki stores ease as permille (e.g., 2500 = 250%)
      return avgFactor ? Math.round(avgFactor / 10) : null;
    } catch (error) {
      console.error('Error getting average ease factor:', error);
      return null;
    }
  },

  /**
   * Format file size in human-readable format
   * @param {Number} bytes - File size in bytes
   * @returns {String} Formatted file size
   */
  formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
  },

  /**
   * Format timestamp to readable date
   * @param {Number} timestamp - Timestamp in milliseconds
   * @returns {String} Formatted date string
   */
  formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
};

// Export for use in HTML
if (typeof window !== 'undefined') {
  window.AnkiParser = AnkiParser;
}
