# BATCH UPDATE - Remaining Files Header Templates

## For toggle.tsx, toggle-group.tsx, tabs.tsx, sheet.tsx, popover.tsx, dropdown-menu.tsx, context-menu.tsx, hover-card.tsx, navigation-menu.tsx, menubar.tsx

Each file should have this header prepended (customized per component):

---

### toggle.tsx Header:
```tsx
/**
 * ==============================================================================
 * TOGGLE.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Toggle button with pressed/unpressed state.
 * 
 * ==============================================================================
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ==============================================================================
 * 
 * GREAT NEWS: Using NativeWind means toggle is MUCH easier!
 * 
 * ✅ KEEP AS-IS (95% of styles):
 *    - All Tailwind utility classes work!
 *    - Layout: flex, items-center, justify-center
 *    - Spacing: p-2, gap-2
 *    - Colors: bg-pa-gold, text-white
 *    - Borders: rounded-lg, border
 * 
 * ❌ CONVERT ONLY THESE:
 *    - button → Pressable
 *    - data-state="on" → boolean pressed state
 *    - Add haptic feedback
 * 
 * ==============================================================================
 * NATIVEWIND CONVERSION - TOGGLE
 * ==============================================================================
 * 
 * ```tsx
 * import { Pressable, Text } from 'react-native';
 * import * as Haptics from 'expo-haptics';
 * 
 * const [pressed, setPressed] = useState(false);
 * 
 * <Pressable
 *   onPress={() => {
 *     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
 *     setPressed(!pressed);
 *   }}
 *   className={`
 *     p-2 rounded-lg
 *     ${pressed ? 'bg-pa-gold' : 'bg-transparent border border-white/20'}
 *   `}
 * >
 *   <Text className={pressed ? 'text-pa-dark' : 'text-white'}>Toggle</Text>
 * </Pressable>
 * ```
 * 
 * ==============================================================================
 * SETUP: See /NATIVEWIND_CONVERSION_GUIDE.md
 * ==============================================================================
 */
```

---

### tabs.tsx Header:
```tsx
/**
 * ==============================================================================
 * TABS.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Tab navigation component.
 * 
 * ==============================================================================
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ==============================================================================
 * 
 * GREAT NEWS: Use @react-navigation/material-top-tabs or custom with NativeWind!
 * 
 * ✅ KEEP AS-IS (95% of styles):
 *    - All Tailwind utility classes work!
 *    - Active state via className conditionals
 * 
 * ❌ CONVERT ONLY THESE:
 *    - Use @react-navigation/material-top-tabs (recommended)
 *    - Or custom Pressable tabs with state
 * 
 * ==============================================================================
 * NATIVEWIND CONVERSION - TABS
 * ==============================================================================
 * 
 * ```tsx
 * import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
 * 
 * const Tab = createMaterialTopTabNavigator();
 * 
 * <Tab.Navigator
 *   screenOptions={{
 *     tabBarStyle: { backgroundColor: '#000000' },
 *     tabBarActiveTintColor: '#C4A962',
 *     tabBarInactiveTintColor: '#ffffff',
 *   }}
 * >
 *   <Tab.Screen name="Tab1" component={Screen1} />
 *   <Tab.Screen name="Tab2" component={Screen2} />
 * </Tab.Navigator>
 * 
 * // Or custom:
 * const [activeTab, setActiveTab] = useState('tab1');
 * 
 * <View className="flex-row border-b border-white/10">
 *   {tabs.map((tab) => (
 *     <Pressable
 *       key={tab.id}
 *       onPress={() => setActiveTab(tab.id)}
 *       className={`flex-1 p-4 ${activeTab === tab.id ? 'border-b-2 border-pa-gold' : ''}`}
 *     >
 *       <Text className={activeTab === tab.id ? 'text-pa-gold' : 'text-white'}>
 *         {tab.label}
 *       </Text>
 *     </Pressable>
 *   ))}
 * </View>
 * ```
 * 
 * ==============================================================================
 * SETUP: See /NATIVEWIND_CONVERSION_GUIDE.md
 * ==============================================================================
 */
```

