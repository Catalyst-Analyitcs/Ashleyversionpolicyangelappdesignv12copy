/**
 * ==============================================================================
 * PROPERTYINSPECTIONSCREEN.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Inspection scheduling, history, and results viewing.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. INSPECTION LIST:
 *    - FlatList for inspections
 *    - Status indicators (completed/scheduled/pending)
 * 
 * 2. REQUIRED API:
 *    - GET /api/inspections
 *    - POST /api/inspections/schedule
 *    - GET /api/inspections/:id/report
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] Inspections load
 * - [ ] Schedule new inspection
 * - [ ] View inspection report
 * - [ ] iOS and Android compatible
 * 
 */

// RN: Import icons from lucide-react-native
// RN: import { Eye, CheckSquare, Clock, AlertCircle } from 'lucide-react-native';
import { Eye, CheckSquare, Clock, AlertCircle } from "lucide-react";
// RN: Import React Native components
// RN: import { View, Text, TouchableOpacity, ScrollView, FlatList, StyleSheet } from 'react-native';
// RN: Import navigation and query hooks
// RN: import { useNavigation } from '@react-navigation/native';
// RN: import { useQuery, useMutation } from '@tanstack/react-query';

export function PropertyInspectionScreen() {
  // RN: Replace hardcoded data with API call using TanStack Query
  // RN: const { data: inspections, isLoading, refetch } = useQuery({
  // RN:   queryKey: ['inspections'],
  // RN:   queryFn: () => fetchInspections(),
  // RN: });
  
  // RN: const navigation = useNavigation();
  
  // RN: MOCK DATA - Replace with API response
  const inspections = [
    {
      property: '123 Main Street', // RN: San Francisco address
      date: 'Jan 20, 2025', // RN: Format date with date-fns or moment
      status: 'Completed', // RN: 'completed' | 'scheduled' | 'needs_attention'
      score: 92, // RN: Inspection score 0-100
      color: '#10b981', // RN: COLORS.green500 for completed
    },
    {
      property: '456 Oak Avenue',
      date: 'Jan 22, 2025',
      status: 'Scheduled',
      score: null, // RN: null for pending inspections
      color: '#3b82f6', // RN: COLORS.blue500 for scheduled
    },
    {
      property: '789 Pine Road',
      date: 'Jan 18, 2025',
      status: 'Needs Attention',
      score: 68, // RN: Low score triggers warning color
      color: '#f59e0b', // RN: COLORS.amber500 for warnings
    },
  ];

  // RN: Checklist for current inspection
  const checklist = [
    { item: 'Roof Condition', checked: true }, // RN: id, item, checked, notes fields
    { item: 'Foundation', checked: true },
    { item: 'Electrical Systems', checked: false },
    { item: 'Plumbing', checked: false },
  ];
  
  // RN: Toggle checklist item
  // RN: const { mutate: toggleChecklistItem } = useMutation({
  // RN:   mutationFn: (itemId: string) => updateChecklistItem(itemId),
  // RN:   onSuccess: () => queryClient.invalidateQueries(['checklist']),
  // RN: });

  return (
    // RN: Replace div with ScrollView for scrollable content
    // RN: <ScrollView 
    // RN:   style={styles.container}
    // RN:   contentContainerStyle={styles.contentContainer}
    // RN:   showsVerticalScrollIndicator={false}
    // RN: >
    <div 
      className="w-full h-full flex flex-col"
      style={{ 
        padding: 'var(--spacing-6)', // RN: SPACING.spacing6
        gap: 'var(--spacing-4)', // RN: gap doesn't work - use marginBottom on children
        paddingBottom: 'calc(var(--nav-height) + var(--spacing-8))' // RN: Account for bottom nav + safe area
      }}
    >
      {/* RN: Screen Header with Icon and Title */}
      {/* RN: <View style={styles.header}> */}
      <div style={{ paddingTop: 'var(--spacing-2)' }}>
        {/* RN: <View style={styles.headerTitleRow}> */}
        <div className="flex items-center" style={{ gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-2)' }}>
          {/* RN: <Eye size={20} color={COLORS.blue500} /> */}
          <Eye className="w-5 h-5" style={{ color: '#3b82f6' }} />
          {/* RN: <Text style={styles.headerTitle}> */}
          <h1 style={{ color: 'var(--text-primary)' }}>
            Property Inspection
          </h1>
          {/* RN: </Text> */}
        </div>
        {/* RN: </View> */}
        {/* RN: <Text style={styles.headerSubtitle}> */}
        <p style={{ color: 'var(--text-secondary)' }}>
          Track inspection schedules and results
        </p>
        {/* RN: </Text> */}
      </div>
      {/* RN: </View> */}

      {/* RN: Inspection List - Use FlatList for better performance */}
      {/* RN: <FlatList
        RN:   data={inspections}
        RN:   renderItem={({ item: inspection }) => <InspectionCard inspection={inspection} />}
        RN:   keyExtractor={(item) => item.id}
        RN:   contentContainerStyle={styles.inspectionsList}
        RN:   showsVerticalScrollIndicator={false}
        RN:   ItemSeparatorComponent={() => <View style={{ height: SPACING.spacing3 }} />}
        RN: /> */}
      <div className="flex flex-col" style={{ gap: 'var(--spacing-3)' }}>
        {inspections.map((inspection, index) => (
          // RN: Replace button with TouchableOpacity for proper mobile interaction
          // RN: <TouchableOpacity
          // RN:   key={inspection.id}
          // RN:   style={styles.inspectionCard}
          // RN:   onPress={() => navigation.navigate('InspectionDetails', { inspectionId: inspection.id })}
          // RN:   activeOpacity={0.7}
          // RN: >
          <button
            key={index} // RN: Use inspection.id instead of index
            className="backdrop-blur-md active:scale-98 transition-all"
            style={{
              backgroundColor: 'var(--glass-bg)', // RN: COLORS.glassBg
              borderRadius: 'var(--radius-lg)', // RN: RADIUS.radiusLg
              border: '1px solid var(--glass-border)', // RN: borderWidth: 1, borderColor: COLORS.glassBorder
              padding: 'var(--spacing-4)', // RN: SPACING.spacing4
              textAlign: 'left', // RN: Not needed - Text components handle alignment
            }}
          >
            {/* RN: Inspection Card Content */}
            {/* RN: <View style={styles.inspectionCardHeader}> */}
            <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-2)' }}>
              {/* RN: <Text style={styles.inspectionProperty}> */}
              <div style={{ color: 'var(--text-primary)' }}>
                {inspection.property}
              </div>
              {/* RN: </Text> */}
              {/* RN: Show score if inspection is completed */}
              {inspection.score && (
                // RN: <Text style={[styles.inspectionScore, { color: inspection.color }]}>
                <div 
                  style={{ 
                    fontSize: '1.25rem', // RN: Don't override font size
                    color: inspection.color, // RN: Dynamic color based on score
                  }}
                >
                  {inspection.score}%
                </div>
                // RN: </Text>
              )}
            </div>
            {/* RN: </View> */}
            {/* RN: <View style={styles.inspectionCardFooter}> */}
            <div className="flex items-center justify-between">
              {/* RN: Date with clock icon */}
              {/* RN: <View style={styles.inspectionDate}> */}
              <div className="flex items-center" style={{ gap: 'var(--spacing-1)' }}>
                {/* RN: <Clock size={12} color={COLORS.textSecondary} /> */}
                <Clock className="w-3 h-3" style={{ color: 'var(--text-secondary)' }} />
                {/* RN: <Text style={styles.inspectionDateText}> */}
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  {inspection.date}
                </span>
                {/* RN: </Text> */}
              </div>
              {/* RN: </View> */}
              {/* RN: Status Badge */}
              {/* RN: <View style={[styles.statusBadge, { backgroundColor: `${inspection.color}20` }]}> */}
              <div 
                className="text-xs px-2 py-1"
                style={{
                  backgroundColor: `${inspection.color}20`, // RN: Use rgba(color, 0.2) for transparency
                  color: inspection.color, // RN: Text color matches badge theme
                  borderRadius: 'var(--radius-sm)', // RN: RADIUS.radiusSm
                }}
              >
                {/* RN: <Text style={[styles.statusBadgeText, { color: inspection.color }]}> */}
                {inspection.status}
                {/* RN: </Text> */}
              </div>
              {/* RN: </View> */}
            </div>
            {/* RN: </View> */}
            {/* RN: </TouchableOpacity> */}
          </button>
        ))}
      </div>

      {/* RN: Inspection Checklist Card */}
      {/* RN: <View style={styles.checklistCard}> */}
      <div 
        className="backdrop-blur-md"
        style={{
          backgroundColor: 'var(--glass-bg)', // RN: COLORS.glassBg
          borderRadius: 'var(--radius-lg)', // RN: RADIUS.radiusLg
          border: '1px solid var(--glass-border)', // RN: borderWidth: 1, borderColor: COLORS.glassBorder
          padding: 'var(--spacing-4)', // RN: SPACING.spacing4
        }}
      >
        {/* RN: <Text style={styles.checklistTitle}> */}
        <div style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-3)' }}>
          Current Inspection Checklist
        </div>
        {/* RN: </Text> */}
        {/* RN: Checklist Items */}
        {/* RN: <View style={styles.checklistItems}> */}
        <div className="flex flex-col" style={{ gap: 'var(--spacing-2)' }}>
          {checklist.map((item, index) => (
            // RN: Make checklist items tappable to toggle
            // RN: <TouchableOpacity
            // RN:   key={item.id}
            // RN:   style={styles.checklistItem}
            // RN:   onPress={() => toggleChecklistItem(item.id)}
            // RN: >
            <div 
              key={index} // RN: Use item.id instead
              className="flex items-center"
              style={{ gap: 'var(--spacing-2)' }}
            >
              {/* RN: Conditional icon based on checked state */}
              {item.checked ? (
                // RN: <CheckSquare size={16} color={COLORS.green500} />
                <CheckSquare className="w-4 h-4" style={{ color: '#10b981' }} />
              ) : (
                // RN: <AlertCircle size={16} color={COLORS.textSecondary} />
                <AlertCircle className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
              )}
              {/* RN: <Text style={[
                RN:   styles.checklistItemText,
                RN:   item.checked && styles.checklistItemChecked
                RN: ]}> */}
              <span 
                style={{ 
                  color: item.checked ? 'var(--text-secondary)' : 'var(--text-primary)', // RN: Dimmed when checked
                  fontSize: '0.875rem', // RN: Don't override
                  textDecoration: item.checked ? 'line-through' : 'none', // RN: Strikethrough in RN uses textDecorationLine
                }}
              >
                {item.item}
              </span>
              {/* RN: </Text> */}
            </div>
            // RN: </TouchableOpacity>
          ))}
        </div>
        {/* RN: </View> */}
      </div>
      {/* RN: </View> */}
      {/* RN: </ScrollView> */}
    </div>
  );
};

