/**
 * ==============================================================================
 * POLICYSCREEN.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Insurance policy overview with coverage details, premium information,
 * claim history, and quick actions for policy management.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. LAYOUT:
 *    - Large policy card + 3 action cards
 *    - Use flexbox for responsive grid
 *    - Touch interactions for navigation
 * 
 * 2. PDF VIEWER:
 *    - View policy document → react-native-pdf
 *    - Download policy → expo-file-system
 * 
 * 3. REQUIRED API ENDPOINTS:
 *    - GET /api/policies/:policyId
 *    - GET /api/policies/:policyId/documents
 *    - GET /api/policies/:policyId/claims
 * 
 * ==============================================================================
 * REACT NATIVE COMPONENT MAPPING
 * ==============================================================================
 * 
 * - div → View
 * - button → TouchableOpacity
 * - Card → Custom View
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] Policy details load
 * - [ ] Action cards tappable
 * - [ ] Navigation works
 * - [ ] PDF viewer opens
 * - [ ] iOS and Android compatible
 * 
 */

// RN: Import React Native components
// RN: import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

// RN: Replace lucide-react with react-native-vector-icons
// RN: import Icon from 'react-native-vector-icons/Feather';
import { FileText, Shield, DollarSign, CheckCircle2, Circle } from "lucide-react";

// RN: Card component will need custom implementation or use react-native-paper
import { Card } from "../components/ui/card";

// RN: ==============================================================================
// RN: REACT NATIVE CONVERSION NOTES
// RN: ==============================================================================
// RN:
// RN: 1. PDF VIEWER:
// RN:    - react-native-pdf for viewing policy documents
// RN:    - npm install react-native-pdf react-native-blob-util
// RN:    - Handle both remote URLs and local files
// RN:
// RN: 2. FILE DOWNLOAD:
// RN:    - expo-file-system or react-native-fs
// RN:    - Download policy PDFs for offline viewing
// RN:    - Store in app's document directory
// RN:
// RN: 3. TANSTACK QUERY:
// RN:    const { data: policy, isLoading } = useQuery({
// RN:      queryKey: ['policy', policyId],
// RN:      queryFn: () => policyApi.getPolicyDetails(policyId)
// RN:    });
// RN:
// RN: 4. NAVIGATION:
// RN:    - Link action cards to relevant screens
// RN:    - Coverage → CoverageDetailsScreen
// RN:    - Documents → DocumentsScreen  
// RN:    - Claims → ClaimsHistoryScreen

interface PolicyScreenProps {
  onBack?: () => void;
  // RN: Add navigation and route props
  // RN: navigation: NavigationProp<any>;
  // RN: route: RouteProp<any, 'Policy'>;
}

