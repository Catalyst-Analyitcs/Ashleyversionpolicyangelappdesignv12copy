/**
 * ==============================================================================
 * VISUALREPORTSSCREEN.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Visual inspection reports with image galleries, PDF exports,
 * and sharing capabilities for property inspection documentation.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. REPORT LIST:
 *    - FlatList with pull-to-refresh
 *    - Animated list items
 *    - Loading states
 * 
 * 2. PDF VIEWER:
 *    - react-native-pdf for PDF viewing
 *    - Full-screen modal viewer
 *    - Page navigation
 *    - Zoom/pinch gestures
 * 
 * 3. IMAGE GALLERY:
 *    - react-native-image-viewing for full-screen gallery
 *    - Swipe between images
 *    - Pinch-to-zoom
 *    - Share individual images
 * 
 * 4. SHARING:
 *    - expo-sharing for PDFs and images
 *    - Platform-specific share sheets
 *    - Email integration
 * 
 * 5. EXPORT & DOWNLOAD:
 *    - expo-file-system for downloads
 *    - Save to device gallery
 *    - Cloud storage integration
 * 
 * ==============================================================================
 * REQUIRED API ENDPOINTS
 * ==============================================================================
 * 
 * 1. GET /api/reports/visual?propertyId={id}
 *    Returns: List of visual reports with metadata
 * 
 * 2. GET /api/reports/:reportId/pdf
 *    Returns: Signed URL for PDF download
 * 
 * 3. GET /api/reports/:reportId/images
 *    Returns: Array of image URLs
 * 
 * 4. POST /api/reports/:reportId/share
 *    Body: { recipients: string[], message: string }
 *    Returns: Share link
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] Reports load from API
 * - [ ] FlatList renders correctly
 * - [ ] PDF viewer opens
 * - [ ] PDF navigation works
 * - [ ] Image gallery opens
 * - [ ] Image swipe works
 * - [ ] Pinch-to-zoom works
 * - [ ] Share functionality works
 * - [ ] Download to device works
 * - [ ] Email sharing works
 * - [ ] Pull-to-refresh functional
 * - [ ] Loading states display
 * - [ ] Error handling works
 * - [ ] iOS and Android compatible
 * 
 */

import React from 'react';

// RN: Import React Native core components
// RN: import { View, Text, TouchableOpacity, FlatList, Modal, Share, Alert, Platform, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
// RN: import { useNavigation } from '@react-navigation/native';

// RN: Import animation library
// RN: import Animated, { FadeInDown, FadeIn, Layout, SlideInRight } from 'react-native-reanimated';

// RN: Import PDF viewer
// RN: import Pdf from 'react-native-pdf';
// RN: - Supports page navigation, zoom, pinch gestures
// RN: - Handles both local files and remote URLs

// RN: Import image gallery viewer
// RN: import ImageView from 'react-native-image-viewing';
// RN: - Full-screen image viewing
// RN: - Swipe between images
// RN: - Pinch-to-zoom support

// RN: Import file system and sharing utilities
// RN: import * as Sharing from 'expo-sharing';
// RN: import * as FileSystem from 'expo-file-system';
// RN: import * as MediaLibrary from 'expo-media-library';

// RN: Import TanStack Query for data fetching
// RN: import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// RN: Replace lucide-react with react-native-vector-icons
// RN: import Icon from 'react-native-vector-icons/Feather';
import { Images, Download, Share2, Eye, Plus, FileText, Camera, Calendar } from "lucide-react";

// RN: ==============================================================================
// RN: TYPESCRIPT INTERFACES
// RN: ==============================================================================
// RN:
// RN: interface VisualReport {
// RN:   id: string;
// RN:   title: string;
// RN:   date: string;
// RN:   propertyId: string;
// RN:   propertyAddress: string;
// RN:   images: number;
// RN:   type: 'PDF with Images' | 'Visual Report' | 'Photo Gallery';
// RN:   pdfUrl?: string;
// RN:   shareUrl?: string;
// RN:   thumbnailUrl?: string;
// RN:   createdBy: string;
// RN:   status: 'draft' | 'final' | 'shared';
// RN: }
// RN:
// RN: interface ReportImage {
// RN:   id: string;
// RN:   url: string;
// RN:   caption?: string;
// RN:   timestamp: string;
// RN:   coordinates?: { lat: number; lng: number };
// RN: }