/**
 * ==============================================================================
 * REACT NATIVE STYLESHEET EXAMPLE
 * ==============================================================================
 * 
 * RN: Complete StyleSheet for PropertyInspectionScreen
 * 
 * import { StyleSheet, Platform } from 'react-native';
 * 
 * const styles = StyleSheet.create({
 *   container: {
 *     flex: 1,
 *   },
 *   contentContainer: {
 *     padding: SPACING.spacing6,
 *     paddingBottom: NAV_HEIGHT + SPACING.spacing8, // Account for bottom nav
 *   },
 *   header: {
 *     paddingTop: SPACING.spacing2,
 *     marginBottom: SPACING.spacing4,
 *   },
 *   headerTitleRow: {
 *     flexDirection: 'row',
 *     alignItems: 'center',
 *     gap: SPACING.spacing2,
 *     marginBottom: SPACING.spacing2,
 *   },
 *   headerTitle: {
 *     color: COLORS.textPrimary,
 *   },
 *   headerSubtitle: {
 *     color: COLORS.textSecondary,
 *   },
 *   inspectionsList: {
 *     gap: SPACING.spacing3,
 *   },
 *   inspectionCard: {
 *     backgroundColor: COLORS.glassBg,
 *     borderRadius: RADIUS.radiusLg,
 *     borderWidth: 1,
 *     borderColor: COLORS.glassBorder,
 *     padding: SPACING.spacing4,
 *     ...Platform.select({
 *       ios: {
 *         shadowColor: '#000',
 *         shadowOffset: { width: 0, height: 2 },
 *         shadowOpacity: 0.1,
 *         shadowRadius: 8,
 *       },
 *       android: {
 *         elevation: 2,
 *       },
 *     }),
 *   },
 *   inspectionCardHeader: {
 *     flexDirection: 'row',
 *     alignItems: 'center',
 *     justifyContent: 'space-between',
 *     marginBottom: SPACING.spacing2,
 *   },
 *   inspectionProperty: {
 *     color: COLORS.textPrimary,
 *     flex: 1,
 *   },
 *   inspectionScore: {
 *     fontSize: 20,
 *     fontWeight: '600',
 *   },
 *   inspectionCardFooter: {
 *     flexDirection: 'row',
 *     alignItems: 'center',
 *     justifyContent: 'space-between',
 *   },
 *   inspectionDate: {
 *     flexDirection: 'row',
 *     alignItems: 'center',
 *     gap: SPACING.spacing1,
 *   },
 *   inspectionDateText: {
 *     color: COLORS.textSecondary,
 *     fontSize: 14,
 *   },
 *   statusBadge: {
 *     paddingHorizontal: 8,
 *     paddingVertical: 4,
 *     borderRadius: RADIUS.radiusSm,
 *   },
 *   statusBadgeText: {
 *     fontSize: 12,
 *   },
 *   checklistCard: {
 *     backgroundColor: COLORS.glassBg,
 *     borderRadius: RADIUS.radiusLg,
 *     borderWidth: 1,
 *     borderColor: COLORS.glassBorder,
 *     padding: SPACING.spacing4,
 *     marginTop: SPACING.spacing4,
 *   },
 *   checklistTitle: {
 *     color: COLORS.textPrimary,
 *     marginBottom: SPACING.spacing3,
 *   },
 *   checklistItems: {
 *     gap: SPACING.spacing2,
 *   },
 *   checklistItem: {
 *     flexDirection: 'row',
 *     alignItems: 'center',
 *     gap: SPACING.spacing2,
 *     paddingVertical: SPACING.spacing1,
 *   },
 *   checklistItemText: {
 *     color: COLORS.textPrimary,
 *     fontSize: 14,
 *   },
 *   checklistItemChecked: {
 *     color: COLORS.textSecondary,
 *     textDecorationLine: 'line-through',
 *   },
 * });
 */

