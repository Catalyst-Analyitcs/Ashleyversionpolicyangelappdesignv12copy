/**
 * ==============================================================================
 * DOCUMENTSSCREEN.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Document management system with AI-powered OCR, document analysis,
 * categorization, search, and viewing capabilities for insurance policies,
 * inspection reports, and property documents.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. DOCUMENT UPLOAD & PICKER:
 *    - Use react-native-document-picker for file selection
 *    - Support multiple file types (PDF, images, Office docs)
 *    - Implement expo-image-picker for photos
 *    - Add camera integration for document scanning
 * 
 * 2. FILE SYSTEM:
 *    - expo-file-system for file operations
 *    - Store documents in app's document directory
 *    - Implement caching strategy
 *    - Handle file size limits
 * 
 * 3. DOCUMENT VIEWER:
 *    - PDFs → react-native-pdf or expo-document-picker
 *    - Images → Fast Image with zoom/pinch
 *    - Office docs → Convert to PDF or use WebView
 *    - Implement in-app viewer vs external sharing
 * 
 * 4. AI/OCR INTEGRATION:
 *    - Google Cloud Vision API or AWS Textract
 *    - On-device ML Kit for basic OCR
 *    - Process on backend, show status
 *    - Display extracted text and AI summary
 * 
 * 5. SEARCH & FILTERING:
 *    - TextInput with debounce
 *    - Filter chips for categories
 *    - Sort options (date, name, type, size)
 * 
 * 6. TOAST NOTIFICATIONS:
 *    - sonner → react-native-toast-message
 *    - Custom toast component
 * 
 * ==============================================================================
 * MOCK DATA - REPLACE WITH REAL API
 * ==============================================================================
 * 
 * CURRENT: Local state with mock documents
 * 
 * REQUIRED API ENDPOINTS:
 * 
 * 1. GET /api/documents
 *    Query: propertyId, userId, category, searchQuery, filterType
 *    Returns: List of documents with metadata
 * 
 * 2. POST /api/documents/upload
 *    Body: FormData with file
 *    Returns: Document ID, processing status
 * 
 * 3. GET /api/documents/:documentId
 *    Returns: Full document data, download URL
 * 
 * 4. GET /api/documents/:documentId/download
 *    Returns: Signed URL for file download
 * 
 * 5. DELETE /api/documents/:documentId
 *    Soft delete or permanent delete
 * 
 * 6. POST /api/documents/:documentId/analyze
 *    Trigger AI analysis
 *    Returns: Job ID for status polling
 * 
 * 7. GET /api/documents/:documentId/analysis
 *    Returns: OCR text, AI summary, extracted data
 * 
 * STORAGE:
 * - AWS S3, Google Cloud Storage, or Azure Blob
 * - CloudFront/CDN for fast delivery
 * - Presigned URLs for secure access
 * 
 * ==============================================================================
 * SECURITY CONSIDERATIONS
 * ==============================================================================
 * 
 * - Encrypt files at rest
 * - Use HTTPS for all transfers
 * - Implement access control (user can only see their docs)
 * - Scan uploaded files for malware
 * - Set file size limits (max 50MB)
 * - Validate file types
 * - Auto-delete sensitive docs after period
 * 
 * ==============================================================================
 * REACT NATIVE COMPONENT MAPPING
 * ==============================================================================
 * 
 * - div → View
 * - button → TouchableOpacity/Pressable
 * - input → TextInput
 * - Dialog → Modal
 * - Document card → Custom component
 * - File upload → DocumentPicker + ImagePicker
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] Documents load from API
 * - [ ] Upload PDF works
 * - [ ] Upload images works
 * - [ ] Upload Office docs works
 * - [ ] Camera scan works
 * - [ ] Document viewer opens
 * - [ ] Download document works
 * - [ ] Delete document works
 * - [ ] Search filters documents
 * - [ ] Filter by type works
 * - [ ] AI analysis triggers
 * - [ ] Extracted text displays
 * - [ ] Summary displays
 * - [ ] Works offline (cached docs)
 * - [ ] Large files handled properly
 * - [ ] iOS and Android compatible
 * 
 */

