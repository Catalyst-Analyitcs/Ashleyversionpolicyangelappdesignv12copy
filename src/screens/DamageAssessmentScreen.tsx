/**
 * ==============================================================================
 * DAMAGEASSESSMENTSCREEN.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: AI-powered damage assessment with computer vision analysis of
 * property photos to detect and classify damage severity, estimate repair costs,
 * generate inspection reports, and track assessment history.
 * 
 * ==============================================================================
 * 🎨 NATIVEWIND SIMPLIFIED CONVERSION
 * ==============================================================================
 * 
 * GREAT NEWS: Using NativeWind means 80% of this screen works as-is!
 * 
 * ✅ KEEP AS-IS (80% of styles):
 *    - ALL className Tailwind utilities work!
 *    - List layout: flex, gap-3
 *    - Card styles: rounded-xl, bg-pa-dark, border-white/10
 *    - Status badges: bg-red-500, bg-yellow-500, bg-green-500
 *    - Typography: all text- classes work
 * 
 * ❌ CONVERT ONLY THESE:
 *    - div → View
 *    - List → FlatList for performance
 *    - button → Pressable
 *    - Camera integration (expo-camera)
 *    - Image picker (expo-image-picker)
 *    - PDF generation (react-native-pdf)
 * 
 * SPECIFIC CONVERSIONS:
 * 
 * FlatList for assessments:
 *   - Replace div list with FlatList
 *   - All className Tailwind utilities work
 *   - Severity badges: bg-red-500, bg-yellow-500, etc.
 * 
 * Camera for photo capture:
 *   - Use expo-image-picker
 *   - launchCameraAsync() for camera
 *   - All styling via className
 * 
 * Severity badge:
 *   - Conditional className based on severity
 *   - All Tailwind color utilities work
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. ASSESSMENT LIST:
 *    - FlatList for damage assessments
 *    - Severity color coding (none, minor, moderate, severe, critical)
 *    - Pull-to-refresh
 *    - Expandable detail views
 *    - Photo thumbnails
 * 
 * 2. CAMERA INTEGRATION:
 *    - expo-camera or react-native-camera
 *    - Photo capture with overlay guides
 *    - Multiple photo upload
 *    - Before/after comparison
 *    - Annotation tools (draw on photos)
 * 
 * 3. AI/ML INTEGRATION:
 *    - TensorFlow Lite for on-device analysis
 *    - Or server-side analysis via API
 *    - Real-time damage detection
 *    - Confidence scores
 *    - Object detection (roof, walls, foundation, etc.)
 * 
 * 4. IMAGE PROCESSING:
 *    - react-native-image-picker
 *    - react-native-image-crop-picker
 *    - Image compression
 *    - EXIF data extraction (location, timestamp)
 * 
 * 5. PDF REPORT GENERATION:
 *    - react-native-pdf for viewing
 *    - Generate reports with photos
 *    - Email/share reports
 * 
 * 6. ANNOTATIONS:
 *    - Draw on photos
 *    - Add markers/arrows
 *    - Text labels
 *    - Save annotations
 * 
 * ==============================================================================
 * AI DAMAGE DETECTION OPTIONS
 * ==============================================================================
 * 
 * OPTION 1: On-Device ML (TensorFlow Lite)
 * - Faster, works offline
 * - Requires model training
 * - Limited accuracy
 * - Use @tensorflow/tfjs-react-native
 * 
 * OPTION 2: Server-Side AI (OpenAI Vision, Google Cloud Vision)
 * - Higher accuracy
 * - Requires internet
 * - POST /api/assessments/analyze with image
 * - Response: damage areas, severity, confidence
 * 
 * OPTION 3: Hybrid Approach
 * - Quick on-device preview
 * - Detailed server-side analysis
 * - Best of both worlds
 * 
 * ==============================================================================
 * REQUIRED API ENDPOINTS
 * ==============================================================================
 * 
 * 1. GET /api/assessments?propertyId={id}
 *    Returns: List of damage assessments
 *    Response: {
 *      assessments: [{
 *        id: string,
 *        propertyId: string,
 *        propertyArea: string,
 *        severity: 'none' | 'minor' | 'moderate' | 'severe' | 'critical',
 *        status: 'pending' | 'in_progress' | 'completed',
 *        damageTypes: string[],
 *        photos: string[],
 *        estimatedCost: number,
 *        confidenceScore: number,
 *        detectedAt: Date,
 *        reviewedBy?: string,
 *        notes?: string
 *      }]
 *    }
 * 
 * 2. POST /api/assessments/analyze
 *    Body: FormData with photos
 *    Returns: AI analysis results
 *    Response: {
 *      assessmentId: string,
 *      detectedDamage: [{
 *        area: string,
 *        damageType: string,
 *        severity: string,
 *        confidence: number,
 *        boundingBox: { x, y, width, height },
 *        description: string
 *      }],
 *      overallSeverity: string,
 *      estimatedRepairCost: number,
 *      recommendations: string[]
 *    }
 * 
 * 3. POST /api/assessments
 *    Body: Assessment data
 *    Returns: Created assessment
 * 
 * 4. PUT /api/assessments/:assessmentId
 *    Body: Updated assessment data
 *    Returns: Updated assessment
 * 
 * 5. POST /api/assessments/:assessmentId/photos
 *    Body: FormData with photos
 *    Returns: Updated assessment with new photos
 * 
 * 6. GET /api/assessments/:assessmentId/report
 *    Generates PDF report
 *    Returns: PDF file or URL
 * 
 * 7. POST /api/assessments/:assessmentId/share
 *    Body: { recipients: string[], message?: string }
 *    Emails assessment report
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] Assessments load from API
 * - [ ] FlatList renders correctly
 * - [ ] Camera opens for new assessment
 * - [ ] Photos capture successfully
 * - [ ] AI analysis returns results
 * - [ ] Severity badges display correctly
 * - [ ] Confidence scores show
 * - [ ] Multiple photos can be uploaded
 * - [ ] Photo annotations work
 * - [ ] PDF report generates
 * - [ ] Share/email works
 * - [ ] Pull-to-refresh functional
 * - [ ] Offline mode handles gracefully
 * - [ ] Image compression works
 * - [ ] EXIF data extracted
 * - [ ] iOS and Android compatible
 * 
 */

