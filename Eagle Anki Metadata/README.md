# Eagle Anki Metadata Inspector

An [Eagle](https://eagle.cool) Inspector extension that displays metadata from Anki `.apkg` deck files directly within the Eagle image management application.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Eagle](https://img.shields.io/badge/Eagle-4.0%20Beta%2017%2B-orange)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

- 📚 **Deck Summary**: View deck names, card counts (new/learning/review), and descriptions
- 📝 **Note Types**: See all note types with field and template counts
- 🏷️ **Tags**: Browse top 20 tags with usage counts
- 📊 **Statistics**: Total notes, total cards, creation date, average ease factor, and card distribution
- 🎨 **Theme-Aware**: Supports all Eagle themes including AUTO mode (follows system light/dark preference)
- 🌍 **Multi-Language**: Supports English, 繁體中文, 简体中文, 日本語, 한국어
- ⚡ **Fast Parsing**: Metadata extraction in <2 seconds for typical decks (<50MB)
- 🔒 **Safe**: Read-only metadata viewer with no file modifications
- 🌐 **Cross-Platform**: Works on macOS, Windows, and Linux

## Screenshots

*[TODO: Add screenshots of the inspector panel showing deck metadata]*

## Installation

### Method 1: Install from Eagle Plugin Store (Recommended)
*Coming soon - once published to Eagle's official plugin repository*

### Method 2: Manual Installation

1. **Download the plugin**
   ```bash
   git clone https://github.com/leonwong282/eagle-anki-metadata.git
   # or download ZIP from GitHub
   ```

2. **Install dependencies**
   ```bash
   cd "Eagle Anki Metadata"
   npm install
   ```
   This will automatically:
   - Download `jszip` and `sql.js` packages
   - Copy library files to `lib/` directory

3. **Load in Eagle**
   - Open Eagle application
   - Go to `Plugins` → `Developer` → `Load Plugin from Folder`
   - Select the `Eagle Anki Metadata` folder
   - Plugin will appear in the inspector when you select an `.apkg` file

## Usage

1. **Add `.apkg` files to Eagle**
   - Drag and drop Anki deck files (`.apkg`) into your Eagle library
   - Or use Eagle's import function

2. **View metadata**
   - Select any `.apkg` file in Eagle
   - The inspector panel on the right will automatically display deck metadata
   - Click section headers to expand/collapse (Deck Summary, Note Types, Tags, Statistics)

3. **Supported information**
   - **Deck names** and descriptions
   - **Card counts**: New, Learning, Review cards per deck
   - **Note types**: Names, field counts, template counts
   - **Tags**: Top 20 most used tags with counts
   - **Statistics**: Total notes/cards, creation date, average ease factor

## Requirements

- **Eagle**: Version 4.0 Beta 17 or higher
- **Anki**: Deck files exported from Anki Desktop 2.1.x
- **Schema**: Optimized for Anki database schema version 11 (gracefully handles other versions)

## Development

### Setup Development Environment

```bash
# Clone repository
git clone https://github.com/leonwong282/eagle-anki-metadata.git
cd "Eagle Anki Metadata"

# Install dependencies
npm install

# The postinstall script automatically copies library files to lib/
```

### Build for Distribution

```bash
# Build clean distribution package
npm run build

# Build and create .zip archive for Eagle
npm run build:zip

# Clean build output
npm run clean
```

The build script creates a clean `dist/Eagle Anki Metadata.eagleplugin/` folder containing only the necessary files for distribution (~865KB).

**Distribution files:**
- `manifest.json` - Plugin configuration
- `index.html` - Main entry point
- `logo.png` - Plugin icon
- `README.md` - Documentation
- `lib/` - Bundled dependencies (jszip, sql.js, fzstd)
- `styles/` - CSS styles
- `_locales/` - Multi-language translations (en, zh_TW, zh_CN, ja_JP, ko_KR)

**To install the built plugin in Eagle:**
1. Run `npm run build:zip` to create the archive
2. Rename `Eagle Anki Metadata.eagleplugin.zip` to `Eagle Anki Metadata.eagleplugin`
3. Double-click to install in Eagle

### Project Structure

```
Eagle Anki Metadata/
├── manifest.json          # Plugin configuration (with i18n)
├── package.json           # npm dependencies & build scripts
├── index.html             # Inspector UI (main entry point)
├── logo.png               # Plugin icon (128x128)
├── scripts/
│   └── build.js           # Build script for distribution
├── lib/
│   ├── sql-wasm.js        # sql.js WebAssembly loader
│   ├── sql-wasm.wasm      # SQLite WebAssembly binary
│   ├── jszip.min.js       # ZIP extraction library
│   ├── fzstd.min.js       # Zstd decompression (for Anki 24.x+)
│   └── anki-parser.js     # Metadata extraction logic
├── styles/
│   └── inspector.css      # Theme-aware styles
├── _locales/              # Multi-language support
│   ├── en.json            # English
│   ├── zh_TW.json         # Traditional Chinese
│   ├── zh_CN.json         # Simplified Chinese
│   ├── ja_JP.json         # Japanese
│   └── ko_KR.json         # Korean
└── README.md              # This file
```

### Key Files

- **`manifest.json`**: Defines plugin metadata and registers `.apkg` file type
- **`index.html`**: Main UI with file loading, parsing, and rendering logic
- **`lib/anki-parser.js`**: Core metadata extraction functions
- **`styles/inspector.css`**: Theme-aware CSS for all Eagle themes

### Debugging

1. Enable plugin developer mode in Eagle
2. Load plugin from folder
3. Select an `.apkg` file
4. Right-click inspector panel → "Developer Tools"
5. Check console for errors and debug output

### Testing

Manual test checklist:

- [ ] Parse valid `.apkg` with single deck
- [ ] Parse `.apkg` with multiple decks
- [ ] Parse deck with custom note types
- [ ] Parse deck with 1000+ cards
- [ ] Handle corrupted ZIP gracefully
- [ ] Handle corrupted SQLite gracefully
- [ ] Handle missing `collection.anki2`
- [ ] Verify all Eagle themes (LIGHT, LIGHTGRAY, GRAY, BLUE, PURPLE, DARK, AUTO)
- [ ] Verify AUTO theme follows system preference changes
- [ ] Test large file warning (>100MB)
- [ ] Test schema version warning (non-v11)

## Technical Details

### Architecture

- **Pure JavaScript**: No native compilation required (cross-platform compatible)
- **WebAssembly SQLite**: Uses `sql.js` for SQLite database parsing
- **ZIP Extraction**: Uses `jszip` for reading `.apkg` archives
- **Eagle Plugin API**: Integrates with Eagle's inspector extension system

### Dependencies

| Package | Version | Purpose | Size |
|---------|---------|---------|------|
| `jszip` | ^3.10.1 | Extract `.apkg` ZIP archives | ~100KB minified |
| `sql.js` | ^1.13.0 | Query SQLite databases (WASM) | ~1.5MB (incl. WASM) |

### Performance

- **Small decks** (1-10MB): <500ms parsing time
- **Medium decks** (10-50MB): <2s parsing time
- **Large decks** (>100MB): Warning displayed, slower parsing
- **Memory usage**: <100MB RAM during parsing

### Anki Database Schema

This plugin extracts data from the following SQLite tables:

- **`col` table**: Collection metadata (decks, models, tags, creation date)
- **`notes` table**: Note count and tag statistics
- **`cards` table**: Card counts by type (new/learning/review)

Supports Anki database schema version 11 (Anki Desktop 2.1.x).

## Limitations

- **Read-only**: Cannot edit or modify `.apkg` files
- **Metadata only**: Does not preview card content or media files
- **Schema version**: Optimized for version 11, may show warnings for other versions
- **Large files**: Files >100MB may parse slowly
- **No AnkiWeb sync**: Does not connect to AnkiWeb or sync data

## Future Enhancements (Planned)

### Phase 2
- [ ] **Media Preview**: Show first 5 images/audio files from deck
- [ ] **Card Preview**: Render sample card HTML with CSS (opt-in modal)
- [ ] **Export Metadata**: Export metadata as JSON/CSV
- [ ] **Search**: Filter cards/notes by tag or field content

### Phase 3
- [ ] **Format Extension**: Full thumbnail generation for Eagle grid view
- [ ] **Card Viewer**: Interactive card browsing with flip animation
- [ ] **Statistics Charts**: Visual graphs for review history

See [REQUIREMENTS.md](docs/REQUIREMENTS.md) for detailed feature roadmap and technical analysis.

## Troubleshooting

### Plugin doesn't appear in inspector
- Verify Eagle version is 4.0 Beta 17 or higher
- Check that `.apkg` file extension is correct
- Try reloading the plugin (`Plugins` → `Reload`)

### "Invalid Anki Deck" error
- File may be corrupted - try exporting from Anki again
- Ensure file is `.apkg` format (not `.colpkg` or `.apkg2`)

### "Unsupported Anki version" warning
- Plugin is optimized for schema v11 (Anki 2.1.x)
- Older/newer versions may work but display this warning
- Metadata should still display correctly

### Performance issues with large decks
- Files >100MB trigger warning and may parse slowly
- Consider splitting large decks in Anki before exporting
- Close other applications to free memory

### Theme not updating
- Check that Eagle theme is set correctly
- For AUTO mode, verify system theme preference is detected
- Try reloading the plugin

## Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Eagle](https://eagle.cool) - Amazing image management application
- [Anki](https://apps.ankiweb.net/) - Powerful flashcard application
- [sql.js](https://sql.js.org/) - SQLite compiled to WebAssembly
- [jszip](https://stuk.github.io/jszip/) - ZIP file manipulation in JavaScript

## Support

- **Issues**: [GitHub Issues](https://github.com/leonwong282/eagle-anki-metadata/issues)
- **Eagle Plugin API**: [Official Documentation](https://developer.eagle.cool/plugin-api/)
- **Anki Database**: [Schema Documentation](https://github.com/ankidroid/Anki-Android/wiki/Database-Structure)

## Changelog

### v1.0.0 (2025-11-24)
- 🎉 Initial release
- ✅ Deck summary with card counts
- ✅ Note types display
- ✅ Tag list with counts
- ✅ Statistics (notes, cards, ease factor, distribution)
- ✅ Theme-aware UI (7 themes + AUTO mode)
- ✅ Error handling for corrupted files
- ✅ Performance optimizations for large decks

---

**Made with ❤️ for the Eagle and Anki communities**
