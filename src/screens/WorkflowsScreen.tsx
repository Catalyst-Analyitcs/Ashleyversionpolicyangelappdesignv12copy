/**
 * ==============================================================================
 * WORKFLOWSSCREEN.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Workflow management for property inspections, insurance claims,
 * customer onboarding, and automated process management with step tracking,
 * execution controls, and progress monitoring.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. WORKFLOW LIST:
 *    - FlatList with workflow cards
 *    - Pull-to-refresh
 *    - Active/inactive status badges
 *    - Step progress indicators
 *    - Animated transitions
 * 
 * 2. WORKFLOW EXECUTION:
 *    - Modal for workflow details
 *    - Step-by-step wizard
 *    - Progress tracking
 *    - Input validation per step
 *    - Conditional step logic
 * 
 * 3. WORKFLOW TEMPLATES:
 *    - Pre-configured templates
 *    - Custom workflow builder
 *    - Template categories
 *    - Template preview
 * 
 * 4. STEP TYPES:
 *    - Form input steps
 *    - Photo capture steps
 *    - Document upload steps
 *    - AI analysis steps
 *    - Approval steps
 *    - Notification steps
 * 
 * 5. PROGRESS TRACKING:
 *    - Visual progress bar
 *    - Step completion status
 *    - Time tracking per step
 *    - Overall workflow duration
 * 
 * 6. NOTIFICATIONS:
 *    - Push notifications for workflow events
 *    - Step completion alerts
 *    - Assignment notifications
 * 
 * ==============================================================================
 * REQUIRED API ENDPOINTS
 * ==============================================================================
 * 
 * 1. GET /api/workflows
 *    Query: status (active/inactive), category, search
 *    Returns: List of workflows with metadata
 * 
 * 2. GET /api/workflows/:workflowId
 *    Returns: Full workflow definition with steps
 * 
 * 3. POST /api/workflows/:workflowId/execute
 *    Body: { propertyId, assignedTo, startDate }
 *    Returns: Workflow instance ID
 * 
 * 4. GET /api/workflows/instances/:instanceId
 *    Returns: Workflow execution state and progress
 * 
 * 5. PUT /api/workflows/instances/:instanceId/steps/:stepId
 *    Body: Step data (inputs, files, etc.)
 *    Returns: Updated step status
 * 
 * 6. POST /api/workflows/instances/:instanceId/complete
 *    Marks workflow instance as complete
 * 
 * 7. GET /api/workflows/templates
 *    Returns: Available workflow templates
 * 
 * 8. POST /api/workflows/create
 *    Body: Workflow definition
 *    Returns: New workflow ID
 * 
 * ==============================================================================
 * TYPESCRIPT INTERFACES
 * ==============================================================================
 * 
 * interface Workflow {
 *   id: string;
 *   name: string;
 *   description: string;
 *   category: 'inspection' | 'claims' | 'onboarding' | 'maintenance';
 *   steps: WorkflowStep[];
 *   estimatedDuration: number; // minutes
 *   active: boolean;
 *   createdAt: Date;
 *   updatedAt: Date;
 * }
 * 
 * interface WorkflowStep {
 *   id: string;
 *   order: number;
 *   title: string;
 *   description: string;
 *   type: 'form' | 'photo' | 'document' | 'ai_analysis' | 'approval';
 *   required: boolean;
 *   inputs?: FormField[];
 *   validation?: ValidationRule[];
 *   conditionalLogic?: ConditionalRule[];
 * }
 * 
 * interface WorkflowInstance {
 *   id: string;
 *   workflowId: string;
 *   propertyId: string;
 *   assignedTo: string;
 *   status: 'in_progress' | 'completed' | 'cancelled';
 *   currentStep: number;
 *   stepData: Record<string, any>;
 *   startedAt: Date;
 *   completedAt?: Date;
 *   progress: number; // 0-100
 * }
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] Workflows load from API
 * - [ ] FlatList renders correctly
 * - [ ] Active/inactive badges display
 * - [ ] Workflow execution starts
 * - [ ] Step wizard navigation works
 * - [ ] Progress tracking updates
 * - [ ] Form inputs validate
 * - [ ] Photo capture in steps
 * - [ ] Document upload in steps
 * - [ ] Workflow completion works
 * - [ ] Push notifications received
 * - [ ] Pull-to-refresh functional
 * - [ ] Template selection works
 * - [ ] Custom workflow creation
 * - [ ] iOS and Android compatible
 * 
 */

// RN: Import React Native core components
// RN: import { View, Text, TouchableOpacity, FlatList, Modal, ScrollView, Alert, Platform, SafeAreaView, RefreshControl, ActivityIndicator } from 'react-native';
// RN: import { useNavigation } from '@react-navigation/native';

// RN: Import animation libraries
// RN: import Animated, { FadeInDown, FadeIn, Layout, ZoomIn } from 'react-native-reanimated';
// RN: For step indicator, use: npm install react-native-step-indicator
// RN: import StepIndicator from 'react-native-step-indicator';

// RN: Import progress bar
// RN: For progress visualization, use react-native-progress or custom View
// RN: import { ProgressBar } from 'react-native-paper';
// RN: OR
// RN: import * as Progress from 'react-native-progress';

// RN: Import TanStack Query for data management
// RN: import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// RN: Replace lucide-react with react-native-vector-icons
// RN: import Icon from 'react-native-vector-icons/Feather';
import { GitBranch, Play, CheckSquare, Clock, Filter, Plus, ChevronRight, Circle } from "lucide-react";

