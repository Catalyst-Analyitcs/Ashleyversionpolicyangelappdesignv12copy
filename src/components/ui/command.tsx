/**
 * REACT NATIVE CONVERSION - Command Palette Component
 * 
 * COMPLEXITY: HIGH
 * CONVERSION APPROACH: Custom implementation with FlatList and search
 * 
 * WEB DEPENDENCIES TO REPLACE:
 * - cmdk → Custom React Native implementation
 * - lucide-react → react-native-vector-icons
 * 
 * RECOMMENDED PACKAGES:
 * - react-native-vector-icons for search icon
 * - fuse.js for fuzzy search (optional)
 * 
 * KEY CONVERSION NOTES:
 * 1. Command palette is keyboard-centric on web, touch-centric on mobile
 * 2. Need custom search input with filtering logic
 * 3. FlatList for command items with sections
 * 4. Modal for dialog presentation
 * 5. No keyboard shortcuts on mobile (use gesture-based)
 * 
 * REACT NATIVE IMPLEMENTATION:
 * ```tsx
 * import {
 *   View,
 *   TextInput,
 *   FlatList,
 *   Pressable,
 *   Text,
 *   Modal,
 * } from 'react-native';
 * import { useState, useMemo } from 'react';
 * import Icon from 'react-native-vector-icons/Feather';
 * 
 * interface CommandItem {
 *   id: string;
 *   label: string;
 *   icon?: string;
 *   onSelect: () => void;
 *   keywords?: string[];
 * }
 * 
 * interface CommandGroup {
 *   heading: string;
 *   items: CommandItem[];
 * }
 * 
 * interface CommandProps {
 *   groups: CommandGroup[];
 *   placeholder?: string;
 *   emptyMessage?: string;
 *   onClose?: () => void;
 * }
 * 
 * export function Command({
 *   groups,
 *   placeholder = "Search commands...",
 *   emptyMessage = "No results found.",
 *   onClose,
 * }: CommandProps) {
 *   const [search, setSearch] = useState('');
 *   const [selectedIndex, setSelectedIndex] = useState(0);
 * 
 *   // Filter items based on search
 *   const filteredGroups = useMemo(() => {
 *     if (!search) return groups;
 * 
 *     return groups
 *       .map((group) => ({
 *         ...group,
 *         items: group.items.filter((item) => {
 *           const searchLower = search.toLowerCase();
 *           return (
 *             item.label.toLowerCase().includes(searchLower) ||
 *             item.keywords?.some((k) => k.toLowerCase().includes(searchLower))
 *           );
 *         }),
 *       }))
 *       .filter((group) => group.items.length > 0);
 *   }, [groups, search]);
 * 
 *   // Flatten for FlatList
 *   const flatData = useMemo(() => {
 *     return filteredGroups.flatMap((group) => [
 *       { type: 'heading', heading: group.heading },
 *       ...group.items.map((item) => ({ type: 'item', ...item })),
 *     ]);
 *   }, [filteredGroups]);
 * 
 *   const renderItem = ({ item, index }: any) => {
 *     if (item.type === 'heading') {
 *       return (
 *         <View style={styles.groupHeading}>
 *           <Text style={styles.groupHeadingText}>{item.heading}</Text>
 *         </View>
 *       );
 *     }
 * 
 *     return (
 *       <Pressable
 *         style={[
 *           styles.commandItem,
 *           selectedIndex === index && styles.commandItemSelected,
 *         ]}
 *         onPress={() => {
 *           item.onSelect();
 *           onClose?.();
 *         }}
 *         accessibilityRole="menuitem"
 *         accessibilityLabel={item.label}
 *       >
 *         {item.icon && (
 *           <Icon
 *             name={item.icon}
 *             size={18}
 *             color="rgba(255, 255, 255, 0.6)"
 *           />
 *         )}
 *         <Text style={styles.commandItemText}>{item.label}</Text>
 *       </Pressable>
 *     );
 *   };
 * 
 *   return (
 *     <View style={styles.command}>
 *       {/* Search Input *}
 *       <View style={styles.inputWrapper}>
 *         <Icon name="search" size={20} color="rgba(255, 255, 255, 0.4)" />
 *         <TextInput
 *           style={styles.input}
 *           value={search}
 *           onChangeText={setSearch}
 *           placeholder={placeholder}
 *           placeholderTextColor="rgba(255, 255, 255, 0.4)"
 *           autoFocus
 *           returnKeyType="search"
 *         />
 *       </View>
 * 
 *       {/* Command List *}
 *       {flatData.length > 0 ? (
 *         <FlatList
 *           data={flatData}
 *           renderItem={renderItem}
 *           keyExtractor={(item, index) => `${item.type}-${index}`}
 *           style={styles.list}
 *           showsVerticalScrollIndicator={false}
 *         />
 *       ) : (
 *         <View style={styles.empty}>
 *           <Text style={styles.emptyText}>{emptyMessage}</Text>
 *         </View>
 *       )}
 *     </View>
 *   );
 * }
 * 
 * // Command Dialog (Modal)
 * interface CommandDialogProps extends CommandProps {
 *   visible: boolean;
 *   onDismiss: () => void;
 * }
 * 
 * export function CommandDialog({
 *   visible,
 *   onDismiss,
 *   ...commandProps
 * }: CommandDialogProps) {
 *   return (
 *     <Modal
 *       visible={visible}
 *       onRequestClose={onDismiss}
 *       animationType="fade"
 *       transparent
 *     >
 *       <Pressable style={styles.overlay} onPress={onDismiss}>
 *         <View style={styles.dialogContainer}>
 *           <Pressable>
 *             <Command {...commandProps} onClose={onDismiss} />
 *           </Pressable>
 *         </View>
 *       </Pressable>
 *     </Modal>
 *   );
 * }
 * 
 * const styles = {
 *   command: {
 *     backgroundColor: 'rgba(0, 0, 0, 0.95)',
 *     borderRadius: 16,
 *     overflow: 'hidden',
 *     maxHeight: 500,
 *   },
 *   inputWrapper: {
 *     flexDirection: 'row',
 *     alignItems: 'center',
 *     paddingHorizontal: 16,
 *     paddingVertical: 12,
 *     gap: 12,
 *     borderBottomWidth: 1,
 *     borderBottomColor: 'rgba(255, 255, 255, 0.1)',
 *   },
 *   input: {
 *     flex: 1,
 *     color: '#fff',
 *     fontSize: 16,
 *     outlineStyle: 'none',
 *   },
 *   list: {
 *     maxHeight: 400,
 *     paddingVertical: 8,
 *   },
 *   groupHeading: {
 *     paddingHorizontal: 16,
 *     paddingVertical: 8,
 *   },
 *   groupHeadingText: {
 *     color: 'rgba(255, 255, 255, 0.6)',
 *     fontSize: 12,
 *     fontWeight: '600',
 *     textTransform: 'uppercase',
 *   },
 *   commandItem: {
 *     flexDirection: 'row',
 *     alignItems: 'center',
 *     paddingHorizontal: 16,
 *     paddingVertical: 12,
 *     gap: 12,
 *   },
 *   commandItemSelected: {
 *     backgroundColor: 'rgba(212, 175, 55, 0.1)',
 *   },
 *   commandItemText: {
 *     color: '#fff',
 *     fontSize: 14,
 *   },
 *   empty: {
 *     paddingVertical: 40,
 *     alignItems: 'center',
 *   },
 *   emptyText: {
 *     color: 'rgba(255, 255, 255, 0.6)',
 *     fontSize: 14,
 *   },
 *   overlay: {
 *     flex: 1,
 *     backgroundColor: 'rgba(0, 0, 0, 0.5)',
 *     justifyContent: 'center',
 *     paddingHorizontal: 16,
 *   },
 *   dialogContainer: {
 *     maxWidth: 600,
 *     alignSelf: 'center',
 *     width: '100%',
 *   },
 * };
 * ```
 * 
 * FUZZY SEARCH IMPLEMENTATION (Fuse.js):
 * ```tsx
 * import Fuse from 'fuse.js';
 * 
 * const fuse = new Fuse(items, {
 *   keys: ['label', 'keywords'],
 *   threshold: 0.3,
 *   includeScore: true,
 * });
 * 
 * const results = search ? fuse.search(search).map(r => r.item) : items;
 * ```
 * 
 * ACCESSIBILITY:
 * - accessibilityRole="menu" for command palette
 * - accessibilityRole="menuitem" for each command
 * - accessibilityLabel describing each command
 * - accessibilityHint for keyboard shortcuts (if any)
 * - Support VoiceOver/TalkBack navigation
 * 
 * POLICYANGEL-SPECIFIC COMMANDS:
 * - Quick actions: "Schedule inspection", "View reports", "Add property"
 * - Navigation: "Go to dashboard", "Open settings", "View calendar"
 * - Search: "Search properties", "Find documents", "Search agents"
 * - Filters: "Filter by status", "Sort by date", "Group by category"
 * - Tools: "Generate report", "Export data", "Share link"
 * 
 * KEYBOARD SHORTCUTS (Optional on mobile):
 * - Cmd+K to open (on tablets with keyboard)
 * - Arrow keys for navigation
 * - Enter to select
 * - Escape to close
 * - Tab for autocomplete
 * 
 * GESTURES:
 * - Swipe down to dismiss modal
 * - Tap outside to close
 * - Pull to refresh recent commands
 * - Long press for command info
 * 
 * PERFORMANCE:
 * - Debounce search input (300ms)
 * - Virtualize long command lists with FlatList
 * - Memoize filtered results
 * - Lazy load command groups
 * - Cache recent searches
 * 
 * STYLING NOTES:
 * - Dark glassmorphic background
 * - Golden accent for selected items
 * - Icons from react-native-vector-icons
 * - Smooth animations for open/close
 * - Bottom sheet alternative to modal
 */

