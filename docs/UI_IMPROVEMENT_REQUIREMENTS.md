# Eagle Anki Metadata Inspector - UI Improvement Requirements

**Version:** 2.0  
**Date:** November 24, 2025  
**Status:** Draft  
**Purpose:** Align UI with Eagle's native Inspector display style

---

## 1. Executive Summary

### 1.1 Current State
The current UI uses a custom card-based design with:
- Bordered sections with rounded corners
- Collapsible panels with emoji icons
- Grid-based statistics layout
- Badge-style metadata display

### 1.2 Target State
Align with Eagle's native Inspector panel style:
- Flat, borderless design
- Inline label-value pairs
- Minimal visual noise
- Consistent spacing and typography
- Native-feeling interactions

### 1.3 Key Principles
Based on Eagle Inspector example code and design patterns:
1. **Minimal Chrome** - No heavy borders or backgrounds
2. **Compact Layout** - Maximize information density
3. **Label-Value Pairs** - Simple inline property display
4. **Subtle Separators** - Thin lines or spacing instead of boxes
5. **Native Typography** - 11px system font, consistent with Eagle UI

---

## 2. Design Analysis

### 2.1 Eagle Native Inspector Style

From the Eagle Inspector documentation example:
```css
html {
    font-size: 11px;
    font-family: sans-serif;
    border-radius: 6px;
    overflow: hidden;
}

body {
    padding: 0;
    margin: 0;
}
```

**Key Observations:**
- Very minimal base styling
- 11px font size (compact)
- System sans-serif font
- 6px border-radius on container
- No padding on body (content fills edge-to-edge)

### 2.2 Current Design Issues

| Issue | Current | Eagle Style |
|-------|---------|-------------|
| Section containers | Bordered boxes with backgrounds | Flat, no borders |
| Section headers | Clickable bars with hover states | Simple text labels |
| Icons | Emoji (📚 📝 🏷️ 📊) | None or minimal SVG |
| Typography | Mixed sizes (10-13px) | Consistent 11px |
| Spacing | Heavy padding (10-12px) | Tighter (6-8px) |
| Badges | Pill-shaped colored badges | Inline text or subtle labels |
| Collapsible sections | Accordion with arrows | Simple expand/collapse or always visible |

### 2.3 Reference: Eagle's Native Inspector Elements

Eagle's built-in inspector shows file properties like:
```
Dimensions    1920 × 1080
File Size     2.4 MB
Created       2024-01-15
Modified      2024-01-20
```

**Pattern:** `Label` (muted) + `Value` (normal) on same line

---

## 3. UI Requirements

### 3.1 Layout Structure

**REQ-UI-1:** Use flat, property-list style layout
```
┌─────────────────────────────────────┐
│ Deck Name                           │  <- Header (bold, larger)
│ 2.4 MB • Schema v11                 │  <- Subtitle (muted)
├─────────────────────────────────────┤
│ Deck Summary                    [▼] │  <- Section header
│                                     │
│ Deck Name         Chinese Vocab     │  <- Property row
│ Total Cards       1,234             │
│ New               456               │
│ Learning          78                │
│ Review            700               │
├─────────────────────────────────────┤
│ Note Types                      [▼] │
│                                     │
│ Basic             234 notes         │
│ Cloze             100 notes         │
├─────────────────────────────────────┤
│ Tags                            [▼] │
│                                     │
│ vocabulary grammar chinese...       │
├─────────────────────────────────────┤
│ Statistics                      [▼] │
│                                     │
│ Total Notes       334               │
│ Created           2024-01-15        │
│ Modified          2024-01-20        │
└─────────────────────────────────────┘
```

### 3.2 Typography

**REQ-UI-2:** Font specifications
| Element | Size | Weight | Color |
|---------|------|--------|-------|
| Header title | 12px | 600 (semibold) | Primary text |
| Header subtitle | 10px | 400 | Muted text (60% opacity) |
| Section title | 11px | 600 | Primary text |
| Property label | 11px | 400 | Muted text (60% opacity) |
| Property value | 11px | 500 | Primary text |
| Tag text | 10px | 400 | Primary text |