// RN: ==============================================================================
// RN: WORKFLOW CATEGORY CONFIGURATION
// RN: ==============================================================================
// RN:
// RN: const WORKFLOW_CATEGORIES = [
// RN:   {
// RN:     id: 'inspection',
// RN:     label: 'Inspection',
// RN:     icon: 'camera',
// RN:     color: '#3b82f6',
// RN:   },
// RN:   {
// RN:     id: 'claims',
// RN:     label: 'Claims',
// RN:     icon: 'file-text',
// RN:     color: '#ef4444',
// RN:   },
// RN:   {
// RN:     id: 'onboarding',
// RN:     label: 'Onboarding',
// RN:     icon: 'user-plus',
// RN:     color: '#10b981',
// RN:   },
// RN:   {
// RN:     id: 'maintenance',
// RN:     label: 'Maintenance',
// RN:     icon: 'tool',
// RN:     color: '#f59e0b',
// RN:   },
// RN: ];

// RN: ==============================================================================
// RN: COMPONENT DEFINITION WITH STATE AND HOOKS
// RN: ==============================================================================
export function WorkflowsScreen() {
  // RN: NAVIGATION HOOK
  // RN: const navigation = useNavigation();
  
  // RN: STATE MANAGEMENT
  // RN: const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  // RN: const [showExecuteModal, setShowExecuteModal] = useState(false);
  // RN: const [showDetailsModal, setShowDetailsModal] = useState(false);
  // RN: const [activeCategory, setActiveCategory] = useState<string | null>(null);
  // RN: const [refreshing, setRefreshing] = useState(false);
  // RN: const [searchQuery, setSearchQuery] = useState('');
  
  // RN: QUERY CLIENT FOR CACHE INVALIDATION
  // RN: const queryClient = useQueryClient();
  
  // RN: TANSTACK QUERY - FETCH WORKFLOWS
  // RN: const { 
  // RN:   data: workflows = [], 
  // RN:   isLoading, 
  // RN:   error,
  // RN:   refetch 
  // RN: } = useQuery({
  // RN:   queryKey: ['workflows', activeCategory, searchQuery],
  // RN:   queryFn: async () => {
  // RN:     const params = new URLSearchParams();
  // RN:     if (activeCategory) params.append('category', activeCategory);
  // RN:     if (searchQuery) params.append('search', searchQuery);
  // RN:     
  // RN:     const response = await fetch(`/api/workflows?${params.toString()}`);
  // RN:     if (!response.ok) throw new Error('Failed to fetch workflows');
  // RN:     return response.json();
  // RN:   },
  // RN:   staleTime: 5 * 60 * 1000, // 5 minutes
  // RN: });
  
  // RN: TANSTACK QUERY - FETCH WORKFLOW INSTANCES (USER'S ACTIVE WORKFLOWS)
  // RN: const { data: activeInstances = [] } = useQuery({
  // RN:   queryKey: ['workflowInstances', 'active'],
  // RN:   queryFn: async () => {
  // RN:     const response = await fetch('/api/workflows/instances?status=in_progress');
  // RN:     if (!response.ok) throw new Error('Failed to fetch instances');
  // RN:     return response.json();
  // RN:   },
  // RN: });
  
  // RN: MUTATION - EXECUTE WORKFLOW
  // RN: const executeWorkflowMutation = useMutation({
  // RN:   mutationFn: async ({ workflowId, propertyId }: { workflowId: string; propertyId: string }) => {
  // RN:     const response = await fetch(`/api/workflows/${workflowId}/execute`, {
  // RN:       method: 'POST',
  // RN:       headers: { 'Content-Type': 'application/json' },
  // RN:       body: JSON.stringify({ propertyId, assignedTo: 'current-user-id' }),
  // RN:     });
  // RN:     if (!response.ok) throw new Error('Failed to execute workflow');
  // RN:     return response.json();
  // RN:   },
  // RN:   onSuccess: (workflowInstance) => {
  // RN:     // Navigate to workflow execution wizard
  // RN:     navigation.navigate('WorkflowExecution', { 
  // RN:       instanceId: workflowInstance.id 
  // RN:     });
  // RN:     
  // RN:     // Invalidate active instances to show new workflow
  // RN:     queryClient.invalidateQueries(['workflowInstances', 'active']);
  // RN:   },
  // RN:   onError: (error) => {
  // RN:     Alert.alert('Error', 'Failed to start workflow. Please try again.');
  // RN:   },
  // RN: });
  
  // RN: HANDLER - EXECUTE WORKFLOW
  // RN: const handleExecuteWorkflow = (workflow: Workflow) => {
  // RN:   // Show confirmation dialog
  // RN:   Alert.alert(
  // RN:     'Execute Workflow',
  // RN:     `Start "${workflow.name}"?\n\nEstimated time: ${workflow.estimatedDuration} minutes`,
  // RN:     [
  // RN:       {
  // RN:         text: 'Cancel',
  // RN:         style: 'cancel',
  // RN:       },
  // RN:       {
  // RN:         text: 'Start',
  // RN:         onPress: () => {
  // RN:           // TODO: Get propertyId from context or user selection
  // RN:           const propertyId = 'current-property-id';
  // RN:           executeWorkflowMutation.mutate({ workflowId: workflow.id, propertyId });
  // RN:         },
  // RN:       },
  // RN:     ]
  // RN:   );
  // RN: };
  
  // RN: HANDLER - VIEW WORKFLOW DETAILS
  // RN: const handleViewDetails = (workflow: Workflow) => {
  // RN:   setSelectedWorkflow(workflow);
  // RN:   setShowDetailsModal(true);
  // RN: };
  
  // RN: HANDLER - PULL TO REFRESH
  // RN: const onRefresh = useCallback(async () => {
  // RN:   setRefreshing(true);
  // RN:   await Promise.all([
  // RN:     refetch(),
  // RN:     queryClient.invalidateQueries(['workflowInstances']),
  // RN:   ]);
  // RN:   setRefreshing(false);
  // RN: }, [refetch, queryClient]);
  
  // RN: HANDLER - FILTER BY CATEGORY
  // RN: const handleCategoryFilter = (categoryId: string) => {
  // RN:   setActiveCategory(categoryId === activeCategory ? null : categoryId);
  // RN: };
  
  // RN: HANDLER - CREATE NEW WORKFLOW
  // RN: const handleCreateWorkflow = () => {
  // RN:   navigation.navigate('WorkflowBuilder');
  // RN: };
  
  // RN: MOCK DATA - Replace with API response from TanStack Query
  const workflows = [
    { 
      name: 'Standard Inspection', // RN: San Francisco property inspection workflow
      steps: 5, // RN: Number of workflow steps
      active: true, // RN: Workflow is currently active
      // RN: description: 'Comprehensive drone-based property inspection',
      // RN: category: 'inspection',
      // RN: estimatedDuration: 45, // minutes
    },
    { 
      name: 'Damage Assessment', 
      steps: 8, 
      active: false, // RN: Inactive workflow shows differently
    },
    { 
      name: 'Claims Processing', 
      steps: 12, 
      active: true,
    },
    { 
      name: 'Customer Onboarding', 
      steps: 6, 
      active: false,
    },
  ];
  
  // RN: RENDER - WORKFLOW CARD (Extracted component for FlatList)
  // RN: const renderWorkflowCard = ({ item: workflow, index }: { item: Workflow; index: number }) => (
  // RN:   <Animated.View
  // RN:     entering={FadeInDown.delay(index * 100).springify()}
  // RN:     layout={Layout.springify()}
  // RN:     style={styles.workflowCardWrapper}
  // RN:   >
  // RN:     <TouchableOpacity
  // RN:       style={styles.workflowCard}
  // RN:       onPress={() => handleViewDetails(workflow)}
  // RN:       onLongPress={() => {
  // RN:         // Show action sheet on long press
  // RN:         Alert.alert(
  // RN:           workflow.name,
  // RN:           'Choose an action',
  // RN:           [
  // RN:             { text: 'View Details', onPress: () => handleViewDetails(workflow) },
  // RN:             { text: 'Execute Workflow', onPress: () => handleExecuteWorkflow(workflow) },
  // RN:             { text: 'Cancel', style: 'cancel' },
  // RN:           ]
  // RN:         );
  // RN:       }}
  // RN:       activeOpacity={0.7}
  // RN:     >
  // RN:       {/* Card Content - See inline annotations below */}
  // RN:     </TouchableOpacity>
  // RN:   </Animated.View>
  // RN: );
  
  // RN: RENDER - LOADING STATE
  // RN: if (isLoading) {
  // RN:   return (
  // RN:     <SafeAreaView style={styles.container}>
  // RN:       <View style={styles.loadingContainer}>
  // RN:         <ActivityIndicator size="large" color="#3b82f6" />
  // RN:         <Text style={styles.loadingText}>Loading workflows...</Text>
  // RN:       </View>
  // RN:     </SafeAreaView>
  // RN:   );
  // RN: }
  
  // RN: RENDER - ERROR STATE
  // RN: if (error) {
  // RN:   return (
  // RN:     <SafeAreaView style={styles.container}>
  // RN:       <View style={styles.errorContainer}>
  // RN:         <Icon name="alert-circle" size={48} color="#ef4444" />
  // RN:         <Text style={styles.errorTitle}>Failed to load workflows</Text>
  // RN:         <Text style={styles.errorMessage}>{error.message}</Text>
  // RN:         <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
  // RN:           <Text style={styles.retryButtonText}>Retry</Text>
  // RN:         </TouchableOpacity>
  // RN:       </View>
  // RN:     </SafeAreaView>
  // RN:   );
  // RN: }

  return (
    // RN: ROOT CONTAINER - SafeAreaView for safe areas
    // RN: <SafeAreaView style={styles.container}>
    // RN:   <View style={styles.content}>
    <div 
      className="w-full h-full flex flex-col" // RN: Replace with View
      style={{ 
        padding: 'var(--spacing-6)', // RN: SPACING.spacing6
        gap: 'var(--spacing-4)', // RN: Use marginBottom on children
        paddingBottom: 'calc(var(--nav-height) + var(--spacing-8))' // RN: Account for tab nav
      }}
    >
      {/* RN: ========================================================================== */}
      {/* RN: HEADER SECTION */}
      {/* RN: ========================================================================== */}
      {/* RN: <View style={styles.header}> */}
      <div style={{ paddingTop: 'var(--spacing-2)' }}>
        {/* RN: Title */}
        {/* RN: <Text style={styles.title}> */}
        <h1 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-2)' }}>
          Workflows
        </h1>
        {/* RN: </Text> */}
        
        {/* RN: Subtitle */}
        {/* RN: <Text style={styles.subtitle}> */}
        <p style={{ color: 'var(--text-secondary)' }}>
          Automated process management
        </p>
        {/* RN: </Text> */}
      </div>
      {/* RN: </View> */}

      {/* RN: ========================================================================== */}
      {/* RN: CATEGORY FILTERS (OPTIONAL FEATURE) */}
      {/* RN: ========================================================================== */}
      {/* RN: <ScrollView 
        RN:   horizontal 
        RN:   showsHorizontalScrollIndicator={false}
        RN:   contentContainerStyle={styles.categoryFilters}
        RN: >
        RN:   {WORKFLOW_CATEGORIES.map((category) => (
        RN:     <TouchableOpacity
        RN:       key={category.id}
        RN:       style={[
        RN:         styles.categoryChip,
        RN:         activeCategory === category.id && styles.categoryChipActive
        RN:       ]}
        RN:       onPress={() => handleCategoryFilter(category.id)}
        RN:     >
        RN:       <Icon 
        RN:         name={category.icon} 
        RN:         size={14} 
        RN:         color={activeCategory === category.id ? category.color : '#6b7280'} 
        RN:       />
        RN:       <Text 
        RN:         style={[
        RN:           styles.categoryChipText,
        RN:           activeCategory === category.id && { color: category.color }
        RN:         ]}
        RN:       >
        RN:         {category.label}
        RN:       </Text>
        RN:     </TouchableOpacity>
        RN:   ))}
        RN: </ScrollView> */}

      {/* RN: ========================================================================== */}
      {/* RN: WORKFLOWS LIST */}
      {/* RN: ========================================================================== */}
      {/* RN: Use FlatList for better performance with large lists */}
      {/* RN: <FlatList
        RN:   data={workflows}
        RN:   keyExtractor={(item) => item.id}
        RN:   renderItem={renderWorkflowCard}
        RN:   contentContainerStyle={styles.listContent}
        RN:   ItemSeparatorComponent={() => <View style={styles.separator} />}
        RN:   ListEmptyComponent={() => (
        RN:     <View style={styles.emptyState}>
        RN:       <Icon name="git-branch" size={48} color="#9ca3af" />
        RN:       <Text style={styles.emptyTitle}>No workflows available</Text>
        RN:       <Text style={styles.emptyText}>
        RN:         Create a new workflow to get started
        RN:       </Text>
        RN:     </View>
        RN:   )}
        RN:   refreshControl={
        RN:     <RefreshControl
        RN:       refreshing={refreshing}
        RN:       onRefresh={onRefresh}
        RN:       tintColor="#3b82f6"
        RN:       colors={['#3b82f6']}
        RN:     />
        RN:   }
        RN:   showsVerticalScrollIndicator={false}
        RN: /> */}
      {/* RN: <View style={styles.workflowsContainer}> */}
      <div className="flex flex-col" style={{ gap: 'var(--spacing-3)' }}>
        {workflows.map((workflow, index) => (
          // RN: WORKFLOW CARD
          // RN: Wrap in Animated.View for entrance animation
          // RN: <Animated.View
          // RN:   key={workflow.id}
          // RN:   entering={FadeInDown.delay(index * 100).springify()}
          // RN:   layout={Layout.springify()}
          // RN: >
          // RN:   {/* Touchable Card Container */}
          // RN:   <TouchableOpacity
          // RN:     style={styles.workflowCard}
          // RN:     onPress={() => handleViewDetails(workflow)}
          // RN:     onLongPress={() => showActionSheet(workflow)}
          // RN:     activeOpacity={0.7}
          // RN:   >
          <button
            key={index} // RN: Use workflow.id for stable keys
            className="backdrop-blur-md active:scale-98 transition-all" // RN: Replace with TouchableOpacity
            style={{
              backgroundColor: 'var(--glass-bg)', // RN: COLORS.glassBg
              borderRadius: 'var(--radius-lg)', // RN: RADIUS.radiusLg
              border: '1px solid var(--glass-border)', // RN: borderWidth: 1, borderColor: COLORS.glassBorder
              padding: 'var(--spacing-4)', // RN: SPACING.spacing4
              textAlign: 'left', // RN: Not needed in RN - Text handles alignment
            }}
          >
            {/* RN: CARD HEADER - Workflow Name and Status Badge */}
            {/* RN: <View style={styles.cardHeader}> */}
            <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-3)' }}>
              {/* RN: Title Row with Icon */}
              {/* RN: <View style={styles.titleRow}> */}
              <div className="flex items-center" style={{ gap: 'var(--spacing-2)' }}>
                {/* RN: Workflow Icon */}
                {/* RN: <Icon name="git-branch" size={16} color="#3b82f6" /> */}
                <GitBranch className="w-4 h-4" style={{ color: '#3b82f6' }} />
                
                {/* RN: Workflow Name */}
                {/* RN: <Text style={styles.workflowName} numberOfLines={1}> */}
                <span style={{ color: 'var(--text-primary)' }}> {/* RN: COLORS.textPrimary */}
                  {workflow.name} {/* RN: {workflow.name} */}
                </span>
                {/* RN: </Text> */}
              </div>
              {/* RN: </View> */}
              
              {/* RN: Active Status Badge (Conditional Rendering) */}
              {workflow.active && (
                // RN: <View style={styles.activeBadge}>
                <div 
                  className="flex items-center text-xs" // RN: fontSize handled in style
                  style={{ 
                    gap: 'var(--spacing-1)', // RN: marginLeft on second child
                    color: '#10b981', // RN: Green for active status
                  }}
                >
                  {/* RN: Active Indicator Dot */}
                  {/* RN: <View style={styles.activeDot} /> */}
                  <div 
                    style={{
                      width: '6px', // RN: Circular indicator
                      height: '6px',
                      borderRadius: '50%', // RN: borderRadius: 3
                      backgroundColor: '#10b981', // RN: COLORS.green500
                    }}
                  />
                  {/* RN: <Text style={styles.activeText}> */}
                  Active
                  {/* RN: </Text> */}
                </div>
                // RN: </View>
              )}
            </div>
            {/* RN: </View> {/* End cardHeader */}
            
            {/* RN: CARD FOOTER - Workflow Metadata */}
            {/* RN: <View style={styles.cardFooter}> */}
            <div className="flex items-center" style={{ gap: 'var(--spacing-4)' }}>
              {/* RN: Steps Count */}
              {/* RN: <View style={styles.metaItem}> */}
              <div className="flex items-center" style={{ gap: 'var(--spacing-1)' }}>
                {/* RN: <Icon name="check-square" size={12} color="#6b7280" /> */}
                <CheckSquare className="w-3 h-3" style={{ color: 'var(--text-secondary)' }} />
                {/* RN: <Text style={styles.metaText}> */}
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  {workflow.steps} steps
                  {/* RN: {workflow.steps.length} steps */}
                </span>
                {/* RN: </Text> */}
              </div>
              {/* RN: </View> */}
              
              {/* RN: Estimated Duration (if available) */}
              {/* RN: {workflow.estimatedDuration && (
                RN:   <View style={styles.metaItem}>
                RN:     <Icon name="clock" size={12} color="#6b7280" />
                RN:     <Text style={styles.metaText}>
                RN:       ~{workflow.estimatedDuration} min
                RN:     </Text>
                RN:   </View>
                RN: )} */}
              
              {/* RN: Execute Icon - Visual indicator for action */}
              {/* RN: <Icon name="play" size={12} color="#3b82f6" style={{ marginLeft: 'auto' }} /> */}
              <Play className="w-3 h-3" style={{ color: 'var(--text-secondary)' }} />
            </div>
            {/* RN: </View> {/* End cardFooter */}
          </button>
          // RN:   </TouchableOpacity>
          // RN: </Animated.View>
        ))}
      </div>
      {/* RN: </View> {/* End workflowsContainer */}

      {/* RN: ========================================================================== */}
      {/* RN: CREATE NEW WORKFLOW BUTTON (FAB or Bottom Button) */}
      {/* RN: ========================================================================== */}
      {/* RN: Option 1: Floating Action Button (FAB) */}
      {/* RN: <TouchableOpacity
        RN:   style={styles.fab}
        RN:   onPress={handleCreateWorkflow}
        RN:   activeOpacity={0.8}
        RN: >
        RN:   <Icon name="plus" size={24} color="#ffffff" />
        RN: </TouchableOpacity> */}
      
      {/* RN: Option 2: Bottom Button (Current Implementation) */}
      {/* RN: <TouchableOpacity
        RN:   style={styles.createButton}
        RN:   onPress={handleCreateWorkflow}
        RN:   activeOpacity={0.8}
        RN: >
        RN:   <View style={styles.createButtonContent}>
        RN:     <Icon name="plus" size={20} color="#3b82f6" />
        RN:     <Text style={styles.createButtonText}>
        RN:       Create New Workflow
        RN:     </Text>
        RN:   </View>
        RN: </TouchableOpacity> */}
    </div>
    // RN:   </View>
    
    // RN:   {/* ====================================================================== */}
    // RN:   {/* WORKFLOW DETAILS MODAL */}
    // RN:   {/* ====================================================================== */}
    // RN:   <Modal
    // RN:     visible={showDetailsModal}
    // RN:     animationType="slide"
    // RN:     presentationStyle="pageSheet" // iOS only - shows as card
    // RN:     onRequestClose={() => setShowDetailsModal(false)}
    // RN:   >
    // RN:     <SafeAreaView style={styles.modalContainer}>
    // RN:       {/* Modal Header */}
    // RN:       <View style={styles.modalHeader}>
    // RN:         <TouchableOpacity
    // RN:           onPress={() => setShowDetailsModal(false)}
    // RN:           style={styles.closeButton}
    // RN:         >
    // RN:           <Icon name="x" size={24} color="#ffffff" />
    // RN:         </TouchableOpacity>
    // RN:         <Text style={styles.modalTitle}>{selectedWorkflow?.name}</Text>
    // RN:         <View style={{ width: 24 }} /> {/* Spacer */}
    // RN:       </View>
    // RN:       
    // RN:       {/* Workflow Details Content */}
    // RN:       <ScrollView style={styles.modalContent}>
    // RN:         {/* Description */}
    // RN:         <View style={styles.detailSection}>
    // RN:           <Text style={styles.detailLabel}>Description</Text>
    // RN:           <Text style={styles.detailText}>
    // RN:             {selectedWorkflow?.description}
    // RN:           </Text>
    // RN:         </View>
    // RN:         
    // RN:         {/* Steps List with StepIndicator */}
    // RN:         <View style={styles.detailSection}>
    // RN:           <Text style={styles.detailLabel}>Workflow Steps</Text>
    // RN:           {selectedWorkflow?.steps.map((step, index) => (
    // RN:             <View key={step.id} style={styles.stepItem}>
    // RN:               <View style={styles.stepNumber}>
    // RN:                 <Text style={styles.stepNumberText}>{index + 1}</Text>
    // RN:               </View>
    // RN:               <View style={styles.stepContent}>
    // RN:                 <Text style={styles.stepTitle}>{step.title}</Text>
    // RN:                 <Text style={styles.stepDescription}>
    // RN:                   {step.description}
    // RN:                 </Text>
    // RN:                 <View style={styles.stepMeta}>
    // RN:                   <Text style={styles.stepType}>{step.type}</Text>
    // RN:                   {step.required && (
    // RN:                     <View style={styles.requiredBadge}>
    // RN:                       <Text style={styles.requiredText}>Required</Text>
    // RN:                     </View>
    // RN:                   )}
    // RN:                 </View>
    // RN:               </View>
    // RN:             </View>
    // RN:           ))}
    // RN:         </View>
    // RN:         
    // RN:         {/* Metadata */}
    // RN:         <View style={styles.detailSection}>
    // RN:           <Text style={styles.detailLabel}>Information</Text>
    // RN:           <View style={styles.infoRow}>
    // RN:             <Text style={styles.infoLabel}>Category:</Text>
    // RN:             <Text style={styles.infoValue}>
    // RN:               {selectedWorkflow?.category}
    // RN:             </Text>
    // RN:           </View>
    // RN:           <View style={styles.infoRow}>
    // RN:             <Text style={styles.infoLabel}>Est. Duration:</Text>
    // RN:             <Text style={styles.infoValue}>
    // RN:               {selectedWorkflow?.estimatedDuration} minutes
    // RN:             </Text>
    // RN:           </View>
    // RN:           <View style={styles.infoRow}>
    // RN:             <Text style={styles.infoLabel}>Status:</Text>
    // RN:             <Text 
    // RN:               style={[
    // RN:                 styles.infoValue,
    // RN:                 { color: selectedWorkflow?.active ? '#10b981' : '#6b7280' }
    // RN:               ]}
    // RN:             >
    // RN:               {selectedWorkflow?.active ? 'Active' : 'Inactive'}
    // RN:             </Text>
    // RN:           </View>
    // RN:         </View>
    // RN:       </ScrollView>
    // RN:       
    // RN:       {/* Execute Button at Bottom */}
    // RN:       <View style={styles.modalFooter}>
    // RN:         <TouchableOpacity
    // RN:           style={styles.executeButton}
    // RN:           onPress={() => {
    // RN:             setShowDetailsModal(false);
    // RN:             if (selectedWorkflow) {
    // RN:               handleExecuteWorkflow(selectedWorkflow);
    // RN:             }
    // RN:           }}
    // RN:         >
    // RN:           <Icon name="play" size={20} color="#ffffff" />
    // RN:           <Text style={styles.executeButtonText}>
    // RN:             Start Workflow
    // RN:           </Text>
    // RN:         </TouchableOpacity>
    // RN:       </View>
    // RN:     </SafeAreaView>
    // RN:   </Modal>
    // RN: </SafeAreaView>
  );
}

