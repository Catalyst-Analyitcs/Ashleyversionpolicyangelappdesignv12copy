/**
 * REACT NATIVE CONVERSION - Pagination Component
 * 
 * COMPLEXITY: MEDIUM
 * CONVERSION APPROACH: Use FlatList with pagination or custom pagination controls
 * 
 * WEB DEPENDENCIES TO REPLACE:
 * - lucide-react → react-native-vector-icons
 * - HTML nav/ul/li → View components
 * 
 * KEY CONVERSION NOTES:
 * 1. FlatList has built-in pagination with onEndReached
 * 2. Custom pagination controls for page numbers
 * 3. Infinite scroll is more common on mobile than page numbers
 * 4. Pull to refresh instead of page reload
 * 5. Virtual scrolling for performance
 * 
 * REACT NATIVE IMPLEMENTATION (FlatList with Infinite Scroll):
 * ```tsx
 * import { FlatList, ActivityIndicator, View, Text } from 'react-native';
 * import { useState } from 'react';
 * 
 * export function InfiniteScrollList({ fetchData }: InfiniteScrollListProps) {
 *   const [data, setData] = useState([]);
 *   const [page, setPage] = useState(1);
 *   const [loading, setLoading] = useState(false);
 *   const [hasMore, setHasMore] = useState(true);
 * 
 *   const loadMore = async () => {
 *     if (loading || !hasMore) return;
 *     
 *     setLoading(true);
 *     const newData = await fetchData(page);
 *     
 *     if (newData.length === 0) {
 *       setHasMore(false);
 *     } else {
 *       setData([...data, ...newData]);
 *       setPage(page + 1);
 *     }
 *     
 *     setLoading(false);
 *   };
 * 
 *   return (
 *     <FlatList
 *       data={data}
 *       renderItem={({ item }) => <ListItem item={item} />}
 *       keyExtractor={(item) => item.id}
 *       onEndReached={loadMore}
 *       onEndReachedThreshold={0.5}
 *       ListFooterComponent={
 *         loading ? (
 *           <View style={styles.footer}>
 *             <ActivityIndicator color="#D4AF37" />
 *           </View>
 *         ) : null
 *       }
 *     />
 *   );
 * }
 * ```
 * 
 * REACT NATIVE IMPLEMENTATION (Custom Pagination Controls):
 * ```tsx
 * import { View, Pressable, Text } from 'react-native';
 * import Icon from 'react-native-vector-icons/Feather';
 * 
 * interface PaginationProps {
 *   currentPage: number;
 *   totalPages: number;
 *   onPageChange: (page: number) => void;
 * }
 * 
 * export function Pagination({
 *   currentPage,
 *   totalPages,
 *   onPageChange,
 * }: PaginationProps) {
 *   const canGoPrevious = currentPage > 1;
 *   const canGoNext = currentPage < totalPages;
 * 
 *   // Generate page numbers to show
 *   const getPageNumbers = () => {
 *     const pages = [];
 *     const maxVisible = 5;
 *     
 *     let startPage = Math.max(1, currentPage - 2);
 *     let endPage = Math.min(totalPages, currentPage + 2);
 *     
 *     // Always show first page
 *     if (startPage > 1) {
 *       pages.push(1);
 *       if (startPage > 2) pages.push('...');
 *     }
 *     
 *     // Show range around current page
 *     for (let i = startPage; i <= endPage; i++) {
 *       pages.push(i);
 *     }
 *     
 *     // Always show last page
 *     if (endPage < totalPages) {
 *       if (endPage < totalPages - 1) pages.push('...');
 *       pages.push(totalPages);
 *     }
 *     
 *     return pages;
 *   };
 * 
 *   return (
 *     <View style={styles.pagination}>
 *       {/* Previous Button *}
 *       <Pressable
 *         style={[
 *           styles.button,
 *           !canGoPrevious && styles.buttonDisabled,
 *         ]}
 *         onPress={() => onPageChange(currentPage - 1)}
 *         disabled={!canGoPrevious}
 *         accessibilityRole="button"
 *         accessibilityLabel="Previous page"
 *       >
 *         <Icon
 *           name="chevron-left"
 *           size={20}
 *           color={canGoPrevious ? '#fff' : 'rgba(255,255,255,0.3)'}
 *         />
 *         <Text
 *           style={[
 *             styles.buttonText,
 *             !canGoPrevious && styles.buttonTextDisabled,
 *           ]}
 *         >
 *           Previous
 *         </Text>
 *       </Pressable>
 * 
 *       {/* Page Numbers *}
 *       <View style={styles.pageNumbers}>
 *         {getPageNumbers().map((page, index) =>
 *           page === '...' ? (
 *             <View key={`ellipsis-${index}`} style={styles.ellipsis}>
 *               <Icon name="more-horizontal" size={20} color="rgba(255,255,255,0.5)" />
 *             </View>
 *           ) : (
 *             <Pressable
 *               key={page}
 *               style={[
 *                 styles.pageButton,
 *                 currentPage === page && styles.pageButtonActive,
 *               ]}
 *               onPress={() => onPageChange(page as number)}
 *               accessibilityRole="button"
 *               accessibilityLabel={`Page ${page}`}
 *               accessibilityState={{ selected: currentPage === page }}
 *             >
 *               <Text
 *                 style={[
 *                   styles.pageButtonText,
 *                   currentPage === page && styles.pageButtonTextActive,
 *                 ]}
 *               >
 *                 {page}
 *               </Text>
 *             </Pressable>
 *           )
 *         )}
 *       </View>
 * 
 *       {/* Next Button *}
 *       <Pressable
 *         style={[
 *           styles.button,
 *           !canGoNext && styles.buttonDisabled,
 *         ]}
 *         onPress={() => onPageChange(currentPage + 1)}
 *         disabled={!canGoNext}
 *         accessibilityRole="button"
 *         accessibilityLabel="Next page"
 *       >
 *         <Text
 *           style={[
 *             styles.buttonText,
 *             !canGoNext && styles.buttonTextDisabled,
 *           ]}
 *         >
 *           Next
 *         </Text>
 *         <Icon
 *           name="chevron-right"
 *           size={20}
 *           color={canGoNext ? '#fff' : 'rgba(255,255,255,0.3)'}
 *         />
 *       </Pressable>
 *     </View>
 *   );
 * }
 * 
 * const styles = {
 *   pagination: {
 *     flexDirection: 'row',
 *     alignItems: 'center',
 *     justifyContent: 'center',
 *     paddingVertical: 16,
 *     gap: 8,
 *   },
 *   button: {
 *     flexDirection: 'row',
 *     alignItems: 'center',
 *     paddingHorizontal: 12,
 *     paddingVertical: 8,
 *     borderRadius: 8,
 *     backgroundColor: 'rgba(255, 255, 255, 0.1)',
 *     gap: 4,
 *   },
 *   buttonDisabled: {
 *     opacity: 0.5,
 *   },
 *   buttonText: {
 *     color: '#fff',
 *     fontSize: 14,
 *     fontWeight: '500',
 *   },
 *   buttonTextDisabled: {
 *     color: 'rgba(255, 255, 255, 0.3)',
 *   },
 *   pageNumbers: {
 *     flexDirection: 'row',
 *     alignItems: 'center',
 *     gap: 4,
 *   },
 *   pageButton: {
 *     width: 36,
 *     height: 36,
 *     borderRadius: 8,
 *     justifyContent: 'center',
 *     alignItems: 'center',
 *     backgroundColor: 'rgba(255, 255, 255, 0.05)',
 *   },
 *   pageButtonActive: {
 *     backgroundColor: '#D4AF37',
 *   },
 *   pageButtonText: {
 *     color: 'rgba(255, 255, 255, 0.6)',
 *     fontSize: 14,
 *     fontWeight: '500',
 *   },
 *   pageButtonTextActive: {
 *     color: '#000',
 *     fontWeight: '600',
 *   },
 *   ellipsis: {
 *     width: 36,
 *     height: 36,
 *     justifyContent: 'center',
 *     alignItems: 'center',
 *   },
 * };
 * ```
 * 
 * POLICYANGEL-SPECIFIC USE CASES:
 * - Property list: Infinite scroll with 20 items per page
 * - Document list: Pagination controls for filtering
 * - Inspection reports: Page-based navigation
 * - Search results: Infinite scroll with total count
 * - Gallery: Grid with load more button
 * 
 * MOBILE BEST PRACTICES:
 * 1. **Infinite Scroll**: Better UX for most mobile lists
 * 2. **Pull to Refresh**: Reload first page
 * 3. **Load More Button**: Explicit control over loading
 * 4. **Virtual Scrolling**: FlatList handles automatically
 * 5. **Page Size**: 20-50 items per page
 * 
 * ACCESSIBILITY:
 * - Announce "Loading more items" with accessibilityLiveRegion
 * - Page buttons: accessibilityRole="button"
 * - Current page: accessibilityState={{ selected: true }}
 * - Announce total count and current range
 * 
 * PERFORMANCE:
 * - Use FlatList.getItemLayout for fixed-height items
 * - Implement windowSize prop to limit rendered items
 * - Use removeClippedSubviews on Android
 * - Memoize item components
 * - Debounce pagination requests
 */

