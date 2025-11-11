/**
 * ==============================================================================
 * GALLERYSCREEN.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Photo gallery for property damage documentation, inspection photos,
 * and document scans with multi-select, sharing, and organization features.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. PHOTO GRID:
 *    - Use FlatList with numColumns for grid
 *    - Or react-native-masonry-list for Pinterest-style
 *    - FastImage for image caching
 *    - Lazy loading for performance
 * 
 * 2. IMAGE VIEWER:
 *    - react-native-image-viewing for full-screen
 *    - Pinch-to-zoom, swipe between photos
 *    - Share and download options
 * 
 * 3. CAMERA INTEGRATION:
 *    - expo-camera or react-native-vision-camera
 *    - Camera permissions handling
 *    - Photo capture with preview
 *    - Link to PhotoCaptureScreen
 * 
 * 4. MULTI-SELECT:
 *    - Long press to enter select mode
 *    - Checkboxes on images
 *    - Batch actions (delete, share, download)
 * 
 * 5. SHARING:
 *    - expo-sharing or react-native-share
 *    - Share multiple photos
 *    - Save to device photos
 * 
 * ==============================================================================
 * MOCK DATA - REPLACE WITH REAL API
 * ==============================================================================
 * 
 * REQUIRED API ENDPOINTS:
 * 
 * 1. GET /api/photos
 *    Query: propertyId, type, startDate, endDate
 *    Returns: List of photos with metadata
 * 
 * 2. POST /api/photos/upload
 *    Body: FormData with image
 *    Returns: Photo ID, URL
 * 
 * 3. DELETE /api/photos/:photoId
 * 
 * 4. DELETE /api/photos/batch
 *    Body: photoIds array
 * 
 * ==============================================================================
 * REACT NATIVE COMPONENT MAPPING
 * ==============================================================================
 * 
 * - div → View
 * - button → TouchableOpacity
 * - Grid → FlatList with numColumns
 * - Image → FastImage
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] Photos load in grid
 * - [ ] Tap photo opens viewer
 * - [ ] Swipe between photos
 * - [ ] Pinch zoom works
 * - [ ] Multi-select enabled
 * - [ ] Delete photos works
 * - [ ] Share photos works
 * - [ ] Download works
 * - [ ] Camera button works
 * - [ ] Grid/list toggle works
 * - [ ] iOS and Android compatible
 * 
 */

// RN: Import React Native components
// RN: import { View, Text, FlatList, TouchableOpacity, Image, Pressable, SafeAreaView } from 'react-native';
import React, { useState } from 'react';

// RN: Replace lucide-react with react-native-vector-icons
// RN: import Icon from 'react-native-vector-icons/Feather';
import { ArrowLeft, Download, Share2, Trash2, Check, Grid3x3, LayoutGrid, X, Plus } from 'lucide-react';

// RN: Replace with FastImage for better caching
// RN: import FastImage from 'react-native-fast-image';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

// RN: Replace figma:asset with require() or remote URL
// RN: const backgroundImage = require('../assets/background.png');
import backgroundImage from 'figma:asset/6bc293cc2411bf03ee3bbe4efc155bed7446b706.png';

interface GalleryScreenProps {
  onBack?: () => void;
  onOpenCamera?: () => void;
  // RN: Add React Navigation props
  // RN: navigation: NavigationProp<any>;
  // RN: route: RouteProp<any>;
}

interface Photo {
  id: string;
  url: string; // RN: Must be full URL or local asset
  timestamp: Date;
  type: 'damage' | 'inspection' | 'document';
}