export function PolicyScreen({ onBack }: PolicyScreenProps) {
  // RN: Add TanStack Query hooks
  // RN: const { data: policy, isLoading } = useQuery({
  // RN:   queryKey: ['policy'],
  // RN:   queryFn: policyApi.getCurrentPolicy
  // RN: });
  // RN:
  // RN: const { data: coverageDetails } = useQuery({
  // RN:   queryKey: ['coverage', policy?.id],
  // RN:   queryFn: () => policyApi.getCoverageDetails(policy?.id),
  // RN:   enabled: !!policy?.id
  // RN: });

  // RN: Handler functions
  // RN: const handleViewCoverage = () => {
  // RN:   navigation.navigate('CoverageDetails', { policyId: policy?.id });
  // RN: };
  // RN:
  // RN: const handleViewDocuments = () => {
  // RN:   navigation.navigate('Documents', { filter: 'policy' });
  // RN: };
  // RN:
  // RN: const handleViewClaims = () => {
  // RN:   navigation.navigate('Claims', { policyId: policy?.id });
  // RN: };
  // RN:
  // RN: const handleDownloadPolicy = async () => {
  // RN:   try {
  // RN:     const pdfUrl = await policyApi.getPolicyDocumentUrl(policy?.id);
  // RN:     const downloadDest = `${FileSystem.documentDirectory}${policy?.policyNumber}.pdf`;
  // RN:     const download = FileSystem.createDownloadResumable(pdfUrl, downloadDest);
  // RN:     const { uri } = await download.downloadAsync();
  // RN:     Alert.alert('Success', 'Policy downloaded successfully');
  // RN:   } catch (error) {
  // RN:     Alert.alert('Error', 'Failed to download policy');
  // RN:   }
  // RN: };

  return (
    // RN: ROOT CONTAINER
    // RN: <SafeAreaView style={styles.container}>
    // RN:   <ScrollView contentContainerStyle={styles.scrollContent}>
    <div 
      className="flex flex-col h-full w-full"
      style={{
        paddingLeft: 'var(--spacing-6)',
        paddingRight: 'var(--spacing-6)',
        paddingBottom: 'var(--spacing-6)',
        gap: 'var(--spacing-4)',
      }}
    >
      {/* TOP SECTION: LARGE CARD + 3 SMALL ACTION CARDS
       * RN: <View style={styles.topSection}>
       * RN:   <View style={styles.leftColumn}>
       * RN:     <TouchableOpacity
       * RN:       style={styles.mainCard}
       * RN:       onPress={handleViewCoverage}
       * RN:     >
       * RN:       <Icon name="shield" size={48} color={theme.colors.iconColor} />
       * RN:     </TouchableOpacity>
       * RN:   </View>
       * RN:   <View style={styles.rightColumn}>
       * RN:     <TouchableOpacity style={styles.actionCard} onPress={handleViewCoverage}>
       * RN:       <Icon name="shield" size={20} />
       * RN:       <Text>Coverage</Text>
       * RN:     </TouchableOpacity>
       * RN:     ...
       * RN:   </View>
       * RN: </View>
       * RN:
       * RN: StyleSheet:
       * RN: topSection: {
       * RN:   flexDirection: 'row',
       * RN:   gap: 12,
       * RN: },
       * RN: leftColumn: {
       * RN:   flex: 1.8,
       * RN: },
       * RN: rightColumn: {
       * RN:   flex: 0.9,
       * RN:   gap: 12,
       * RN: }
       */}
      <div 
        className="grid grid-cols-[1.8fr_0.9fr]"
        style={{ gap: 'var(--spacing-3)' }}
      >
        {/* LARGE CARD WITH GOLD GLOW - LEFT
         * RN: Main policy card with ring/glow effect
         * RN: <TouchableOpacity
         * RN:   style={[styles.mainCard, styles.goldGlow]}
         * RN:   onPress={handleViewCoverage}
         * RN:   activeOpacity={0.8}
         * RN: >
         * RN:   <View style={styles.mainCardContent}>
         * RN:     <Icon name="shield" size={48} color={theme.colors.iconColor} />
         * RN:   </View>
         * RN: </TouchableOpacity>
         * RN:
         * RN: StyleSheet:
         * RN: mainCard: {
         * RN:   aspectRatio: 1,
         * RN:   borderRadius: 24,
         * RN:   backgroundColor: theme.colors.cardBg,
         * RN:   borderWidth: 1,
         * RN:   borderColor: theme.colors.cardBorder,
         * RN:   ...Platform.select({
         * RN:     ios: {
         * RN:       shadowColor: '#000',
         * RN:       shadowOffset: { width: 0, height: 4 },
         * RN:       shadowOpacity: 0.3,
         * RN:       shadowRadius: 12,
         * RN:     },
         * RN:     android: {
         * RN:       elevation: 8,
         * RN:     },
         * RN:   }),
         * RN: },
         * RN: goldGlow: {
         * RN:   borderWidth: 2,
         * RN:   borderColor: '#eab308',
         * RN: }
         */}
        <div 
          className="ring-2 ring-yellow-500 ring-offset-2 ring-offset-transparent backdrop-blur-sm transition-all"
          style={{
            aspectRatio: '1',
            borderRadius: 'var(--radius-2xl)',
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* PLACEHOLDER FOR POLICY DOCUMENT OR IMAGE CONTENT
           * RN: Could display:
           * RN: - Policy document thumbnail
           * RN: - QR code for policy
           * RN: - Policy status badge
           * RN: - Premium payment status
           */}
          <div className="w-full h-full flex items-center justify-center">
            <Shield 
              className="w-12 h-12"
              style={{ color: 'var(--icon-color)' }}
            />
          </div>
        </div>

        {/* 3 SMALL ACTION CARDS - RIGHT
         * RN: <View style={styles.actionCardsColumn}>
         */}
        <div 
          className="flex flex-col justify-between"
          style={{ gap: 'var(--spacing-3)' }}
        >
          {/* COVERAGE CARD
           * RN: <TouchableOpacity
           * RN:   style={styles.actionCard}
           * RN:   onPress={handleViewCoverage}
           * RN:   activeOpacity={0.8}
           * RN: >
           * RN:   <View style={styles.actionCardContent}>
           * RN:     <Icon name="shield" size={20} color={theme.colors.iconColor} />
           * RN:     <Text style={styles.actionCardText}>Coverage</Text>
           * RN:   </View>
           * RN: </TouchableOpacity>
           * RN:
           * RN: StyleSheet:
           * RN: actionCard: {
           * RN:   flex: 1,
           * RN:   borderRadius: 16,
           * RN:   backgroundColor: theme.colors.cardBg,
           * RN:   borderWidth: 1,
           * RN:   borderColor: theme.colors.cardBorder,
           * RN:   padding: 12,
           * RN:   elevation: 2,
           * RN: },
           * RN: actionCardContent: {
           * RN:   flexDirection: 'row',
           * RN:   alignItems: 'center',
           * RN:   height: '100%',
           * RN:   gap: 8,
           * RN: }
           */}
          <button
            className="backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
            style={{
              flex: 1,
              borderRadius: 'var(--radius-xl)',
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
              padding: 'var(--spacing-3)',
            }}
          >
            <div className="flex items-center h-full" style={{ gap: 'var(--spacing-2)' }}>
              <Shield className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--icon-color)' }} />
              <span 
                className="truncate"
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--text-primary)',
                }}
              >
                Coverage
              </span>
            </div>
          </button>

          {/* Documents Card */}
          <button
            className="backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
            style={{
              flex: 1,
              borderRadius: 'var(--radius-xl)',
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
              padding: 'var(--spacing-3)',
            }}
          >
            <div className="flex items-center h-full" style={{ gap: 'var(--spacing-2)' }}>
              <FileText className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--icon-color)' }} />
              <span 
                className="truncate"
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--text-primary)',
                }}
              >
                Documents
              </span>
            </div>
          </button>

          {/* Claims Card */}
          <button
            className="backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
            style={{
              flex: 1,
              borderRadius: 'var(--radius-xl)',
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
              padding: 'var(--spacing-3)',
            }}
          >
            <div className="flex items-center h-full" style={{ gap: 'var(--spacing-2)' }}>
              <DollarSign className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--icon-color)' }} />
              <span 
                className="truncate"
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--text-primary)',
                }}
              >
                Claims
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* POLICY DETAILS SECTION - LARGE SQUARE
       * RN: <View style={styles.policyDetailsCard}>
       * RN:   <Text style={styles.policyDetailsTitle}>Policy Details</Text>
       * RN:   <View style={styles.detailsGrid}>
       * RN:     {policyDetails.map((detail, index) => (
       * RN:       <PolicyDetailItem key={index} detail={detail} />
       * RN:     ))}
       * RN:   </View>
       * RN: </View>
       * RN:
       * RN: StyleSheet:
       * RN: policyDetailsCard: {
       * RN:   borderRadius: 24,
       * RN:   backgroundColor: theme.colors.cardBg,
       * RN:   borderWidth: 1,
       * RN:   borderColor: theme.colors.cardBorder,
       * RN:   padding: 20,
       * RN: },
       * RN: detailsGrid: {
       * RN:   flexDirection: 'row',
       * RN:   flexWrap: 'wrap',
       * RN:   gap: 20,
       * RN: }
       * RN:
       * RN: DATA SOURCE: Hard-coded policy details
       * RN: REPLACE WITH: API data from TanStack Query
       * RN: API: GET /api/policies/current
       */}
      <Card
        className="backdrop-blur-sm"
        style={{
          borderRadius: 'var(--radius-2xl)',
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--card-border)',
          padding: 'var(--spacing-5)',
        }}
      >
        <div className="flex flex-col" style={{ gap: 'var(--spacing-5)' }}>
          <h3 
            style={{
              fontSize: 'var(--text-lg)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--text-primary)',
            }}
          >
            Policy Details
          </h3>

          {/* DETAILS GRID
           * RN: <View style={styles.detailsGrid}>
           * RN:   {[
           * RN:     { label: 'Policy Number', value: policy?.policyNumber },
           * RN:     { label: 'Policy Type', value: policy?.type },
           * RN:     { label: 'Coverage Amount', value: policy?.coverageAmount },
           * RN:     { label: 'Premium', value: policy?.premium },
           * RN:     { label: 'Deductible', value: policy?.deductible },
           * RN:     { label: 'Renewal Date', value: policy?.renewalDate },
           * RN:   ].map((item, index) => (
           * RN:     <View key={index} style={styles.detailItem}>
           * RN:       <Text style={styles.detailLabel}>{item.label}</Text>
           * RN:       <Text style={styles.detailValue}>{item.value}</Text>
           * RN:     </View>
           * RN:   ))}
           * RN: </View>
           * RN:
           * RN: Each detail item should be 50% width to create 2-column grid
           */}
          <div className="grid grid-cols-2" style={{ gap: 'var(--spacing-5)' }}>
            <div className="flex flex-col" style={{ gap: 'var(--spacing-1)' }}>
              <label 
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-secondary)',
                }}
              >
                Policy Number
              </label>
              <p 
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--text-primary)',
                }}
              >
                HO-2024-789456
              </p>
            </div>

            <div className="flex flex-col" style={{ gap: 'var(--spacing-1)' }}>
              <label 
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-secondary)',
                }}
              >
                Policy Type
              </label>
              <p 
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--text-primary)',
                }}
              >
                Homeowners
              </p>
            </div>

            <div className="flex flex-col" style={{ gap: 'var(--spacing-1)' }}>
              <label 
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-secondary)',
                }}
              >
                Coverage Amount
              </label>
              <p 
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--text-primary)',
                }}
              >
                $850,000
              </p>
            </div>

            <div className="flex flex-col" style={{ gap: 'var(--spacing-1)' }}>
              <label 
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-secondary)',
                }}
              >
                Premium
              </label>
              <p 
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--text-primary)',
                }}
              >
                $245/month
              </p>
            </div>

            <div className="flex flex-col" style={{ gap: 'var(--spacing-1)' }}>
              <label 
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-secondary)',
                }}
              >
                Deductible
              </label>
              <p 
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--text-primary)',
                }}
              >
                $2,500
              </p>
            </div>

            <div className="flex flex-col" style={{ gap: 'var(--spacing-1)' }}>
              <label 
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-secondary)',
                }}
              >
                Renewal Date
              </label>
              <p 
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--text-primary)',
                }}
              >
                Dec 15, 2025
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* BOTTOM: 3 CIRCULAR BUTTONS
       * RN: Quick action buttons for common policy tasks
       * RN: <View style={styles.bottomActions}>
       * RN:   <TouchableOpacity
       * RN:     style={styles.circularButton}
       * RN:     onPress={handleAction1}
       * RN:   >
       * RN:     <Icon name="circle" size={28} color={theme.colors.iconColor} />
       * RN:   </TouchableOpacity>
       * RN:   
       * RN:   <TouchableOpacity
       * RN:     style={[styles.circularButton, styles.featuredButton]}
       * RN:     onPress={handleFeaturedAction}
       * RN:   >
       * RN:     <Icon name="check-circle" size={28} color={theme.colors.iconColor} />
       * RN:     <View style={styles.badge} />
       * RN:   </TouchableOpacity>
       * RN:   
       * RN:   <TouchableOpacity
       * RN:     style={styles.circularButton}
       * RN:     onPress={handleAction3}
       * RN:   >
       * RN:     <Icon name="circle" size={28} color={theme.colors.iconColor} />
       * RN:   </TouchableOpacity>
       * RN: </View>
       * RN:
       * RN: StyleSheet:
       * RN: bottomActions: {
       * RN:   flexDirection: 'row',
       * RN:   alignItems: 'center',
       * RN:   justifyContent: 'center',
       * RN:   gap: 32,
       * RN:   paddingTop: 8,
       * RN: },
       * RN: circularButton: {
       * RN:   width: 72,
       * RN:   height: 72,
       * RN:   borderRadius: 36,
       * RN:   backgroundColor: theme.colors.cardBg,
       * RN:   borderWidth: 1,
       * RN:   borderColor: theme.colors.cardBorder,
       * RN:   alignItems: 'center',
       * RN:   justifyContent: 'center',
       * RN:   ...Platform.select({
       * RN:     ios: {
       * RN:       shadowColor: '#000',
       * RN:       shadowOffset: { width: 0, height: 4 },
       * RN:       shadowOpacity: 0.3,
       * RN:       shadowRadius: 12,
       * RN:     },
       * RN:     android: {
       * RN:       elevation: 8,
       * RN:     },
       * RN:   }),
       * RN: },
       * RN: featuredButton: {
       * RN:   shadowColor: '#a855f7',
       * RN:   shadowOpacity: 0.4,
       * RN:   shadowRadius: 20,
       * RN: },
       * RN: badge: {
       * RN:   position: 'absolute',
       * RN:   top: -2,
       * RN:   right: -2,
       * RN:   width: 14,
       * RN:   height: 14,
       * RN:   borderRadius: 7,
       * RN:   backgroundColor: '#a855f7',
       * RN:   shadowColor: '#a855f7',
       * RN:   shadowOpacity: 0.8,
       * RN:   shadowRadius: 12,
       * RN: }
       * RN:
       * RN: SUGGESTED ACTIONS:
       * RN: - Left: View policy history
       * RN: - Center: Make payment (featured)
       * RN: - Right: Update beneficiaries
       */}
      <div 
        className="flex items-center justify-center"
        style={{ gap: 'var(--spacing-8)', paddingTop: 'var(--spacing-2)' }}
      >
        {/* Left Button */}
        <button
          className="backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div className="flex items-center justify-center w-full h-full">
            <Circle className="w-7 h-7" style={{ color: 'var(--icon-color)' }} />
          </div>
        </button>

        {/* Center Button - Featured with purple accent
         * RN: Featured action (e.g., make payment, renew policy)
         * RN: Purple glow and badge indicator draw attention
         */}
        <button
          className="backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), 0 0 20px rgba(139, 92, 246, 0.4)',
            position: 'relative',
          }}
        >
          <div className="flex items-center justify-center w-full h-full">
            <CheckCircle2 className="w-7 h-7" style={{ color: 'var(--icon-color)' }} />
          </div>
          {/* Purple sparkle indicator */}
          <div
            className="absolute"
            style={{
              top: '-2px',
              right: '-2px',
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              backgroundColor: '#a855f7',
              boxShadow: '0 0 12px rgba(168, 85, 247, 0.8)',
            }}
          />
        </button>

        {/* Right Button */}
        <button
          className="backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div className="flex items-center justify-center w-full h-full">
            <Circle className="w-7 h-7" style={{ color: 'var(--icon-color)' }} />
          </div>
        </button>
      </div>
      {/* RN: </ScrollView> */}
      {/* RN: </SafeAreaView> */}
    </div>
  );
}

