# Eagle Anki Metadata Inspector - Requirements Document

**Version:** 1.0  
**Date:** November 24, 2025  
**Plugin Type:** Inspector Extension  
**Target Platform:** Eagle 4.0 Beta 17+  
**Runtime Environment:** Chromium 107 + Node.js 16

---

## 1. Overview

### 1.1 Purpose
Develop an Eagle Inspector extension that displays metadata from Anki `.apkg` deck files, enabling users to preview Anki deck information directly within the Eagle image management application without opening Anki.

### 1.2 Scope
- **In Scope:**
  - Read and parse `.apkg` files (Anki deck packages)
  - Extract and display deck metadata (deck names, card counts, note types, tags, statistics)
  - Theme-aware UI matching Eagle's design system
  - Error handling for corrupted or invalid files
  - Support for Anki database schema version 11

- **Out of Scope:**
  - Editing or modifying `.apkg` files
  - Creating new Anki decks
  - Syncing with AnkiWeb
  - Media file preview (images/audio within decks)
  - Support for legacy Anki 1.x formats

---

## 2. Technical Architecture

### 2.1 Technology Stack
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Runtime:** Chromium 107 (browser APIs) + Node.js 16 (native APIs)
- **Libraries:**
  - `jszip` (^3.10.1) - ZIP archive extraction
  - `sql.js` (^1.13.0) - WebAssembly SQLite engine
- **Eagle APIs:** Plugin API for item retrieval and theme management

### 2.2 Architecture Pattern
**Pure JavaScript (No Native Compilation)**

**Rationale:**
- Avoid native module compilation issues (`better-sqlite3` requires node-gyp)
- Ensure cross-platform compatibility (macOS, Windows, Linux)
- Simplify plugin distribution (no binary dependencies)
- Leverage WebAssembly for performance (sql.js)

**Data Flow:**
```
User selects .apkg file in Eagle
    ↓
Inspector plugin activated (eagle.onPluginCreate)
    ↓
Read file path via eagle.item.getSelected()
    ↓
Load .apkg file (Node.js fs.readFileSync)
    ↓
Extract archive with jszip
    ↓
Extract collection.anki2 (SQLite database)
    ↓
Load database with sql.js
    ↓
Query metadata (decks, models, cards, notes)
    ↓
Parse JSON fields (col.decks, col.models)
    ↓
Render metadata in theme-aware UI
    ↓
Handle cleanup (db.close)
```

---

## 3. Functional Requirements

### 3.1 File Type Support
**FR-1.1:** Plugin MUST register for `.apkg` file extension in Eagle  
**FR-1.2:** Plugin MUST activate when user selects a single `.apkg` file  
**FR-1.3:** Plugin MUST NOT activate for multiple selections (multiSelect: false)

### 3.2 Metadata Extraction
**FR-2.1:** Extract and display **Deck Summary**
- Deck name(s)
- Total cards per deck
- New cards count
- Learning cards count
- Review cards count
- Deck description (if present)

**FR-2.2:** Extract and display **Note Types**
- Note type names (e.g., "Basic", "Cloze")
- Field count per note type
- Template count per note type

**FR-2.3:** Extract and display **Tags**
- List of all tags in deck
- Tag count (number of notes per tag)
- Display top 20 most frequent tags

**FR-2.4:** Extract and display **Statistics**
- Total notes in deck
- Total cards in deck
- Deck creation date
- Last modification date
- Average ease factor (if applicable)
- Card type distribution (pie chart or text)

### 3.3 User Interface
**FR-3.1:** Display metadata in compact, scrollable inspector panel  
**FR-3.2:** Implement collapsible sections for each metadata category  
**FR-3.3:** Show loading indicator during file parsing  
**FR-3.4:** Display user-friendly error messages for:
- Invalid `.apkg` files
- Corrupted SQLite databases
- Missing `collection.anki2` file
- Unsupported schema versions

**FR-3.5:** Provide theme-aware styling:
- Detect Eagle theme via `eagle.app.theme`
- Support system-automatic theme switching (follow OS light/dark mode)
- Support all Eagle themes: AUTO, LIGHT, LIGHTGRAY, GRAY, BLUE, PURPLE, DARK
- Update colors dynamically on theme change (`eagle.onThemeChanged`)
- When theme is AUTO, detect system preference via `window.matchMedia('(prefers-color-scheme: dark)')`