/**
 * ==============================================================================
 * DATA FETCHING WITH TANSTACK QUERY
 * ==============================================================================
 * 
 * RN: Complete implementation with TanStack Query
 * 
 * // API service functions
 * const fetchInspections = async () => {
 *   const response = await apiClient.get('/api/inspections');
 *   return response.data;
 * };
 * 
 * const fetchChecklist = async (inspectionId: string) => {
 *   const response = await apiClient.get(`/api/inspections/${inspectionId}/checklist`);
 *   return response.data;
 * };
 * 
 * const updateChecklistItem = async (itemId: string) => {
 *   const response = await apiClient.patch(`/api/checklist-items/${itemId}/toggle`);
 *   return response.data;
 * };
 * 
 * // In component
 * export function PropertyInspectionScreen() {
 *   const navigation = useNavigation();
 *   const queryClient = useQueryClient();
 *   
 *   // Fetch inspections list
 *   const { 
 *     data: inspections = [], 
 *     isLoading: inspectionsLoading,
 *     error: inspectionsError,
 *     refetch: refetchInspections,
 *   } = useQuery({
 *     queryKey: ['inspections'],
 *     queryFn: fetchInspections,
 *     staleTime: 5 * 60 * 1000, // 5 minutes
 *   });
 *   
 *   // Fetch current inspection checklist
 *   const currentInspectionId = inspections[0]?.id;
 *   const { 
 *     data: checklist = [],
 *     isLoading: checklistLoading,
 *   } = useQuery({
 *     queryKey: ['checklist', currentInspectionId],
 *     queryFn: () => fetchChecklist(currentInspectionId),
 *     enabled: !!currentInspectionId, // Only fetch if we have an inspection ID
 *   });
 *   
 *   // Toggle checklist item mutation
 *   const { mutate: toggleChecklistItem, isPending } = useMutation({
 *     mutationFn: updateChecklistItem,
 *     onSuccess: () => {
 *       // Invalidate checklist to refetch updated data
 *       queryClient.invalidateQueries(['checklist', currentInspectionId]);
 *       // Optionally show success toast
 *       Toast.show({ text1: 'Checklist updated', type: 'success' });
 *     },
 *     onError: (error) => {
 *       Toast.show({ text1: 'Failed to update checklist', type: 'error' });
 *     },
 *   });
 *   
 *   // Handle inspection card press
 *   const handleInspectionPress = (inspection: Inspection) => {
 *     navigation.navigate('InspectionDetails', { 
 *       inspectionId: inspection.id 
 *     });
 *   };
 *   
 *   // Loading state
 *   if (inspectionsLoading || checklistLoading) {
 *     return <InspectionScreenSkeleton />;
 *   }
 *   
 *   // Error state
 *   if (inspectionsError) {
 *     return (
 *       <ErrorView 
 *         error={inspectionsError}
 *         onRetry={refetchInspections}
 *       />
 *     );
 *   }
 *   
 *   return (
 *     // ... render inspections and checklist
 *   );
 * }
 */

