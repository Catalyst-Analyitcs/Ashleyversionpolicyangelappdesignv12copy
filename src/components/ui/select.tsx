/**
 * ==============================================================================
 * SELECT.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Dropdown select component for forms and data input with searchable
 * options, grouped items, and custom styling.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. PICKER COMPONENT OPTIONS:
 *    Three main approaches for React Native:
 *    
 *    A. @react-native-picker/picker (Native)
 *       - Platform-native pickers
 *       - iOS wheel, Android dropdown
 *       - Best for simple use cases
 *       
 *    B. react-native-picker-select (Custom)
 *       - Customizable styling
 *       - Works on all platforms
 *       - Better UX control
 *       
 *    C. Custom Modal + FlatList
 *       - Full control over UI/UX
 *       - Searchable, filterable
 *       - Best for complex requirements
 * 
 * 2. OPTION A: NATIVE PICKER (SIMPLE):
 *    ```tsx
 *    import { Picker } from '@react-native-picker/picker';
 *    import { View, Text, StyleSheet } from 'react-native';
 *    
 *    interface SelectProps {
 *      value: string;
 *      onValueChange: (value: string) => void;
 *      items: Array<{ label: string; value: string }>;
 *      placeholder?: string;
 *    }
 *    
 *    export function Select({ value, onValueChange, items, placeholder }: SelectProps) {
 *      return (
 *        <View style={styles.container}>
 *          <Picker
 *            selectedValue={value}
 *            onValueChange={onValueChange}
 *            style={styles.picker}
 *            itemStyle={styles.pickerItem} // iOS only
 *          >
 *            {placeholder && (
 *              <Picker.Item 
 *                label={placeholder} 
 *                value="" 
 *                enabled={false}
 *              />
 *            )}
 *            {items.map((item) => (
 *              <Picker.Item
 *                key={item.value}
 *                label={item.label}
 *                value={item.value}
 *              />
 *            ))}
 *          </Picker>
 *        </View>
 *      );
 *    }
 *    
 *    const styles = StyleSheet.create({
 *      container: {
 *        backgroundColor: 'rgba(0, 0, 0, 0.3)',
 *        borderRadius: 8,
 *        borderWidth: 1,
 *        borderColor: 'rgba(255, 255, 255, 0.1)',
 *        overflow: 'hidden',
 *      },
 *      picker: {
 *        color: '#ffffff',
 *        height: 50,
 *      },
 *      pickerItem: {
 *        color: '#ffffff', // iOS only
 *      },
 *    });
 *    ```
 * 
 * 3. OPTION B: CUSTOM STYLED SELECT (RECOMMENDED):
 *    ```tsx
 *    import RNPickerSelect from 'react-native-picker-select';
 *    import { View, StyleSheet } from 'react-native';
 *    import { ChevronDown } from 'react-native-vector-icons/Feather';
 *    
 *    export function Select({ value, onValueChange, items, placeholder }) {
 *      return (
 *        <View style={styles.container}>
 *          <RNPickerSelect
 *            value={value}
 *            onValueChange={onValueChange}
 *            items={items.map(item => ({
 *              label: item.label,
 *              value: item.value,
 *              key: item.value,
 *            }))}
 *            placeholder={{
 *              label: placeholder || 'Select an option...',
 *              value: null,
 *              color: '#94a3b8',
 *            }}
 *            style={pickerSelectStyles}
 *            useNativeAndroidPickerStyle={false}
 *            Icon={() => <ChevronDown size={16} color="#94a3b8" />}
 *          />
 *        </View>
 *      );
 *    }
 *    
 *    const styles = StyleSheet.create({
 *      container: {
 *        position: 'relative',
 *      },
 *    });
 *    
 *    const pickerSelectStyles = StyleSheet.create({
 *      inputIOS: {
 *        fontSize: 14,
 *        paddingVertical: 12,
 *        paddingHorizontal: 12,
 *        borderWidth: 1,
 *        borderColor: 'rgba(255, 255, 255, 0.1)',
 *        borderRadius: 8,
 *        backgroundColor: 'rgba(0, 0, 0, 0.3)',
 *        color: '#ffffff',
 *        paddingRight: 36, // Space for icon
 *      },
 *      inputAndroid: {
 *        fontSize: 14,
 *        paddingVertical: 8,
 *        paddingHorizontal: 12,
 *        borderWidth: 1,
 *        borderColor: 'rgba(255, 255, 255, 0.1)',
 *        borderRadius: 8,
 *        backgroundColor: 'rgba(0, 0, 0, 0.3)',
 *        color: '#ffffff',
 *        paddingRight: 36,
 *      },
 *      placeholder: {
 *        color: '#94a3b8',
 *      },
 *      iconContainer: {
 *        top: 12,
 *        right: 12,
 *      },
 *    });
 *    ```
 * 
 * 4. OPTION C: CUSTOM MODAL SELECT (FULL CONTROL):
 *    ```tsx
 *    import { useState } from 'react';
 *    import { 
 *      Modal, View, Text, TouchableOpacity, FlatList, 
 *      TextInput, StyleSheet 
 *    } from 'react-native';
 *    import { CheckIcon, ChevronDown, Search } from 'react-native-vector-icons/Feather';
 *    
 *    export function Select({ value, onValueChange, items, placeholder, searchable = false }) {
 *      const [showModal, setShowModal] = useState(false);
 *      const [searchQuery, setSearchQuery] = useState('');
 *      
 *      const filteredItems = searchable
 *        ? items.filter(item => 
 *            item.label.toLowerCase().includes(searchQuery.toLowerCase())
 *          )
 *        : items;
 *      
 *      const selectedItem = items.find(item => item.value === value);
 *      
 *      return (
 *        <>
 *          {/* Trigger Button *}
 *          <TouchableOpacity
 *            style={styles.trigger}
 *            onPress={() => setShowModal(true)}
 *          >
 *            <Text style={selectedItem ? styles.selectedText : styles.placeholder}>
 *              {selectedItem?.label || placeholder}
 *            </Text>
 *            <ChevronDown size={16} color="#94a3b8" />
 *          </TouchableOpacity>
 *          
 *          {/* Options Modal *}
 *          <Modal
 *            visible={showModal}
 *            transparent={true}
 *            animationType="slide"
 *            onRequestClose={() => setShowModal(false)}
 *          >
 *            <Pressable 
 *              style={styles.backdrop}
 *              onPress={() => setShowModal(false)}
 *            >
 *              <View style={styles.modalContent}>
 *                {/* Search Input (if searchable) *}
 *                {searchable && (
 *                  <View style={styles.searchContainer}>
 *                    <Search size={16} color="#94a3b8" />
 *                    <TextInput
 *                      style={styles.searchInput}
 *                      value={searchQuery}
 *                      onChangeText={setSearchQuery}
 *                      placeholder="Search..."
 *                      placeholderTextColor="#94a3b8"
 *                    />
 *                  </View>
 *                )}
 *                
 *                {/* Options List *}
 *                <FlatList
 *                  data={filteredItems}
 *                  keyExtractor={(item) => item.value}
 *                  renderItem={({ item }) => (
 *                    <TouchableOpacity
 *                      style={styles.option}
 *                      onPress={() => {
 *                        onValueChange(item.value);
 *                        setShowModal(false);
 *                        setSearchQuery('');
 *                      }}
 *                    >
 *                      <Text style={styles.optionText}>
 *                        {item.label}
 *                      </Text>
 *                      {item.value === value && (
 *                        <CheckIcon size={16} color="#3b82f6" />
 *                      )}
 *                    </TouchableOpacity>
 *                  )}
 *                />
 *              </View>
 *            </Pressable>
 *          </Modal>
 *        </>
 *      );
 *    }
 *    
 *    const styles = StyleSheet.create({
 *      trigger: {
 *        flexDirection: 'row',
 *        alignItems: 'center',
 *        justifyContent: 'space-between',
 *        paddingVertical: 12,
 *        paddingHorizontal: 12,
 *        borderWidth: 1,
 *        borderColor: 'rgba(255, 255, 255, 0.1)',
 *        borderRadius: 8,
 *        backgroundColor: 'rgba(0, 0, 0, 0.3)',
 *      },
 *      selectedText: {
 *        color: '#ffffff',
 *        fontSize: 14,
 *      },
 *      placeholder: {
 *        color: '#94a3b8',
 *        fontSize: 14,
 *      },
 *      backdrop: {
 *        flex: 1,
 *        backgroundColor: 'rgba(0, 0, 0, 0.5)',
 *        justifyContent: 'flex-end',
 *      },
 *      modalContent: {
 *        backgroundColor: 'rgba(0, 0, 0, 0.95)',
 *        borderTopLeftRadius: 24,
 *        borderTopRightRadius: 24,
 *        maxHeight: '70%',
 *        borderTopWidth: 1,
 *        borderColor: 'rgba(255, 255, 255, 0.1)',
 *      },
 *      searchContainer: {
 *        flexDirection: 'row',
 *        alignItems: 'center',
 *        gap: 8,
 *        padding: 16,
 *        borderBottomWidth: 1,
 *        borderColor: 'rgba(255, 255, 255, 0.1)',
 *      },
 *      searchInput: {
 *        flex: 1,
 *        color: '#ffffff',
 *        fontSize: 14,
 *      },
 *      option: {
 *        flexDirection: 'row',
 *        alignItems: 'center',
 *        justifyContent: 'space-between',
 *        paddingVertical: 16,
 *        paddingHorizontal: 20,
 *        borderBottomWidth: 1,
 *        borderColor: 'rgba(255, 255, 255, 0.05)',
 *      },
 *      optionText: {
 *        color: '#ffffff',
 *        fontSize: 14,
 *      },
 *    });
 *    ```
 * 
 * 5. GROUPED OPTIONS:
 *    ```tsx
 *    // Data structure
 *    const groupedItems = [
 *      {
 *        label: 'Group 1',
 *        items: [
 *          { label: 'Option 1', value: '1' },
 *          { label: 'Option 2', value: '2' },
 *        ]
 *      },
 *      {
 *        label: 'Group 2',
 *        items: [
 *          { label: 'Option 3', value: '3' },
 *        ]
 *      }
 *    ];
 *    
 *    // Render with SectionList
 *    import { SectionList } from 'react-native';
 *    
 *    <SectionList
 *      sections={groupedItems}
 *      keyExtractor={(item) => item.value}
 *      renderSectionHeader={({ section }) => (
 *        <Text style={styles.groupLabel}>{section.label}</Text>
 *      )}
 *      renderItem={({ item }) => (
 *        <TouchableOpacity onPress={() => onValueChange(item.value)}>
 *          <Text>{item.label}</Text>
 *        </TouchableOpacity>
 *      )}
 *    />
 *    ```
 * 
 * 6. INTEGRATION WITH REACT-HOOK-FORM:
 *    ```tsx
 *    import { Controller } from 'react-hook-form';
 *    
 *    <Controller
 *      control={control}
 *      name="propertyType"
 *      render={({ field: { onChange, value } }) => (
 *        <Select
 *          value={value}
 *          onValueChange={onChange}
 *          items={propertyTypes}
 *          placeholder="Select property type"
 *        />
 *      )}
 *    />
 *    ```
 * 
 * 7. INSTALLATION:
 *    npm install @react-native-picker/picker
 *    # OR
 *    npm install react-native-picker-select
 * 
 * ==============================================================================
 * LIBRARY COMPARISON
 * ==============================================================================
 * 
 * @react-native-picker/picker:
 * ✅ Native platform pickers
 * ✅ Smaller bundle size
 * ✅ Familiar UX
 * ❌ Limited styling
 * ❌ Different UI per platform
 * 
 * react-native-picker-select:
 * ✅ Fully customizable
 * ✅ Consistent across platforms
 * ✅ Icon support
 * ❌ Not native
 * ❌ Slightly larger
 * 
 * Custom Modal:
 * ✅ Full control
 * ✅ Searchable
 * ✅ Perfect match to design
 * ❌ More code to maintain
 * ❌ Manual accessibility
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] Dropdown opens on tap
 * - [ ] Selected value displays
 * - [ ] Options render correctly
 * - [ ] Selection updates value
 * - [ ] Placeholder shows when empty
 * - [ ] Search filters items (if enabled)
 * - [ ] Grouped items display correctly
 * - [ ] Works with forms/validation
 * - [ ] Accessible to screen readers
 * - [ ] iOS and Android compatible
 * - [ ] Styling matches design system
 * 
 */