// RN: ==============================================================================
// RN: COMPONENT DEFINITION WITH STATE
// RN: ==============================================================================
export function VisualReportsScreen() {
  // RN: NAVIGATION
  // RN: const navigation = useNavigation();
  
  // RN: STATE FOR MODALS AND SELECTIONS
  // RN: const [selectedReport, setSelectedReport] = useState<VisualReport | null>(null);
  // RN: const [showPdfViewer, setShowPdfViewer] = useState(false);
  // RN: const [showImageGallery, setShowImageGallery] = useState(false);
  // RN: const [galleryImages, setGalleryImages] = useState<{ uri: string }[]>([]);
  // RN: const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // RN: const [refreshing, setRefreshing] = useState(false);
  
  // RN: TANSTACK QUERY - FETCH VISUAL REPORTS
  // RN: const queryClient = useQueryClient();
  // RN: const { 
  // RN:   data: reports = [], 
  // RN:   isLoading, 
  // RN:   error,
  // RN:   refetch 
  // RN: } = useQuery({
  // RN:   queryKey: ['visualReports'],
  // RN:   queryFn: async () => {
  // RN:     const response = await fetch('/api/reports/visual');
  // RN:     if (!response.ok) throw new Error('Failed to fetch reports');
  // RN:     return response.json();
  // RN:   },
  // RN:   staleTime: 5 * 60 * 1000, // 5 minutes
  // RN: });
  
  // RN: HANDLER - VIEW REPORT (PDF OR IMAGE GALLERY)
  // RN: const handleViewReport = async (report: VisualReport) => {
  // RN:   setSelectedReport(report);
  // RN:   
  // RN:   if (report.type === 'PDF with Images' && report.pdfUrl) {
  // RN:     // Open PDF viewer modal
  // RN:     setShowPdfViewer(true);
  // RN:   } else if (report.type === 'Photo Gallery') {
  // RN:     try {
  // RN:       // Fetch images for the report
  // RN:       const response = await fetch(`/api/reports/${report.id}/images`);
  // RN:       const images: ReportImage[] = await response.json();
  // RN:       
  // RN:       // Convert to format expected by image viewer
  // RN:       setGalleryImages(images.map(img => ({ uri: img.url })));
  // RN:       setCurrentImageIndex(0);
  // RN:       setShowImageGallery(true);
  // RN:     } catch (error) {
  // RN:       Alert.alert('Error', 'Failed to load images');
  // RN:     }
  // RN:   } else {
  // RN:     // Navigate to full report details screen
  // RN:     navigation.navigate('ReportDetails', { reportId: report.id });
  // RN:   }
  // RN: };
  
  // RN: HANDLER - DOWNLOAD REPORT TO DEVICE
  // RN: const handleDownload = async (report: VisualReport) => {
  // RN:   try {
  // RN:     if (!report.pdfUrl) {
  // RN:       Alert.alert('Error', 'No PDF available for this report');
  // RN:       return;
  // RN:     }
  // RN:     
  // RN:     // Show downloading alert
  // RN:     Alert.alert('Downloading', 'Please wait...');
  // RN:     
  // RN:     // Download PDF to local file system
  // RN:     const fileName = `${report.title.replace(/\s+/g, '_')}.pdf`;
  // RN:     const fileUri = FileSystem.documentDirectory + fileName;
  // RN:     
  // RN:     const downloadResult = await FileSystem.downloadAsync(
  // RN:       report.pdfUrl,
  // RN:       fileUri
  // RN:     );
  // RN:     
  // RN:     // Request permission to save to media library
  // RN:     const { status } = await MediaLibrary.requestPermissionsAsync();
  // RN:     
  // RN:     if (status === 'granted') {
  // RN:       // Save to device gallery/files
  // RN:       const asset = await MediaLibrary.createAssetAsync(downloadResult.uri);
  // RN:       await MediaLibrary.createAlbumAsync('PolicyAngel Reports', asset, false);
  // RN:       
  // RN:       Alert.alert(
  // RN:         'Success', 
  // RN:         'Report downloaded to your device',
  // RN:         [{ text: 'OK' }]
  // RN:       );
  // RN:     } else {
  // RN:       Alert.alert('Permission Denied', 'Cannot save file without permission');
  // RN:     }
  // RN:   } catch (error) {
  // RN:     console.error('Download error:', error);
  // RN:     Alert.alert('Error', 'Failed to download report');
  // RN:   }
  // RN: };
  
  // RN: HANDLER - SHARE REPORT
  // RN: const handleShare = async (report: VisualReport) => {
  // RN:   try {
  // RN:     const shareContent = {
  // RN:       message: `Check out this inspection report: ${report.title}`,
  // RN:       title: report.title,
  // RN:     };
  // RN:     
  // RN:     // Add URL if available (iOS only)
  // RN:     if (Platform.OS === 'ios' && report.shareUrl) {
  // RN:       shareContent.url = report.shareUrl;
  // RN:     } else if (report.shareUrl) {
  // RN:       shareContent.message += `\n${report.shareUrl}`;
  // RN:     }
  // RN:     
  // RN:     const result = await Share.share(shareContent);
  // RN:     
  // RN:     if (result.action === Share.sharedAction) {
  // RN:       if (result.activityType) {
  // RN:         // Shared with activity type (iOS)
  // RN:         console.log('Shared via:', result.activityType);
  // RN:       } else {
  // RN:         // Shared (Android)
  // RN:         console.log('Report shared successfully');
  // RN:       }
  // RN:     } else if (result.action === Share.dismissedAction) {
  // RN:       // Share dismissed
  // RN:       console.log('Share cancelled');
  // RN:     }
  // RN:   } catch (error) {
  // RN:     console.error('Share error:', error);
  // RN:     Alert.alert('Error', 'Failed to share report');
  // RN:   }
  // RN: };
  
  // RN: HANDLER - PULL TO REFRESH
  // RN: const onRefresh = useCallback(async () => {
  // RN:   setRefreshing(true);
  // RN:   await refetch();
  // RN:   setRefreshing(false);
  // RN: }, [refetch]);
  
  // RN: HANDLER - CREATE NEW REPORT
  // RN: const handleCreateReport = () => {
  // RN:   navigation.navigate('CreateReport');
  // RN: };
  
  // RN: MOCK DATA - Replace with API response from TanStack Query
  const reports = [
    {
      title: 'Roof Inspection Report', // RN: San Francisco property
      date: 'Jan 20, 2025', // RN: Format with date-fns
      images: 12, // RN: Image count from drone inspection
      type: 'PDF with Images', // RN: Report type determines viewer
    },
    {
      title: 'Property Overview 2025',
      date: 'Jan 15, 2025',
      images: 24,
      type: 'Visual Report',
    },
    {
      title: 'Damage Assessment',
      date: 'Jan 10, 2025',
      images: 8,
      type: 'Photo Gallery',
    },
  ];

  // RN: RENDER - LOADING STATE
  // RN: if (isLoading) {
  // RN:   return (
  // RN:     <SafeAreaView style={styles.container}>
  // RN:       <View style={styles.loadingContainer}>
  // RN:         <ActivityIndicator size="large" color="#3b82f6" />
  // RN:         <Text style={styles.loadingText}>Loading reports...</Text>
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
  // RN:         <Text style={styles.errorTitle}>Failed to load reports</Text>
  // RN:         <Text style={styles.errorMessage}>{error.message}</Text>
  // RN:         <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
  // RN:           <Text style={styles.retryButtonText}>Retry</Text>
  // RN:         </TouchableOpacity>
  // RN:       </View>
  // RN:     </SafeAreaView>
  // RN:   );
  // RN: }

  return (
    // RN: ROOT CONTAINER - SafeAreaView for safe areas (notch, home indicator)
    // RN: <SafeAreaView style={styles.container}>
    // RN:   {/* ScrollView with RefreshControl for pull-to-refresh */}
    // RN:   <ScrollView
    // RN:     contentContainerStyle={styles.scrollContent}
    // RN:     refreshControl={
    // RN:       <RefreshControl
    // RN:         refreshing={refreshing}
    // RN:         onRefresh={onRefresh}
    // RN:         tintColor="#3b82f6"
    // RN:         colors={['#3b82f6']} // Android
    // RN:       />
    // RN:     }
    // RN:     showsVerticalScrollIndicator={false}
    // RN:   >
    <div 
      className="w-full h-full flex flex-col" // RN: Replace with View
      style={{ 
        padding: 'var(--spacing-6)', // RN: SPACING.spacing6 from design tokens
        gap: 'var(--spacing-4)', // RN: marginBottom on children instead of gap
        paddingBottom: 'calc(var(--nav-height) + var(--spacing-8))' // RN: Account for bottom tab nav
      }}
    >
      {/* RN: ========================================================================== */}
      {/* RN: HEADER SECTION */}
      {/* RN: ========================================================================== */}
      {/* RN: <View style={styles.header}> */}
      <div style={{ paddingTop: 'var(--spacing-2)' }}>
        {/* RN: Title Row with Icon */}
        {/* RN: <View style={styles.titleRow}> */}
        <div className="flex items-center" style={{ gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-2)' }}>
          {/* RN: Icon from react-native-vector-icons */}
          {/* RN: <Icon name="image" size={20} color="#3b82f6" /> */}
          <Images className="w-5 h-5" style={{ color: '#3b82f6' }} />
          {/* RN: <Text style={styles.title}> */}
          <h1 style={{ color: 'var(--text-primary)' }}> {/* RN: COLORS.textPrimary */}
            Visual Reports
          </h1>
          {/* RN: </Text> */}
        </div>
        {/* RN: </View> */}
        
        {/* RN: Subtitle */}
        {/* RN: <Text style={styles.subtitle}> */}
        <p style={{ color: 'var(--text-secondary)' }}> {/* RN: COLORS.textSecondary */}
          Photo-based inspection documentation
        </p>
        {/* RN: </Text> */}
      </div>
      {/* RN: </View> */}

      {/* RN: ========================================================================== */}
      {/* RN: REPORTS LIST */}
      {/* RN: ========================================================================== */}
      {/* RN: Alternative: Use FlatList for better performance with large lists */}
      {/* RN: <FlatList
        RN:   data={reports}
        RN:   keyExtractor={(item) => item.id}
        RN:   renderItem={({ item: report, index }) => (
        RN:     <ReportCard report={report} index={index} />
        RN:   )}
        RN:   contentContainerStyle={styles.listContent}
        RN:   ItemSeparatorComponent={() => <View style={styles.separator} />}
        RN:   ListEmptyComponent={<EmptyState />}
        RN:   refreshControl={...}
        RN: /> */}
      {/* RN: <View style={styles.reportsContainer}> */}
      <div className="flex flex-col" style={{ gap: 'var(--spacing-3)' }}>
        {reports.map((report, index) => (
          <React.Fragment key={index}>
          {/* RN: REPORT CARD */}
          {/* RN: Wrap in Animated.View for entrance animation */}
          {/* RN: <Animated.View */}
          {/* RN:   key={report.id} */}
          {/* RN:   entering={FadeInDown.delay(index * 100)} */}
          {/* RN:   layout={Layout.springify()} */}
          {/* RN: > */}
          {/* RN:   Card Container */}
          {/* RN:   <View style={styles.reportCard}> */}
          <div

            className="backdrop-blur-md" // RN: Not supported - use backgroundColor with opacity
            style={{
              backgroundColor: 'var(--glass-bg)', // RN: COLORS.glassBg
              borderRadius: 'var(--radius-lg)', // RN: RADIUS.radiusLg (e.g., 16)
              border: '1px solid var(--glass-border)', // RN: borderWidth: 1, borderColor: COLORS.glassBorder
              padding: 'var(--spacing-4)', // RN: SPACING.spacing4
            }}
          >
            {/* RN: CARD HEADER - Icon, Title, Metadata */}
            {/* RN: <View style={styles.cardHeader}> */}
            <div className="flex items-start" style={{ gap: 'var(--spacing-3)', marginBottom: 'var(--spacing-3)' }}>
              {/* RN: Report Icon Container */}
              {/* RN: <View style={styles.iconContainer}> */}
              <div 
                className="flex items-center justify-center"
                style={{
                  width: '48px', // RN: Fixed size for consistent layout
                  height: '48px',
                  borderRadius: 'var(--radius-md)', // RN: RADIUS.radiusMd
                  backgroundColor: 'rgba(59, 130, 246, 0.1)', // RN: Blue tint background
                  color: '#3b82f6', // RN: Icon color
                  flexShrink: 0, // RN: Prevent icon from shrinking
                }}
              >
                {/* RN: <Icon name="image" size={20} color="#3b82f6" /> */}
                <Images className="w-5 h-5" />
              </div>
              {/* RN: </View> */}
              
              {/* RN: Report Details */}
              {/* RN: <View style={styles.reportDetails}> */}
              <div style={{ flex: 1 }}> {/* RN: flex: 1 to take remaining space */}
                {/* RN: Report Title */}
                {/* RN: <Text style={styles.reportTitle} numberOfLines={2}> */}
                <div style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-1)' }}>
                  {report.title} {/* RN: {report.title} */}
                </div>
                {/* RN: </Text> */}
                
                {/* RN: Report Type Badge */}
                {/* RN: <Text style={styles.reportType}> */}
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: 'var(--spacing-1)' }}>
                  {report.type} {/* RN: {report.type} */}
                </div>
                {/* RN: </Text> */}
                
                {/* RN: Report Metadata - Images Count & Date */}
                {/* RN: <Text style={styles.reportMeta}> */}
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  {report.images} images • {report.date}
                  {/* RN: {report.images} images • {format(new Date(report.date), 'MMM dd, yyyy')} */}
                </div>
                {/* RN: </Text> */}
              </div>
              {/* RN: </View> */}
            </div>
            {/* RN: </View> - End cardHeader */}
            
            {/* RN: CARD ACTIONS - View, Download, Share Buttons */}
            {/* RN: <View style={styles.cardActions}> */}
            <div className="flex items-center" style={{ gap: 'var(--spacing-2)' }}>
              {/* RN: VIEW BUTTON - Primary action with label */}
              {/* RN: <TouchableOpacity
                RN:   style={[styles.actionButton, styles.primaryAction]}
                RN:   onPress={() => handleViewReport(report)}
                RN:   activeOpacity={0.7}
                RN: > */}
              <button 
                className="flex items-center justify-center flex-1" // RN: flex: 1 to fill available space
                style={{
                  padding: 'var(--spacing-2)', // RN: SPACING.spacing2
                  borderRadius: 'var(--radius-sm)', // RN: RADIUS.radiusSm
                  backgroundColor: 'rgba(59, 130, 246, 0.1)', // RN: Semi-transparent blue
                  gap: 'var(--spacing-2)', // RN: Space between icon and text
                }}
              >
                {/* RN: <Icon name="eye" size={12} color="#3b82f6" /> */}
                <Eye className="w-3 h-3" style={{ color: '#3b82f6' }} />
                {/* RN: <Text style={styles.actionButtonText}> */}
                <span style={{ color: '#3b82f6', fontSize: '0.875rem' }}>View</span>
                {/* RN: </Text> */}
              </button>
              {/* RN: </TouchableOpacity> */}
              
              {/* RN: DOWNLOAD BUTTON - Icon only */}
              {/* RN: <TouchableOpacity
                RN:   style={styles.actionButton}
                RN:   onPress={() => handleDownload(report)}
                RN:   activeOpacity={0.7}
                RN: > */}
              <button 
                className="flex items-center justify-center"
                style={{
                  padding: 'var(--spacing-2)', // RN: SPACING.spacing2
                  borderRadius: 'var(--radius-sm)', // RN: RADIUS.radiusSm
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                }}
              >
                {/* RN: <Icon name="download" size={12} color="#3b82f6" /> */}
                <Download className="w-3 h-3" style={{ color: '#3b82f6' }} />
              </button>
              {/* RN: </TouchableOpacity> */}
              
              {/* RN: SHARE BUTTON - Icon only */}
              {/* RN: <TouchableOpacity
                RN:   style={styles.actionButton}
                RN:   onPress={() => handleShare(report)}
                RN:   activeOpacity={0.7}
                RN: > */}
              <button 
                className="flex items-center justify-center"
                style={{
                  padding: 'var(--spacing-2)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                }}
              >
                {/* RN: <Icon name="share-2" size={12} color="#3b82f6" /> */}
                <Share2 className="w-3 h-3" style={{ color: '#3b82f6' }} />
              </button>
              {/* RN: </TouchableOpacity> */}
            </div>
            {/* RN: </View> - End cardActions */}
          </div>
          {/* RN: </View> - End reportCard */}
          {/* RN: </Animated.View> */}
          </React.Fragment>
        ))}
      </div>
      {/* RN: </View> - End reportsContainer */}

      {/* RN: ========================================================================== */}
      {/* RN: CREATE NEW REPORT BUTTON */}
      {/* RN: ========================================================================== */}
      {/* RN: <TouchableOpacity
        RN:   style={styles.createButton}
        RN:   onPress={handleCreateReport}
        RN:   activeOpacity={0.8}
        RN: > */}
      <button
        className="backdrop-blur-md active:scale-98 transition-all" // RN: active:scale-98 not supported
        style={{
          backgroundColor: 'rgba(59, 130, 246, 0.2)', // RN: Semi-transparent blue
          borderRadius: 'var(--radius-lg)', // RN: RADIUS.radiusLg
          border: '1px solid #3b82f6', // RN: borderWidth: 1, borderColor: '#3b82f6'
          padding: 'var(--spacing-4)', // RN: SPACING.spacing4
          color: '#3b82f6',
        }}
      >
        {/* RN: <View style={styles.createButtonContent}> */}
        {/* RN:   <Icon name="plus" size={20} color="#3b82f6" /> */}
        {/* RN:   <Text style={styles.createButtonText}> */}
        Create New Visual Report
        {/* RN:   </Text> */}
        {/* RN: </View> */}
      </button>
      {/* RN: </TouchableOpacity> */}
    </div>
    // RN:   </ScrollView>
    
    // RN:   {/* ====================================================================== */}
    // RN:   {/* PDF VIEWER MODAL */}
    // RN:   {/* ====================================================================== */}
    // RN:   <Modal
    // RN:     visible={showPdfViewer}
    // RN:     animationType="slide"
    // RN:     onRequestClose={() => setShowPdfViewer(false)}
    // RN:   >
    // RN:     <SafeAreaView style={styles.modalContainer}>
    // RN:       {/* Modal Header */}
    // RN:       <View style={styles.modalHeader}>
    // RN:         <TouchableOpacity
    // RN:           onPress={() => setShowPdfViewer(false)}
    // RN:           style={styles.closeButton}
    // RN:         >
    // RN:           <Icon name="x" size={24} color="#ffffff" />
    // RN:         </TouchableOpacity>
    // RN:         <Text style={styles.modalTitle}>{selectedReport?.title}</Text>
    // RN:         <View style={{ width: 24 }} /> {/* Spacer for center alignment */}
    // RN:       </View>
    // RN:       
    // RN:       {/* PDF Viewer Component */}
    // RN:       {selectedReport?.pdfUrl && (
    // RN:         <Pdf
    // RN:           source={{ uri: selectedReport.pdfUrl, cache: true }}
    // RN:           style={styles.pdfViewer}
    // RN:           onLoadComplete={(numberOfPages) => {
    // RN:             console.log(`PDF loaded: ${numberOfPages} pages`);
    // RN:           }}
    // RN:           onPageChanged={(page, numberOfPages) => {
    // RN:             console.log(`Current page: ${page}/${numberOfPages}`);
    // RN:           }}
    // RN:           onError={(error) => {
    // RN:             console.error('PDF Error:', error);
    // RN:             Alert.alert('Error', 'Failed to load PDF');
    // RN:           }}
    // RN:           enablePaging={true}
    // RN:           horizontal={false}
    // RN:           spacing={10}
    // RN:           minScale={1.0}
    // RN:           maxScale={3.0}
    // RN:         />
    // RN:       )}
    // RN:     </SafeAreaView>
    // RN:   </Modal>
    
    // RN:   {/* ====================================================================== */}
    // RN:   {/* IMAGE GALLERY MODAL */}
    // RN:   {/* ====================================================================== */}
    // RN:   <ImageView
    // RN:     images={galleryImages}
    // RN:     imageIndex={currentImageIndex}
    // RN:     visible={showImageGallery}
    // RN:     onRequestClose={() => setShowImageGallery(false)}
    // RN:     HeaderComponent={({ imageIndex }) => (
    // RN:       <View style={styles.galleryHeader}>
    // RN:         <Text style={styles.galleryTitle}>
    // RN:           {imageIndex + 1} / {galleryImages.length}
    // RN:         </Text>
    // RN:         <TouchableOpacity
    // RN:           onPress={() => setShowImageGallery(false)}
    // RN:           style={styles.closeButton}
    // RN:         >
    // RN:           <Icon name="x" size={24} color="#ffffff" />
    // RN:         </TouchableOpacity>
    // RN:       </View>
    // RN:     )}
    // RN:     FooterComponent={({ imageIndex }) => (
    // RN:       <View style={styles.galleryFooter}>
    // RN:         <TouchableOpacity
    // RN:           style={styles.galleryAction}
    // RN:           onPress={() => {
    // RN:             const currentImage = galleryImages[imageIndex];
    // RN:             if (currentImage) {
    // RN:               Share.share({
    // RN:                 message: 'Check out this inspection photo',
    // RN:                 url: currentImage.uri
    // RN:               });
    // RN:             }
    // RN:           }}
    // RN:         >
    // RN:           <Icon name="share-2" size={20} color="#ffffff" />
    // RN:           <Text style={styles.galleryActionText}>Share</Text>
    // RN:         </TouchableOpacity>
    // RN:       </View>
    // RN:     )}
    // RN:     backgroundColor="#000000"
    // RN:   />
    // RN: </SafeAreaView>
  );
}