// RN: COMPONENT STRUCTURE:
// RN: <SafeAreaView> → Root container with safe area handling
// RN:   <View> → Header with back button, title, actions
// RN:   <FlatList> → Photo grid with numColumns={3}
// RN:     <TouchableOpacity> → Photo item
// RN:       <FastImage> → Cached image
// RN:   <Pressable> → Floating action button
export function GalleryScreen({ onBack, onOpenCamera }: GalleryScreenProps) {
  // RN: STATE MANAGEMENT
  const [selectedPhotos, setSelectedPhotos] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // RN: ADD ADDITIONAL STATE FOR REACT NATIVE:
  // RN: const [refreshing, setRefreshing] = useState(false);
  // RN: const [imageViewerVisible, setImageViewerVisible] = useState(false);
  // RN: const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // RN: MOCK DATA - REPLACE WITH API CALL
  // RN: Use TanStack Query:
  // RN: const { data: photos, isLoading, refetch } = useQuery({
  // RN:   queryKey: ['photos'],
  // RN:   queryFn: () => photoApi.getPhotos()
  // RN: });
  const photos: Photo[] = [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1707317683665-972a5561c74e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mJTIwc3Rvcm0lMjBkYW1hZ2V8ZW58MXx8fHwxNzYxMzQ3ODc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      type: 'damage',
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1648840887119-a9d33c964054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMGV4dGVyaW9yJTIwcHJvcGVydHl8ZW58MXx8fHwxNzYxMzQ3NzYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      type: 'inspection',
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1702047816443-a115804039bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mJTIwZGFtYWdlJTIwcHJvcGVydHl8ZW58MXx8fHwxNzYxMzQ4NjAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      type: 'damage',
    },
    {
      id: '4',
      url: 'https://images.unsplash.com/photo-1634853982486-c06f0e17940f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMGV4dGVyaW9yJTIwc3Rvcm18ZW58MXx8fHwxNzYxMzQ4NjAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      type: 'inspection',
    },
    {
      id: '5',
      url: 'https://images.unsplash.com/photo-1671293374825-37793d046394?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWlsZGluZyUyMGluc3BlY3Rpb258ZW58MXx8fHwxNzYxMzQ4NjA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      type: 'inspection',
    },
    {
      id: '6',
      url: 'https://images.unsplash.com/photo-1728922959825-7012ac6a435a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9wZXJ0eSUyMGRhbWFnZSUyMGFzc2Vzc21lbnR8ZW58MXx8fHwxNzYxMzQ4NjA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      type: 'damage',
    },
    {
      id: '7',
      url: 'https://images.unsplash.com/photo-1755113717103-eceec858546a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMHJvb2Z8ZW58MXx8fHwxNzYxMzQ4NjA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      type: 'inspection',
    },
    {
      id: '8',
      url: 'https://images.unsplash.com/photo-1593933955275-e17bb8d011ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMHNpZGluZyUyMGRhbWFnZXxlbnwxfHx8fDE3NjEzNDg2MDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), // 4 days ago
      type: 'damage',
    },
  ];

  // RN: FUNCTION: togglePhotoSelection
  // RN: - Called on photo press
  // RN: - Updates selection state
  // RN: - In RN, use Pressable onPress instead of button onClick
  const togglePhotoSelection = (photoId: string) => {
    const newSelection = new Set(selectedPhotos);
    if (newSelection.has(photoId)) {
      newSelection.delete(photoId);
    } else {
      newSelection.add(photoId);
    }
    setSelectedPhotos(newSelection);
  };

  // RN: FUNCTION: formatTimestamp
  // RN: - Formats date for display
  // RN: - Same logic works in React Native
  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      return `${diffDays}d ago`;
    }
  };

  const getTypeLabel = (type: Photo['type']) => {
    switch (type) {
      case 'damage':
        return 'Damage';
      case 'inspection':
        return 'Inspection';
      case 'document':
        return 'Document';
    }
  };

  const getTypeBadgeColor = (type: Photo['type']) => {
    switch (type) {
      case 'damage':
        return 'rgba(239, 68, 68, 0.2)'; // Red
      case 'inspection':
        return 'rgba(59, 130, 246, 0.2)'; // Blue
      case 'document':
        return 'rgba(34, 197, 94, 0.2)'; // Green
    }
  };

  const getTypeTextColor = (type: Photo['type']) => {
    switch (type) {
      case 'damage':
        return 'rgba(239, 68, 68, 1)';
      case 'inspection':
        return 'rgba(59, 130, 246, 1)';
      case 'document':
        return 'rgba(34, 197, 94, 1)';
    }
  };

  // RN: HANDLER: onRefresh (for pull-to-refresh)
  // RN: const onRefresh = async () => {
  // RN:   setRefreshing(true);
  // RN:   await refetch();
  // RN:   setRefreshing(false);
  // RN: };

  // RN: HANDLER: handlePhotoPress (for full-screen viewer)
  // RN: const handlePhotoPress = (index: number) => {
  // RN:   setSelectedImageIndex(index);
  // RN:   setImageViewerVisible(true);
  // RN: };

  // RN: HANDLER: handleShare (share photos)
  // RN: const handleShare = async () => {
  // RN:   const selectedPhotoUrls = photos
  // RN:     .filter(p => selectedPhotos.has(p.id))
  // RN:     .map(p => p.url);
  // RN:   
  // RN:   await Share.share({
  // RN:     title: 'Property Photos',
  // RN:     urls: selectedPhotoUrls // iOS
  // RN:   });
  // RN: };

  // RN: HANDLER: handleDelete (delete photos)
  // RN: const handleDelete = async () => {
  // RN:   Alert.alert(
  // RN:     'Delete Photos',
  // RN:     `Delete ${selectedPhotos.size} photo(s)?`,
  // RN:     [
  // RN:       { text: 'Cancel', style: 'cancel' },
  // RN:       { 
  // RN:         text: 'Delete', 
  // RN:         style: 'destructive',
  // RN:         onPress: async () => {
  // RN:           await photoApi.deletePhotos(Array.from(selectedPhotos));
  // RN:           setSelectedPhotos(new Set());
  // RN:           refetch();
  // RN:         }
  // RN:       }
  // RN:     ]
  // RN:   );
  // RN: };

  return (
    // RN: ROOT CONTAINER
    // RN: <SafeAreaView style={styles.container}>
    <div 
      className="w-full h-full relative flex flex-col"
      style={{
        backgroundColor: 'var(--color-bg-primary)',
      }}
    >
      {/* BACKGROUND IMAGE 
       * RN: Replace div with Image component:
       * RN: <Image 
       * RN:   source={backgroundImage}
       * RN:   style={styles.backgroundImage}
       * RN:   resizeMode="cover"
       * RN: />
       * RN: 
       * RN: StyleSheet:
       * RN: backgroundImage: {
       * RN:   position: 'absolute',
       * RN:   bottom: 0,
       * RN:   left: 0,
       * RN:   right: 0,
       * RN:   height: 400,
       * RN:   opacity: 0.12,
       * RN: }
       */}
      <div
        className="absolute"
        style={{
          bottom: 0,
          left: 0,
          right: 0,
          height: '400px',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat',
          opacity: 0.12,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {/* HEADER
       * RN: <View style={styles.header}>
       * RN:   {selectedPhotos.size > 0 ? (
       * RN:     <TouchableOpacity onPress={() => setSelectedPhotos(new Set())}>
       * RN:       <Icon name="x" size={24} color={theme.colors.textPrimary} />
       * RN:     </TouchableOpacity>
       * RN:   ) : (
       * RN:     <TouchableOpacity onPress={navigation.goBack}>
       * RN:       <Icon name="arrow-left" size={20} color={theme.colors.textPrimary} />
       * RN:       <Text style={styles.backText}>Back</Text>
       * RN:     </TouchableOpacity>
       * RN:   )}
       * RN:   <Text style={styles.headerTitle}>
       * RN:     {selectedPhotos.size > 0 ? `${selectedPhotos.size} Selected` : 'Gallery'}
       * RN:   </Text>
       * RN:   {selectedPhotos.size > 0 ? (
       * RN:     <View style={styles.headerActions}>
       * RN:       <TouchableOpacity onPress={handleShare}>
       * RN:         <Icon name="share-2" size={20} />
       * RN:       </TouchableOpacity>
       * RN:       <TouchableOpacity onPress={handleDelete}>
       * RN:         <Icon name="trash-2" size={20} color="#ef4444" />
       * RN:       </TouchableOpacity>
       * RN:     </View>
       * RN:   ) : (
       * RN:     <TouchableOpacity onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
       * RN:       <Icon name={viewMode === 'grid' ? 'layout' : 'grid'} size={20} />
       * RN:     </TouchableOpacity>
       * RN:   )}
       * RN: </View>
       * RN:
       * RN: StyleSheet:
       * RN: header: {
       * RN:   flexDirection: 'row',
       * RN:   alignItems: 'center',
       * RN:   justifyContent: 'space-between',
       * RN:   padding: 16,
       * RN:   backgroundColor: theme.colors.glassBg,
       * RN:   borderBottomWidth: 1,
       * RN:   borderBottomColor: 'rgba(255, 255, 255, 0.1)',
       * RN: }
       */}
      <div 
        className="flex items-center justify-between backdrop-blur-md relative"
        style={{
          padding: 'calc(env(safe-area-inset-top, 0px) + var(--spacing-4)) var(--spacing-5) var(--spacing-4)',
          backgroundColor: 'var(--glass-bg)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          zIndex: 10,
        }}
      >
        {/* Left: Back Button or Cancel */}
        {selectedPhotos.size > 0 ? (
          <button
            onClick={() => setSelectedPhotos(new Set())}
            className="transition-all active:scale-95"
          >
            <X className="w-6 h-6" style={{ color: 'var(--color-text-primary)' }} />
          </button>
        ) : (
          <button 
            onClick={onBack}
            className="transition-all active:scale-95"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-2)',
            }}
          >
            <ArrowLeft className="w-5 h-5" style={{ color: 'var(--color-text-primary)' }} />
            <span
              style={{
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--color-text-primary)',
              }}
            >
              Back
            </span>
          </button>
        )}

        {/* Center: Title or Selection Count */}
        <h1
          style={{
            fontSize: 'var(--text-xl)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--color-text-primary)',
          }}
        >
          {selectedPhotos.size > 0 ? `${selectedPhotos.size} Selected` : 'Gallery'}
        </h1>

        {/* Right: View Mode Toggle or Actions */}
        {selectedPhotos.size > 0 ? (
          <div className="flex items-center" style={{ gap: 'var(--spacing-3)' }}>
            <button
              className="transition-all active:scale-95"
              onClick={() => console.log('Share photos')}
            >
              <Share2 className="w-5 h-5" style={{ color: 'var(--color-text-primary)' }} />
            </button>
            <button
              className="transition-all active:scale-95"
              onClick={() => console.log('Delete photos')}
            >
              <Trash2 className="w-5 h-5" style={{ color: '#ef4444' }} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="transition-all active:scale-95"
          >
            {viewMode === 'grid' ? (
              <LayoutGrid className="w-5 h-5" style={{ color: 'var(--color-text-primary)' }} />
            ) : (
              <Grid3x3 className="w-5 h-5" style={{ color: 'var(--color-text-primary)' }} />
            )}
          </button>
        )}
      </div>

      {/* GALLERY CONTENT
       * RN: Use FlatList with pull-to-refresh:
       * RN: <FlatList
       * RN:   data={photos}
       * RN:   renderItem={({ item, index }) => <PhotoItem photo={item} index={index} />}
       * RN:   keyExtractor={(item) => item.id}
       * RN:   numColumns={viewMode === 'grid' ? 3 : 1}
       * RN:   key={viewMode} // Force re-render when view mode changes
       * RN:   refreshControl={
       * RN:     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
       * RN:   }
       * RN:   ListHeaderComponent={<StatsBar />}
       * RN:   contentContainerStyle={styles.listContent}
       * RN:   showsVerticalScrollIndicator={false}
       * RN: />
       * RN:
       * RN: NOTE: Changing numColumns requires remounting FlatList
       * RN: Use key prop to force remount when viewMode changes
       */}
      <div 
        className="flex-1 overflow-y-auto relative"
        style={{
          padding: 'var(--spacing-4)',
          zIndex: 1,
        }}
      >
        {/* STATS BAR
         * RN: Extract to separate component:
         * RN: const StatsBar = () => (
         * RN:   <View style={styles.statsBar}>
         * RN:     <View style={styles.statItem}>
         * RN:       <Text style={styles.statValue}>{photos.length}</Text>
         * RN:       <Text style={styles.statLabel}>Photos</Text>
         * RN:     </View>
         * RN:     <View style={styles.statItem}>
         * RN:       <Text style={[styles.statValue, { color: '#ef4444' }]}>
         * RN:         {photos.filter(p => p.type === 'damage').length}
         * RN:       </Text>
         * RN:       <Text style={styles.statLabel}>Damage</Text>
         * RN:     </View>
         * RN:     <View style={styles.statItem}>
         * RN:       <Text style={[styles.statValue, { color: '#3b82f6' }]}>
         * RN:         {photos.filter(p => p.type === 'inspection').length}
         * RN:       </Text>
         * RN:       <Text style={styles.statLabel}>Inspections</Text>
         * RN:     </View>
         * RN:   </View>
         * RN: );
         * RN:
         * RN: StyleSheet:
         * RN: statsBar: {
         * RN:   flexDirection: 'row',
         * RN:   justifyContent: 'space-around',
         * RN:   padding: 16,
         * RN:   marginBottom: 20,
         * RN:   backgroundColor: 'rgba(255, 255, 255, 0.05)',
         * RN:   borderRadius: 16,
         * RN:   borderWidth: 1,
         * RN:   borderColor: 'rgba(255, 255, 255, 0.1)',
         * RN: }
         */}
        <div
          className="grid grid-cols-3 backdrop-blur-md"
          style={{
            gap: 'var(--spacing-3)',
            padding: 'var(--spacing-4)',
            marginBottom: 'var(--spacing-5)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div className="text-center">
            <div
              style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-text-primary)',
              }}
            >
              {photos.length}
            </div>
            <div
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-tertiary)',
              }}
            >
              Photos
            </div>
          </div>
          <div className="text-center">
            <div
              style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: '#ef4444',
              }}
            >
              {photos.filter(p => p.type === 'damage').length}
            </div>
            <div
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-tertiary)',
              }}
            >
              Damage
            </div>
          </div>
          <div className="text-center">
            <div
              style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: '#3b82f6',
              }}
            >
              {photos.filter(p => p.type === 'inspection').length}
            </div>
            <div
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-tertiary)',
              }}
            >
              Inspections
            </div>
          </div>
        </div>

        {/* PHOTO GRID
         * RN: Use FlatList renderItem instead of map:
         * RN: const PhotoItem = ({ photo, index }: { photo: Photo, index: number }) => (
         * RN:   <TouchableOpacity
         * RN:     onPress={() => {
         * RN:       if (selectedPhotos.size > 0) {
         * RN:         togglePhotoSelection(photo.id);
         * RN:       } else {
         * RN:         handlePhotoPress(index);
         * RN:       }
         * RN:     }}
         * RN:     onLongPress={() => togglePhotoSelection(photo.id)}
         * RN:     style={[
         * RN:       styles.photoItem,
         * RN:       viewMode === 'grid' && styles.photoItemGrid,
         * RN:       selectedPhotos.has(photo.id) && styles.photoItemSelected
         * RN:     ]}
         * RN:   >
         * RN:     <FastImage
         * RN:       source={{ uri: photo.url, priority: FastImage.priority.normal }}
         * RN:       style={styles.photoImage}
         * RN:       resizeMode={FastImage.resizeMode.cover}
         * RN:     />
         * RN:     <LinearGradient
         * RN:       colors={['transparent', 'rgba(0, 0, 0, 0.7)']}
         * RN:       style={styles.photoOverlay}
         * RN:     />
         * RN:     {selectedPhotos.has(photo.id) && (
         * RN:       <View style={styles.checkmarkContainer}>
         * RN:         <Icon name="check" size={16} color="white" />
         * RN:       </View>
         * RN:     )}
         * RN:   </TouchableOpacity>
         * RN: );
         * RN:
         * RN: ADD MORE PHOTOS BUTTON:
         * RN: In FlatList, add as first item or use ListHeaderComponent:
         * RN: const AddPhotoButton = () => (
         * RN:   <TouchableOpacity
         * RN:     onPress={() => navigation.navigate('PhotoCapture')}
         * RN:     style={styles.addPhotoButton}
         * RN:   >
         * RN:     <View style={styles.addPhotoIcon}>
         * RN:       <Icon name="plus" size={20} color="#3b82f6" />
         * RN:     </View>
         * RN:     <Text style={styles.addPhotoText}>Add More Photos</Text>
         * RN:   </TouchableOpacity>
         * RN: );
         * RN:
         * RN: Then prepend to data array:
         * RN: data={[{ id: 'add-button', type: 'add' }, ...photos]}
         * RN: 
         * RN: Or use separate data array with type checking in renderItem
         */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: viewMode === 'grid' ? 'repeat(3, 1fr)' : '1fr',
            gap: viewMode === 'grid' ? 'var(--spacing-2)' : 'var(--spacing-3)',
          }}
        >
          {/* ADD MORE PHOTOS CARD
           * RN: <TouchableOpacity
           * RN:   onPress={() => navigation.navigate('PhotoCapture')}
           * RN:   style={[
           * RN:     styles.addPhotoButton,
           * RN:     { aspectRatio: viewMode === 'grid' ? 1 : 16/9 }
           * RN:   ]}
           * RN: >
           * RN:   <View style={styles.addPhotoIcon}>
           * RN:     <Icon name="plus" size={20} color="#3b82f6" />
           * RN:   </View>
           * RN:   <Text style={styles.addPhotoText}>Add More Photos</Text>
           * RN: </TouchableOpacity>
           */}
          <button
            onClick={onOpenCamera}
            className="backdrop-blur-md transition-all active:scale-95 flex flex-col items-center justify-center"
            style={{
              aspectRatio: viewMode === 'grid' ? '1' : '16/9',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--glass-bg)',
              border: '2px dashed rgba(59, 130, 246, 0.5)',
              gap: 'var(--spacing-2)',
            }}
          >
            <div
              className="flex items-center justify-center"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                color: '#3b82f6',
              }}
            >
              <Plus className="w-5 h-5" />
            </div>
            <span
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-secondary)',
                textAlign: 'center',
              }}
            >
              Add More Photos
            </span>
          </button>

          {/* PHOTO ITEMS
           * RN: Rendered by FlatList renderItem callback
           */}
          {photos.map((photo) => (
            <button
              key={photo.id}
              // RN: onClick → onPress for TouchableOpacity/Pressable
              // RN: Add onLongPress for multi-select mode activation
              onClick={() => togglePhotoSelection(photo.id)}
              className="relative transition-all active:scale-95"
              style={{
                aspectRatio: viewMode === 'grid' ? '1' : '16/9',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: selectedPhotos.has(photo.id)
                  ? '3px solid #3b82f6'
                  : '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              {/* PHOTO IMAGE
               * RN: <FastImage
               * RN:   source={{ 
               * RN:     uri: photo.url,
               * RN:     priority: FastImage.priority.normal,
               * RN:     cache: FastImage.cacheControl.immutable
               * RN:   }}
               * RN:   style={styles.photoImage}
               * RN:   resizeMode={FastImage.resizeMode.cover}
               * RN: />
               * RN:
               * RN: StyleSheet:
               * RN: photoImage: {
               * RN:   width: '100%',
               * RN:   height: '100%',
               * RN: }
               * RN:
               * RN: OPTIMIZATION:
               * RN: - Use thumbnail URLs for grid view
               * RN: - Use full res for full-screen viewer
               * RN: - Configure cache headers on API
               */}
              <ImageWithFallback 
                src={photo.url}
                alt={`Photo ${photo.id}`}
                className="w-full h-full object-cover"
              />

              {/* OVERLAY GRADIENT
               * RN: <LinearGradient
               * RN:   colors={['transparent', 'rgba(0, 0, 0, 0.7)']}
               * RN:   start={{ x: 0, y: 0 }}
               * RN:   end={{ x: 0, y: 1 }}
               * RN:   style={styles.photoOverlay}
               * RN: />
               * RN:
               * RN: StyleSheet:
               * RN: photoOverlay: {
               * RN:   position: 'absolute',
               * RN:   top: 0,
               * RN:   left: 0,
               * RN:   right: 0,
               * RN:   bottom: 0,
               * RN: }
               */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 50%)',
                }}
              />

              {/* SELECTION CHECKBOX
               * RN: {selectedPhotos.has(photo.id) && (
               * RN:   <View style={styles.checkmarkContainer}>
               * RN:     <Icon name="check" size={16} color="white" />
               * RN:   </View>
               * RN: )}
               * RN:
               * RN: StyleSheet:
               * RN: checkmarkContainer: {
               * RN:   position: 'absolute',
               * RN:   top: 8,
               * RN:   right: 8,
               * RN:   width: 24,
               * RN:   height: 24,
               * RN:   borderRadius: 12,
               * RN:   backgroundColor: '#3b82f6',
               * RN:   alignItems: 'center',
               * RN:   justifyContent: 'center',
               * RN: }
               */}
              {selectedPhotos.has(photo.id) && (
                <div
                  className="absolute flex items-center justify-center"
                  style={{
                    top: 'var(--spacing-2)',
                    right: 'var(--spacing-2)',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: '#3b82f6',
                  }}
                >
                  <Check className="w-4 h-4" style={{ color: 'white' }} />
                </div>
              )}

              {/* Photo Info - Only in Grid View */}
              {viewMode === 'grid' && (
                <div
                  className="absolute bottom-0 left-0 right-0"
                  style={{
                    padding: 'var(--spacing-2)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.625rem',
                      color: 'rgba(255, 255, 255, 0.9)',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)',
                    }}
                  >
                    {formatTimestamp(photo.timestamp)}
                  </div>
                </div>
              )}

              {/* Photo Info - List View */}
              {viewMode === 'list' && (
                <div
                  className="absolute bottom-0 left-0 right-0 flex items-center justify-between"
                  style={{
                    padding: 'var(--spacing-3)',
                  }}
                >
                  <div className="flex flex-col" style={{ gap: 'var(--spacing-1)' }}>
                    <div
                      style={{
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'rgba(255, 255, 255, 1)',
                        textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)',
                      }}
                    >
                      {formatTimestamp(photo.timestamp)}
                    </div>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: 'var(--spacing-1) var(--spacing-2)',
                        backgroundColor: getTypeBadgeColor(photo.type),
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.625rem',
                        fontWeight: 'var(--font-weight-medium)',
                        color: getTypeTextColor(photo.type),
                        backdropFilter: 'blur(8px)',
                        width: 'fit-content',
                      }}
                    >
                      {getTypeLabel(photo.type)}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Download photo');
                    }}
                    className="transition-all active:scale-95"
                    style={{
                      padding: 'var(--spacing-2)',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      borderRadius: 'var(--radius-md)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <Download className="w-4 h-4" style={{ color: 'white' }} />
                  </button>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* FLOATING ACTION BUTTON - OPEN CAMERA
       * RN: Position FAB above bottom navigation
       * RN: <TouchableOpacity
       * RN:   onPress={() => navigation.navigate('PhotoCapture')}
       * RN:   style={styles.fab}
       * RN:   activeOpacity={0.8}
       * RN: >
       * RN:   <View style={styles.cameraIcon}>
       * RN:     <View style={styles.cameraBody} />
       * RN:     <View style={styles.cameraLens} />
       * RN:   </View>
       * RN: </TouchableOpacity>
       * RN:
       * RN: StyleSheet:
       * RN: fab: {
       * RN:   position: 'absolute',
       * RN:   bottom: Platform.OS === 'ios' ? 90 : 80,
       * RN:   right: 24,
       * RN:   width: 56,
       * RN:   height: 56,
       * RN:   borderRadius: 28,
       * RN:   backgroundColor: '#3b82f6',
       * RN:   borderWidth: 2,
       * RN:   borderColor: 'rgba(255, 255, 255, 0.2)',
       * RN:   alignItems: 'center',
       * RN:   justifyContent: 'center',
       * RN:   elevation: 8, // Android shadow
       * RN:   shadowColor: '#000', // iOS shadow
       * RN:   shadowOffset: { width: 0, height: 4 },
       * RN:   shadowOpacity: 0.3,
       * RN:   shadowRadius: 8,
       * RN: },
       * RN: cameraIcon: {
       * RN:   width: 32,
       * RN:   height: 32,
       * RN:   alignItems: 'center',
       * RN:   justifyContent: 'center',
       * RN: },
       * RN: cameraBody: {
       * RN:   width: 32,
       * RN:   height: 32,
       * RN:   borderRadius: 4,
       * RN:   borderWidth: 3,
       * RN:   borderColor: 'white',
       * RN: }
       * RN:
       * RN: IMAGE VIEWER MODAL:
       * RN: Add react-native-image-viewing for full-screen:
       * RN: <ImageViewing
       * RN:   images={photos.map(p => ({ uri: p.url }))}
       * RN:   imageIndex={selectedImageIndex}
       * RN:   visible={imageViewerVisible}
       * RN:   onRequestClose={() => setImageViewerVisible(false)}
       * RN:   FooterComponent={({ imageIndex }) => (
       * RN:     <View style={styles.imageViewerFooter}>
       * RN:       <Text style={styles.imageViewerText}>
       * RN:         {formatTimestamp(photos[imageIndex].timestamp)}
       * RN:       </Text>
       * RN:       <View style={styles.imageViewerActions}>
       * RN:         <TouchableOpacity onPress={() => handleShareSingle(photos[imageIndex])}>
       * RN:           <Icon name="share-2" size={24} color="white" />
       * RN:         </TouchableOpacity>
       * RN:         <TouchableOpacity onPress={() => handleDownloadSingle(photos[imageIndex])}>
       * RN:           <Icon name="download" size={24} color="white" />
       * RN:         </TouchableOpacity>
       * RN:       </View>
       * RN:     </View>
       * RN:   )}
       * RN: />
       */}
      <div
        className="absolute"
        style={{
          bottom: 'calc(env(safe-area-inset-bottom, 0px) + var(--spacing-6))',
          right: 'var(--spacing-6)',
          zIndex: 20,
        }}
      >
        <button
          onClick={onOpenCamera}
          className="transition-all active:scale-95 flex items-center justify-center shadow-lg"
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: '#3b82f6',
            border: '2px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '4px',
              border: '3px solid white',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-6px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '8px',
                height: '4px',
                backgroundColor: 'white',
                borderRadius: '2px 2px 0 0',
              }}
            />
          </div>
        </button>
      </div>
      {/* RN: </SafeAreaView> */}
    </div>
  );
}