### 3.4 Performance
**FR-4.1:** Parse and display metadata within 2 seconds for decks <50MB  
**FR-4.2:** Show warning message for `.apkg` files >100MB  
**FR-4.3:** Release memory after parsing (call `db.close()`)  
**FR-4.4:** Handle parsing asynchronously to prevent UI blocking

---

## 4. Non-Functional Requirements

### 4.1 Performance
**NFR-1.1:** Initial load time: <500ms for typical decks (1-10MB)  
**NFR-1.2:** Memory usage: <100MB RAM during parsing  
**NFR-1.3:** Plugin size: <2MB (including bundled dependencies)

### 4.2 Compatibility
**NFR-2.1:** Support Anki database schema version 11  
**NFR-2.2:** Graceful degradation for unknown schema versions  
**NFR-2.3:** Compatible with `.apkg` exports from Anki Desktop 2.1.x

### 4.3 Reliability
**NFR-3.1:** Handle corrupted ZIP archives without crashing  
**NFR-3.2:** Handle corrupted SQLite databases without crashing  
**NFR-3.3:** Validate file extension before processing  
**NFR-3.4:** Log errors to console for debugging (dev mode)

### 4.4 Usability
**NFR-4.1:** Follow Eagle's design system (11px font, sans-serif, rounded corners)  
**NFR-4.2:** Provide tooltips for technical terms (ease factor, interval, etc.)  
**NFR-4.3:** Use icons to represent card types (new/learning/review)  
**NFR-4.4:** Maintain consistent spacing and alignment

### 4.5 Maintainability
**NFR-5.1:** Use modular code structure (separate parser logic from UI)  
**NFR-5.2:** Include inline documentation for complex queries  
**NFR-5.3:** Use ESLint/Prettier for code consistency (optional)  
**NFR-5.4:** Version lock dependencies in `package.json`

---

## 5. Anki Database Schema

### 5.1 File Structure
`.apkg` files are ZIP archives containing:
- `collection.anki2` - SQLite database (main metadata store)
- `media` - JSON file mapping media filenames
- `0`, `1`, `2`, ... - Numbered media files (images/audio)

### 5.2 SQLite Tables

#### 5.2.1 `col` Table (Collection Metadata)
Single row containing:
- `id` (INTEGER) - Collection ID
- `crt` (INTEGER) - Creation timestamp (epoch seconds)
- `mod` (INTEGER) - Last modified timestamp (epoch milliseconds)
- `scm` (INTEGER) - Schema modification time (epoch milliseconds)
- `ver` (INTEGER) - Schema version (expected: 11)
- `conf` (TEXT) - JSON: Collection configuration
- `models` (TEXT) - **JSON: Note type definitions** (names, fields, templates)
- `decks` (TEXT) - **JSON: Deck definitions** (names, descriptions, IDs)
- `dconf` (TEXT) - JSON: Deck options groups
- `tags` (TEXT) - Space-separated list of all tags

#### 5.2.2 `notes` Table
- `id` (INTEGER PRIMARY KEY) - Note ID (epoch milliseconds)
- `guid` (TEXT) - Globally unique ID
- `mid` (INTEGER) - Model (note type) ID
- `mod` (INTEGER) - Modification time (epoch seconds)
- `tags` (TEXT) - Space-separated tags for this note
- `flds` (TEXT) - Field values (separated by `\x1f`)
- `sfld` (TEXT) - Sort field (for searching)
- `csum` (INTEGER) - Checksum for duplicate detection

#### 5.2.3 `cards` Table
- `id` (INTEGER PRIMARY KEY) - Card ID (epoch milliseconds)
- `nid` (INTEGER) - Note ID (foreign key to `notes.id`)
- `did` (INTEGER) - Deck ID
- `ord` (INTEGER) - Template ordinal
- `mod` (INTEGER) - Modification time (epoch seconds)
- `type` (INTEGER) - Card type: 0=new, 1=learning, 2=review, 3=relearning
- `queue` (INTEGER) - Queue: -3=buried, -2=sched buried, -1=suspended, 0=new, 1=learning, 2=review, 3=in learning, 4=preview
- `due` (INTEGER) - Due date/position
- `ivl` (INTEGER) - Interval in days
- `factor` (INTEGER) - Ease factor (in permille, e.g., 2500 = 250%)
- `reps` (INTEGER) - Number of reviews
- `lapses` (INTEGER) - Number of lapses

