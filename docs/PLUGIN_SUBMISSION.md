# Eagle Anki Metadata - Plugin Submission

> **Submission Document for Eagle Plugin Center Review**  
> Version 1.0.0 | Submission Date: November 25, 2025

---

## 📋 Plugin Information

### Basic Information

| Field | Information |
|-------|-------------|
| **Plugin Name** | Eagle Anki Metadata |
| **Version** | 1.0.0 |
| **Developer** | Leon Wong (leonwong282) |
| **Category** | Inspector Extension |
| **Type** | Metadata Viewer |
| **License** | MIT License |
| **Minimum Eagle Version** | 4.0 Beta 17 |

### Contact & Support

| Type | Contact |
|------|---------|
| **Email** | leonwong282@gmail.com |
| **GitHub Repository** | https://github.com/leonwong282/eagle-anki-metadata |
| **Issue Tracker** | https://github.com/leonwong282/eagle-anki-metadata/issues |
| **Documentation** | https://github.com/leonwong282/eagle-anki-metadata/blob/main/README.md |

---

## 🎯 Plugin Purpose & Functionality

### Single-Purpose Statement

Eagle Anki Metadata is a **read-only metadata viewer** that displays comprehensive information about Anki flashcard deck files (.apkg) directly within Eagle's Inspector panel.

### Core Functionality

1. **Deck Summary Display** - Shows deck names, card counts (new/learning/review), and descriptions
2. **Note Type Information** - Lists all note types with field and template counts
3. **Tag Management View** - Displays all tags with their usage counts
4. **Statistical Overview** - Presents total notes, cards, creation date, and average ease factor
5. **Theme Integration** - Seamlessly adapts to all Eagle themes (LIGHT, LIGHTGRAY, GRAY, BLUE, PURPLE, DARK, AUTO)

### User Value

- **Time-Saving**: View deck metadata without opening Anki Desktop
- **Organization**: Identify deck contents before importing
- **Research**: Analyze deck structure and complexity
- **Quality Control**: Verify deck statistics and note types
- **Cross-Platform**: Works identically on macOS and Windows

---

## 📝 Plugin Description

### English Description

**Eagle Anki Metadata** is an Inspector extension that allows you to view comprehensive metadata from Anki flashcard deck files (.apkg) directly within Eagle. Simply select any .apkg file in your library, and the Inspector panel will automatically display detailed information about the deck's structure, contents, and statistics.

**Key Features:**
- 📚 View deck names, descriptions, and card counts
- 📝 See all note types with field and template information
- 🏷️ Browse tags and their usage statistics
- 📊 Access deck creation date and statistics
- 🎨 Fully theme-aware across all Eagle color schemes
- ⚡ Fast parsing (< 2 seconds for typical decks)
- 🔒 100% read-only - never modifies your files
- 📦 Supports both Anki 2.1.x and 24.x+ formats (including zstd compression)

**Perfect for:**
- Language learners managing multiple Anki decks
- Students organizing study materials
- Content creators reviewing flashcard decks
- Researchers analyzing deck structure
- Anyone who wants quick deck insights without launching Anki

### Traditional Chinese Description (繁體中文)

**Eagle Anki Metadata** 是一個 Inspector 擴充套件，讓您可以直接在 Eagle 中查看 Anki 記憶卡牌組檔案（.apkg）的完整詮釋資料。只需在素材庫中選取任意 .apkg 檔案，Inspector 面板就會自動顯示牌組結構、內容和統計資料的詳細資訊。

**核心功能：**
- 📚 檢視牌組名稱、描述和卡片數量
- 📝 查看所有筆記類型及欄位和模板資訊
- 🏷️ 瀏覽標籤及其使用統計
- 📊 存取牌組建立日期和統計資料
- 🎨 完全適配所有 Eagle 色彩主題
- ⚡ 快速解析（一般牌組 < 2 秒）
- 🔒 100% 唯讀 - 絕不修改您的檔案
- 📦 支援 Anki 2.1.x 和 24.x+ 格式（包含 zstd 壓縮）

**適合對象：**
- 管理多個 Anki 牌組的語言學習者
- 整理學習資料的學生
- 審查記憶卡牌組的內容創作者
- 分析牌組結構的研究人員
- 想要快速了解牌組內容而不啟動 Anki 的所有人

---

## 🔍 Search Keywords

1. Anki
2. Flashcard
3. Metadata
4. Viewer
5. Inspector
6. Study

---