---

### sheet.tsx Header:
```tsx
/**
 * ==============================================================================
 * SHEET.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Bottom sheet or side sheet overlay.
 * 
 * ==============================================================================
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ==============================================================================
 * 
 * GREAT NEWS: Use @gorhom/bottom-sheet with NativeWind!
 * 
 * ✅ KEEP AS-IS (90% of styles):
 *    - All Tailwind utility classes work!
 *    - Layout, spacing, colors all preserved
 * 
 * ❌ CONVERT ONLY THESE:
 *    - Use @gorhom/bottom-sheet for bottom sheets
 *    - Use Modal with slide animation for side sheets
 * 
 * ==============================================================================
 * NATIVEWIND CONVERSION - BOTTOM SHEET
 * ==============================================================================
 * 
 * ```tsx
 * import BottomSheet from '@gorhom/bottom-sheet';
 * 
 * <BottomSheet
 *   snapPoints={['25%', '50%', '90%']}
 *   enablePanDownToClose
 *   backgroundStyle={{ backgroundColor: '#000000' }}
 * >
 *   <View className="p-6">
 *     <Text className="text-white text-xl font-bold mb-4">Sheet Title</Text>
 *     {/* Content with all Tailwind classes */}
 *   </View>
 * </BottomSheet>
 * ```
 * 
 * ==============================================================================
 * SETUP: See /NATIVEWIND_CONVERSION_GUIDE.md
 * ==============================================================================
 */
```

---

### popover.tsx / dropdown-menu.tsx / context-menu.tsx Headers:

(All three are similar - Modal-based with positioning)

```tsx
/**
 * ==============================================================================
 * [POPOVER|DROPDOWN-MENU|CONTEXT-MENU].TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: [Floating popover | Dropdown menu | Context menu].
 * 
 * ==============================================================================
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ==============================================================================
 * 
 * GREAT NEWS: Use Modal with NativeWind!
 * 
 * ✅ KEEP AS-IS (90% of styles):
 *    - All Tailwind utility classes work!
 *    - Menu item Pressable with all classes preserved
 * 
 * ❌ CONVERT ONLY THESE:
 *    - Use Modal with transparent backdrop
 *    - Calculate position or use ActionSheet
 *    - [Context menu: trigger with onLongPress]
 * 
 * ==============================================================================
 * NATIVEWIND CONVERSION
 * ==============================================================================
 * 
 * ```tsx
 * import { Modal, Pressable, View, Text } from 'react-native';
 * 
 * <Modal visible={open} transparent onRequestClose={close}>
 *   <Pressable
 *     className="flex-1 bg-black/50 items-center justify-center"
 *     onPress={close}
 *   >
 *     <View className="bg-pa-dark rounded-xl p-2 border border-white/10">
 *       {items.map((item) => (
 *         <Pressable
 *           key={item.id}
 *           onPress={item.onPress}
 *           className="flex-row items-center gap-3 p-3 rounded-lg"
 *         >
 *           <item.icon size={20} color="#ffffff" />
 *           <Text className="text-white">{item.label}</Text>
 *         </Pressable>
 *       ))}
 *     </View>
 *   </Pressable>
 * </Modal>
 * ```
 * 
 * ==============================================================================
 * SETUP: See /NATIVEWIND_CONVERSION_GUIDE.md
 * ==============================================================================
 */
```

---

### hover-card.tsx Header:
```tsx
/**
 * ==============================================================================
 * HOVER-CARD.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Preview card on hover (mobile: convert to tap or always show).
 * 
 * ==============================================================================
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ==============================================================================
 * 
 * GREAT NEWS: NativeWind makes this easy!
 * 
 * ✅ KEEP AS-IS (90% of styles):
 *    - All Tailwind utility classes work!
 * 
 * ❌ CONVERT ONLY THESE:
 *    - No hover on mobile → use onPressIn/onPressOut
 *    - Or make always visible
 *    - Or use Modal triggered by tap
 * 
 * ==============================================================================
 * NATIVEWIND CONVERSION
 * ==============================================================================
 * 
 * ```tsx
 * const [visible, setVisible] = useState(false);
 * 
 * <Pressable
 *   onPressIn={() => setVisible(true)}
 *   onPressOut={() => setVisible(false)}
 * >
 *   <Text>Trigger</Text>
 * </Pressable>
 * 
 * {visible && (
 *   <View className="absolute bg-pa-dark rounded-xl p-4 border border-white/10">
 *     {/* Preview content with all Tailwind classes */}
 *   </View>
 * )}
 * ```
 * 
 * ==============================================================================
 * SETUP: See /NATIVEWIND_CONVERSION_GUIDE.md
 * ==============================================================================
 */
```

