<a id="readme-top"></a>

<div align="center">

<a href="https://github.com/leonwong282/eagle-anki-metadata">
  <img src="images/logo.png" alt="Logo" width="80" height="80">
</a>

# 📚 Eagle Anki Metadata

> An Eagle Inspector extension that displays Anki deck metadata directly within Eagle

![Version](https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Eagle](https://img.shields.io/badge/Eagle-4.0%2B-orange?style=for-the-badge)
![Platform](https://img.shields.io/badge/Platform-Cross--Platform-purple?style=for-the-badge)

[🌍 English](README.md) | [🇹🇼 繁體中文](README.zh-TW.md) 

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Development](#-development) • [Contributing](#-contributing)

</div>

## 📸 Preview

<!-- TODO: Add screenshots -->
*Screenshots coming soon*

## ✨ Features

- 📚 **Deck Summary** - View deck names, card counts (new/learning/review), and descriptions
- 📝 **Note Types** - See all note types with field and template counts  
- 🏷️ **Tags** - Browse tags with usage counts
- 📊 **Statistics** - Total notes, total cards, creation date, average ease factor
- 🎨 **Theme-Aware** - Supports all Eagle themes (LIGHT, LIGHTGRAY, GRAY, BLUE, PURPLE, DARK, AUTO)
- ⚡ **Fast Parsing** - Metadata extraction in <2 seconds for typical decks
- 🔒 **Safe** - Read-only metadata viewer with no file modifications
- 🌐 **Cross-Platform** - Works on macOS, Windows, and Linux
- 📦 **Anki 24.x+ Support** - Handles new zstd-compressed database format

## 🛠️ Tech Stack

- **Runtime**: Eagle Plugin API (Chromium 107 + Node.js 16)
- **Database**: sql.js (WebAssembly SQLite)
- **Archive**: JSZip for .apkg extraction
- **Compression**: fzstd for Anki 24.x+ zstd decompression
- **Styling**: Theme-aware CSS with CSS variables

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🚀 Installation

### Method 1: Eagle Plugin Store (Recommended)
*Coming soon - once published to Eagle's official plugin repository*

### Method 2: Manual Installation

1. **Download the release**
   - Go to [Releases](https://github.com/leonwong282/eagle-anki-metadata/releases)
   - Download `Eagle.Anki.Metadata.eaglepluginzip`
   - Compress to `Eagle.Anki.Metadata.eagleplugin`
   - To install in Eagle

### Method 3: Build from Source

```bash
# Clone repository
git clone https://github.com/leonwong282/eagle-anki-metadata.git
cd eagle-anki-metadata

# Install dependencies
cd "Eagle Anki Metadata"
npm install

# Build distribution package
npm run build
npm run build:zip
```

Then install the generated `.eagleplugin` file in Eagle.

### Requirements

- **Eagle**: Version 4.0 Beta 17 or higher
- **Anki**: Deck files exported from Anki Desktop 2.1.x or 24.x+

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 📖 Usage

### Viewing Deck Metadata

1. **Add `.apkg` files to Eagle**
   - Drag and drop Anki deck files into your Eagle library
   - Or use Eagle's import function

2. **View metadata**
   - Select any `.apkg` file in Eagle
   - The inspector panel on the right automatically displays deck metadata
   - Click section headers to expand/collapse

### Displayed Information

| Section | Information |
|---------|-------------|
| **Header** | File name, size, schema version, modification date |
| **Deck Summary** | Deck names, card counts (new/learning/review/total) |
| **Note Types** | Note type names, field counts, template counts |
| **Tags** | Tag names with usage counts |
| **Statistics** | Total notes/cards, creation date, average ease factor |

### Supported Formats

| Anki Version | Database File | Compression | Status |
|--------------|---------------|-------------|--------|
| Anki 2.1.x | `collection.anki2` | None | ✅ Supported |
| Anki 24.x+ | `collection.anki21b` | Zstd | ✅ Supported |

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🏗️ Project Structure

```
eagle-anki-metadata/
├── Eagle Anki Metadata/       # Plugin source code
│   ├── manifest.json          # Plugin configuration
│   ├── package.json           # Dependencies & build scripts
│   ├── index.html             # Main entry point
│   ├── logo.png               # Plugin icon (128x128)
│   ├── scripts/
│   │   └── build.js           # Build script
│   ├── lib/
│   │   ├── anki-parser.js     # Metadata extraction
│   │   ├── jszip.min.js       # ZIP extraction
│   │   ├── sql-wasm.js        # SQLite WASM loader
│   │   ├── sql-wasm.wasm      # SQLite WASM binary
│   │   └── fzstd.min.js       # Zstd decompression
│   └── styles/
│       └── inspector.css      # Theme-aware styles
├── docs/                      # Documentation
├── images/                    # Project images
├── README.md                  # This file
└── README.zh-TW.md            # Traditional Chinese README
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 💻 Development

### Setup

```bash
cd "Eagle Anki Metadata"
npm install
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm install` | Install dependencies and copy libs |
| `npm run build` | Create distribution package |
| `npm run build:zip` | Build and create .zip archive |
| `npm run clean` | Remove dist folder |

### Debugging

1. Load plugin in Eagle: `Plugins` → `Developer` → `Load Plugin from Folder`
2. Select an `.apkg` file
3. Right-click inspector → `Developer Tools`
4. Check console for logs and errors

### Build Output

The `npm run build` command creates:
- `dist/Eagle Anki Metadata.eagleplugin/` (~865KB)
- Contains only necessary files for distribution

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🤝 Contributing

Contributions are welcome! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Steps

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 📋 Roadmap

- [x] **Core Functionality** - Parse and display .apkg metadata
- [x] **Theme Support** - All Eagle themes including AUTO mode
- [x] **Anki 24.x+ Support** - Zstd decompression for new format
- [x] **Build System** - Automated distribution packaging
- [ ] **Media Preview** - Show images/audio from deck
- [ ] **Card Preview** - Render sample card content
- [ ] **Export Metadata** - Export as JSON/CSV
- [ ] **Thumbnail Generation** - Format extension for Eagle grid

See [open issues](https://github.com/leonwong282/eagle-anki-metadata/issues) for more.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## ⚠️ Limitations

- **Read-only**: Cannot edit or modify `.apkg` files
- **Metadata only**: Does not preview card content or media
- **Large files**: Files >100MB may parse slowly

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Plugin not appearing | Verify Eagle 4.0+ and reload plugin |
| "Invalid Anki Deck" error | Re-export from Anki, ensure `.apkg` format |
| Slow parsing | Normal for files >100MB |
| Theme not updating | Reload plugin or restart Eagle |

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Author

- **Leon Wong** - [leonwong282](https://github.com/leonwong282)

## 🙏 Acknowledgments

- [Eagle](https://eagle.cool) - Image management application
- [Anki](https://apps.ankiweb.net/) - Flashcard application
- [sql.js](https://sql.js.org/) - SQLite compiled to WebAssembly
- [JSZip](https://stuk.github.io/jszip/) - ZIP file library
- [fzstd](https://github.com/101arrowz/fzstd) - Zstd decompression

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 📞 Support

- 📝 [Open an issue](https://github.com/leonwong282/eagle-anki-metadata/issues/new)
- 📧 Email: leonwong282@gmail.com

## 🔗 Links

- [Eagle Plugin API Documentation](https://developer.eagle.cool/plugin-api/)
- [Anki Database Schema](https://github.com/ankidroid/Anki-Android/wiki/Database-Structure)

---

<div align="center">

**⭐ Star this repository if it helped you!**

Made with ❤️ for the Eagle and Anki communities

</div>
