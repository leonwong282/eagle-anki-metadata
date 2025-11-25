# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2025-11-25

### ✨ Added
- 📚 **Core Functionality**: Complete Anki deck metadata viewer
  - Deck summary with card counts (new/learning/review/total)
  - Note types display with field and template counts
  - Tags browser with usage statistics
  - Statistical overview (total notes/cards, creation date, ease factor)
- 🎨 **Theme Support**: Full integration with all Eagle themes
  - Supports LIGHT, LIGHTGRAY, GRAY, BLUE, PURPLE, DARK themes
  - AUTO mode with automatic light/dark detection
  - Semantic CSS variables for consistent theming
- 🌍 **Multi-Language Support**: Internationalization (i18n)
  - English (en)
  - Traditional Chinese (zh_TW / 繁體中文)
  - Simplified Chinese (zh_CN / 简体中文)
  - Japanese (ja_JP / 日本語)
  - Korean (ko_KR / 한국어)
  - Automatic language detection from Eagle settings
- 📦 **Anki 24.x+ Support**: Modern format compatibility
  - Zstd decompression for `collection.anki21b` files
  - Backward compatibility with Anki 2.1.x format (`collection.anki2`)
- 🔧 **Build System**: Automated packaging
  - `npm run build` creates distribution package
  - `npm run build:zip` creates `.eagleplugin.zip` for distribution
  - Automatic bundling of dependencies (JSZip, sql.js, fzstd)
- 📖 **Documentation**: Comprehensive guides
  - English and Traditional Chinese README files
  - Plugin submission documentation
  - Inline code comments and examples

### 🚀 Technical Highlights
- ⚡ **Performance**: Fast parsing (<2 seconds for typical decks)
- 🔒 **Security**: Read-only operation with no file modifications
- 🌐 **Cross-Platform**: Works on macOS, Windows, and Linux
- 📦 **Compact**: ~865KB total package size
- 🧩 **Dependencies**:
  - JSZip v3.10.1 (ZIP extraction)
  - sql.js v1.13.0 (SQLite WebAssembly)
  - fzstd v0.1.1 (Zstd decompression)

### 🎯 User Experience
- 📱 **Responsive UI**: Adapts to inspector panel size
- 🎨 **Collapsible Sections**: Organized information hierarchy
- 🔍 **Error Handling**: Graceful error messages for invalid files
- 🚀 **Instant Display**: Metadata loads immediately on file selection

---

## [Unreleased]

### 🔮 Planned Features
- [ ] **Media Preview**: Display images and audio from deck media
- [ ] **Card Preview**: Render sample card content with formatting
- [ ] **Export Metadata**: Export deck information as JSON/CSV
- [ ] **Thumbnail Generation**: Custom thumbnails for Eagle grid view
- [ ] **Enhanced Statistics**: Detailed analytics and visualizations
- [ ] **Search & Filter**: Find specific decks, tags, or note types

---

<div align="center">

**⭐ Star this repository if it helped you!**

Made with ❤️ for the Eagle and Anki communities

</div>
