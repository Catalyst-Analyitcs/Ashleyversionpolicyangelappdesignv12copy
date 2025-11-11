# 📸 Contextual Intelligence Cards - Visual Reference Guide

**Feature**: Enhanced Data Source Cards  
**Date**: November 9, 2025  
**Status**: ✅ Implemented

---

## 🎨 Card Anatomy - Complete Breakdown

### **Front Side Layout** (90px height)

```
┌─────────────────────────────────────────────────────────────┐
│ 1️⃣ Toggle          2️⃣ Active Indicator (pulsing)          │
│ [●○]              ● ACTIVE                                  │
│                                                             │
│     3️⃣ Icon Container         4️⃣ Text Content             │
│     ┌──────┐                                                │
│     │ [☁] │      Weather Context                           │
│     └──────┘      Live conditions & forecast               │
│                                                             │
│ 5️⃣ Last Updated     6️⃣ Sync Status                        │
│ 🕐 15m ago          [✓ Synced]                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔍 Element Details

### **1️⃣ Toggle Switch** (Top-Left)

**Position**: `top: 8px, left: 8px`  
**Size**: `40px × 20px`  
**Behavior**: Click to toggle card active/inactive

```
┌──────────────────┐
│ INACTIVE STATE:  │
│ ┌────────────┐   │
│ │ ○          │   │  ← Gray background, dot on left
│ └────────────┘   │
└──────────────────┘

┌──────────────────┐
│ ACTIVE STATE:    │
│ ┌────────────┐   │
│ │          ● │   │  ← Colored glow, dot on right
│ └────────────┘   │
└──────────────────┘
```

**Colors**:
- Inactive: `rgba(255, 255, 255, 0.1)` background, `rgba(255, 255, 255, 0.4)` dot
- Active: Card color at 40% opacity background, card color dot with glow

**Animation**:
- Spring transition (stiffness: 500, damping: 30)
- Dot slides from left (x: 0) to right (x: 18px)
- Tap scale: 0.9

---

### **2️⃣ Active Indicator** (Top-Right)

**Position**: `top: 8px, right: 8px`  
**Visibility**: Only shows when toggle is ON

```
┌─────────────────────┐
│  ● ACTIVE           │
│  ↑     ↑            │
│  |     └─ Label     │
│  └─ Pulsing dot     │
└─────────────────────┘
```

**Pulsing Dot**:
- Size: `8px × 8px`
- Color: `#22C55E` (green)
- Shadow: `0 0 12px rgba(34, 197, 94, 0.8)`
- Animation: Scale 1 → 1.3 → 1 (2s infinite)

**Label**:
- Text: "ACTIVE"
- Size: `9px`
- Weight: `700`
- Color: `#22C55E`
- Transform: `uppercase`
- Letter-spacing: `0.5px`
- Text-shadow: `0 0 8px rgba(34, 197, 94, 0.4)`

---

### **3️⃣ Icon Container** (Center-Left)

**Size**: `58px × 58px`  
**Position**: Vertically centered, left side of card  
**Style**: Unchanged from original design

```
┌──────────┐
│          │
│   [☁]   │  ← Weather icon
│          │
└──────────┘
```

**Properties**:
- Border-radius: `12px` (non-custom cards) or `50%` (custom card)
- Gradient background with glassmorphism
- Hover animation: rotate + scale
- Border: 2px solid with glow

---

### **4️⃣ Text Content** (Center)

**Title**: Card name (e.g., "Weather Context")  
**Description**: Brief description (e.g., "Live conditions & forecast")  
**Style**: Unchanged from original design

```
Weather Context           ← Title (larger, bold)
Live conditions & forecast ← Description (smaller, lighter)
```

---

### **5️⃣ Last Updated Timestamp** (Bottom-Left)

**Position**: `bottom: 8px, left: 8px`  
**Always visible**: Shows on all cards

```
┌──────────────┐
│ 🕐 15m ago   │
│ ↑   ↑        │
│ |   └─ Time  │
│ └─ Clock icon│
└──────────────┘
```

**Clock Icon**:
- Size: `10px`
- Color: `rgba(255, 255, 255, 0.4)`

**Timestamp Text**:
- Size: `9px`
- Color: `rgba(255, 255, 255, 0.4)`
- Formats:
  - Less than 60s: "just now"
  - Less than 60m: "15m ago"
  - Less than 24h: "2h ago"
  - More than 24h: "3d ago"

---

### **6️⃣ Sync Status Badge** (Bottom-Right)

**Position**: `bottom: 8px, right: 8px`  
**Always visible**: Shows current sync state

```
┌─────────────────────────┐
│ SYNCED STATE:           │
│ ┌──────────┐            │
│ │ ✓ Synced │  ← Green   │
│ └──────────┘            │
└─────────────────────────┘

┌─────────────────────────┐
│ SYNCING STATE:          │
│ ┌────────────┐          │
│ │ ↻ Syncing  │  ← Blue  │
│ └────────────┘          │
│    ↑                    │
│    └─ Rotating icon     │
└─────────────────────────┘

┌─────────────────────────┐
│ ERROR STATE:            │
│ ┌──────────┐            │
│ │ ⚠ Error  │  ← Red     │
│ └──────────┘            │
└─────────────────────────┘
```