## 🖼️ Visual Assets

### Plugin Icon (`logo.png`)
- **Format**: PNG, 128x128 pixels
- **Location**: `/Eagle Anki Metadata/logo.png`
- **Description**: Clean, minimal icon representing Anki metadata integration

### Screenshots

**Screenshot 1: Main Inspector View**
- Shows .apkg file selected with metadata displayed
- Demonstrates deck summary section with card counts
- Highlights theme integration

**Screenshot 2: Note Types & Tags**
- Displays expanded note types list
- Shows tag usage counts
- Demonstrates collapsible sections

**Screenshot 3: Statistics View**
- Presents statistical information panel
- Shows creation date and ease factor
- Demonstrates data organization

**Screenshot 4: Theme Adaptation**
- Split view showing light and dark themes
- Demonstrates seamless theme integration
- Shows consistent design across themes

---

## ✅ Developer Policy Compliance

### 1. Plugin Policies

#### 1.1 Unique Functionality ✅
- **Single Purpose**: Read-only Anki deck metadata viewer
- **Clear Description**: Functionality clearly stated in all documentation
- **Accurate Representation**: No misleading claims or features
- **Unique Identity**: Original name and icon, not similar to existing plugins

#### 1.1.3 Functionality and Operation ✅
- Plugin operates completely normally
- All features tested and verified working
- No crashes or errors during normal operation

#### 1.1.4 Search Keywords ✅
- 6 relevant keywords: Anki, Flashcard, Metadata, Viewer, Inspector, Study
- All keywords directly related to plugin functionality

#### 1.1.5 Stability and Performance ✅
- No negative impact on Eagle performance
- Efficient parsing (< 2 seconds typical)
- Proper memory management and cleanup

#### 1.1.6 Code Obfuscation ✅
- **No code obfuscation used**
- All code is readable and reviewable
- External libraries are standard, well-known packages:
  - JSZip v3.10.1 (ZIP extraction)
  - sql.js v1.8.0 (SQLite WASM)
  - fzstd v0.1.1 (zstd decompression)

#### 1.1.7 System Configuration ✅
- **No system configuration changes**
- Plugin only reads files, never writes
- No Eagle settings modifications

#### 1.1.8 License Requirements ✅
- Only reads .apkg files when user selects them
- No background operations
- No permissions beyond file reading

#### 1.1.9 Localization ✅
- English (primary)
- Traditional Chinese (完整翻譯)
- All UI text supports both languages
- Consistent experience across languages

#### 1.1.10 Presentation ✅
- Professional icon design
- Clear, informative screenshots
- Consistent branding
- High-quality documentation

### 1.2 Testability ✅

#### 1.2.1 No Authentication Required ✅
- No login or account needed
- Plugin works immediately after installation

#### 1.2.2 Service Availability ✅
- **No external servers required**
- All processing happens locally
- Works offline completely

### 1.3 Functionality Availability ✅

#### 1.3.1 Cross-Platform Compatibility ✅
- **Fully compatible with macOS and Windows**
- Tested on both platforms
- Identical functionality on both systems
- No platform-specific features

#### 1.3.2 User Experience ✅
- **Immediate startup**: Loads instantly when .apkg file selected
- **Responsive**: UI updates smoothly
- **Stable**: No unexpected shutdowns
- **Error Handling**: Graceful error messages for invalid files

### 1.4 Advertising ✅
- **No advertisements of any kind**
- No promotional content
- No external links except documentation

### 2. Security Policies ✅

#### 2.1 Information Security ✅

**2.1.1 No Malware** ✅
- No malicious code
- Clean codebase, fully reviewable
- Standard libraries only

**2.1.2 Dependencies** ✅
- Dependencies clearly disclosed:
  - JSZip: ZIP file extraction
  - sql.js: SQLite database reading
  - fzstd: Zstd decompression (Anki 24.x+)
- All dependencies are standard, open-source libraries

**2.1.3 Updates** ✅
- Updates only through Eagle Plugin Center
- No self-updating mechanism

#### 2.2 Privacy and Personal Information ✅

**2.2.1 No Personal Information Collection** ✅
- **Plugin does not collect, access, or transmit ANY personal information**
- No network requests
- No data storage beyond session
- No analytics or tracking

**2.2.2 Privacy Principles** ✅
- No privacy policy needed (no data collection)
- All processing is local
- Files never leave user's device

**2.2.3-2.2.6 Not Applicable** ✅
- Plugin does not collect, store, or transmit any user data
- Fully offline operation