import * as React from "react";
// WEB: Lucide icons for navigation arrows
// REACT NATIVE: react-native-vector-icons
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react@0.487.0";

import { cn } from "./utils";
import { Button, buttonVariants } from "./button";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  // WEB: nav element for pagination
  // REACT NATIVE: View container for pagination controls
  // <View style={styles.pagination} accessible accessibilityRole="menu">
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      // REACT NATIVE: 
      // <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  // WEB: ul element for pagination items
  // REACT NATIVE: View with flexbox
  // <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  // WEB: li element for individual page
  // REACT NATIVE: Not needed (no list semantics in RN)
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">;

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  // WEB: Link styled as button for page numbers
  // REACT NATIVE: Pressable with active state
  // <Pressable
  //   style={[
  //     styles.pageButton,
  //     isActive && styles.pageButtonActive,
  //   ]}
  //   onPress={onPress}
  //   accessibilityRole="button"
  //   accessibilityState={{ selected: isActive }}
  // >
  //   <Text style={[styles.text, isActive && styles.textActive]}>{page}</Text>
  // </Pressable>
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className,
      )}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  // WEB: Previous page button
  // REACT NATIVE: Pressable with chevron icon
  // <Pressable
  //   style={styles.navButton}
  //   onPress={onPrevious}
  //   disabled={currentPage === 1}
  //   accessibilityLabel="Go to previous page"
  // >
  //   <Icon name="chevron-left" size={20} />
  //   <Text>Previous</Text>
  // </Pressable>
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon />
      {/* REACT NATIVE: <Icon name="chevron-left" size={20} /> */}
      <span className="hidden sm:block">Previous</span>
      {/* REACT NATIVE: Show on all screen sizes or hide completely */}
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  // WEB: Next page button
  // REACT NATIVE: Similar to PaginationPrevious
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon />
      {/* REACT NATIVE: <Icon name="chevron-right" size={20} /> */}
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  // WEB: Ellipsis for skipped pages
  // REACT NATIVE: View with ellipsis icon
  // <View style={styles.ellipsis}>
  //   <Icon name="more-horizontal" size={20} color="rgba(255,255,255,0.5)" />
  // </View>
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      {/* REACT NATIVE: <Icon name="more-horizontal" size={16} /> */}
      <span className="sr-only">More pages</span>
      {/* REACT NATIVE: Use accessibilityLabel on parent View */}
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