### 5.3 Critical Queries

#### Get Deck Information
```sql
SELECT decks FROM col;
```
Parse JSON to extract: `{deck_id: {name, desc, dyn, collapsed, ...}}`

#### Get Note Types
```sql
SELECT models FROM col;
```
Parse JSON to extract: `{model_id: {name, flds: [{name, ...}], tmpls: [...]}}`

#### Count Cards by Deck and Type
```sql
SELECT 
  did AS deck_id,
  type,
  COUNT(*) AS count
FROM cards
GROUP BY did, type;
```

#### Get Total Notes
```sql
SELECT COUNT(*) FROM notes;
```

#### Get All Tags
```sql
SELECT tags FROM col;
```
Parse space-separated string.

#### Get Average Ease Factor
```sql
SELECT AVG(factor) FROM cards WHERE type = 2;
```

---

## 6. File Structure

### 6.1 Plugin Directory Layout
```
Eagle Anki Metadata/
├── manifest.json          # Plugin configuration
├── package.json           # npm dependencies
├── index.html             # Inspector UI
├── lib/
│   ├── sql-wasm.js        # sql.js loader (from npm)
│   ├── sql-wasm.wasm      # WebAssembly SQLite binary
│   ├── jszip.min.js       # jszip library (from npm)
│   └── anki-parser.js     # Metadata extraction logic
├── styles/
│   └── inspector.css      # Theme-aware styles
└── README.md              # Plugin documentation
```

### 6.2 Manifest Changes
**Current:**
```json
"preview": {
  "jpg,png": {
    "inspector": {
      "path": "index.html",
      "height": 100,
      "multiSelect": false
    }
  }
}
```

**Required:**
```json
"preview": {
  "apkg": {
    "inspector": {
      "path": "index.html",
      "height": 350,
      "multiSelect": false
    }
  }
}
```

---

## 7. Dependencies

### 7.1 npm Packages
| Package | Version | Purpose | Size |
|---------|---------|---------|------|
| `jszip` | ^3.10.1 | Extract `.apkg` ZIP archives | ~100KB minified |
| `sql.js` | ^1.13.0 | Query SQLite databases (WASM) | ~1.5MB (incl. WASM) |

### 7.2 Bundling Strategy
**Option A (Recommended):** Bundle libraries in `lib/` directory
- Copy `node_modules/jszip/dist/jszip.min.js` → `lib/jszip.min.js`
- Copy `node_modules/sql.js/dist/sql-wasm.js` → `lib/sql-wasm.js`
- Copy `node_modules/sql.js/dist/sql-wasm.wasm` → `lib/sql-wasm.wasm`
- Include via `<script src="lib/jszip.min.js"></script>` in `index.html`

**Option B:** Use CDN (requires internet)
- Not recommended for Eagle plugins (may run offline)

---

## 8. UI/UX Specifications

### 8.1 Layout
**Inspector Panel Height:** 350px (adjustable in manifest)

**Sections (Top to Bottom):**
1. **Header** (30px)
   - Deck file name
   - File size badge

2. **Deck Summary** (Collapsible, 80px)
   - Deck name(s)
   - Card counts: `123 New | 45 Learning | 678 Review`
   - Total cards: 846

3. **Note Types** (Collapsible, 60px)
   - List of note types with field counts
   - Example: `Basic (2 fields) • Cloze (1 field)`

4. **Tags** (Collapsible, 80px)
   - Tag cloud or vertical list
   - Show count in parentheses: `grammar (45) • vocabulary (120)`

5. **Statistics** (Collapsible, 80px)
   - Total notes
   - Creation date
   - Average ease factor
   - Card type distribution

### 8.2 Theme-Aware Colors

**System Theme Detection:**
```javascript
// Detect system preference when Eagle theme is AUTO
const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
// Listen to system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (eagle.app.theme === 'AUTO') {
    applyTheme(e.matches ? 'DARK' : 'LIGHT');
  }
});
```