// RN: Import React Native components
// RN: import { View, Text, TouchableOpacity, FlatList, Image, Alert, Platform } from 'react-native';
// RN: import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// RN: import ImageCropPicker from 'react-native-image-crop-picker';
// RN: import * as tf from '@tensorflow/tfjs-react-native';

// RN: Replace lucide-react with react-native-vector-icons
// RN: import Icon from 'react-native-vector-icons/Feather';
import { ScanLine, AlertTriangle, CheckCircle, Camera } from "lucide-react";

// RN: ==============================================================================
// RN: DAMAGE ASSESSMENT INTERFACES
// RN: ==============================================================================
// RN: interface DamageAssessment {
// RN:   id: string;
// RN:   propertyId: string;
// RN:   propertyArea: 'roof' | 'foundation' | 'exterior_walls' | 'interior' | 'other';
// RN:   severity: 'none' | 'minor' | 'moderate' | 'severe' | 'critical';
// RN:   status: 'pending' | 'in_progress' | 'completed' | 'reviewed';
// RN:   damageTypes: string[]; // ['water_damage', 'structural_crack', 'missing_shingles', etc.]
// RN:   photos: AssessmentPhoto[];
// RN:   estimatedCost: number;
// RN:   confidenceScore: number; // 0-100
// RN:   detectedAt: Date;
// RN:   reviewedBy?: string;
// RN:   reviewedAt?: Date;
// RN:   notes?: string;
// RN:   aiAnalysis?: AIAnalysisResult;
// RN: }
// RN:
// RN: interface AssessmentPhoto {
// RN:   id: string;
// RN:   uri: string;
// RN:   thumbnailUri: string;
// RN:   timestamp: Date;
// RN:   location?: {
// RN:     latitude: number;
// RN:     longitude: number;
// RN:   };
// RN:   annotations?: Annotation[];
// RN:   aiDetections?: Detection[];
// RN: }
// RN:
// RN: interface AIAnalysisResult {
// RN:   detectedDamage: Detection[];
// RN:   overallSeverity: string;
// RN:   estimatedRepairCost: number;
// RN:   recommendations: string[];
// RN:   processingTime: number;
// RN:   modelVersion: string;
// RN: }
// RN:
// RN: interface Detection {
// RN:   area: string;
// RN:   damageType: string;
// RN:   severity: string;
// RN:   confidence: number;
// RN:   boundingBox: {
// RN:     x: number;
// RN:     y: number;
// RN:     width: number;
// RN:     height: number;
// RN:   };
// RN:   description: string;
// RN: }
// RN:
// RN: interface Annotation {
// RN:   type: 'arrow' | 'circle' | 'rectangle' | 'text';
// RN:   coordinates: number[];
// RN:   text?: string;
// RN:   color: string;
// RN: }