// RN: ==============================================================================
// RN: COMPLETE REACT NATIVE STYLESHEET EXAMPLE
// RN: ==============================================================================
// RN:
// RN: import { StyleSheet } from 'react-native';
// RN:
// RN: const styles = StyleSheet.create({
// RN:   container: {
// RN:     flex: 1,
// RN:     backgroundColor: theme.colors.bgPrimary,
// RN:   },
// RN:   scrollContent: {
// RN:     paddingHorizontal: 24,
// RN:     paddingBottom: 24,
// RN:     gap: 16,
// RN:   },
// RN:   topSection: {
// RN:     flexDirection: 'row',
// RN:     gap: 12,
// RN:   },
// RN:   leftColumn: {
// RN:     flex: 1.8,
// RN:   },
// RN:   rightColumn: {
// RN:     flex: 0.9,
// RN:     gap: 12,
// RN:   },
// RN:   mainCard: {
// RN:     aspectRatio: 1,
// RN:     borderRadius: 24,
// RN:     backgroundColor: theme.colors.cardBg,
// RN:     borderWidth: 1,
// RN:     borderColor: theme.colors.cardBorder,
// RN:     alignItems: 'center',
// RN:     justifyContent: 'center',
// RN:   },
// RN:   actionCard: {
// RN:     flex: 1,
// RN:     borderRadius: 16,
// RN:     backgroundColor: theme.colors.cardBg,
// RN:     borderWidth: 1,
// RN:     borderColor: theme.colors.cardBorder,
// RN:     padding: 12,
// RN:   },
// RN:   policyDetailsCard: {
// RN:     borderRadius: 24,
// RN:     backgroundColor: theme.colors.cardBg,
// RN:     borderWidth: 1,
// RN:     borderColor: theme.colors.cardBorder,
// RN:     padding: 20,
// RN:   },
// RN:   detailsGrid: {
// RN:     flexDirection: 'row',
// RN:     flexWrap: 'wrap',
// RN:     gap: 20,
// RN:   },
// RN:   detailItem: {
// RN:     width: '45%',
// RN:     gap: 4,
// RN:   },
// RN:   bottomActions: {
// RN:     flexDirection: 'row',
// RN:     alignItems: 'center',
// RN:     justifyContent: 'center',
// RN:     gap: 32,
// RN:     paddingTop: 8,
// RN:   },
// RN:   circularButton: {
// RN:     width: 72,
// RN:     height: 72,
// RN:     borderRadius: 36,
// RN:     backgroundColor: theme.colors.cardBg,
// RN:     borderWidth: 1,
// RN:     borderColor: theme.colors.cardBorder,
// RN:     alignItems: 'center',
// RN:     justifyContent: 'center',
// RN:   },
// RN: });