"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select@2.1.6";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "lucide-react@0.487.0";

import { cn } from "./utils";

// RN: Replace with one of the options above based on requirements
// RN: For simple use cases: @react-native-picker/picker
// RN: For custom styling: react-native-picker-select
// RN: For full control: Custom Modal + FlatList

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  // RN: State management
  // RN: const [value, setValue] = useState(props.value || '');
  // RN: const [showModal, setShowModal] = useState(false);
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  // RN: Use SectionList for grouped items
  // RN: Or render group label with custom View
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  // RN: Display selected item label
  // RN: <Text style={styles.selectedValue}>
  // RN:   {selectedItem?.label || placeholder}
  // RN: </Text>
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default";
}) {
  // RN: Convert to TouchableOpacity
  // RN: <TouchableOpacity
  // RN:   style={[styles.trigger, size === 'sm' && styles.triggerSm]}
  // RN:   onPress={() => setShowModal(true)}
  // RN: >
  // RN:   {children}
  // RN:   <ChevronDown size={16} color="#94a3b8" />
  // RN: </TouchableOpacity>
  // RN:
  // RN: styles.trigger: {
  // RN:   flexDirection: 'row',
  // RN:   alignItems: 'center',
  // RN:   justifyContent: 'space-between',
  // RN:   height: 40,
  // RN:   paddingHorizontal: 12,
  // RN:   borderRadius: 8,
  // RN:   borderWidth: 1,
  // RN:   borderColor: 'rgba(255, 255, 255, 0.1)',
  // RN:   backgroundColor: 'rgba(0, 0, 0, 0.3)',
  // RN: },
  // RN: styles.triggerSm: {
  // RN:   height: 32,
  // RN: }
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-full items-center justify-between gap-2 rounded-md border bg-input-background px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  // RN: Replace with Modal + FlatList
  // RN: <Modal
  // RN:   visible={showModal}
  // RN:   transparent={true}
  // RN:   animationType="slide"
  // RN:   onRequestClose={() => setShowModal(false)}
  // RN: >
  // RN:   <Pressable style={styles.backdrop} onPress={() => setShowModal(false)}>
  // RN:     <View style={styles.content}>
  // RN:       <FlatList
  // RN:         data={items}
  // RN:         keyExtractor={(item) => item.value}
  // RN:         renderItem={({ item }) => <SelectItem item={item} />}
  // RN:       />
  // RN:     </View>
  // RN:   </Pressable>
  // RN: </Modal>
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className,
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1",
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  // RN: Group label for SectionList
  // RN: <Text style={styles.label}>
  // RN:   {children}
  // RN: </Text>
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  // RN: Convert to TouchableOpacity
  // RN: <TouchableOpacity
  // RN:   style={styles.item}
  // RN:   onPress={() => {
  // RN:     onValueChange(item.value);
  // RN:     setShowModal(false);
  // RN:   }}
  // RN: >
  // RN:   <Text style={styles.itemText}>{item.label}</Text>
  // RN:   {isSelected && <CheckIcon size={16} color="#3b82f6" />}
  // RN: </TouchableOpacity>
  // RN:
  // RN: styles.item: {
  // RN:   flexDirection: 'row',
  // RN:   alignItems: 'center',
  // RN:   justifyContent: 'space-between',
  // RN:   paddingVertical: 12,
  // RN:   paddingHorizontal: 16,
  // RN:   borderBottomWidth: 1,
  // RN:   borderColor: 'rgba(255, 255, 255, 0.05)',
  // RN: },
  // RN: styles.itemText: {
  // RN:   fontSize: 14,
  // RN:   color: '#ffffff',
  // RN: }
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className,
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  // RN: Convert to View separator
  // RN: <View style={styles.separator} />
  // RN:
  // RN: styles.separator: {
  // RN:   height: 1,
  // RN:   backgroundColor: 'rgba(255, 255, 255, 0.05)',
  // RN:   marginVertical: 4,
  // RN: }
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  // RN: Not needed - FlatList handles scrolling automatically
  // RN: Or add custom scroll indicator if needed
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className,
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  // RN: Not needed - FlatList handles scrolling automatically
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className,
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