// RN: ==============================================================================
// RN: COMPLETE REACT NATIVE STYLESHEET EXAMPLE
// RN: ==============================================================================
// RN:
// RN: import { StyleSheet, Dimensions } from 'react-native';
// RN: 
// RN: const { width } = Dimensions.get('window');
// RN: const PHOTO_SIZE = (width - 48) / 3; // 3 columns with padding
// RN:
// RN: const styles = StyleSheet.create({
// RN:   container: {
// RN:     flex: 1,
// RN:     backgroundColor: theme.colors.bgPrimary,
// RN:   },
// RN:   backgroundImage: {
// RN:     position: 'absolute',
// RN:     bottom: 0,
// RN:     left: 0,
// RN:     right: 0,
// RN:     height: 400,
// RN:     opacity: 0.12,
// RN:   },
// RN:   header: {
// RN:     flexDirection: 'row',
// RN:     alignItems: 'center',
// RN:     justifyContent: 'space-between',
// RN:     padding: 16,
// RN:     backgroundColor: theme.colors.glassBg,
// RN:     borderBottomWidth: 1,
// RN:     borderBottomColor: 'rgba(255, 255, 255, 0.1)',
// RN:   },
// RN:   headerTitle: {
// RN:     fontSize: 20,
// RN:     fontWeight: '700',
// RN:     color: theme.colors.textPrimary,
// RN:   },
// RN:   statsBar: {
// RN:     flexDirection: 'row',
// RN:     justifyContent: 'space-around',
// RN:     padding: 16,
// RN:     marginBottom: 20,
// RN:     backgroundColor: 'rgba(255, 255, 255, 0.05)',
// RN:     borderRadius: 16,
// RN:     borderWidth: 1,
// RN:     borderColor: 'rgba(255, 255, 255, 0.1)',
// RN:   },
// RN:   statItem: {
// RN:     alignItems: 'center',
// RN:   },
// RN:   statValue: {
// RN:     fontSize: 24,
// RN:     fontWeight: '700',
// RN:     color: theme.colors.textPrimary,
// RN:   },
// RN:   statLabel: {
// RN:     fontSize: 14,
// RN:     color: theme.colors.textTertiary,
// RN:   },
// RN:   listContent: {
// RN:     padding: 16,
// RN:   },
// RN:   photoItem: {
// RN:     borderRadius: 12,
// RN:     overflow: 'hidden',
// RN:     borderWidth: 1,
// RN:     borderColor: 'rgba(255, 255, 255, 0.1)',
// RN:     margin: 4,
// RN:   },
// RN:   photoItemGrid: {
// RN:     width: PHOTO_SIZE,
// RN:     height: PHOTO_SIZE,
// RN:   },
// RN:   photoItemSelected: {
// RN:     borderWidth: 3,
// RN:     borderColor: '#3b82f6',
// RN:   },
// RN:   photoImage: {
// RN:     width: '100%',
// RN:     height: '100%',
// RN:   },
// RN:   photoOverlay: {
// RN:     position: 'absolute',
// RN:     bottom: 0,
// RN:     left: 0,
// RN:     right: 0,
// RN:     height: '50%',
// RN:   },
// RN:   checkmarkContainer: {
// RN:     position: 'absolute',
// RN:     top: 8,
// RN:     right: 8,
// RN:     width: 24,
// RN:     height: 24,
// RN:     borderRadius: 12,
// RN:     backgroundColor: '#3b82f6',
// RN:     alignItems: 'center',
// RN:     justifyContent: 'center',
// RN:   },
// RN:   fab: {
// RN:     position: 'absolute',
// RN:     bottom: Platform.OS === 'ios' ? 90 : 80,
// RN:     right: 24,
// RN:     width: 56,
// RN:     height: 56,
// RN:     borderRadius: 28,
// RN:     backgroundColor: '#3b82f6',
// RN:     borderWidth: 2,
// RN:     borderColor: 'rgba(255, 255, 255, 0.2)',
// RN:     alignItems: 'center',
// RN:     justifyContent: 'center',
// RN:     elevation: 8,
// RN:     shadowColor: '#000',
// RN:     shadowOffset: { width: 0, height: 4 },
// RN:     shadowOpacity: 0.3,
// RN:     shadowRadius: 8,
// RN:   },
// RN: });