/**
 * ==============================================================================
 * REACT NATIVE STYLESHEET EXAMPLE
 * ==============================================================================
 * 
 * RN: Complete StyleSheet for VisualReportsScreen
 * 
 * import { StyleSheet, Dimensions, Platform } from 'react-native';
 * 
 * const { width, height } = Dimensions.get('window');
 * 
 * const styles = StyleSheet.create({
 *   // Container and Layout
 *   container: {
 *     flex: 1,
 *     backgroundColor: COLORS.bgPrimary,
 *   },
 *   scrollContent: {
 *     padding: SPACING.spacing6,
 *     paddingBottom: NAV_HEIGHT + SPACING.spacing8,
 *   },
 *   
 *   // Header
 *   header: {
 *     paddingTop: SPACING.spacing2,
 *     marginBottom: SPACING.spacing4,
 *   },
 *   titleRow: {
 *     flexDirection: 'row',
 *     alignItems: 'center',
 *     gap: SPACING.spacing2,
 *     marginBottom: SPACING.spacing2,
 *   },
 *   title: {
 *     color: COLORS.textPrimary,
 *   },
 *   subtitle: {
 *     color: COLORS.textSecondary,
 *   },
 *   
 *   // Reports List
 *   reportsContainer: {
 *     gap: SPACING.spacing3,
 *   },
 *   reportCard: {
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
 *   
 *   // Card Header
 *   cardHeader: {
 *     flexDirection: 'row',
 *     gap: SPACING.spacing3,
 *     marginBottom: SPACING.spacing3,
 *   },
 *   iconContainer: {
 *     width: 48,
 *     height: 48,
 *     borderRadius: RADIUS.radiusMd,
 *     backgroundColor: 'rgba(59, 130, 246, 0.1)',
 *     alignItems: 'center',
 *     justifyContent: 'center',
 *   },
 *   reportDetails: {
 *     flex: 1,
 *   },
 *   reportTitle: {
 *     color: COLORS.textPrimary,
 *     marginBottom: SPACING.spacing1,
 *   },
 *   reportType: {
 *     color: COLORS.textSecondary,
 *     fontSize: 14,
 *     marginBottom: SPACING.spacing1,
 *   },
 *   reportMeta: {
 *     color: COLORS.textSecondary,
 *     fontSize: 14,
 *   },
 *   
 *   // Card Actions
 *   cardActions: {
 *     flexDirection: 'row',
 *     gap: SPACING.spacing2,
 *   },
 *   actionButton: {
 *     padding: SPACING.spacing2,
 *     borderRadius: RADIUS.radiusSm,
 *     backgroundColor: 'rgba(59, 130, 246, 0.1)',
 *     alignItems: 'center',
 *     justifyContent: 'center',
 *   },
 *   primaryAction: {
 *     flex: 1,
 *     flexDirection: 'row',
 *     gap: SPACING.spacing2,
 *   },
 *   actionButtonText: {
 *     color: '#3b82f6',
 *     fontSize: 14,
 *   },
 *   
 *   // Create Button
 *   createButton: {
 *     backgroundColor: 'rgba(59, 130, 246, 0.2)',
 *     borderRadius: RADIUS.radiusLg,
 *     borderWidth: 1,
 *     borderColor: '#3b82f6',
 *     padding: SPACING.spacing4,
 *     alignItems: 'center',
 *     marginTop: SPACING.spacing2,
 *   },
 *   createButtonContent: {
 *     flexDirection: 'row',
 *     alignItems: 'center',
 *     gap: SPACING.spacing2,
 *   },
 *   createButtonText: {
 *     color: '#3b82f6',
 *     fontSize: 16,
 *     fontWeight: '600',
 *   },
 *   
 *   // Modal Styles
 *   modalContainer: {
 *     flex: 1,
 *     backgroundColor: '#000000',
 *   },
 *   modalHeader: {
 *     flexDirection: 'row',
 *     alignItems: 'center',
 *     justifyContent: 'space-between',
 *     padding: SPACING.spacing4,
 *     backgroundColor: 'rgba(0, 0, 0, 0.8)',
 *   },
 *   modalTitle: {
 *     color: '#ffffff',
 *     fontSize: 16,
 *     fontWeight: '600',
 *   },
 *   closeButton: {
 *     padding: SPACING.spacing2,
 *   },
 *   
 *   // PDF Viewer
 *   pdfViewer: {
 *     flex: 1,
 *     width,
 *     height,
 *   },
 *   
 *   // Image Gallery
 *   galleryHeader: {
 *     position: 'absolute',
 *     top: Platform.OS === 'ios' ? 44 : 20,
 *     left: 0,
 *     right: 0,
 *     flexDirection: 'row',
 *     justifyContent: 'space-between',
 *     alignItems: 'center',
 *     paddingHorizontal: SPACING.spacing4,
 *     zIndex: 100,
 *   },
 *   galleryTitle: {
 *     color: '#ffffff',
 *     fontSize: 16,
 *     fontWeight: '600',
 *   },
 *   galleryFooter: {
 *     position: 'absolute',
 *     bottom: Platform.OS === 'ios' ? 44 : 20,
 *     left: 0,
 *     right: 0,
 *     flexDirection: 'row',
 *     justifyContent: 'center',
 *     paddingHorizontal: SPACING.spacing4,
 *   },
 *   galleryAction: {
 *     flexDirection: 'row',
 *     alignItems: 'center',
 *     gap: SPACING.spacing2,
 *     backgroundColor: 'rgba(59, 130, 246, 0.9)',
 *     paddingHorizontal: SPACING.spacing4,
 *     paddingVertical: SPACING.spacing3,
 *     borderRadius: RADIUS.radiusFull,
 *   },
 *   galleryActionText: {
 *     color: '#ffffff',
 *     fontSize: 16,
 *     fontWeight: '600',
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
 * });
 */