**REQ-UI-3:** Font family
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

### 3.3 Spacing

**REQ-UI-4:** Spacing specifications
| Element | Spacing |
|---------|---------|
| Container padding | 10px |
| Section gap | 12px |
| Section header padding | 6px 0 |
| Property row height | 22px |
| Property row gap | 2px |
| Tag gap | 4px |

### 3.4 Colors

**REQ-UI-5:** Color variables (already implemented, keep consistent)
```css
/* Light themes */
--text-primary: #333333;
--text-muted: rgba(51, 51, 51, 0.6);
--separator: #E5E5E5;
--accent: #007AFF;

/* Dark themes */
--text-primary: #E0E0E0;
--text-muted: rgba(224, 224, 224, 0.6);
--separator: #3C3C3C;
--accent: #0A84FF;
```

### 3.5 Section Headers

**REQ-UI-6:** Section header style
- Remove emoji icons
- Use plain text section titles
- Add subtle chevron for collapse indicator
- No background color
- Bottom border separator only

```
Before: 📚 Deck Summary (3)     ▼
After:  Deck Summary            ▾
```

**REQ-UI-7:** Collapse/expand behavior
- Click anywhere on header row to toggle
- Use subtle chevron (▾/▸) instead of arrow (▼)
- Smooth height transition (optional)

### 3.6 Property Rows

**REQ-UI-8:** Property row layout
```html
<div class="property-row">
    <span class="property-label">Total Cards</span>
    <span class="property-value">1,234</span>
</div>
```

```css
.property-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 22px;
    padding: 0;
}

.property-label {
    color: var(--text-muted);
}

.property-value {
    color: var(--text-primary);
    font-weight: 500;
}
```

### 3.7 Card Count Colors

**REQ-UI-9:** Keep semantic colors for card states
| State | Light Theme | Dark Theme |
|-------|-------------|------------|
| New | #34C759 | #30D158 |
| Learning | #FF9500 | #FF9F0A |
| Review | #007AFF | #0A84FF |

Apply to property values only, not labels.

### 3.8 Tags Display

**REQ-UI-10:** Tag display options

**Option A: Inline flow (Recommended)**
```
vocabulary, grammar, chinese, hsk1, beginner...
```
- Comma-separated text
- Truncate with "..." if too long
- Show count: "and 15 more"

**Option B: Pill tags (Current - may keep but simplify)**
```css
.tag {
    display: inline-block;
    padding: 2px 6px;
    background: var(--hover-bg);
    border-radius: 3px;
    font-size: 10px;
    margin: 2px;
}
```
- Remove border
- Smaller border-radius (3px instead of 12px)
- Tighter padding

### 3.9 Statistics Section

**REQ-UI-11:** Statistics as property rows
```
Total Notes        334
Total Cards        1,234
Created            Jan 15, 2024
Modified           Nov 24, 2024
Avg. Ease          250%
```
- Remove grid layout
- Use standard property rows
- Keep card distribution as separate sub-section if needed

### 3.10 Header Redesign

**REQ-UI-12:** Simplified header
```
Before:
┌─────────────────────────────────────┐
│ Chinese_Vocabulary.apkg             │
│ [2.4 MB] [Schema v11] [Modified:...]│
└─────────────────────────────────────┘

After:
Chinese Vocabulary                     <- Bold, 12px
2.4 MB • Schema v11 • Nov 24, 2024    <- Muted, 10px, single line
─────────────────────────────────────  <- Subtle separator
```

### 3.11 Deck Items in Summary

**REQ-UI-13:** Deck item display (when multiple decks)
```
Before:
┌─────────────────────────────────────┐
│ Chinese Vocab 🔄                    │
│ Description text here...            │
│ New: 456  Learning: 78  Review: 700 │
└─────────────────────────────────────┘

After:
Chinese Vocab                    Dynamic
  New           456
  Learning      78
  Review        700
  Total         1,234
```
- Deck name as sub-header
- "Dynamic" label instead of emoji
- Indented properties