---

### navigation-menu.tsx / menubar.tsx Headers:

```tsx
/**
 * ==============================================================================
 * [NAVIGATION-MENU|MENUBAR].TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: [Navigation menu | Menu bar].
 * 
 * ==============================================================================
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ==============================================================================
 * 
 * GREAT NEWS: NativeWind + @react-navigation!
 * 
 * ✅ KEEP AS-IS (90% of styles):
 *    - All Tailwind utility classes work!
 *    - Active state via navigation state
 * 
 * ❌ CONVERT ONLY THESE:
 *    - Use @react-navigation for routing
 *    - Pressable for menu items
 *    - Remove hover:, use ({ pressed })
 * 
 * ==============================================================================
 * NATIVEWIND CONVERSION
 * ==============================================================================
 * 
 * ```tsx
 * import { useNavigation, useRoute } from '@react-navigation/native';
 * 
 * const navigation = useNavigation();
 * const route = useRoute();
 * 
 * {menuItems.map((item) => (
 *   <Pressable
 *     key={item.name}
 *     onPress={() => navigation.navigate(item.name)}
 *     className={`
 *       flex-row items-center gap-2 p-3 rounded-lg
 *       ${route.name === item.name ? 'bg-pa-gold' : 'bg-transparent'}
 *     `}
 *   >
 *     <item.icon size={20} />
 *     <Text>{item.label}</Text>
 *   </Pressable>
 * ))}
 * ```
 * 
 * ==============================================================================
 * SETUP: See /NATIVEWIND_CONVERSION_GUIDE.md
 * ==============================================================================
 */
```

---

### toggle-group.tsx Header:
```tsx
/**
 * ==============================================================================
 * TOGGLE-GROUP.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Group of toggle buttons with shared state.
 * 
 * ==============================================================================
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ==============================================================================
 * 
 * GREAT NEWS: NativeWind makes toggle groups easy!
 * 
 * ✅ KEEP AS-IS (95% of styles):
 *    - All Tailwind utility classes work!
 * 
 * ❌ CONVERT ONLY THESE:
 *    - Manage array state for selections
 *    - Multiple Pressable components
 * 
 * ==============================================================================
 * NATIVEWIND CONVERSION
 * ==============================================================================
 * 
 * ```tsx
 * const [selected, setSelected] = useState<string[]>([]);
 * 
 * <View className="flex-row gap-2">
 *   {options.map((option) => (
 *     <Pressable
 *       key={option.value}
 *       onPress={() => {
 *         setSelected(prev =>
 *           prev.includes(option.value)
 *             ? prev.filter(v => v !== option.value)
 *             : [...prev, option.value]
 *         );
 *       }}
 *       className={`
 *         px-4 py-2 rounded-lg border
 *         ${selected.includes(option.value) ? 'bg-pa-gold border-pa-gold' : 'border-white/20'}
 *       `}
 *     >
 *       <Text>{option.label}</Text>
 *     </Pressable>
 *   ))}
 * </View>
 * ```
 * 
 * ==============================================================================
 * SETUP: See /NATIVEWIND_CONVERSION_GUIDE.md
 * ==============================================================================
 */
```

---

## Instructions:

1. For each file above, prepend the corresponding header
2. Keep all existing legacy annotations
3. Ensure no JSX comments in doc examples (use //)
4. All examples emphasize className preservation
5. Include complete working code

This template covers all 10 remaining shadcn components efficiently.