/**
 * ==============================================================================
 * ADDITIONAL TESTING SCENARIOS
 * ==============================================================================
 * 
 * PERFORMANCE:
 * - [ ] Test with 50+ reports
 * - [ ] Scroll performance smooth
 * - [ ] Image loading doesn't block UI
 * - [ ] PDF rendering performance
 * - [ ] Memory usage acceptable
 * 
 * FUNCTIONALITY:
 * - [ ] Pull-to-refresh updates data
 * - [ ] View button opens correct viewer
 * - [ ] PDF pages navigate correctly
 * - [ ] Image gallery swipe works
 * - [ ] Pinch-to-zoom responsive
 * - [ ] Download saves to correct location
 * - [ ] Share sheet appears
 * - [ ] Offline behavior graceful
 * 
 * EDGE CASES:
 * - [ ] No reports show empty state
 * - [ ] Network error shows error state
 * - [ ] Missing PDF URL handled
 * - [ ] Large images load correctly
 * - [ ] Corrupted PDF shows error
 * - [ ] Permission denied handled
 * 
 * ACCESSIBILITY:
 * - [ ] Screen reader announces reports
 * - [ ] Buttons have accessibility labels
 * - [ ] Color contrast sufficient
 * - [ ] Touch targets 44x44 minimum
 * - [ ] Keyboard navigation (if applicable)
 */