### 3.12 Remove Visual Elements

**REQ-UI-14:** Elements to remove or simplify
- [ ] Remove emoji icons from section headers
- [ ] Remove colored badge backgrounds
- [ ] Remove section border boxes
- [ ] Remove hover background on section headers
- [ ] Simplify collapse arrow to chevron
- [ ] Remove grid layout for statistics

### 3.13 Keep Visual Elements

**REQ-UI-15:** Elements to preserve
- [x] Semantic colors for card states (New/Learning/Review)
- [x] Loading spinner
- [x] Error message styling
- [x] Scrollbar styling
- [x] Theme-aware colors

---

## 4. Component Specifications

### 4.1 Container

```css
.container {
    padding: 10px;
    max-height: 350px;
    overflow-y: auto;
}
```

### 4.2 Header

```css
.header {
    margin-bottom: 10px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--separator);
}

.header-title {
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 2px;
    word-break: break-word;
}

.header-subtitle {
    font-size: 10px;
    color: var(--text-muted);
}
```

### 4.3 Section

```css
.section {
    margin-bottom: 10px;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 0;
    cursor: pointer;
    border-bottom: 1px solid var(--separator);
}

.section-title {
    font-size: 11px;
    font-weight: 600;
}

.section-chevron {
    font-size: 10px;
    color: var(--text-muted);
    transition: transform 0.2s;
}

.section.collapsed .section-chevron {
    transform: rotate(-90deg);
}

.section-content {
    padding-top: 6px;
}

.section.collapsed .section-content {
    display: none;
}
```

### 4.4 Property Row

```css
.property-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 22px;
    padding: 1px 0;
}

.property-label {
    font-size: 11px;
    color: var(--text-muted);
}

.property-value {
    font-size: 11px;
    font-weight: 500;
    color: var(--text-primary);
}

/* Indented property (for sub-items) */
.property-row.indented {
    padding-left: 12px;
}
```

### 4.5 Deck Item

```css
.deck-item {
    margin-bottom: 8px;
}

.deck-item:last-child {
    margin-bottom: 0;
}

.deck-name {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 11px;
    font-weight: 600;
    margin-bottom: 4px;
}

.deck-badge {
    font-size: 9px;
    font-weight: 400;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}
```

### 4.6 Tags

```css
.tags-list {
    font-size: 10px;
    line-height: 1.6;
    color: var(--text-primary);
}

.tags-list .tag {
    display: inline;
}

.tags-list .tag:not(:last-child)::after {
    content: ", ";
    color: var(--text-muted);
}

.tags-more {
    color: var(--text-muted);
    font-style: italic;
}
```

---

## 5. Implementation Plan

### 5.1 Phase 1: CSS Refactor
1. Create new CSS variables for text colors
2. Simplify section styling (remove borders/backgrounds)
3. Implement property-row component
4. Update header styling
5. Simplify tag display

### 5.2 Phase 2: HTML Structure Update
1. Update section headers (remove emoji, add chevron)
2. Convert statistics grid to property rows
3. Restructure deck items
4. Update tag rendering

### 5.3 Phase 3: Polish
1. Add subtle transitions
2. Fine-tune spacing
3. Test all themes
4. Verify scrollbar styling

---

## 6. Visual Mockups

### 6.1 Light Theme (LIGHT / LIGHTGRAY)

