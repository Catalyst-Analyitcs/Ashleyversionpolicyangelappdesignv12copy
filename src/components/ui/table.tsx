/**
 * REACT NATIVE CONVERSION - Table Component
 * 
 * COMPLEXITY: MEDIUM-HIGH
 * CONVERSION APPROACH: Use FlatList with custom row rendering (no native table)
 * 
 * KEY CONVERSION NOTES:
 * 1. React Native has NO native table component
 * 2. Use FlatList with custom row/cell rendering
 * 3. Horizontal scroll needs ScrollView wrapper
 * 4. Consider react-native-table-component package
 * 5. For complex tables, use custom View layout
 * 
 * REACT NATIVE IMPLEMENTATION (Simple Table):
 * ```tsx
 * import { View, FlatList, Text, ScrollView } from 'react-native';
 * 
 * interface TableColumn {
 *   key: string;
 *   title: string;
 *   width?: number;
 *   render?: (value: any, row: any) => React.ReactNode;
 * }
 * 
 * interface TableProps {
 *   columns: TableColumn[];
 *   data: any[];
 *   onRowPress?: (row: any) => void;
 * }
 * 
 * export function Table({ columns, data, onRowPress }: TableProps) {
 *   const renderHeader = () => (
 *     <View style={styles.headerRow}>
 *       {columns.map((column) => (
 *         <View
 *           key={column.key}
 *           style={[
 *             styles.headerCell,
 *             column.width && { width: column.width },
 *           ]}
 *         >
 *           <Text style={styles.headerText}>{column.title}</Text>
 *         </View>
 *       ))}
 *     </View>
 *   );
 * 
 *   const renderRow = ({ item, index }: { item: any; index: number }) => (
 *     <Pressable
 *       style={[
 *         styles.row,
 *         index % 2 === 1 && styles.rowAlternate,
 *       ]}
 *       onPress={() => onRowPress?.(item)}
 *     >
 *       {columns.map((column) => (
 *         <View
 *           key={column.key}
 *           style={[
 *             styles.cell,
 *             column.width && { width: column.width },
 *           ]}
 *         >
 *           {column.render ? (
 *             column.render(item[column.key], item)
 *           ) : (
 *             <Text style={styles.cellText}>
 *               {item[column.key]}
 *             </Text>
 *           )}
 *         </View>
 *       ))}
 *     </Pressable>
 *   );
 * 
 *   return (
 *     <ScrollView horizontal showsHorizontalScrollIndicator={false}>
 *       <View>
 *         {renderHeader()}
 *         <FlatList
 *           data={data}
 *           renderItem={renderRow}
 *           keyExtractor={(item, index) => `row-${index}`}
 *         />
 *       </View>
 *     </ScrollView>
 *   );
 * }
 * 
 * const styles = {
 *   headerRow: {
 *     flexDirection: 'row',
 *     backgroundColor: 'rgba(255, 255, 255, 0.05)',
 *     borderBottomWidth: 1,
 *     borderBottomColor: 'rgba(255, 255, 255, 0.1)',
 *   },
 *   headerCell: {
 *     flex: 1,
 *     padding: 12,
 *     minWidth: 120,
 *   },
 *   headerText: {
 *     color: '#fff',
 *     fontSize: 14,
 *     fontWeight: '600',
 *   },
 *   row: {
 *     flexDirection: 'row',
 *     borderBottomWidth: 1,
 *     borderBottomColor: 'rgba(255, 255, 255, 0.05)',
 *   },
 *   rowAlternate: {
 *     backgroundColor: 'rgba(255, 255, 255, 0.02)',
 *   },
 *   cell: {
 *     flex: 1,
 *     padding: 12,
 *     minWidth: 120,
 *     justifyContent: 'center',
 *   },
 *   cellText: {
 *     color: 'rgba(255, 255, 255, 0.9)',
 *     fontSize: 14,
 *   },
 * };
 * ```
 * 
 * POLICYANGEL-SPECIFIC USAGE:
 * ```tsx
 * // Properties table
 * const propertyColumns = [
 *   { key: 'address', title: 'Address', width: 200 },
 *   { key: 'status', title: 'Status', width: 120 },
 *   { key: 'value', title: 'Value', width: 120,
 *     render: (value) => `$${value.toLocaleString()}` },
 *   { key: 'lastInspection', title: 'Last Inspection', width: 150 },
 * ];
 * 
 * <Table
 *   columns={propertyColumns}
 *   data={properties}
 *   onRowPress={(property) => navigate('PropertyDetails', { property })}
 * />
 * ```
 * 
 * ALTERNATIVE: Cards Instead of Table
 * ```tsx
 * // On mobile, cards often work better than tables
 * <FlatList
 *   data={properties}
 *   renderItem={({ item }) => (
 *     <PropertyCard property={item} onPress={() => navigate('Details')} />
 *   )}
 * />
 * ```
 * 
 * WITH react-native-table-component:
 * ```tsx
 * import { Table, Row, Rows } from 'react-native-table-component';
 * 
 * const tableHead = ['Address', 'Status', 'Value'];
 * const tableData = [
 *   ['123 Main St', 'Active', '$500k'],
 *   ['456 Oak Ave', 'Pending', '$750k'],
 * ];
 * 
 * <Table>
 *   <Row data={tableHead} style={styles.head} textStyle={styles.headText} />
 *   <Rows data={tableData} textStyle={styles.text} />
 * </Table>
 * ```
 * 
 * ACCESSIBILITY:
 * - Table headers: accessibilityRole="header"
 * - Rows: accessibilityRole="button" if pressable
 * - Provide descriptive accessibilityLabel
 * - Support screen reader navigation
 * 
 * PERFORMANCE:
 * - Use FlatList for virtualization
 * - getItemLayout for fixed-height rows
 * - Memoize row components
 * - Consider pagination for large datasets
 */