/**
 * ==============================================================================
 * FLATLIST OPTIMIZATION
 * ==============================================================================
 * 
 * RN: Use FlatList for large inspection lists
 * 
 * <FlatList
 *   data={inspections}
 *   renderItem={({ item: inspection }) => (
 *     <TouchableOpacity
 *       style={styles.inspectionCard}
 *       onPress={() => handleInspectionPress(inspection)}
 *       activeOpacity={0.7}
 *     >
 *       <View style={styles.inspectionCardHeader}>
 *         <Text style={styles.inspectionProperty}>
 *           {inspection.property}
 *         </Text>
 *         {inspection.score && (
 *           <Text style={[styles.inspectionScore, { color: inspection.color }]}>
 *             {inspection.score}%
 *           </Text>
 *         )}
 *       </View>
 *       <View style={styles.inspectionCardFooter}>
 *         <View style={styles.inspectionDate}>
 *           <Clock size={12} color={COLORS.textSecondary} />
 *           <Text style={styles.inspectionDateText}>
 *             {format(new Date(inspection.date), 'MMM dd, yyyy')}
 *           </Text>
 *         </View>
 *         <View style={[styles.statusBadge, { backgroundColor: `${inspection.color}20` }]}>
 *           <Text style={[styles.statusBadgeText, { color: inspection.color }]}>
 *             {inspection.status}
 *           </Text>
 *         </View>
 *       </View>
 *     </TouchableOpacity>
 *   )}
 *   keyExtractor={(item) => item.id}
 *   contentContainerStyle={styles.contentContainer}
 *   showsVerticalScrollIndicator={false}
 *   ItemSeparatorComponent={() => <View style={{ height: SPACING.spacing3 }} />}
 *   // Performance optimizations
 *   initialNumToRender={10}
 *   maxToRenderPerBatch={10}
 *   windowSize={5}
 *   removeClippedSubviews={true}
 *   // Pull to refresh
 *   refreshControl={
 *     <RefreshControl
 *       refreshing={inspectionsLoading}
 *       onRefresh={refetchInspections}
 *       tintColor={COLORS.primary}
 *     />
 *   }
 *   // Empty state
 *   ListEmptyComponent={
 *     <EmptyState
 *       icon={<Eye size={48} color={COLORS.textSecondary} />}
 *       title="No Inspections"
 *       description="Schedule your first property inspection"
 *       actionLabel="Schedule Inspection"
 *       onAction={() => navigation.navigate('ScheduleInspection')}
 *     />
 *   }
 * />
 */