### 3. Financial Transactions ✅

**Not Applicable** - Plugin is completely free with no in-app purchases, subscriptions, or financial transactions of any kind.

### 4. Content Policies ✅

#### 4.1 Content Standards ✅
- Professional, complete content
- Appropriate for all audiences
- Clear, accurate descriptions

#### 4.2 Original Content ✅
- All code is original or properly licensed
- Libraries used with appropriate licenses (MIT/Apache)
- No copyright violations

#### 4.3 Risk of Harm ✅
- **No harmful content**
- Read-only operation poses no risk
- Cannot damage files or system

#### 4.4 Prohibited Content ✅
- No defamatory, threatening, or illegal content
- No gambling, cryptocurrency, or adult content
- No profanity or offensive material
- Appropriate for global audiences

---

## 🧪 Testing Information

### Test Account
**Not Required** - Plugin has no authentication system

### Test Files Provided
**Sample .apkg files included for testing:**
1. `zh-tw__character__top201-300.apkg` (included in plugin folder)
2. Additional test files available at: https://ankiweb.net/shared/decks/

### Testing Instructions

1. **Install Plugin**
   - Load plugin in Eagle: Plugins → Developer → Load Plugin from Folder
   - Select the "Eagle Anki Metadata" folder

2. **Import Test File**
   - Drag `zh-tw__character__top201-300.apkg` into Eagle library

3. **View Metadata**
   - Select the .apkg file
   - Inspector panel should display:
     - File information (name, size, schema version)
     - Deck summary with card counts
     - Note types information
     - Tags list
     - Statistical data

4. **Test Theme Switching**
   - Change Eagle theme: Settings → Appearance → Theme
   - Verify plugin adapts correctly to each theme
   - Test all themes: LIGHT, LIGHTGRAY, GRAY, BLUE, PURPLE, DARK, AUTO

5. **Test Error Handling**
   - Rename a file to `.apkg` extension (non-Anki file)
   - Select it and verify graceful error message

### Expected Behavior
- ✅ Metadata displays within 2 seconds
- ✅ All sections are collapsible
- ✅ Theme colors adapt automatically
- ✅ No console errors
- ✅ Graceful error messages for invalid files

---

## 📦 Package Contents

### Files Included in `.eagleplugin`

```
Eagle Anki Metadata.eagleplugin/
├── manifest.json          (130 bytes)
├── index.html             (28 KB)
├── logo.png               (5 KB)
├── lib/
│   ├── anki-parser.js     (8 KB)
│   ├── jszip.min.js       (120 KB)
│   ├── sql-wasm.js        (28 KB)
│   ├── sql-wasm.wasm      (654 KB)
│   └── fzstd.min.js       (22 KB)
└── styles/
    └── inspector.css      (5 KB)

Total Size: ~865 KB
```

### manifest.json Configuration

```json
{
  "name": "Eagle Anki Metadata",
  "version": "1.0.0",
  "keywords": ["anki", "flashcard", "metadata", "viewer", "inspector", "study"],
  "author": "Leon Wong",
  "email": "leonwong282@gmail.com",
  "description": "Display Anki deck metadata in Eagle Inspector",
  "website": "https://github.com/leonwong282/eagle-anki-metadata",
  "logo": "logo.png",
  "main": "index.html",
  "builtin": false,
  "type": "inspector",
  "applicable": {
    "files": [
      {
        "ext": "apkg"
      }
    ]
  }
}
```

---

## 📋 Version Update Notes

### Version 1.0.0 (Initial Release)

**New Features:**
- ✨ Complete Anki deck metadata viewer
- 📚 Deck summary with card statistics
- 📝 Note types display with field/template counts
- 🏷️ Tags browser with usage counts
- 📊 Statistical information panel
- 🎨 Full theme support for all Eagle color schemes
- 📦 Support for Anki 2.1.x and 24.x+ formats
- ⚡ Fast parsing performance (< 2 seconds)

**Technical Highlights:**
- Built with modern web standards (HTML5, CSS3, ES6+)
- WebAssembly-powered SQLite for efficient database reading
- Zstd decompression for Anki 24.x+ compatibility
- Fully client-side processing (no network requests)
- Comprehensive error handling

**User Experience:**
- Clean, minimal UI matching Eagle's design language
- Collapsible sections for better organization
- Responsive layout adapting to inspector panel size
- Clear error messages for invalid files
- Instant metadata display on file selection