"use client";

import * as React from "react";
// WEB: CMDK library for command palette with keyboard navigation
// REACT NATIVE: Custom implementation with FlatList and TextInput
import { Command as CommandPrimitive } from "cmdk@1.1.1";
// WEB: Lucide icons
// REACT NATIVE: react-native-vector-icons
import { SearchIcon } from "lucide-react@0.487.0";

import { cn } from "./utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./dialog";

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  // WEB: CMDK handles search filtering and keyboard navigation
  // REACT NATIVE: Custom component with TextInput for search and FlatList for items
  // State: const [search, setSearch] = useState('');
  // Filter logic in useMemo
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
        className,
      )}
      // REACT NATIVE:
      // <View style={{
      //   backgroundColor: 'rgba(0, 0, 0, 0.95)',
      //   borderRadius: 16,
      //   overflow: 'hidden',
      //   flex: 1,
      // }}>
      {...props}
    />
  );
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string;
  description?: string;
}) {
  // WEB: Dialog wrapper for modal command palette
  // REACT NATIVE: Modal with transparent background
  // <Modal
  //   visible={visible}
  //   onRequestClose={onDismiss}
  //   animationType="fade"
  //   transparent
  // >
  //   <Pressable style={styles.overlay} onPress={onDismiss}>
  //     <View style={styles.container}>
  //       <Command {...props}>{children}</Command>
  //     </View>
  //   </Pressable>
  // </Modal>
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent className="overflow-hidden p-0">
        <Command className="[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  // WEB: Search input with icon
  // REACT NATIVE: TextInput with search icon in View
  // <View style={styles.inputWrapper}>
  //   <Icon name="search" size={20} color="rgba(255,255,255,0.4)" />
  //   <TextInput
  //     style={styles.input}
  //     value={search}
  //     onChangeText={setSearch}
  //     placeholder="Search..."
  //     placeholderTextColor="rgba(255,255,255,0.4)"
  //     autoFocus
  //     returnKeyType="search"
  //   />
  // </View>
  return (
    <div
      data-slot="command-input-wrapper"
      className="flex h-9 items-center gap-2 border-b px-3"
    >
      <SearchIcon className="size-4 shrink-0 opacity-50" />
      {/* REACT NATIVE: <Icon name="search" size={20} /> */}
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        // REACT NATIVE: TextInput with custom styles
        {...props}
      />
    </div>
  );
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  // WEB: Scrollable list of commands
  // REACT NATIVE: FlatList with filtered data
  // <FlatList
  //   data={filteredItems}
  //   renderItem={renderCommandItem}
  //   keyExtractor={(item) => item.id}
  //   showsVerticalScrollIndicator={false}
  //   style={{ maxHeight: 400 }}
  // />
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
        className,
      )}
      {...props}
    />
  );
}

