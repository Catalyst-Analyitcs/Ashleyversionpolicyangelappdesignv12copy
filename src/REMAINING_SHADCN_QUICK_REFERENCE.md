# 🚀 REMAINING SHADCN COMPONENTS - NATIVEWIND QUICK UPDATE REFERENCE

**PolicyAngel - React Native with NativeWind**  
**For Remaining 12 Shadcn UI Components**

---

## 📋 COMPLETED SHADCN (3/15)

✅ button.tsx  
✅ card.tsx  
✅ dialog.tsx

---

## 🔄 REMAINING SHADCN (12/15)

All follow similar patterns - here's what to add to each:

---

### 1. **sheet.tsx** - Bottom Sheet/Side Sheet

**NativeWind Header:**
```tsx
/**
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ✅ KEEP AS-IS (90% of styles): All Tailwind classes work!
 * ❌ CONVERT ONLY THESE:
 *    - @radix-ui/react-dialog → @gorhom/bottom-sheet or Modal
 *    - div → View
 *    - Side positioning → Use react-native-modal with slide animation
 */
```

**Key Pattern:**
- Use `@gorhom/bottom-sheet` for bottom sheets
- Use `react-native-modal` for side sheets
- All Tailwind classes preserved
- Slide animations built-in

---

### 2. **popover.tsx** - Floating Popover

**NativeWind Header:**
```tsx
/**
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ✅ KEEP AS-IS (85% of styles): All Tailwind classes work!
 * ❌ CONVERT ONLY THESE:
 *    - @radix-ui/react-popover → Modal with positioning
 *    - Positioning → Absolute/relative with calculated position
 */
```

**Key Pattern:**
- Use Modal with transparent backdrop
- Calculate position relative to trigger
- All Tailwind utilities work

---

### 3. **dropdown-menu.tsx** - Dropdown Menu

**NativeWind Header:**
```tsx
/**
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ✅ KEEP AS-IS (90% of styles): All Tailwind classes work!
 * ❌ CONVERT ONLY THESE:
 *    - @radix-ui/react-dropdown-menu → Modal or ActionSheet
 *    - hover: → Pressable ({ pressed })
 */
```

**Key Pattern:**
- Use Modal or `@react-native-menu/menu`
- Pressable for menu items
- All spacing/colors preserved

---

### 4. **context-menu.tsx** - Context Menu (Long Press)

**NativeWind Header:**
```tsx
/**
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ✅ KEEP AS-IS (90% of styles): All Tailwind classes work!
 * ❌ CONVERT ONLY THESE:
 *    - Right-click → onLongPress
 *    - @radix-ui → Modal with ActionSheet style
 */
```

**Key Pattern:**
- Trigger on `onLongPress`
- Modal with menu items
- Haptic feedback on long press

---

### 5. **hover-card.tsx** - Hover Preview

**NativeWind Header:**
```tsx
/**
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ✅ KEEP AS-IS (85% of styles): All Tailwind classes work!
 * ❌ CONVERT ONLY THESE:
 *    - No hover on mobile → use onPressIn/onPressOut or always show
 */
```

**Key Pattern:**
- Convert to tap-to-show or always visible
- Or use `onPressIn` for show, `onPressOut` for hide
- All Tailwind preserved

---

### 6. **navigation-menu.tsx** - Navigation Menu

**NativeWind Header:**
```tsx
/**
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ✅ KEEP AS-IS (90% of styles): All Tailwind classes work!
 * ❌ CONVERT ONLY THESE:
 *    - hover: → Pressable ({ pressed })
 *    - Use @react-navigation for routing
 */
```

**Key Pattern:**
- Pressable for nav items
- Active state via navigation state
- All layout/colors work

---

### 7. **menubar.tsx** - Menu Bar

**NativeWind Header:**
```tsx
/**
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ✅ KEEP AS-IS (90% of styles): All Tailwind classes work!
 * ❌ CONVERT ONLY THESE:
 *    - Desktop menubar → Mobile-friendly menu
 *    - hover: → Pressable states
 */
```

**Key Pattern:**
- Convert to drawer or bottom nav
- Pressable for items
- All styling preserved

---

### 8. **tabs.tsx** - Tabs Component

**NativeWind Header:**
```tsx
/**
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ✅ KEEP AS-IS (95% of styles): All Tailwind classes work!
 * ❌ CONVERT ONLY THESE:
 *    - @radix-ui/react-tabs → @react-navigation/material-top-tabs or custom
 *    - Active state styles preserved with className conditionals
 */
```

**Key Pattern:**
- Use `@react-navigation/material-top-tabs`
- Or custom Pressable tabs
- All tab styling with className
- Active state: `${isActive ? 'bg-pa-gold' : 'bg-transparent'}`

---

### 9. **toggle.tsx** - Toggle Button

**NativeWind Header:**
```tsx
/**
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ✅ KEEP AS-IS (95% of styles): All Tailwind classes work!
 * ❌ CONVERT ONLY THESE:
 *    - button → Pressable
 *    - data-state="on" → isPressed state
 */
```

**Key Pattern:**
```tsx
<Pressable
  onPress={() => setPressed(!pressed)}
  className={`p-2 rounded ${pressed ? 'bg-pa-gold' : 'bg-transparent'}`}
>
```

---

### 10. **toggle-group.tsx** - Toggle Group

**NativeWind Header:**
```tsx
/**
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ✅ KEEP AS-IS (95% of styles): All Tailwind classes work!
 * ❌ CONVERT ONLY THESE:
 *    - Group state management
 *    - Multiple Pressable with shared state
 */
```

**Key Pattern:**
- Array of Pressable components
- Shared state for active item
- All classes work

---

### 11. **checkbox.tsx** - Checkbox