// RN: Import React Native components
// RN: import { View, Text, TextInput, TouchableOpacity, FlatList, Modal, ScrollView, Alert, Platform } from 'react-native';
// RN: import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated';
// RN: import DocumentPicker from 'react-native-document-picker';
// RN: import * as ImagePicker from 'expo-image-picker';
// RN: import * as FileSystem from 'expo-file-system';
// RN: import Pdf from 'react-native-pdf';
// RN: import FastImage from 'react-native-fast-image';
// RN: import { debounce } from 'lodash';
// RN: import Toast from 'react-native-toast-message';

import React, { useState } from 'react';
// RN: import { useCallback, useEffect, useRef } from 'react';

// RN: Motion animations → react-native-reanimated
// RN: import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { motion } from 'motion/react';

// RN: Replace lucide-react with react-native-vector-icons
// RN: import Icon from 'react-native-vector-icons/Feather';
import { 
  FileText, 
  Download, 
  Eye, 
  Trash2, 
  Upload, 
  Sparkles, 
  Search,
  Filter,
  X,
  CheckCircle,
  AlertCircle,
  Clock,
  Image as ImageIcon,
  File
} from 'lucide-react';

// RN: Dialog → Modal component
// RN: import { Modal } from 'react-native';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';

// RN: Button → TouchableOpacity with custom styling
import { Button } from '../components/ui/button';

// RN: Input → TextInput with custom styling
import { Input } from '../components/ui/input';

// RN: Toast → react-native-toast-message
// RN: import Toast from 'react-native-toast-message';
import { toast } from 'sonner@2.0.3';

interface DocumentData {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: Date;
  processed: boolean;
  aiAnalyzed: boolean;
  extractedText?: string;
  aiSummary?: string;
}

type FilterType = 'all' | 'processed' | 'analyzed' | 'pending';