/**
 * ==============================================================================
 * TESTING CHECKLIST - REACT NATIVE
 * ==============================================================================
 * 
 * DATA & API:
 * - [ ] Inspections load from API
 * - [ ] Checklist loads from API
 * - [ ] Loading skeleton displays
 * - [ ] Error state shows on failure
 * - [ ] Retry button works
 * - [ ] Pull-to-refresh updates data
 * - [ ] Checklist toggle updates backend
 * - [ ] Optimistic updates work correctly
 * 
 * NAVIGATION:
 * - [ ] Tapping inspection opens details screen
 * - [ ] Back button returns to previous screen
 * - [ ] Inspection details receive correct ID
 * - [ ] Deep linking works (if implemented)
 * 
 * UI & INTERACTIONS:
 * - [ ] Cards have proper touch feedback
 * - [ ] Score displays correct color coding
 * - [ ] Status badges show correct colors
 * - [ ] Icons render correctly
 * - [ ] Checklist items are tappable
 * - [ ] Check/uncheck animation smooth
 * - [ ] Touch targets are 44x44 minimum
 * 
 * LAYOUT & RESPONSIVE:
 * - [ ] Works on small phones (iPhone SE)
 * - [ ] Works on large phones (iPhone Pro Max)
 * - [ ] Works on tablets
 * - [ ] Landscape mode supported
 * - [ ] Safe areas respected
 * - [ ] Bottom nav doesn't overlap content
 * 
 * PERFORMANCE:
 * - [ ] Smooth 60fps scrolling
 * - [ ] FlatList renders efficiently
 * - [ ] No memory leaks
 * - [ ] Fast initial render
 * - [ ] Images load progressively
 * 
 * ACCESSIBILITY:
 * - [ ] All buttons have labels
 * - [ ] Screen reader announces content
 * - [ ] Color contrast sufficient
 * - [ ] Touch targets adequate
 * - [ ] Status badges readable
 * 
 * PLATFORM-SPECIFIC:
 * - [ ] iOS shadows render correctly
 * - [ ] Android elevation correct
 * - [ ] iOS safe area insets work
 * - [ ] Android back button works
 */