**NativeWind Header:**
```tsx
/**
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ✅ KEEP AS-IS (90% of styles): All Tailwind classes work!
 * ❌ CONVERT ONLY THESE:
 *    - input[type="checkbox"] → Pressable + state
 *    - Checkmark with conditional rendering
 */
```

**Key Pattern:**
```tsx
const [checked, setChecked] = useState(false);

<Pressable
  onPress={() => setChecked(!checked)}
  className={`w-6 h-6 rounded border ${checked ? 'bg-pa-gold border-pa-gold' : 'border-white/20'}`}
>
  {checked && <Check size={16} color="#000" />}
</Pressable>
```

---

### 12. **switch.tsx** - Switch/Toggle

**NativeWind Header:**
```tsx
/**
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ✅ KEEP AS-IS (85% of styles): All Tailwind classes work!
 * ❌ CONVERT ONLY THESE:
 *    - Use React Native Switch component or custom Pressable
 *    - Animated thumb slide
 */
```

**Key Pattern:**
```tsx
import { Switch as RNSwitch } from 'react-native';

<View className="flex-row items-center gap-2">
  <RNSwitch
    value={enabled}
    onValueChange={setEnabled}
    trackColor={{ false: '#3e3e3e', true: '#C4A962' }}
    thumbColor={enabled ? '#000000' : '#f4f3f4'}
  />
  <Text className="text-white">Enable feature</Text>
</View>
```

---

### 13. **radio-group.tsx** - Radio Group

**NativeWind Header:**
```tsx
/**
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ✅ KEEP AS-IS (90% of styles): All Tailwind classes work!
 * ❌ CONVERT ONLY THESE:
 *    - input[type="radio"] → Pressable + state
 *    - Group state management
 */
```

**Key Pattern:**
```tsx
const [selected, setSelected] = useState('option1');

{options.map((option) => (
  <Pressable
    key={option.value}
    onPress={() => setSelected(option.value)}
    className="flex-row items-center gap-2 p-2"
  >
    <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${selected === option.value ? 'border-pa-gold' : 'border-white/20'}`}>
      {selected === option.value && (
        <View className="w-3 h-3 rounded-full bg-pa-gold" />
      )}
    </View>
    <Text className="text-white">{option.label}</Text>
  </Pressable>
))}
```

---

## 🎯 UNIVERSAL NATIVEWIND HEADER TEMPLATE

For all remaining components, add this at the top:

```tsx
/**
 * ==============================================================================
 * [FILENAME].TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: [Component description]
 * 
 * ==============================================================================
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ==============================================================================
 * 
 * GREAT NEWS: Using NativeWind means this component is MUCH easier to convert!
 * 
 * ✅ KEEP AS-IS (85-95% of styles):
 *    - All Tailwind utility classes work!
 *    - Layout: flex, items-center, justify-between
 *    - Spacing: p-*, m-*, gap-*
 *    - Colors: bg-*, text-*, border-*
 *    - Borders: rounded-*, border
 *    - Sizing: w-*, h-*
 * 
 * ❌ CONVERT ONLY THESE:
 *    - [Specific HTML elements] → [RN components]
 *    - Remove hover:, focus:, active: pseudo-classes
 *    - Use Pressable with className function for states
 *    - [Component-specific conversions]
 * 
 * ==============================================================================
 * NATIVEWIND CONVERSION - [PATTERN NAME]
 * ==============================================================================
 * 
 * BEFORE (Web):
 * ```tsx
 * [Web code example]
 * ```
 * 
 * AFTER (React Native + NativeWind):
 * ```tsx
 * [RN code with NativeWind - ALL CLASSES PRESERVED]
 * ```
 * 
 * KEY POINTS:
 * - ✅ All [X]% of Tailwind classes work as-is!
 * - ❌ [Specific conversion]
 * - ✅ All other utilities preserved!
 * 
 * ==============================================================================
 * COMPLETE NATIVEWIND EXAMPLE
 * ==============================================================================
 * 
 * ```tsx
 * [Full working example with imports, usage, etc.]
 * ```
 * 
 * ==============================================================================
 * REQUIRED PACKAGES
 * ==============================================================================
 * 
 * ```bash
 * npm install nativewind
 * [Component-specific packages]
 * ```
 * 
 * ==============================================================================
 * SETUP: See /NATIVEWIND_CONVERSION_GUIDE.md
 * ==============================================================================
 * 
 * ==============================================================================
 * LEGACY DETAILED ANNOTATIONS (Pre-NativeWind)
 * ==============================================================================
 * 
 * [Keep existing annotations here]
 * 
 * ==============================================================================
 */
```

---

## 📦 COMMON PACKAGES FOR SHADCN COMPONENTS

```bash
# All components
npm install nativewind

# Modal-based (dialog, sheet, popover, dropdown, context)
npm install @gorhom/bottom-sheet
npm install react-native-modal

# Navigation (tabs, navigation-menu)
npm install @react-navigation/material-top-tabs

# Form controls (all work with just Pressable + state)
# No additional packages needed

# Icons
npm install lucide-react-native
```

---

## ✅ UPDATE CHECKLIST

For each of the 12 remaining components:

- [ ] Read existing file
- [ ] Add NativeWind header at top (use template above)
- [ ] Emphasize 85-95% className preservation
- [ ] Show BEFORE/AFTER with classes preserved
- [ ] Include complete working example
- [ ] List required packages
- [ ] Reference main guide
- [ ] Keep legacy annotations
- [ ] Avoid JSX comments in examples (use //)

---

## 🎯 ESTIMATED COMPLETION

- **Per component:** 5-7 minutes
- **Total for 12 components:** ~1 hour
- **Quality:** High - following established pattern

---

*Use this as a quick reference to batch update the remaining 12 shadcn components efficiently.*