"use client";

import * as React from "react";

import { cn } from "./utils";

function Table({ className, ...props }: React.ComponentProps<"table">) {
  // WEB: HTML table with scrollable container
  // REACT NATIVE: No native table - use FlatList with custom rendering
  // 
  // Options:
  // 1. FlatList with custom row layout (best for lists)
  // 2. react-native-table-component (pre-built)
  // 3. Cards instead of table (often better UX on mobile)
  // 
  // See implementation examples in comments above
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
      // REACT NATIVE: ScrollView horizontal={true}
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        // REACT NATIVE: View with column layout
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  // WEB: Table header section
  // REACT NATIVE: Header row with bold text
  // <View style={styles.headerRow}>
  //   {columns.map(col => (
  //     <View key={col.key} style={styles.headerCell}>
  //       <Text style={styles.headerText}>{col.title}</Text>
  //     </View>
  //   ))}
  // </View>
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  // WEB: Table body section
  // REACT NATIVE: FlatList renderItem
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  // WEB: Table footer
  // REACT NATIVE: Footer row component
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className,
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  // WEB: Table row
  // REACT NATIVE: Pressable with flexDirection: 'row'
  // <Pressable
  //   style={[styles.row, isAlternate && styles.rowAlternate]}
  //   onPress={onPress}
  // >
  //   {cells}
  // </Pressable>
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className,
      )}
      // REACT NATIVE: Replace hover with pressed state
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  // WEB: Table header cell
  // REACT NATIVE: View with bold text
  // <View style={[styles.cell, styles.headerCell]}>
  //   <Text style={styles.headerText}>{children}</Text>
  // </View>
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  // WEB: Table data cell
  // REACT NATIVE: View with text content
  // <View style={[styles.cell, customStyle]}>
  //   <Text style={styles.cellText}>{children}</Text>
  // </View>
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  // WEB: Table caption/title
  // REACT NATIVE: Text above or below table
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