function CommandEmpty({
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  // WEB: Empty state when no results
  // REACT NATIVE: Conditional render when filteredItems.length === 0
  // {filteredItems.length === 0 && (
  //   <View style={styles.empty}>
  //     <Text style={styles.emptyText}>No results found.</Text>
  //   </View>
  // )}
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className="py-6 text-center text-sm"
      {...props}
    />
  );
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  // WEB: Group of related commands with heading
  // REACT NATIVE: Section header in FlatList
  // renderSectionHeader={({ section }) => (
  //   <View style={styles.groupHeading}>
  //     <Text style={styles.groupHeadingText}>{section.heading}</Text>
  //   </View>
  // )}
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
        className,
      )}
      {...props}
    />
  );
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  // WEB: Visual separator between groups
  // REACT NATIVE: View with border
  // <View style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginHorizontal: 16 }} />
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("bg-border -mx-1 h-px", className)}
      {...props}
    />
  );
}

function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  // WEB: Individual command item with hover state
  // REACT NATIVE: Pressable with icon and text
  // <Pressable
  //   style={[styles.item, isSelected && styles.itemSelected]}
  //   onPress={onSelect}
  //   accessibilityRole="menuitem"
  // >
  //   {icon && <Icon name={icon} size={18} />}
  //   <Text style={styles.itemText}>{label}</Text>
  // </Pressable>
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      // REACT NATIVE: Apply golden accent for selected state
      // backgroundColor: isSelected ? 'rgba(212, 175, 55, 0.1)' : 'transparent'
      {...props}
    />
  );
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  // WEB: Keyboard shortcut indicator
  // REACT NATIVE: Generally not used (no keyboard shortcuts on mobile)
  // Optional: Show for tablet users with keyboards
  // <Text style={styles.shortcut}>⌘K</Text>
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className,
      )}
      {...props}
    />
  );
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