**Badge Design**:
- Padding: `4px 8px`
- Border-radius: `12px`
- Backdrop-filter: `blur(8px)`
- Icon size: `10px`
- Text size: `9px`, weight: `600`

**Color States**:

| Status | Background | Border | Icon/Text |
|--------|-----------|--------|-----------|
| Synced | `rgba(34, 197, 94, 0.2)` | `rgba(34, 197, 94, 0.4)` | `#22C55E` |
| Syncing | `rgba(59, 130, 246, 0.2)` | `rgba(59, 130, 246, 0.4)` | `#3B82F6` |
| Error | `rgba(239, 68, 68, 0.2)` | `rgba(239, 68, 68, 0.4)` | `#EF4444` |

**Icons**:
- Synced: `CheckCircle`
- Syncing: `RefreshCw` (rotating 360° every 1s)
- Error: `AlertTriangle`

---

## 🎬 Animation Timeline

### **Card Appears**
```
0.0s - Card starts off-screen (x: -30px, opacity: 0)
0.1s - Card animates in (spring animation)
0.2s - Full opacity, normal position
```

### **Toggle Interaction**
```
User clicks toggle
↓
0.0s - Scale to 0.9 (tap feedback)
0.0s - Begin spring animation
0.3s - Dot slides to new position
0.3s - Background color changes
0.3s - Active indicator appears/disappears
```

### **Active Indicator Pulse**
```
Infinite loop:
0.0s - Scale: 1.0
1.0s - Scale: 1.3
2.0s - Scale: 1.0
(Repeat)
```

### **Syncing Spinner**
```
Infinite loop:
0.0s - Rotate: 0°
1.0s - Rotate: 360°
(Repeat)
```

---

## 📏 Measurements

### **Card Dimensions**
- **Width**: 100% of container
- **Height**: 90px (front) / auto (back when flipped)
- **Border-radius**: 16px (`var(--radius-xl)`)
- **Padding**: 16px (`var(--spacing-4)`)

### **Element Spacing**
- Toggle from edges: 8px (`var(--spacing-2)`)
- Active indicator from edges: 8px
- Timestamp from edges: 8px
- Status badge from edges: 8px
- Icon to text gap: 16px (`var(--spacing-4)`)

### **Z-Index Layers**
```
200 - Flipped card (highest)
 20 - Phase 1 indicators
 10 - Main card content
  5 - Card overlays (shimmer, glow)
  0 - Background patterns
```

---

## 🎨 Color Variations by Card Type

### **Weather Card**
```
┌─────────────────────────────────────┐
│ [○] (blue)      ● ACTIVE (green)    │
│                                     │
│  [☁️] Weather Context               │
│      (Blue gradient #60a5fa)        │
│                                     │
│ 🕐 15m ago      [✓ Synced] (green)  │
└─────────────────────────────────────┘
```
- Card color: `#60a5fa` (blue)
- Gradient: Blue tones
- Toggle active: Blue glow

### **Policy Card**
```
┌─────────────────────────────────────┐
│ [○] (gold)      ● ACTIVE (green)    │
│                                     │
│  [📊] Policy Details                │
│      (Gold gradient #D4AF37)        │
│                                     │
│ 🕐 30m ago      [✓ Synced] (green)  │
└─────────────────────────────────────┘
```
- Card color: `#D4AF37` (gold)
- Gradient: Gold tones
- Toggle active: Gold glow

### **Property Card**
```
┌─────────────────────────────────────┐
│ [○] (green)     ● ACTIVE (green)    │
│                                     │
│  [🏠] Property Details              │
│      (Green gradient #34d399)       │
│                                     │
│ 🕐 1h ago       [✓ Synced] (green)  │
└─────────────────────────────────────┘
```
- Card color: `#34d399` (emerald)
- Gradient: Green tones
- Toggle active: Green glow

### **User Card**
```
┌─────────────────────────────────────┐
│ [○] (purple)    [Inactive]          │
│                                     │
│  [👤] User Details                  │
│      (Purple gradient #a78bfa)      │
│                                     │
│ 🕐 2h ago       [✓ Synced] (green)  │
└─────────────────────────────────────┘
```
- Card color: `#a78bfa` (violet)
- Gradient: Purple tones
- Toggle inactive: Gray

### **Custom Card**
```
┌─────────────────────────────────────┐
│ [○] (gold)      [Inactive]          │
│                                     │
│  [➕] Add Custom Context            │
│      (Dark gradient, dashed border) │
│                                     │
│ 🕐 just now     [✓ Synced] (green)  │
└─────────────────────────────────────┘
```
- Card color: `#D4AF37` (gold)
- Border: Dashed (2px)
- Special dotted background pattern