/**
 * ==============================================================================
 * REACT NATIVE STYLESHEET EXAMPLE
 * ==============================================================================
 * 
 * RN: Complete StyleSheet for WorkflowsScreen
 * 
 * import { StyleSheet, Dimensions, Platform } from 'react-native';
 * 
 * const { width } = Dimensions.get('window');
 * 
 * const styles = StyleSheet.create({
 *   // Container and Layout
 *   container: {
 *     flex: 1,
 *     backgroundColor: COLORS.bgPrimary,
 *   },
 *   content: {
 *     flex: 1,
 *   },
 *   
 *   // Header
 *   header: {
 *     paddingHorizontal: SPACING.spacing6,
 *     paddingTop: SPACING.spacing2,
 *     marginBottom: SPACING.spacing4,
 *   },
 *   title: {
 *     color: COLORS.textPrimary,
 *     marginBottom: SPACING.spacing2,
 *   },
 *   subtitle: {
 *     color: COLORS.textSecondary,
 *   },
 *   
 *   // Category Filters
 *   categoryFilters: {
 *     paddingHorizontal: SPACING.spacing6,
 *     gap: SPACING.spacing2,
 *     marginBottom: SPACING.spacing4,
 *   },
 *   categoryChip: {
 *     flexDirection: 'row',
 *     alignItems: 'center',
 *     gap: SPACING.spacing1,
 *     paddingHorizontal: SPACING.spacing3,
 *     paddingVertical: SPACING.spacing2,
 *     borderRadius: RADIUS.radiusFull,
 *     backgroundColor: COLORS.glassBg,
 *     borderWidth: 1,
 *     borderColor: COLORS.glassBorder,
 *   },
 *   categoryChipActive: {
 *     backgroundColor: 'rgba(59, 130, 246, 0.1)',
 *     borderColor: '#3b82f6',
 *   },
 *   categoryChipText: {
 *     fontSize: 14,
 *     color: COLORS.textSecondary,
 *   },
 *   
 *   // Workflows List
 *   listContent: {
 *     paddingHorizontal: SPACING.spacing6,
 *     paddingBottom: NAV_HEIGHT + SPACING.spacing8,
 *     gap: SPACING.spacing3,
 *   },
 *   workflowsContainer: {
 *     paddingHorizontal: SPACING.spacing6,
 *     gap: SPACING.spacing3,
 *   },
 *   separator: {
 *     height: SPACING.spacing3,
 *   },
 *   
 *   // Workflow Card
 *   workflowCardWrapper: {
 *     // Wrapper for animation
 *   },
 *   workflowCard: {
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
 *   cardHeader: {
 *     flexDirection: 'row',
 *     alignItems: 'center',
 *     justifyContent: 'space-between',
 *     marginBottom: SPACING.spacing3,
 *   },
 *   titleRow: {
 *     flexDirection: 'row',
 *     alignItems: 'center',
 *     gap: SPACING.spacing2,
 *     flex: 1,
 *   },
 *   workflowName: {
 *     color: COLORS.textPrimary,
 *     fontSize: 16,
 *     fontWeight: '600',
 *   },
 *   activeBadge: {
 *     flexDirection: 'row',
 *     alignItems: 'center',
 *     gap: SPACING.spacing1,
 *   },
 *   activeDot: {
 *     width: 6,
 *     height: 6,
 *     borderRadius: 3,
 *     backgroundColor: '#10b981',
 *   },
 *   activeText: {
 *     fontSize: 12,
 *     color: '#10b981',
 *     fontWeight: '500',
 *   },
 *   cardFooter: {
 *     flexDirection: 'row',
 *     alignItems: 'center',
 *     gap: SPACING.spacing4,
 *   },
 *   metaItem: {
 *     flexDirection: 'row',
 *     alignItems: 'center',
 *     gap: SPACING.spacing1,
 *   },
 *   metaText: {
 *     fontSize: 14,
 *     color: COLORS.textSecondary,
 *   },
 *   
 *   // Create Button
 *   createButton: {
 *     marginHorizontal: SPACING.spacing6,
 *     marginTop: SPACING.spacing2,
 *     backgroundColor: 'rgba(59, 130, 246, 0.2)',
 *     borderRadius: RADIUS.radiusLg,
 *     borderWidth: 1,
 *     borderColor: '#3b82f6',
 *     padding: SPACING.spacing4,
 *   },
 *   createButtonContent: {
 *     flexDirection: 'row',
 *     alignItems: 'center',
 *     justifyContent: 'center',
 *     gap: SPACING.spacing2,
 *   },
 *   createButtonText: {
 *     color: '#3b82f6',
 *     fontSize: 16,
 *     fontWeight: '600',
 *   },
 *   
 *   // Floating Action Button (Alternative)
 *   fab: {
 *     position: 'absolute',
 *     right: SPACING.spacing6,
 *     bottom: NAV_HEIGHT + SPACING.spacing6,
 *     width: 56,
 *     height: 56,
 *     borderRadius: 28,
 *     backgroundColor: '#3b82f6',
 *     alignItems: 'center',
 *     justifyContent: 'center',
 *     ...Platform.select({
 *       ios: {
 *         shadowColor: '#000',
 *         shadowOffset: { width: 0, height: 4 },
 *         shadowOpacity: 0.3,
 *         shadowRadius: 8,
 *       },
 *       android: {
 *         elevation: 6,
 *       },
 *     }),
 *   },
 *   
 *   // Empty State
 *   emptyState: {
 *     flex: 1,
 *     justifyContent: 'center',
 *     alignItems: 'center',
 *     padding: SPACING.spacing6,
 *     gap: SPACING.spacing3,
 *   },
 *   emptyTitle: {
 *     color: COLORS.textPrimary,
 *     fontSize: 18,
 *     fontWeight: '600',
 *   },
 *   emptyText: {
 *     color: COLORS.textSecondary,
 *     fontSize: 14,
 *     textAlign: 'center',
 *   },
 *   
 *   // Loading State
 *   loadingContainer: {
 *     flex: 1,
 *     justifyContent: 'center',
 *     alignItems: 'center',
 *     gap: SPACING.spacing3,
 *   },
 *   loadingText: {
 *     color: COLORS.textSecondary,
 *     fontSize: 16,
 *   },
 *   
 *   // Error State
 *   errorContainer: {
 *     flex: 1,
 *     justifyContent: 'center',
 *     alignItems: 'center',
 *     padding: SPACING.spacing6,
 *     gap: SPACING.spacing3,
 *   },
 *   errorTitle: {
 *     color: COLORS.textPrimary,
 *     fontSize: 18,
 *     fontWeight: '600',
 *   },
 *   errorMessage: {
 *     color: COLORS.textSecondary,
 *     fontSize: 14,
 *     textAlign: 'center',
 *   },
 *   retryButton: {
 *     backgroundColor: '#3b82f6',
 *     paddingHorizontal: SPACING.spacing6,
 *     paddingVertical: SPACING.spacing3,
 *     borderRadius: RADIUS.radiusFull,
 *     marginTop: SPACING.spacing4,
 *   },
 *   retryButtonText: {
 *     color: '#ffffff',
 *     fontSize: 16,
 *     fontWeight: '600',
 *   },
 *   
 *   // Modal Styles
 *   modalContainer: {
 *     flex: 1,
 *     backgroundColor: COLORS.bgPrimary,
 *   },
 *   modalHeader: {
 *     flexDirection: 'row',
 *     alignItems: 'center',
 *     justifyContent: 'space-between',
 *     padding: SPACING.spacing4,
 *     borderBottomWidth: 1,
 *     borderBottomColor: COLORS.glassBorder,
 *   },
 *   modalTitle: {
 *     color: COLORS.textPrimary,
 *     fontSize: 18,
 *     fontWeight: '600',
 *   },
 *   closeButton: {
 *     padding: SPACING.spacing2,
 *   },
 *   modalContent: {
 *     flex: 1,
 *     padding: SPACING.spacing6,
 *   },
 *   detailSection: {
 *     marginBottom: SPACING.spacing6,
 *   },
 *   detailLabel: {
 *     color: COLORS.textPrimary,
 *     fontSize: 16,
 *     fontWeight: '600',
 *     marginBottom: SPACING.spacing3,
 *   },
 *   detailText: {
 *     color: COLORS.textSecondary,
 *     fontSize: 14,
 *     lineHeight: 20,
 *   },
 *   stepItem: {
 *     flexDirection: 'row',
 *     gap: SPACING.spacing3,
 *     marginBottom: SPACING.spacing4,
 *   },
 *   stepNumber: {
 *     width: 32,
 *     height: 32,
 *     borderRadius: 16,
 *     backgroundColor: 'rgba(59, 130, 246, 0.1)',
 *     alignItems: 'center',
 *     justifyContent: 'center',
 *   },
 *   stepNumberText: {
 *     color: '#3b82f6',
 *     fontSize: 14,
 *     fontWeight: '600',
 *   },
 *   stepContent: {
 *     flex: 1,
 *   },
 *   stepTitle: {
 *     color: COLORS.textPrimary,
 *     fontSize: 15,
 *     fontWeight: '600',
 *     marginBottom: SPACING.spacing1,
 *   },
 *   stepDescription: {
 *     color: COLORS.textSecondary,
 *     fontSize: 14,
 *     marginBottom: SPACING.spacing2,
 *   },
 *   stepMeta: {
 *     flexDirection: 'row',
 *     alignItems: 'center',
 *     gap: SPACING.spacing2,
 *   },
 *   stepType: {
 *     fontSize: 12,
 *     color: COLORS.textTertiary,
 *   },
 *   requiredBadge: {
 *     paddingHorizontal: SPACING.spacing2,
 *     paddingVertical: 2,
 *     borderRadius: RADIUS.radiusSm,
 *     backgroundColor: 'rgba(239, 68, 68, 0.1)',
 *   },
 *   requiredText: {
 *     fontSize: 11,
 *     color: '#ef4444',
 *     fontWeight: '600',
 *   },
 *   infoRow: {
 *     flexDirection: 'row',
 *     justifyContent: 'space-between',
 *     paddingVertical: SPACING.spacing2,
 *     borderBottomWidth: 1,
 *     borderBottomColor: COLORS.glassBorder,
 *   },
 *   infoLabel: {
 *     color: COLORS.textSecondary,
 *     fontSize: 14,
 *   },
 *   infoValue: {
 *     color: COLORS.textPrimary,
 *     fontSize: 14,
 *     fontWeight: '500',
 *   },
 *   modalFooter: {
 *     padding: SPACING.spacing6,
 *     borderTopWidth: 1,
 *     borderTopColor: COLORS.glassBorder,
 *   },
 *   executeButton: {
 *     flexDirection: 'row',
 *     alignItems: 'center',
 *     justifyContent: 'center',
 *     gap: SPACING.spacing2,
 *     backgroundColor: '#3b82f6',
 *     borderRadius: RADIUS.radiusLg,
 *     padding: SPACING.spacing4,
 *   },
 *   executeButtonText: {
 *     color: '#ffffff',
 *     fontSize: 16,
 *     fontWeight: '600',
 *   },
 * });
 */