```
┌─────────────────────────────────────────┐
│ Chinese Vocabulary                      │
│ 2.4 MB • Schema v11 • Nov 24, 2024     │
│─────────────────────────────────────────│
│ Deck Summary                          ▾ │
│─────────────────────────────────────────│
│ Chinese Vocab                    Dynamic│
│   New               456                 │
│   Learning          78                  │
│   Review            700                 │
│   Total             1,234               │
│                                         │
│ HSK Level 1                             │
│   New               100                 │
│   Learning          20                  │
│   Review            380                 │
│   Total             500                 │
│─────────────────────────────────────────│
│ Note Types                            ▾ │
│─────────────────────────────────────────│
│ Basic                        234 notes  │
│   2 fields • 1 template                 │
│ Cloze                        100 notes  │
│   1 field • 1 template                  │
│─────────────────────────────────────────│
│ Tags                                  ▾ │
│─────────────────────────────────────────│
│ vocabulary, grammar, chinese, hsk1,     │
│ beginner, lesson1, lesson2 and 8 more   │
│─────────────────────────────────────────│
│ Statistics                            ▾ │
│─────────────────────────────────────────│
│ Total Notes         334                 │
│ Total Cards         1,734               │
│ Created             Jan 15, 2024        │
│ Avg. Ease           250%                │
└─────────────────────────────────────────┘
```

### 6.2 Dark Theme (DARK / GRAY / BLUE / PURPLE)

Same layout, different colors:
- Background: Theme-specific dark
- Text: Light (#E0E0E0)
- Muted: 60% opacity
- Separators: Theme-specific border color
- Card colors: Bright variants (30D158, FF9F0A, 0A84FF)

---

## 7. Accessibility Considerations

### 7.1 Contrast Ratios
- Ensure text meets WCAG AA standards (4.5:1 for normal text)
- Muted text should still be readable (3:1 minimum)

### 7.2 Interactive Elements
- Section headers should have visible focus states
- Keyboard navigation support for collapse/expand

### 7.3 Screen Reader
- Use semantic HTML (headings for sections)
- ARIA labels for interactive elements

---

## 8. Testing Checklist

### 8.1 Visual Testing
- [ ] All 6 Eagle themes render correctly
- [ ] AUTO theme responds to system preference
- [ ] Text is readable in all themes
- [ ] Separators are visible but subtle
- [ ] Card state colors are distinguishable

### 8.2 Functional Testing
- [ ] Sections collapse/expand correctly
- [ ] Long deck names wrap properly
- [ ] Long tag lists truncate gracefully
- [ ] Scrolling works smoothly
- [ ] Loading state displays correctly
- [ ] Error state displays correctly

### 8.3 Edge Cases
- [ ] Deck with no tags
- [ ] Deck with 50+ tags
- [ ] Deck with very long name
- [ ] Deck with no description
- [ ] Single deck vs multiple decks
- [ ] Very small file (<1KB)
- [ ] Large file (>100MB)

---

## 9. Success Criteria

### 9.1 Visual Alignment
- UI feels native to Eagle application
- No jarring visual differences from built-in inspectors
- Clean, minimal appearance

### 9.2 Information Density
- More information visible without scrolling
- Compact but readable

### 9.3 User Feedback
- Users report UI feels "integrated" with Eagle
- No complaints about readability or usability

---

## 10. Appendix

### 10.1 Current vs Proposed Comparison

| Aspect | Current | Proposed |
|--------|---------|----------|
| Section style | Bordered cards | Flat with separators |
| Icons | Emoji (📚📝🏷️📊) | None |
| Collapse indicator | Arrow (▼) | Chevron (▾) |
| Typography | 10-13px mixed | 10-12px consistent |
| Property display | Grid/cards | Inline rows |
| Tags | Pill badges | Comma-separated or minimal pills |
| Spacing | Heavy (10-12px) | Compact (6-8px) |
| Backgrounds | Colored sections | Transparent |

### 10.2 CSS File Size Estimate
- Current: ~300 lines
- Proposed: ~200 lines (30% reduction)

### 10.3 Related Files
- `index.html` - HTML structure changes
- `styles/inspector.css` - CSS refactor
- No changes needed to `lib/anki-parser.js`

---

**Document Status:** Ready for Implementation  
**Estimated Effort:** 2-4 hours  
**Priority:** Medium (UI polish)