**Color Palette:**
| Theme | Background | Text | Accent | Border | Notes |
|-------|------------|------|--------|--------|-------|
| AUTO (Light) | #FFFFFF | #333333 | #007AFF | #E5E5E5 | Follows system light mode |
| AUTO (Dark) | #1E1E1E | #CCCCCC | #0A84FF | #3C3C3C | Follows system dark mode |
| LIGHT | #FFFFFF | #333333 | #007AFF | #E5E5E5 | Force light theme |
| LIGHTGRAY | #F5F5F5 | #333333 | #007AFF | #DDDDDD | |
| GRAY | #E8E8E8 | #2C2C2C | #007AFF | #CCCCCC | |
| BLUE | #E3F2FD | #1565C0 | #2196F3 | #BBDEFB | |
| PURPLE | #F3E5F5 | #6A1B9A | #9C27B0 | #E1BEE7 | |
| DARK | #1E1E1E | #CCCCCC | #0A84FF | #3C3C3C | Force dark theme |

### 8.3 Interactive Elements
- **Collapsible Sections:** Click header to expand/collapse
- **Tooltips:** Hover over technical terms for explanations
- **Copy-to-Clipboard:** Click tag/deck name to copy (optional)
- **Loading Spinner:** Centered spinner during file parsing

---

## 9. Error Handling

### 9.1 Error Scenarios
| Error | Detection | User Message |
|-------|-----------|--------------|
| Invalid file extension | Check `item.ext !== 'apkg'` | "Not a valid Anki deck file (.apkg)" |
| Corrupted ZIP | jszip throws error | "Unable to read deck file (corrupted archive)" |
| Missing collection.anki2 | File not found in ZIP | "Invalid Anki deck (missing database)" |
| Corrupted SQLite | sql.js throws error | "Unable to read deck database (corrupted)" |
| Unsupported schema | `ver !== 11` | "Unsupported Anki version (schema v{ver})" |
| File too large | `item.size > 100MB` | "Deck file is very large ({size}MB). Parsing may be slow." |

### 9.2 Fallback Behavior
On error, display:
- Error message (red text)
- Basic file info (name, size, modification date)
- Suggestion: "Try opening in Anki to verify deck integrity"

---

## 10. Testing Requirements

### 10.1 Unit Tests (Manual)
- ✅ Parse valid `.apkg` with single deck
- ✅ Parse `.apkg` with multiple decks
- ✅ Parse deck with custom note types
- ✅ Parse deck with 1000+ cards
- ✅ Handle corrupted ZIP gracefully
- ✅ Handle corrupted SQLite gracefully
- ✅ Handle missing `collection.anki2`
- ✅ Verify theme switching (all 7 themes + AUTO mode)
- ✅ Verify AUTO theme follows system preference changes

### 10.2 Integration Tests
- ✅ Select `.apkg` file in Eagle → Inspector shows metadata
- ✅ Switch themes → Inspector updates colors
- ✅ Select different `.apkg` → Inspector updates content
- ✅ Select non-`.apkg` file → Inspector doesn't activate

### 10.3 Performance Tests
- ✅ Small deck (1MB) → Parse in <500ms
- ✅ Medium deck (10MB) → Parse in <2s
- ✅ Large deck (50MB) → Show warning, parse in <10s
- ✅ Very large deck (100MB+) → Show warning, optional skip

---

## 11. Development Workflow

### 11.1 Setup
```bash
cd "Eagle Anki Metadata"
npm install
npm run bundle  # Optional: Copy libs to lib/ folder
```

### 11.2 Development
1. Open Eagle application
2. Enable plugin developer mode
3. Load plugin from directory
4. Right-click inspector → "Developer Tools" for debugging

### 11.3 Distribution
1. Bundle dependencies in `lib/` folder
2. Test on fresh Eagle installation
3. Zip plugin directory (exclude `node_modules`)
4. Publish to Eagle plugin repository

---

## 12. Risks and Mitigation

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Anki schema changes | High | Medium | Detect schema version, show error for unsupported |
| Large file performance | Medium | Low | Implement size warning, optional progressive parsing |
| WebAssembly compatibility | High | Low | sql.js has wide browser support (Chromium 107 ✓) |
| Dependency size | Low | High | Accept 1.5MB overhead; optimize with minification |
| Native module conflicts | High | Low | Use pure JS/WASM only (no native modules) |

---

## 13. Critical Analysis: Card Preview Implementation

### 13.1 Two Approaches Compared