/**
 * ==============================================================================
 * WORKFLOW EXECUTION SCREEN (SEPARATE COMPONENT)
 * ==============================================================================
 * 
 * RN: Create a separate screen for workflow execution wizard
 * RN: File: screens/WorkflowExecutionScreen.tsx
 * 
 * This screen would handle:
 * - Step-by-step wizard interface
 * - Progress indicator
 * - Form inputs for each step
 * - Photo capture for photo steps
 * - Document upload for document steps
 * - Navigation between steps
 * - Data validation
 * - Save progress
 * - Complete workflow
 * 
 * Example implementation:
 * 
 * export function WorkflowExecutionScreen({ route }) {
 *   const { instanceId } = route.params;
 *   const [currentStepIndex, setCurrentStepIndex] = useState(0);
 *   const [stepData, setStepData] = useState({});
 *   
 *   const { data: instance } = useQuery({
 *     queryKey: ['workflowInstance', instanceId],
 *     queryFn: () => fetchWorkflowInstance(instanceId),
 *   });
 *   
 *   const updateStepMutation = useMutation({
 *     mutationFn: (data) => updateWorkflowStep(instanceId, currentStepIndex, data),
 *     onSuccess: () => {
 *       // Move to next step or complete
 *       if (currentStepIndex < instance.workflow.steps.length - 1) {
 *         setCurrentStepIndex(prev => prev + 1);
 *       } else {
 *         completeWorkflow();
 *       }
 *     },
 *   });
 *   
 *   return (
 *     <SafeAreaView>
 *       <StepIndicator currentPosition={currentStepIndex} />
 *       <CurrentStepContent 
 *         step={instance.workflow.steps[currentStepIndex]}
 *         onComplete={(data) => updateStepMutation.mutate(data)}
 *       />
 *     </SafeAreaView>
 *   );
 * }
 */