// RN: ==============================================================================
// RN: COMPONENT DEFINITION
// RN: ==============================================================================
export function DamageAssessmentScreen() {
  // RN: const navigation = useNavigation();
  // RN: const [selectedAssessment, setSelectedAssessment] = useState<DamageAssessment | null>(null);
  // RN: const [showAnalyzing, setShowAnalyzing] = useState(false);
  // RN: const [tfReady, setTfReady] = useState(false);
  // RN: const [refreshing, setRefreshing] = useState(false);
  
  const assessments = [
    {
      area: 'Roof',
      severity: 'Minor',
      status: 'Reviewed',
      color: '#fbbf24',
      icon: <AlertTriangle />,
    },
    {
      area: 'Foundation',
      severity: 'None',
      status: 'Clear',
      color: '#10b981',
      icon: <CheckCircle />,
    },
    {
      area: 'Exterior Walls',
      severity: 'Moderate',
      status: 'Pending Review',
      color: '#f59e0b',
      icon: <AlertTriangle />,
    },
  ];
  
  // RN: // TanStack Query for assessments
  // RN: const { data: assessments, isLoading, refetch } = useQuery({
  // RN:   queryKey: ['assessments', currentPropertyId],
  // RN:   queryFn: () => assessmentsApi.getAssessments(currentPropertyId)
  // RN: });
  // RN:
  // RN: // Analyze photos mutation
  // RN: const analyzeMutation = useMutation({
  // RN:   mutationFn: (photos: string[]) => assessmentsApi.analyze(photos),
  // RN:   onMutate: () => {
  // RN:     setShowAnalyzing(true);
  // RN:   },
  // RN:   onSuccess: (result) => {
  // RN:     setShowAnalyzing(false);
  // RN:     navigation.navigate('AssessmentResults', { assessment: result });
  // RN:     refetch();
  // RN:   },
  // RN:   onError: (error) => {
  // RN:     setShowAnalyzing(false);
  // RN:     Alert.alert('Analysis Failed', error.message);
  // RN:   }
  // RN: });
  // RN:
  // RN: // Initialize TensorFlow (for on-device ML)
  // RN: useEffect(() => {
  // RN:   async function initTF() {
  // RN:     await tf.ready();
  // RN:     setTfReady(true);
  // RN:   }
  // RN:   initTF();
  // RN: }, []);
  // RN:
  // RN: // Open camera for new assessment
  // RN: const handleStartNewAssessment = () => {
  // RN:   Alert.alert(
  // RN:     'Damage Assessment',
  // RN:     'Choose photo source',
  // RN:     [
  // RN:       {
  // RN:         text: 'Take Photo',
  // RN:         onPress: () => openCamera()
  // RN:       },
  // RN:       {
  // RN:         text: 'Choose from Library',
  // RN:         onPress: () => openImageLibrary()
  // RN:       },
  // RN:       { text: 'Cancel', style: 'cancel' }
  // RN:     ]
  // RN:   );
  // RN: };
  // RN:
  // RN: // Camera integration
  // RN: const openCamera = async () => {
  // RN:   try {
  // RN:     const result = await ImageCropPicker.openCamera({
  // RN:       multiple: true,
  // RN:       cropping: false,
  // RN:       compressImageQuality: 0.8,
  // RN:       includeExif: true,
  // RN:     });
  // RN:     
  // RN:     const photos = Array.isArray(result) ? result : [result];
  // RN:     const photoUris = photos.map(photo => photo.path);
  // RN:     
  // RN:     // Start AI analysis
  // RN:     analyzeMutation.mutate(photoUris);
  // RN:   } catch (error) {
  // RN:     if (error.code !== 'E_PICKER_CANCELLED') {
  // RN:       Alert.alert('Error', 'Failed to capture photo');
  // RN:     }
  // RN:   }
  // RN: };
  // RN:
  // RN: // Image library integration
  // RN: const openImageLibrary = async () => {
  // RN:   try {
  // RN:     const result = await ImageCropPicker.openPicker({
  // RN:       multiple: true,
  // RN:       cropping: false,
  // RN:       compressImageQuality: 0.8,
  // RN:       maxFiles: 10,
  // RN:     });
  // RN:     
  // RN:     const photoUris = result.map(photo => photo.path);
  // RN:     analyzeMutation.mutate(photoUris);
  // RN:   } catch (error) {
  // RN:     if (error.code !== 'E_PICKER_CANCELLED') {
  // RN:       Alert.alert('Error', 'Failed to select photos');
  // RN:     }
  // RN:   }
  // RN: };
  // RN:
  // RN: // Share assessment report
  // RN: const handleShareReport = async (assessmentId: string) => {
  // RN:   try {
  // RN:     const reportUrl = await assessmentsApi.generateReport(assessmentId);
  // RN:     await Share.share({
  // RN:       message: 'Damage Assessment Report',
  // RN:       url: reportUrl,
  // RN:     });
  // RN:   } catch (error) {
  // RN:     Alert.alert('Error', 'Failed to share report');
  // RN:   }
  // RN: };
  // RN:
  // RN: // Get severity configuration
  // RN: const getSeverityConfig = (severity: string) => {
  // RN:   const configs = {
  // RN:     none: { color: '#10b981', icon: 'check-circle', label: 'No Damage' },
  // RN:     minor: { color: '#fbbf24', icon: 'alert-triangle', label: 'Minor Damage' },
  // RN:     moderate: { color: '#f59e0b', icon: 'alert-triangle', label: 'Moderate Damage' },
  // RN:     severe: { color: '#ef4444', icon: 'alert-triangle', label: 'Severe Damage' },
  // RN:     critical: { color: '#dc2626', icon: 'alert-octagon', label: 'Critical Damage' },
  // RN:   };
  // RN:   return configs[severity] || configs.none;
  // RN: };

  return (
    // RN: ROOT CONTAINER
    // RN: <SafeAreaView style={styles.container}>
    // RN:   <View style={styles.content}>
    <div 
      className="w-full h-full flex flex-col"
      style={{ 
        padding: 'var(--spacing-6)',
        gap: 'var(--spacing-4)',
        paddingBottom: 'calc(var(--nav-height) + var(--spacing-8))'
      }}
    >
      {/* HEADER
       RN: <View style={styles.header}>
       RN:   <View style={styles.titleRow}>
       RN:     <Icon name="activity" size={20} color="#3b82f6" />
       RN:     <Text style={styles.title}>Damage Assessment</Text>
       RN:   </View>
       RN:   <Text style={styles.subtitle}>
       RN:     AI-powered damage detection and analysis
       RN:   </Text>
       RN: </View>
       */}
      <div style={{ paddingTop: 'var(--spacing-2)' }}>
        <div className="flex items-center" style={{ gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-2)' }}>
          <ScanLine className="w-5 h-5" style={{ color: '#3b82f6' }} />
          <h1 style={{ color: 'var(--text-primary)' }}>
            Damage Assessment
          </h1>
        </div>
        <p style={{ color: 'var(--text-secondary)' }}>
          AI-powered damage detection and analysis
        </p>
      </div>

      {/* NEW ASSESSMENT BUTTON
       RN: <TouchableOpacity
       RN:   style={styles.scanButton}
       RN:   onPress={handleStartNewAssessment}
       RN:   activeOpacity={0.7}
       RN: >
       RN:   <Icon name="camera" size={20} color="#3b82f6" />
       RN:   <Text style={styles.scanButtonText}>Start New Assessment</Text>
       RN: </TouchableOpacity>
       RN:
       RN: StyleSheet:
       RN: scanButton: {
       RN:   backgroundColor: 'rgba(59, 130, 246, 0.2)',
       RN:   borderRadius: 12,
       RN:   borderWidth: 1,
       RN:   borderColor: '#3b82f6',
       RN:   padding: 16,
       RN:   flexDirection: 'row',
       RN:   alignItems: 'center',
       RN:   justifyContent: 'center',
       RN:   gap: 8,
       RN: },
       RN: scanButtonText: {
       RN:   color: '#3b82f6',
       RN:   fontSize: 16,
       RN:   fontWeight: '600',
       RN: }
       */}
      <button
        className="backdrop-blur-md active:scale-98 transition-all flex items-center justify-center"
        style={{
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid #3b82f6',
          padding: 'var(--spacing-4)',
          gap: 'var(--spacing-2)',
        }}
      >
        <Camera className="w-5 h-5" style={{ color: '#3b82f6' }} />
        <span style={{ color: '#3b82f6' }}>
          Start New Assessment
        </span>
      </button>

      {/* ASSESSMENT RESULTS LIST */}
      {/* RN: In React Native, use FlatList for the assessment list */}
      {/* RN: See comprehensive example below after the web implementation */}
      <div>
        <div style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-3)' }}>
          Recent Assessments
        </div>
        <div className="flex flex-col" style={{ gap: 'var(--spacing-3)' }}>
          {assessments.map((assessment, index) => (
            <div
              key={index}
              className="backdrop-blur-md"
              style={{
                backgroundColor: 'var(--glass-bg)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--glass-border)',
                padding: 'var(--spacing-4)',
              }}
            >
              <div className="flex items-start" style={{ gap: 'var(--spacing-3)' }}>
                <div 
                  className="flex items-center justify-center"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: assessment.color + '20',
                    color: assessment.color,
                    flexShrink: 0,
                  }}
                >
                  {assessment.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-1)' }}>
                    <div style={{ color: 'var(--text-primary)' }}>
                      {assessment.area}
                    </div>
                    <div 
                      className="text-xs px-2 py-1"
                      style={{
                        backgroundColor: assessment.color + '20',
                        color: assessment.color,
                        borderRadius: 'var(--radius-sm)',
                      }}
                    >
                      {assessment.severity}
                    </div>
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                    {assessment.status}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    // RN:   </View>
    // RN: </SafeAreaView>
    // RN:
    // RN: {/* Loading overlay while analyzing */}
    // RN: {showAnalyzing && (
    // RN:   <View style={styles.loadingOverlay}>
    // RN:     <View style={styles.loadingCard}>
    // RN:       <ActivityIndicator size="large" color="#3b82f6" />
    // RN:       <Text style={styles.loadingText}>Analyzing damage...</Text>
    // RN:       <Text style={styles.loadingSubtext}>This may take a few moments</Text>
    // RN:     </View>
    // RN:   </View>
    // RN: )}
  );
}

// RN: ==============================================================================
// RN: REACT NATIVE FLATLIST EXAMPLE FOR ASSESSMENTS
// RN: ==============================================================================
// RN:
// RN: <FlatList
// RN:   data={assessments}
// RN:   keyExtractor={(item) => item.id}
// RN:   renderItem={({ item: assessment }) => (
// RN:     <TouchableOpacity
// RN:       style={styles.assessmentCard}
// RN:       onPress={() => navigation.navigate('AssessmentDetails', { id: assessment.id })}
// RN:       activeOpacity={0.7}
// RN:     >
// RN:       <View style={styles.cardContent}>
// RN:         <View style={[styles.iconContainer, { backgroundColor: assessment.color + '20' }]}>
// RN:           <Icon name={getSeverityConfig(assessment.severity).icon} size={24} color={assessment.color} />
// RN:         </View>
// RN:         <View style={styles.details}>
// RN:           <View style={styles.detailsHeader}>
// RN:             <Text style={styles.areaText}>{assessment.propertyArea}</Text>
// RN:             <View style={[styles.severityBadge, { backgroundColor: assessment.color + '20' }]}>
// RN:               <Text style={[styles.severityText, { color: assessment.color }]}>{assessment.severity}</Text>
// RN:             </View>
// RN:           </View>
// RN:           <Text style={styles.statusText}>{assessment.status}</Text>
// RN:         </View>
// RN:       </View>
// RN:     </TouchableOpacity>
// RN:   )}
// RN:   refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refetch} />}
// RN:   ListEmptyComponent={
// RN:     <View style={styles.emptyState}>
// RN:       <Icon name="camera" size={48} color="#9ca3af" />
// RN:       <Text style={styles.emptyText}>No assessments yet</Text>
// RN:     </View>
// RN:   }
// RN: />