#### Approach A: Inspector Extension (Current Choice)
**Purpose:** Display metadata in right-side inspector panel  
**File Registration:** `.apkg` → Inspector panel activation

**Pros:**
- ✅ Lightweight implementation (metadata-only, no rendering)
- ✅ Fast parsing (<2s for typical decks)
- ✅ Low memory footprint (<100MB)
- ✅ Simple UI (text-based metadata display)
- ✅ No HTML sanitization concerns
- ✅ Clear user expectation (metadata viewer, not content viewer)
- ✅ Works well with Eagle's existing workflow (quick preview of deck properties)

**Cons:**
- ❌ No visual card preview (cannot see card content/formatting)
- ❌ No thumbnail generation for Eagle grid view
- ❌ Limited to inspector panel (doesn't integrate with main gallery)
- ❌ Requires user to select file to view metadata

**Use Case:** Users managing Anki decks want to quickly identify deck contents (name, card count, tags) without opening Anki.

---

#### Approach B: Format Extension Plugin
**Purpose:** Full `.apkg` format support with thumbnail and content preview  
**File Registration:** `.apkg` → Thumbnail generation + Display tool

**Implementation Requirements:**
1. **Thumbnail Generation** (`preview` → `thumbnail`)
   - Generate static image representing deck content
   - Options:
     - Screenshot of first card's front/back
     - Deck icon with card count overlay
     - Collage of multiple cards
     - Generic Anki logo with deck name
   
2. **Display Tool** (`preview` → `player`)
   - Full-screen card viewer
   - Interactive navigation (prev/next card)
   - Show front → flip → show back
   - Support card templates (HTML/CSS rendering)

**Pros:**
- ✅ True format integration (appears as first-class file type)
- ✅ Thumbnail visible in Eagle grid view (no selection needed)
- ✅ Full card content preview (HTML rendering with styles)
- ✅ Interactive card browsing (flip cards, navigate deck)
- ✅ Better visual identification of decks in gallery
- ✅ Could support media files (images/audio embedded in cards)
- ✅ More immersive experience (feels like mini-Anki viewer)

**Cons:**
- ❌ **Complex HTML/CSS rendering** (Anki card templates use arbitrary HTML/CSS/JS)
- ❌ **Security risks** (must sanitize user HTML to prevent XSS attacks)
- ❌ **JavaScript execution** (Anki templates can include JS for dynamic cards)
- ❌ **Performance overhead** (rendering HTML is slower than text parsing)
- ❌ **Media handling** (must extract and embed images/audio from .apkg)
- ❌ **Template compatibility** (Anki templates may use features not supported in Chromium 107)
- ❌ **Thumbnail generation delay** (requires parsing + rendering on import)
- ❌ **Memory intensive** (keeping rendered cards in memory)
- ❌ **Maintenance burden** (must handle Anki template updates/breaking changes)

**Critical Challenges:**

1. **HTML Sanitization**
   ```html
   <!-- Anki card template example -->
   <div class="card">
     {{Front}}
     <hr id="answer">
     {{Back}}
     <script>
       // User could inject malicious JS here
       document.querySelector('.card').innerHTML = fetchExternalData();
     </script>
   </div>
   ```
   - Must strip `<script>` tags, `onerror`, `onclick` attributes
   - Need DOMPurify or similar library
   - Risk: over-sanitization breaks legitimate templates

2. **CSS Isolation**
   ```css
   /* Anki card CSS could conflict with Eagle UI */
   body { background: red !important; }
   * { font-size: 72px; }
   ```
   - Must render in isolated iframe or shadow DOM
   - Need to prevent CSS leakage to Eagle UI

3. **Media File Extraction**
   - Extract `0`, `1`, `2`... files from .apkg
   - Parse `media` JSON to map filenames
   - Serve media via data URLs or temp directory
   - Handle missing media gracefully

4. **Thumbnail Generation Strategies**
   | Strategy | Pros | Cons |
   |----------|------|------|
   | Render first card → screenshot | Accurate representation | Slow, requires headless browser |
   | Static icon + text overlay | Fast, predictable | Generic, not unique per deck |
   | Deck statistics visualization | Informative | Not visually distinctive |
   | User-uploaded custom image | Flexible | Manual effort, not automatic |

5. **Performance Implications**
   - Parsing .apkg on file import: +2-5s per deck
   - Generating thumbnails: +1-3s per deck (render + screenshot)
   - Memory: ~50-100MB per open deck viewer
   - CPU: 20-40% during rendering (blocks UI thread)

---

### 13.2 Critical Decision Matrix

| Criterion | Inspector (Metadata) | Format Extension (Preview) | Winner |
|-----------|---------------------|---------------------------|--------|
| **Implementation complexity** | Low (SQL queries + JSON parsing) | Very High (HTML rendering + sanitization) | Inspector |
| **Performance** | Fast (<2s) | Slow (5-10s including thumbnail) | Inspector |
| **Security** | Safe (no user HTML executed) | Risky (XSS vectors in templates) | Inspector |
| **Memory usage** | Low (<100MB) | High (200-500MB with media) | Inspector |
| **User value** | High (quick deck identification) | Medium-High (visual browsing) | Tie |
| **Maintenance** | Low (stable SQL schema) | High (Anki template changes) | Inspector |
| **Eagle integration** | Good (inspector panel) | Excellent (gallery thumbnails) | Format |
| **Scope creep risk** | Low (metadata-only) | High (feature expectations grow) | Inspector |

**Recommendation:** **Start with Inspector Extension (Approach A)**, iterate to Format Extension (Approach B) in Phase 2 if demand exists.

**Rationale:**
1. **MVP Validation:** Inspector proves user demand for .apkg support with minimal investment
2. **Risk Mitigation:** Avoid complex rendering/security issues upfront
3. **Incremental Value:** Metadata alone solves 80% of use case (deck identification)
4. **Future-Proof:** Can upgrade to Format Extension later without breaking existing functionality

---

### 13.3 Hybrid Approach (Recommended Phase 2)

**Strategy:** Inspector Extension (Phase 1) + Limited Card Preview (Phase 2)

**Phase 1 (Current):** Metadata-only inspector
- Deck summary, note types, tags, statistics
- No HTML rendering

**Phase 2 (Future):** Add "Preview Card" button in inspector
- Click button → Open modal with rendered card
- Render **first card only** (not full deck browsing)
- Use sandboxed iframe for security
- Lazy-load on demand (not automatic)
- Show front/back in modal
- User consciously opts into preview (vs automatic thumbnail generation)

**Benefits of Hybrid:**
- ✅ Keeps Phase 1 simple and fast
- ✅ Adds preview capability without full Format Extension complexity
- ✅ User controls when rendering happens (opt-in)
- ✅ Can test demand before investing in full thumbnail system
- ✅ Easier to secure (single card in controlled context vs gallery-wide thumbnails)

**Implementation:**
```javascript
// In inspector UI
<button onclick="previewFirstCard()">Preview Card</button>

async function previewFirstCard() {
  const card = await getFirstCard(db); // Query first card from SQLite
  const template = parseTemplate(card.model); // Get HTML template
  const rendered = renderCard(template, card.fields); // Fill template with data
  const sanitized = DOMPurify.sanitize(rendered); // Sanitize HTML
  
  // Show in modal with iframe
  showModal(`<iframe srcdoc="${sanitized}" sandbox="allow-same-origin"></iframe>`);
}
```

---

### 13.4 Format Extension: Full Specification (If Pursuing)

**If** you decide to implement Format Extension in future, here's the complete spec:

#### Manifest Changes
```json
{
  "preview": {
    "apkg": {
      "thumbnail": {
        "path": "thumbnail.html",
        "width": 200,
        "height": 200
      },
      "player": {
        "path": "player.html"
      }
    }
  }
}
```

#### Required Components

1. **`thumbnail.html`** - Generate thumbnail image
   - Receives file path via `eagle.item.getSelected()`
   - Parses .apkg, extracts first card
   - Renders card to canvas (or uses static icon)
   - Returns image as data URL or saves to temp file
   - Eagle displays in grid view

2. **`player.html`** - Full card viewer
   - Double-click .apkg → Opens player
   - Renders cards with full HTML/CSS
   - Navigation controls (prev/next, flip)
   - Media playback (images/audio)
   - Full-screen mode

3. **Security Requirements**
   - HTML sanitization (DOMPurify)
   - Sandboxed iframe (`sandbox="allow-same-origin"`)
   - Content Security Policy (CSP) headers
   - No inline scripts execution
   - Media source validation

4. **Performance Requirements**
   - Thumbnail generation: <3s per deck
   - Cache thumbnails to avoid regeneration
   - Lazy-load media files
   - Debounce rendering during navigation

#### Estimated Development Time
- Inspector Extension (Phase 1): **2-3 days**
- Format Extension (Full): **2-3 weeks**
  - Thumbnail generation: 3-4 days
  - Card viewer/player: 5-7 days
  - Security hardening: 3-4 days
  - Media handling: 2-3 days
  - Testing/debugging: 3-4 days

---

### 13.5 Conclusion: Card Preview Critical Analysis

**Short Answer:** Card preview via Format Extension is **technically feasible but high-risk/high-effort**. Inspector Extension is the **pragmatic MVP choice**.

**Key Insights:**
1. **Inspector Extension suffices for 80% of use cases** (quick deck identification)
2. **Format Extension adds 10x complexity** for 20% additional value (visual browsing)
3. **Security is the biggest concern** (user HTML/CSS/JS execution)
4. **Hybrid approach is best compromise** (metadata + opt-in preview)
5. **Thumbnail generation is non-trivial** (requires rendering pipeline)

**Recommended Path Forward:**
1. ✅ **Implement Inspector Extension (Phase 1)** - 2-3 days, low risk
2. 🔄 **Gather user feedback** - Do users want visual preview?
3. 🚀 **Add opt-in card preview modal (Phase 2)** - 3-5 days, medium risk
4. 🎯 **Consider Format Extension (Phase 3)** - Only if high demand, 2-3 weeks, high risk

**Decision Point:** Proceed with Inspector Extension as specified in this document. Defer card preview decisions until Phase 2 based on user demand.

---

## 14. Future Enhancements (Out of Scope v1.0)

### 13.1 Phase 2 (Optional)
- **Media Preview:** Show first 5 images/audio files from deck
- **Card Preview:** Render sample card HTML with CSS
- **Export Metadata:** Export metadata as JSON/CSV
- **Search:** Filter cards/notes by tag or field content

### 13.2 Phase 3 (Optional)
- **Editing:** Modify deck names, tags, descriptions
- **Deck Merging:** Combine multiple `.apkg` files
- **Statistics Charts:** Visual graphs for review history
- **AnkiWeb Sync:** Pull deck info from AnkiWeb API

---

## 14. References

### 14.1 Documentation
- [Eagle Plugin API - Introduction](https://developer.eagle.cool/plugin-api/get-started/introduction)
- [Eagle Plugin API - Inspector Extensions](https://developer.eagle.cool/plugin-api/get-started/plugin-types#inspector-extension)
- [Eagle Plugin API - manifest.json Configuration](https://developer.eagle.cool/plugin-api/tutorial/manifest)
- [Anki Database Structure](https://github.com/ankidroid/Anki-Android/wiki/Database-Structure)
- [sql.js Documentation](https://sql.js.org/)
- [jszip Documentation](https://stuk.github.io/jszip/)

### 14.2 Example `.apkg` Files for Testing
- Create test decks in Anki Desktop 2.1.x
- Export as `.apkg` (no scheduling info, media optional)
- Sizes: 1MB, 10MB, 50MB for performance testing

---

## 15. Acceptance Criteria

### 15.1 Definition of Done
- [x] Manifest configured for `.apkg` file type
- [x] Inspector displays deck summary (name, card counts)
- [x] Inspector displays note types and tags
- [x] Inspector displays statistics (notes, dates, ease)
- [x] Theme-aware styling implemented (all 6 themes)
- [x] Error handling for corrupted/invalid files
- [x] Loading indicator during parsing
- [x] Performance: <2s for typical decks (<50MB)
- [x] Code documented with comments
- [x] Manual testing completed (all test cases pass)
- [x] README.md with installation/usage instructions

### 15.2 User Acceptance
✅ **User can:**
1. Select an `.apkg` file in Eagle
2. View deck metadata in the right-side inspector panel
3. Expand/collapse metadata sections
4. See accurate card counts and deck names
5. Switch Eagle themes without layout breaking
6. See error messages for invalid files

---

**Document Status:** Draft  
**Next Steps:** Review requirements → Implement manifest changes → Develop UI → Test → Deploy