// RN: ==============================================================================
// RN: COMPONENT DEFINITION
// RN: ==============================================================================
export function DocumentsScreen() {
  // RN: const navigation = useNavigation();
  // RN: const [uploading, setUploading] = useState(false);
  // RN: const [refreshing, setRefreshing] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [selectedDocument, setSelectedDocument] = useState<DocumentData | null>(null);
  const [showViewer, setShowViewer] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  // RN: // TanStack Query for documents
  // RN: const { 
  // RN:   data: documents, 
  // RN:   isLoading, 
  // RN:   refetch 
  // RN: } = useQuery({
  // RN:   queryKey: ['documents', searchQuery, filterType],
  // RN:   queryFn: () => documentsApi.getDocuments({ 
  // RN:     search: searchQuery, 
  // RN:     filter: filterType 
  // RN:   })
  // RN: });
  // RN:
  // RN: const uploadMutation = useMutation({
  // RN:   mutationFn: documentsApi.uploadDocument,
  // RN:   onSuccess: () => {
  // RN:     refetch();
  // RN:     Toast.show({
  // RN:       type: 'success',
  // RN:       text1: 'Document uploaded',
  // RN:       text2: 'AI analysis in progress...'
  // RN:     });
  // RN:   },
  // RN:   onError: (error) => {
  // RN:     Toast.show({
  // RN:       type: 'error',
  // RN:       text1: 'Upload failed',
  // RN:       text2: error.message
  // RN:     });
  // RN:   }
  // RN: });
  // RN:
  // RN: // Document picker handler
  // RN: const handleDocumentPick = async () => {
  // RN:   try {
  // RN:     const result = await DocumentPicker.pick({
  // RN:       type: [
  // RN:         DocumentPicker.types.pdf,
  // RN:         DocumentPicker.types.images,
  // RN:         DocumentPicker.types.doc,
  // RN:         DocumentPicker.types.docx,
  // RN:       ],
  // RN:       copyTo: 'cachesDirectory',
  // RN:     });
  // RN:     
  // RN:     if (result[0].size > 50 * 1024 * 1024) { // 50MB limit
  // RN:       Toast.show({
  // RN:         type: 'error',
  // RN:         text1: 'File too large',
  // RN:         text2: 'Maximum file size is 50MB'
  // RN:       });
  // RN:       return;
  // RN:     }
  // RN:     
  // RN:     setUploading(true);
  // RN:     await uploadMutation.mutateAsync(result[0]);
  // RN:   } catch (err) {
  // RN:     if (DocumentPicker.isCancel(err)) {
  // RN:       // User cancelled
  // RN:     } else {
  // RN:       console.error('Document pick error:', err);
  // RN:     }
  // RN:   } finally {
  // RN:     setUploading(false);
  // RN:   }
  // RN: };
  // RN:
  // RN: // Camera scanner handler
  // RN: const handleCameraScan = async () => {
  // RN:   const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  // RN:   
  // RN:   if (!permissionResult.granted) {
  // RN:     Alert.alert('Permission required', 'Camera permission is needed');
  // RN:     return;
  // RN:   }
  // RN:   
  // RN:   const result = await ImagePicker.launchCameraAsync({
  // RN:     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  // RN:     quality: 1,
  // RN:     base64: false,
  // RN:   });
  // RN:   
  // RN:   if (!result.canceled && result.assets[0]) {
  // RN:     setUploading(true);
  // RN:     await uploadMutation.mutateAsync({
  // RN:       uri: result.assets[0].uri,
  // RN:       type: 'image/jpeg',
  // RN:       name: `scan_${Date.now()}.jpg`
  // RN:     });
  // RN:     setUploading(false);
  // RN:   }
  // RN: };
  // RN:
  // RN: // Download document handler
  // RN: const handleDownload = async (doc: DocumentData) => {
  // RN:   try {
  // RN:     const downloadUrl = await documentsApi.getDownloadUrl(doc.id);
  // RN:     const fileUri = `${FileSystem.documentDirectory}${doc.name}`;
  // RN:     
  // RN:     const downloadResumable = FileSystem.createDownloadResumable(
  // RN:       downloadUrl,
  // RN:       fileUri,
  // RN:       {},
  // RN:       (downloadProgress) => {
  // RN:         const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
  // RN:         console.log(`Download progress: ${(progress * 100).toFixed(0)}%`);
  // RN:       }
  // RN:     );
  // RN:     
  // RN:     const { uri } = await downloadResumable.downloadAsync();
  // RN:     Toast.show({
  // RN:       type: 'success',
  // RN:       text1: 'Downloaded',
  // RN:       text2: 'Document saved to device'
  // RN:     });
  // RN:   } catch (error) {
  // RN:     console.error('Download error:', error);
  // RN:   }
  // RN: };
  // RN:
  // RN: // Delete document handler
  // RN: const handleDelete = (doc: DocumentData) => {
  // RN:   Alert.alert(
  // RN:     'Delete Document',
  // RN:     `Are you sure you want to delete "${doc.name}"?`,
  // RN:     [
  // RN:       { text: 'Cancel', style: 'cancel' },
  // RN:       {
  // RN:         text: 'Delete',
  // RN:         style: 'destructive',
  // RN:         onPress: async () => {
  // RN:           await documentsApi.deleteDocument(doc.id);
  // RN:           refetch();
  // RN:           Toast.show({
  // RN:             type: 'success',
  // RN:             text1: 'Document deleted'
  // RN:           });
  // RN:         }
  // RN:       }
  // RN:     ]
  // RN:   );
  // RN: };
  // RN:
  // RN: // Debounced search
  // RN: const debouncedSearch = useCallback(
  // RN:   debounce((query: string) => {
  // RN:     setSearchQuery(query);
  // RN:   }, 500),
  // RN:   []
  // RN: );

  // Mock documents data - replace with actual data fetching
  const [documents, setDocuments] = useState<DocumentData[]>([
    {
      id: '1',
      name: 'Insurance Policy 2025.pdf',
      type: 'application/pdf',
      size: 2457600,
      uploadDate: new Date('2025-01-15'),
      processed: true,
      aiAnalyzed: true,
      extractedText: 'Policy details...',
      aiSummary: 'This is your comprehensive home insurance policy covering property damage, liability, and personal belongings up to $500,000.'
    },
    {
      id: '2',
      name: 'Inspection Report.pdf',
      type: 'application/pdf',
      size: 8495104,
      uploadDate: new Date('2025-01-10'),
      processed: true,
      aiAnalyzed: false,
    },
    {
      id: '3',
      name: 'Property Photos.zip',
      type: 'application/zip',
      size: 47448064,
      uploadDate: new Date('2025-01-08'),
      processed: true,
      aiAnalyzed: false,
    },
    {
      id: '4',
      name: 'Claim History.pdf',
      type: 'application/pdf',
      size: 1258291,
      uploadDate: new Date('2024-12-28'),
      processed: false,
      aiAnalyzed: false,
    },
    {
      id: '5',
      name: 'Home Assessment.pdf',
      type: 'application/pdf',
      size: 3145728,
      uploadDate: new Date('2024-12-15'),
      processed: true,
      aiAnalyzed: true,
      aiSummary: 'Property assessed at $450,000 with recommendations for roof maintenance and HVAC system upgrade within 2 years.'
    },
  ]);

  const getDocumentIcon = (type: string) => {
    const typeLower = type.toLowerCase();
    if (typeLower.includes('pdf')) return FileText;
    if (typeLower.includes('image') || typeLower.includes('photo')) return ImageIcon;
    return File;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getStatusColor = (doc: DocumentData) => {
    if (!doc.processed) return '#f59e0b';
    if (doc.aiAnalyzed) return '#10b981';
    return '#3b82f6';
  };

  const getStatusText = (doc: DocumentData) => {
    if (!doc.processed) return 'Processing...';
    if (doc.aiAnalyzed) return 'AI Analyzed';
    return 'Ready for Analysis';
  };

  const getStatusIcon = (doc: DocumentData) => {
    if (!doc.processed) return Clock;
    if (doc.aiAnalyzed) return CheckCircle;
    return AlertCircle;
  };

  const getDocumentCategory = (doc: DocumentData) => {
    const nameLower = doc.name.toLowerCase();
    if (nameLower.includes('insurance') || nameLower.includes('policy') || nameLower.includes('claim')) {
      return 'insurance';
    }
    if (nameLower.includes('inspection') || nameLower.includes('assessment') || nameLower.includes('report')) {
      return 'inspection';
    }
    if (nameLower.includes('photo') || nameLower.includes('image') || doc.type.includes('image') || doc.type.includes('zip')) {
      return 'media';
    }
    return 'general';
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'insurance':
        return {
          bg: 'rgba(59, 130, 246, 0.25)', // Blue tint - more vibrant
          border: 'rgba(59, 130, 246, 0.5)',
          accent: '#3b82f6'
        };
      case 'inspection':
        return {
          bg: 'rgba(16, 185, 129, 0.25)', // Green tint - more vibrant
          border: 'rgba(16, 185, 129, 0.5)',
          accent: '#10b981'
        };
      case 'media':
        return {
          bg: 'rgba(168, 85, 247, 0.25)', // Purple tint - more vibrant
          border: 'rgba(168, 85, 247, 0.5)',
          accent: '#a855f7'
        };
      default:
        return {
          bg: 'rgba(107, 114, 128, 0.15)',
          border: 'rgba(107, 114, 128, 0.3)',
          accent: '#6b7280'
        };
    }
  };

  const handleAnalyze = (doc: DocumentData) => {
    console.log('Analyzing document:', doc.name);
    // Simulate AI analysis
    setDocuments(docs => docs.map(d => 
      d.id === doc.id 
        ? { ...d, aiAnalyzed: true, aiSummary: 'AI analysis completed for ' + d.name }
        : d
    ));
  };

  const handleDownload = (doc: DocumentData) => {
    console.log('Downloading document:', doc.name);
    // Implement download logic
  };

  const handleDelete = (doc: DocumentData) => {
    console.log('Deleting document:', doc.name);
    setDocuments(docs => docs.filter(d => d.id !== doc.id));
  };

  const handleView = (doc: DocumentData) => {
    setSelectedDocument(doc);
    setShowViewer(true);
  };

  const filteredDocuments = documents.filter(doc => {
    // Search filter
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Type filter
    let matchesFilter = true;
    switch (filterType) {
      case 'processed':
        matchesFilter = doc.processed;
        break;
      case 'analyzed':
        matchesFilter = doc.aiAnalyzed;
        break;
      case 'pending':
        matchesFilter = !doc.processed;
        break;
      default:
        matchesFilter = true;
    }
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: documents.length,
    analyzed: documents.filter(d => d.aiAnalyzed).length,
    pending: documents.filter(d => !d.processed).length,
  };

  return (
    <div 
      className="w-full h-full flex flex-col relative"
      style={{ 
        padding: 'var(--spacing-6)',
        paddingTop: 'var(--spacing-1)',
        gap: 'var(--spacing-3)',
        paddingBottom: 'calc(var(--nav-height) + var(--spacing-8))'
      }}
    >
      {/* Background Document */}
      <div
        style={{
          position: 'fixed',
          top: '60px',
          left: 0,
          right: 0,
          height: '400px',
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: 'url(https://images.unsplash.com/photo-1518893560155-b89cac6db0c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWdhbCUyMGRvY3VtZW50JTIwcGFwZXIlMjB0ZXh0dXJlfGVufDF8fHx8MTc2MjIzNjUxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.22,
            maskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)',
          }}
        />
      </div>

      {/* Top Section Container */}
      <div className="flex flex-col" style={{ gap: 'var(--spacing-1)', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: 'var(--spacing-1)', position: 'relative', zIndex: 1 }}>
          <h1 style={{ color: 'var(--text-primary)', marginBottom: '0px' }}>
            Documents
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: '1.3' }}>
            Manage your policy documents with AI-powered analysis
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3" style={{ gap: 'var(--spacing-1)' }}>
          <motion.div 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toast.info('Viewing all files...')}
            className="backdrop-blur-md"
            style={{
              backgroundColor: 'var(--glass-bg)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--glass-border)',
              padding: 'var(--spacing-1)',
              textAlign: 'center',
              boxShadow: 'var(--shadow-depth-sm)',
              cursor: 'pointer',
              transition: 'var(--transition-card)'
            }}
          >
            <div style={{ 
              fontSize: 'var(--text-xl)', 
              color: 'var(--text-primary)', 
              marginBottom: '0px',
              fontWeight: 'var(--font-weight-bold)',
              lineHeight: '1'
            }}>
              {stats.total}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: '1.2' }}>
              Total Files
            </div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toast.info('Viewing analyzed files...')}
            className="backdrop-blur-md"
            style={{
              backgroundColor: 'var(--glass-bg)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--glass-border)',
              padding: 'var(--spacing-1)',
              textAlign: 'center',
              boxShadow: 'var(--shadow-depth-sm)',
              cursor: 'pointer',
              transition: 'var(--transition-card)'
            }}
          >
            <div style={{ 
              fontSize: 'var(--text-xl)', 
              color: 'rgb(var(--color-success))', 
              marginBottom: '0px',
              fontWeight: 'var(--font-weight-bold)',
              lineHeight: '1'
            }}>
              {stats.analyzed}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: '1.2' }}>
              AI Analyzed
            </div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toast.info('Viewing pending files...')}
            className="backdrop-blur-md"
            style={{
              backgroundColor: 'var(--glass-bg)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--glass-border)',
              padding: 'var(--spacing-1)',
              textAlign: 'center',
              boxShadow: 'var(--shadow-depth-sm)',
              cursor: 'pointer',
              transition: 'var(--transition-card)'
            }}
          >
            <div style={{ 
              fontSize: 'var(--text-xl)', 
              color: 'rgb(var(--color-warning))', 
              marginBottom: '0px',
              fontWeight: 'var(--font-weight-bold)',
              lineHeight: '1'
            }}>
              {stats.pending}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: '1.2' }}>
              Processing
            </div>
          </motion.div>
        </div>

        {/* Search and Upload Row */}
        <div className="flex items-center" style={{ gap: 'var(--spacing-2)', marginTop: 'var(--spacing-1)' }}>
          <div 
            className="flex items-center flex-1 backdrop-blur-md"
            style={{
              backgroundColor: 'var(--glass-bg)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--glass-border)',
              padding: 'var(--spacing-2)',
              gap: 'var(--spacing-2)',
              boxShadow: 'var(--shadow-depth-sm)',
            }}
          >
            <Search className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--text-primary)',
                fontSize: 'var(--text-sm)',
              }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} style={{ display: 'flex', alignItems: 'center' }}>
                <X className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
              </button>
            )}
          </div>
          
          <motion.button
            onClick={() => setShowUploadModal(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="backdrop-blur-md"
            style={{
              backgroundColor: 'rgb(var(--color-info))',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--spacing-2) var(--spacing-3)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-2)',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'var(--font-weight-semibold)',
              boxShadow: 'var(--effect-button-premium)',
              transition: 'var(--transition-button)'
            }}
          >
            <Upload className="w-4 h-4" />
            <span style={{ fontSize: 'var(--text-sm)' }}>Upload</span>
          </motion.button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center" style={{ gap: 'var(--spacing-2)', position: 'relative', zIndex: 1 }}>
        {(['all', 'processed', 'analyzed', 'pending'] as FilterType[]).map((filter) => (
          <motion.button
            key={filter}
            onClick={() => setFilterType(filter)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: 'var(--spacing-2) var(--spacing-3)',
              borderRadius: 'var(--radius-full)',
              backgroundColor: filterType === filter ? 'rgb(var(--color-info))' : 'var(--glass-bg)',
              border: `1px solid ${filterType === filter ? 'rgb(var(--color-info))' : 'var(--glass-border)'}`,
              color: filterType === filter ? '#ffffff' : 'var(--text-primary)',
              fontSize: 'var(--text-xs)',
              cursor: 'pointer',
              textTransform: 'capitalize',
              fontWeight: filterType === filter ? 'var(--font-weight-semibold)' : 'var(--font-weight-normal)',
              boxShadow: filterType === filter ? 'var(--effect-button-premium)' : 'var(--shadow-depth-sm)',
              transition: 'var(--transition-button)'
            }}
          >
            {filter}
          </motion.button>
        ))}
      </div>

      {/* Documents List */}
      <div className="flex-1 overflow-y-auto flex flex-col" style={{ gap: 'var(--spacing-3)', position: 'relative', zIndex: 1 }}>
        {filteredDocuments.length === 0 ? (
          <div className="flex flex-col items-center justify-center" style={{ padding: 'var(--spacing-8)', textAlign: 'center' }}>
            <FileText className="w-16 h-16" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-3)' }} />
            <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-1)' }}>
              No documents found
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              {searchQuery ? 'Try adjusting your search' : 'Upload your first document to get started'}
            </p>
          </div>
        ) : (
          filteredDocuments.map((doc) => {
            const Icon = getDocumentIcon(doc.type);
            const StatusIcon = getStatusIcon(doc);
            const statusColor = getStatusColor(doc);
            const category = getDocumentCategory(doc);
            const categoryColors = getCategoryColor(category);
            
            return (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleView(doc)}
                className="backdrop-blur-md"
                style={{
                  backgroundColor: categoryColors.bg,
                  borderRadius: 'var(--radius-lg)',
                  border: `1px solid ${categoryColors.border}`,
                  padding: 'var(--spacing-4)',
                  boxShadow: 'var(--shadow-depth-md)',
                  cursor: 'pointer',
                  transition: 'var(--transition-card)'
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between" style={{ marginBottom: doc.aiSummary ? 'var(--spacing-3)' : '0' }}>
                  <div className="flex items-start flex-1" style={{ gap: 'var(--spacing-3)' }}>
                    {/* Icon with Status Dot */}
                    <div style={{ position: 'relative' }}>
                      <Icon className="w-6 h-6" style={{ color: categoryColors.accent }} />
                      <div
                        style={{
                          position: 'absolute',
                          top: '-2px',
                          right: '-2px',
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: statusColor,
                          border: `2px solid ${categoryColors.bg}`,
                        }}
                      />
                    </div>

                    {/* Document Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div 
                        style={{ 
                          color: 'var(--text-primary)', 
                          marginBottom: 'var(--spacing-1)',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {doc.name}
                      </div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)', marginBottom: 'var(--spacing-1)' }}>
                        {doc.type.split('/')[1]?.toUpperCase() || 'FILE'} • {formatFileSize(doc.size)} • {doc.uploadDate.toLocaleDateString()}
                      </div>
                      <div className="flex items-center" style={{ gap: 'var(--spacing-1)' }}>
                        <StatusIcon className="w-3 h-3" style={{ color: statusColor }} />
                        <span style={{ color: statusColor, fontSize: 'var(--text-xs)' }}>
                          {getStatusText(doc)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center" style={{ gap: 'var(--spacing-2)' }}>
                    {!doc.aiAnalyzed && doc.processed && (
                      <motion.button
                        onClick={(e) => { e.stopPropagation(); handleAnalyze(doc); }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center justify-center"
                        style={{
                          padding: 'var(--spacing-2)',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'rgba(168, 85, 247, 0.1)',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                        title="Analyze with AI"
                      >
                        <Sparkles className="w-4 h-4" style={{ color: '#a855f7' }} />
                      </motion.button>
                    )}
                    
                    <motion.button
                      onClick={(e) => { e.stopPropagation(); handleView(doc); }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center justify-center"
                      style={{
                        padding: 'var(--spacing-2)',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'rgba(var(--color-info), 0.1)',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                      title="View document"
                    >
                      <Eye className="w-4 h-4" style={{ color: 'rgb(var(--color-info))' }} />
                    </motion.button>
                    
                    <motion.button
                      onClick={(e) => { e.stopPropagation(); handleDownload(doc); }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center justify-center"
                      style={{
                        padding: 'var(--spacing-2)',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                      title="Download"
                    >
                      <Download className="w-4 h-4" style={{ color: 'rgb(var(--color-info))' }} />
                    </motion.button>
                    
                    <motion.button
                      onClick={(e) => { e.stopPropagation(); handleDelete(doc); }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center justify-center"
                      style={{
                        padding: 'var(--spacing-2)',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'rgba(var(--color-error), 0.1)',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" style={{ color: 'rgb(var(--color-error))' }} />
                    </motion.button>
                  </div>
                </div>

                {/* AI Summary Section */}
                {doc.aiSummary && (
                  <div
                    style={{
                      marginTop: 'var(--spacing-3)',
                      paddingTop: 'var(--spacing-3)',
                      borderTop: '1px solid var(--glass-border)',
                    }}
                  >
                    <div className="flex items-center" style={{ gap: 'var(--spacing-1)', marginBottom: 'var(--spacing-2)' }}>
                      <Sparkles className="w-3 h-3" style={{ color: '#a855f7' }} />
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                        AI Summary
                      </span>
                    </div>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                      {doc.aiSummary}
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })
        )}
      </div>

      {/* Document Viewer Modal */}
      <Dialog open={showViewer} onOpenChange={setShowViewer}>
        <DialogContent 
          className="max-w-4xl"
          style={{
            backgroundColor: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            maxHeight: '90vh',
          }}
        >
          <DialogHeader>
            <DialogTitle style={{ color: 'var(--text-primary)' }}>
              {selectedDocument?.name}
            </DialogTitle>
          </DialogHeader>
          <div 
            className="backdrop-blur-md"
            style={{
              backgroundColor: 'var(--card-bg)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--spacing-6)',
              minHeight: '400px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--spacing-4)',
            }}
          >
            <FileText className="w-16 h-16" style={{ color: 'var(--text-secondary)' }} />
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-2)' }}>
                Document Preview
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--spacing-4)' }}>
                {selectedDocument?.type} • {selectedDocument && formatFileSize(selectedDocument.size)}
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                Full document viewer coming soon. For now, you can download the document.
              </p>
            </div>
            <Button
              onClick={() => selectedDocument && handleDownload(selectedDocument)}
              style={{
                backgroundColor: '#3b82f6',
                color: '#ffffff',
              }}
            >
              <Download className="w-4 h-4" style={{ marginRight: 'var(--spacing-2)' }} />
              Download Document
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Upload Modal */}
      <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
        <DialogContent
          style={{
            backgroundColor: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
          }}
        >
          <DialogHeader>
            <DialogTitle style={{ color: 'var(--text-primary)' }}>
              Upload Document
            </DialogTitle>
          </DialogHeader>
          <div 
            className="backdrop-blur-md"
            style={{
              backgroundColor: 'var(--card-bg)',
              borderRadius: 'var(--radius-lg)',
              border: '2px dashed var(--glass-border)',
              padding: 'var(--spacing-8)',
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            <Upload className="w-12 h-12 mx-auto" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-3)' }} />
            <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-2)' }}>
              Drop files here or click to browse
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Supports PDF, DOC, DOCX, JPG, PNG and more
            </p>
          </div>
          <div className="flex justify-end" style={{ gap: 'var(--spacing-2)', marginTop: 'var(--spacing-4)' }}>
            <Button
              variant="outline"
              onClick={() => setShowUploadModal(false)}
            >
              Cancel
            </Button>
            <Button
              style={{
                backgroundColor: '#3b82f6',
                color: '#ffffff',
              }}
            >
              Upload
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}