---

## 🔧 Technical Specifications

### System Requirements
- **Eagle**: Version 4.0 Beta 17 or higher
- **OS**: macOS 10.13+ or Windows 10+
- **Memory**: Minimal impact (< 50MB typical)
- **Disk Space**: 865 KB

### Technology Stack
- **Runtime**: Chromium 107 + Node.js 16 (Eagle environment)
- **Database**: sql.js 1.8.0 (SQLite WASM)
- **Archive**: JSZip 3.10.1
- **Compression**: fzstd 0.1.1
- **UI**: Vanilla JavaScript (no frameworks)

### Performance Metrics
- **Startup**: Instant (< 100ms)
- **Parse Time**: < 2 seconds (typical deck)
- **Memory**: < 50MB (typical usage)
- **File Size Limit**: Tested up to 500MB files

### Browser Compatibility
- Chromium 107+ (Eagle environment)
- Modern JavaScript ES6+
- WebAssembly support required

---

## 📞 Support & Maintenance

### User Support Channels
1. **GitHub Issues**: Primary support channel for bug reports and feature requests
2. **Email Support**: leonwong282@gmail.com for direct inquiries
3. **Documentation**: Comprehensive README with troubleshooting guide

### Maintenance Commitment
- **Bug Fixes**: Critical issues addressed within 48 hours
- **Updates**: Regular updates for new Anki formats
- **Compatibility**: Ongoing Eagle version compatibility
- **Security**: Prompt response to security concerns

### Response Time
- **Critical Bugs**: Within 48 hours
- **General Issues**: Within 1 week
- **Feature Requests**: Evaluated quarterly

---

## ✅ Pre-Submission Checklist

- [x] Plugin tested on both macOS and Windows
- [x] All features working correctly
- [x] No console errors or warnings
- [x] Theme adaptation verified across all Eagle themes
- [x] Error handling tested with invalid files
- [x] Performance optimized (< 2 second parse time)
- [x] Documentation complete and accurate
- [x] Screenshots prepared showing key features
- [x] Code reviewed and clean (no obfuscation)
- [x] No external network requests
- [x] Privacy-compliant (no data collection)
- [x] Cross-platform compatibility verified
- [x] User support channels established
- [x] Version numbering follows semantic versioning
- [x] License file included (MIT)
- [x] README files complete (English + Traditional Chinese)
- [x] Build script tested and verified
- [x] .eagleplugin package created and tested

---

## 📄 Additional Notes for Reviewers

### Code Quality
- All code is readable and well-commented
- Follows JavaScript best practices
- Modular architecture with clear separation of concerns
- Comprehensive error handling throughout

### Security Considerations
- **No external network access**: All processing is local
- **Read-only operations**: Never modifies files
- **Sandboxed execution**: Runs within Eagle's secure environment
- **Standard libraries**: All dependencies are well-known, trusted packages

### Design Philosophy
- **Minimal and Clean**: Matches Eagle's native Inspector design
- **User-Centric**: Focus on clarity and ease of use
- **Performance-First**: Optimized for fast loading and parsing
- **Accessibility**: Clear labels and logical information hierarchy

### Future Roadmap
While not part of v1.0.0, planned enhancements include:
- Media preview (images/audio from deck)
- Card content preview
- Export metadata to JSON/CSV
- Enhanced statistics visualization

---

## 📝 Submission Confirmation

I, Leon Wong (leonwong282), confirm that:

1. ✅ This plugin complies with all Eagle Developer Policies
2. ✅ All information provided in this submission is accurate
3. ✅ The plugin has been thoroughly tested on supported platforms
4. ✅ I commit to providing user support through stated channels
5. ✅ I will maintain the plugin and address issues promptly
6. ✅ The plugin contains no malicious code or privacy violations
7. ✅ All third-party libraries are properly licensed and attributed
8. ✅ I understand Eagle reserves the right to make final review decisions

**Submission Date**: November 25, 2025  
**Developer**: Leon Wong  
**Contact**: leonwong282@gmail.com  
**Plugin Version**: 1.0.0

---

## 🙏 Thank You

Thank you to the Eagle team for creating such a powerful and extensible platform. I'm excited to contribute to the Eagle community with this plugin and look forward to helping users better manage their Anki learning materials within Eagle.

Special thanks to the open-source community for the excellent libraries that made this plugin possible: JSZip, sql.js, and fzstd.

---

*End of Submission Document*