---

## 🖱️ Interaction States

### **Default (Idle)**
```
┌─────────────────────────────────────┐
│ [●○]            ● ACTIVE            │
│  [Icon] Card Name                   │
│         Description                 │
│ 🕐 Time         [✓ Status]          │
└─────────────────────────────────────┘
```
- No hover effects on indicators
- Subtle shadows
- Normal colors

### **Hover (Anywhere on card)**
```
┌─────────────────────────────────────┐
│ [●○]            ● ACTIVE            │
│  [Icon] Card Name    ← Slight lift  │
│  ⤴️     Description   ← Icon rotates│
│ 🕐 Time         [✓ Status]          │
└─────────────────────────────────────┘
```
- Card lifts slightly (y: -2px)
- Scale: 1.03
- Icon rotates & scales
- Holographic shimmer visible
- Glow effect appears

### **Toggle Hover**
```
┌─────────────────────────────────────┐
│ [●○] ← Cursor here                  │
│      ↑ Slightly larger              │
└─────────────────────────────────────┘
```
- Toggle appears slightly larger
- Cursor: pointer
- No card lift (propagation stopped)

### **Toggle Click**
```
┌─────────────────────────────────────┐
│ [●○] ← Scale: 0.9                   │
│      ↑ Quick scale down             │
└─────────────────────────────────────┘
```
- Instant scale to 0.9
- Spring back to 1.0
- Dot slides across
- Active indicator toggles

### **Card Click (Flip)**
```
┌─────────────────────────────────────┐
│                                     │
│     Card rotates 180° (0.6s)        │
│     Scales to 1.05                  │
│     Z-index changes to 200          │
│                                     │
└─────────────────────────────────────┘
```
- RotateY: 0° → 180°
- Scale: 1.0 → 1.05
- Duration: 0.6s
- Easing: easeInOut

---

## 📱 Responsive Behavior

### **All Screen Sizes**
- Cards stack vertically
- Full width of container
- Fixed 90px height
- Indicators maintain absolute positions
- Text doesn't wrap (ellipsis if needed)

### **Narrow Screens**
- Same layout (mobile-optimized already)
- All elements remain visible
- No horizontal scroll
- Touch targets are 40px+ (accessible)

---

## 🎯 Accessibility Considerations

### **Keyboard Navigation**
- Toggle switch should be focusable
- Enter/Space to toggle
- Tab to move between cards
- Focus ring visible

### **Screen Readers**
```
"Weather Context card.
Status: Active.
Last updated 15 minutes ago.
Synced.
Press Enter to view details or Tab to toggle active state."
```

### **ARIA Labels** (Recommended)
```tsx
<button
  aria-label={`Toggle ${card.name} data source. Currently ${isActive ? 'active' : 'inactive'}`}
  aria-pressed={isActive}
  role="switch"
>
  {/* Toggle UI */}
</button>

<div aria-label={`${card.name} last updated ${formatTimeAgo(lastUpdated)}`}>
  🕐 {formatTimeAgo(lastUpdated)}
</div>

<div 
  aria-label={`Data sync status: ${status}`}
  role="status"
  aria-live="polite"
>
  {/* Status badge */}
</div>
```

---

## 🔬 Edge Cases Handled

### **1. All Cards Inactive**
```
All toggles OFF:
- Active indicators hidden
- Sync badges still visible
- Timestamps still show
- Cards still clickable (can flip)
- No warning displayed (future: could add)
```

### **2. Syncing State**
```
Status: syncing
- Blue "Syncing..." badge
- Rotating spinner icon
- Other cards unaffected
- Can still toggle while syncing
```

### **3. Error State**
```
Status: error
- Red "Error" badge
- Warning triangle icon
- Card still functional
- User can retry (future: add retry button)
```

### **4. Very Old Data**
```
Last updated: 30 days ago
- Shows "30d ago"
- No visual warning (future: could add yellow indicator)
- Sync status independent of age
```

### **5. Rapid Toggling**
```
User clicks toggle rapidly:
- Spring animation completes each time
- State updates correctly
- No animation glitches
- Smooth transitions
```

---

## ✅ Implementation Checklist

- [x] Toggle switch renders correctly
- [x] Active indicator shows/hides on toggle
- [x] Pulsing animation is smooth
- [x] Last updated timestamp formats correctly
- [x] Sync status badge shows correct state
- [x] Rotating spinner for syncing state
- [x] All 5 card types work identically
- [x] No interference with flip card functionality
- [x] Z-index layering correct
- [x] Colors match design specs
- [x] Animations are 60fps
- [x] Click events don't propagate incorrectly
- [x] Custom card (dashed border) works
- [x] Flipped state maintains indicators on front

---

**Visual Reference Guide Complete** ✅  
**Date**: November 9, 2025  
**Ready for Development Team Handoff** ✅
