/**
 * ==============================================================================
 * GRANTAPPLICATIONSCREEN.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: One-click grant application flow with pre-filled data from Insuragrid.
 * This is the PRIMARY VALUE CAPTURE mechanism - transforms "I qualify" into
 * "Application submitted" in 5 minutes.
 * 
 * BUSINESS IMPACT: 5x grant capture rate
 * - Pre-filled applications (90% complete from Insuragrid)
 * - Document checklist integration
 * - E-signature support
 * - Status tracking
 * - SUCCESS FEE: 10% of grant ($850 average per grant)
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * COMPLEXITY: HIGH
 * This screen involves forms, document uploads, file management, and multi-step flows.
 * 
 * 1. FORM MANAGEMENT:
 *    - Use react-hook-form@7.55.0 for form state
 *    - Pre-fill from Insuragrid data
 *    - Real-time validation
 *    - Auto-save drafts
 * 
 * 2. DOCUMENT UPLOADS:
 *    - react-native-document-picker for file selection
 *    - react-native-fs for file management
 *    - Image compression for photos
 *    - expo-image-picker for camera integration
 * 
 * 3. E-SIGNATURE:
 *    - react-native-signature-canvas
 *    - Or @terrylinla/react-native-sketch-canvas
 *    - Save signature as image
 * 
 * 4. PROGRESS TRACKING:
 *    - Show completion percentage
 *    - Save draft state to AsyncStorage
 *    - Resume from draft
 * 
 * 5. PDF GENERATION:
 *    - Use backend API to generate PDF
 *    - OR react-native-html-to-pdf
 *    - Preview before submit
 * 
 * ==============================================================================
 * TANSTACK QUERY INTEGRATION
 * ==============================================================================
 * 
 * // Fetch grant details
 * const { data: grant } = useQuery({
 *   queryKey: ['grant', grantId],
 *   queryFn: () => grantApi.getDetails(grantId),
 * });
 * 
 * // Pre-fill application from Insuragrid
 * const { data: prefillData } = useQuery({
 *   queryKey: ['grant-prefill', grantId, propertyId],
 *   queryFn: () => grantApi.getPrefillData(grantId, propertyId),
 * });
 * 
 * // Submit application
 * const submitMutation = useMutation({
 *   mutationFn: (application: GrantApplication) => 
 *     grantApi.submit(application),
 *   onSuccess: (response) => {
 *     queryClient.invalidateQueries(['grants']);
 *     navigation.navigate('GrantTracking', { applicationId: response.id });
 *   },
 * });
 * 
 * // Upload document
 * const uploadMutation = useMutation({
 *   mutationFn: (file: File) => documentApi.upload(file),
 * });
 * 
 * ==============================================================================
 * ZUSTAND STORE
 * ==============================================================================
 * 
 * interface GrantApplicationStore {
 *   draftApplications: Record<string, Partial<GrantApplication>>;
 *   saveDraft: (grantId: string, data: Partial<GrantApplication>) => void;
 *   clearDraft: (grantId: string) => void;
 *   getDraft: (grantId: string) => Partial<GrantApplication> | null;
 * }
 * 
 * ==============================================================================
 * REACT NATIVE IMPLEMENTATION EXAMPLE
 * ==============================================================================
 * 
 * import React, { useState } from 'react';
 * import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
 * import { useForm, Controller } from 'react-hook-form@7.55.0';
 * import DocumentPicker from 'react-native-document-picker';
 * import SignatureScreen from 'react-native-signature-canvas';
 * import { useQuery, useMutation } from '@tanstack/react-query';
 * 
 * const GrantApplicationScreen = ({ route, navigation }) => {
 *   const { grantId, propertyId } = route.params;
 *   const [currentStep, setCurrentStep] = useState(1);
 *   
 *   // Fetch grant details
 *   const { data: grant } = useQuery({
 *     queryKey: ['grant', grantId],
 *     queryFn: () => grantApi.getDetails(grantId),
 *   });
 *   
 *   // Get pre-filled data from Insuragrid
 *   const { data: prefillData } = useQuery({
 *     queryKey: ['grant-prefill', grantId, propertyId],
 *     queryFn: () => grantApi.getPrefillData(grantId, propertyId),
 *   });
 *   
 *   // Form setup with pre-filled values
 *   const { control, handleSubmit, watch } = useForm({
 *     defaultValues: prefillData,
 *   });
 *   
 *   // Submit mutation
 *   const submitMutation = useMutation({
 *     mutationFn: (data) => grantApi.submit(data),
 *     onSuccess: () => {
 *       Alert.alert('Success!', 'Application submitted');
 *       navigation.navigate('GrantTracking');
 *     },
 *   });
 *   
 *   // Document upload
 *   const handleDocumentPick = async (documentType: string) => {
 *     try {
 *       const result = await DocumentPicker.pick({
 *         type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
 *       });
 *       
 *       // Upload to server
 *       await uploadMutation.mutateAsync({
 *         file: result,
 *         documentType,
 *         applicationId: grantId,
 *       });
 *     } catch (err) {
 *       if (DocumentPicker.isCancel(err)) {
 *         // User cancelled
 *       } else {
 *         throw err;
 *       }
 *     }
 *   };
 *   
 *   return (
 *     <ScrollView className="flex-1 bg-[--color-background]">
 *       {/* Progress bar */}
 *       <ProgressBar current={currentStep} total={5} />
 *       
 *       {/* Step content */}
 *       {currentStep === 1 && (
 *         <GrantDetailsStep grant={grant} />
 *       )}
 *       
 *       {currentStep === 2 && (
 *         <PreFilledFormStep
 *           control={control}
 *           prefillData={prefillData}
 *         />
 *       )}
 *       
 *       {currentStep === 3 && (
 *         <DocumentChecklistStep
 *           onPickDocument={handleDocumentPick}
 *         />
 *       )}
 *       
 *       {currentStep === 4 && (
 *         <SignatureStep onSign={handleSign} />
 *       )}
 *       
 *       {currentStep === 5 && (
 *         <ReviewStep
 *           data={watch()}
 *           onSubmit={handleSubmit(submitMutation.mutate)}
 *         />
 *       )}
 *       
 *       {/* Navigation buttons */}
 *       <View className="flex-row gap-4 p-6">
 *         {currentStep > 1 && (
 *           <Pressable onPress={() => setCurrentStep(prev => prev - 1)}>
 *             <Text>← Back</Text>
 *           </Pressable>
 *         )}
 *         <Pressable onPress={() => setCurrentStep(prev => prev + 1)}>
 *           <Text>Next →</Text>
 *         </Pressable>
 *       </View>
 *     </ScrollView>
 *   );
 * };
 * 
 * ==============================================================================
 */

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle, 
  AlertCircle, 
  Upload, 
  FileText, 
  Camera,
  Calendar,
  DollarSign,
  Home,
  User,
  Mail,
  Phone,
  ArrowRight,
  ArrowLeft,
  Check,
  X
} from 'lucide-react';

// RN: Import from 'react-native'
// RN: import { View, Text, ScrollView, Pressable, TextInput, Alert } from 'react-native';
// RN: import { useForm, Controller } from 'react-hook-form@7.55.0';
// RN: import DocumentPicker from 'react-native-document-picker';
// RN: import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// RN: import SignatureScreen from 'react-native-signature-canvas';

interface Grant {
  id: string;
  name: string;
  amount: number;
  agency: string;
  deadline: string;
  description: string;
  requirements: string[];
  eligibility: string[];
}

interface GrantApplicationData {
  // Property information (pre-filled from Insuragrid)
  propertyAddress: string;
  propertyType: string;
  yearBuilt: number;
  squareFeet: number;
  
  // Owner information (pre-filled from Insuragrid)
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  ownerSSN: string; // Last 4 digits only
  
  // Financial information
  householdIncome: number;
  employmentStatus: string;
  
  // Documents
  documents: {
    energyAudit?: File;
    proofOfIncome?: File;
    propertyPhotos?: File[];
    contractorQuote?: File;
  };
  
  // Signature
  signature?: string;
  signatureDate?: Date;
}

interface GrantApplicationScreenProps {
  grant: Grant;
  propertyId: string;
  onComplete: (applicationId: string) => void;
  onCancel: () => void;
}

export default function GrantApplicationScreen({ 
  grant, 
  propertyId, 
  onComplete,
  onCancel 
}: GrantApplicationScreenProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<GrantApplicationData>>({
    // Mock pre-filled data from Insuragrid
    propertyAddress: '1234 Valencia St, San Francisco, CA 94110',
    propertyType: 'Single Family',
    yearBuilt: 1985,
    squareFeet: 1850,
    ownerName: 'Sarah Johnson',
    ownerEmail: 'sarah.johnson@email.com',
    ownerPhone: '(415) 555-0123',
    ownerSSN: '****1234',
  });

  const totalSteps = 5;
  const completionPercentage = (currentStep / totalSteps) * 100;

  // RN: Replace with TanStack Query mutations
  const handleSubmit = () => {
    // Mock submission
    setTimeout(() => {
      onComplete('APP-2025-001');
    }, 1000);
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      {/* RN: Replace div with SafeAreaView */}
      
      {/* Header with progress */}
      <div 
        className="sticky top-0 z-50 backdrop-blur-lg border-b"
        style={{
          background: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* RN: Use Animated.View for sticky header */}
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onCancel}
              className="flex items-center gap-2"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {/* RN: Replace button with Pressable */}
              <X size={20} />
              <span>Cancel</span>
            </button>

            <div className="text-right">
              <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                Step {currentStep} of {totalSteps}
              </div>
              <div className="text-xs" style={{ color: 'var(--color-gold)' }}>
                {Math.round(completionPercentage)}% complete
              </div>
            </div>
          </div>

          {/* Progress bar */}
          {/* RN: Use Animated.View with width animation */}
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 0.3 }}
              className="h-full rounded-full"
              style={{ background: 'var(--color-gold)' }}
            />
          </div>
        </div>
      </div>

      {/* Main content */}
      {/* RN: Replace with KeyboardAvoidingView + ScrollView */}
      <div className="max-w-4xl mx-auto p-6">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <Step1GrantDetails 
              key="step1"
              grant={grant} 
              onNext={handleNext}
            />
          )}

          {currentStep === 2 && (
            <Step2PreFilledForm
              key="step2"
              formData={formData}
              onChange={setFormData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 3 && (
            <Step3Documents
              key="step3"
              grant={grant}
              formData={formData}
              onChange={setFormData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 4 && (
            <Step4Signature
              key="step4"
              formData={formData}
              onChange={setFormData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 5 && (
            <Step5Review
              key="step5"
              grant={grant}
              formData={formData}
              onSubmit={handleSubmit}
              onBack={handleBack}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Step 1: Grant Details
function Step1GrantDetails({ grant, onNext }: { grant: Grant; onNext: () => void }) {
  /* RN: Convert to View components
   * Use FlatList for requirements/eligibility lists
   */

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Grant header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(212, 175, 55, 0.2)' }}
        >
          <DollarSign size={40} style={{ color: 'var(--color-gold)' }} />
        </div>
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
          {grant.name}
        </h1>
        <p className="text-2xl font-bold" style={{ color: 'var(--color-gold)' }}>
          ${grant.amount.toLocaleString()} Available
        </p>
      </div>

      {/* Grant details card */}
      <div 
        className="p-6 rounded-xl"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
          Grant Details
        </h2>

        <div className="space-y-4">
          <InfoRow icon={<Home size={20} />} label="Agency" value={grant.agency} />
          <InfoRow icon={<Calendar size={20} />} label="Deadline" value={grant.deadline} />
          
          <div>
            <p className="text-sm mb-2" style={{ color: 'var(--color-text-secondary)' }}>
              Description:
            </p>
            <p style={{ color: 'var(--color-text-primary)' }}>{grant.description}</p>
          </div>
        </div>
      </div>

      {/* Eligibility checklist */}
      <div 
        className="p-6 rounded-xl"
        style={{
          background: 'rgba(34, 197, 94, 0.1)',
          border: '1px solid rgba(34, 197, 94, 0.2)',
        }}
      >
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
          <CheckCircle size={24} style={{ color: '#22C55E' }} />
          You Qualify Because:
        </h2>

        <div className="space-y-2">
          {grant.eligibility.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle size={20} style={{ color: '#22C55E', flexShrink: 0 }} />
              <span style={{ color: 'var(--color-text-primary)' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Requirements */}
      <div 
        className="p-6 rounded-xl"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
          What You'll Need:
        </h2>

        <div className="space-y-2">
          {grant.requirements.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <FileText size={20} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
              <span style={{ color: 'var(--color-text-primary)' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Estimated time */}
      <div 
        className="p-4 rounded-xl text-center"
        style={{
          background: 'rgba(212, 175, 55, 0.1)',
          border: '1px solid rgba(212, 175, 55, 0.2)',
        }}
      >
        <p style={{ color: 'var(--color-text-secondary)' }}>
          ⏱️ Estimated time to complete: <strong style={{ color: 'var(--color-gold)' }}>5 minutes</strong>
        </p>
        <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
          We've pre-filled 90% of the application from your property data
        </p>
      </div>

      {/* CTA */}
      <button
        onClick={onNext}
        className="w-full py-4 px-8 rounded-xl font-bold text-lg flex items-center justify-center gap-2"
        style={{
          background: 'linear-gradient(135deg, var(--color-gold) 0%, #DAA520 100%)',
          color: '#000',
        }}
      >
        {/* RN: Replace with Pressable */}
        Start Application
        <ArrowRight size={24} />
      </button>
    </motion.div>
  );
}

// Step 2: Pre-filled Form
function Step2PreFilledForm({ formData, onChange, onNext, onBack }: any) {
  /* RN: Use react-hook-form with Controller for form fields
   * Pre-fill from Insuragrid data
   * 
   * Example:
   * <Controller
   *   control={control}
   *   name="propertyAddress"
   *   render={({ field: { onChange, value } }) => (
   *     <TextInput
   *       value={value}
   *       onChangeText={onChange}
   *       style={styles.input}
   *     />
   *   )}
   * />
   */

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
          Application Form
        </h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          ✨ Pre-filled from your Insuragrid data
        </p>
      </div>

      {/* Property Information (Read-only, from Insuragrid) */}
      <div 
        className="p-6 rounded-xl"
        style={{
          background: 'rgba(34, 197, 94, 0.1)',
          border: '1px solid rgba(34, 197, 94, 0.2)',
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle size={20} style={{ color: '#22C55E' }} />
          <h2 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>
            Property Information (Auto-filled)
          </h2>
        </div>

        <div className="space-y-3">
          <FormField label="Address" value={formData.propertyAddress} readOnly />
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Type" value={formData.propertyType} readOnly />
            <FormField label="Year Built" value={formData.yearBuilt} readOnly />
          </div>
          <FormField label="Square Feet" value={formData.squareFeet?.toLocaleString()} readOnly />
        </div>
      </div>

      {/* Owner Information (Editable) */}
      <div 
        className="p-6 rounded-xl"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
          Owner Information
        </h2>

        <div className="space-y-4">
          <FormField 
            label="Full Name" 
            value={formData.ownerName}
            onChange={(value) => onChange({ ...formData, ownerName: value })}
            icon={<User size={20} />}
          />
          <FormField 
            label="Email" 
            value={formData.ownerEmail}
            onChange={(value) => onChange({ ...formData, ownerEmail: value })}
            icon={<Mail size={20} />}
            type="email"
          />
          <FormField 
            label="Phone" 
            value={formData.ownerPhone}
            onChange={(value) => onChange({ ...formData, ownerPhone: value })}
            icon={<Phone size={20} />}
            type="tel"
          />
        </div>
      </div>

      {/* Financial Information */}
      <div 
        className="p-6 rounded-xl"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
          Financial Information
        </h2>

        <div className="space-y-4">
          <FormField 
            label="Household Income" 
            value={formData.householdIncome}
            onChange={(value) => onChange({ ...formData, householdIncome: value })}
            icon={<DollarSign size={20} />}
            type="number"
            placeholder="Annual household income"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 py-4 px-8 rounded-xl font-bold flex items-center justify-center gap-2"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'var(--color-text-primary)',
          }}
        >
          <ArrowLeft size={20} />
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 py-4 px-8 rounded-xl font-bold flex items-center justify-center gap-2"
          style={{
            background: 'linear-gradient(135deg, var(--color-gold) 0%, #DAA520 100%)',
            color: '#000',
          }}
        >
          Next
          <ArrowRight size={20} />
        </button>
      </div>
    </motion.div>
  );
}

// Step 3: Document Upload
function Step3Documents({ grant, formData, onChange, onNext, onBack }: any) {
  /* RN: Document picker implementation
   * 
   * import DocumentPicker from 'react-native-document-picker';
   * import { launchCamera } from 'react-native-image-picker';
   * 
   * const pickDocument = async () => {
   *   try {
   *     const result = await DocumentPicker.pick({
   *       type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
   *     });
   *     // Upload to server
   *     await uploadMutation.mutateAsync(result);
   *   } catch (err) {
   *     if (DocumentPicker.isCancel(err)) {
   *       // User cancelled
   *     }
   *   }
   * };
   */

  const documents = [
    { 
      id: 'energyAudit', 
      name: 'Energy Audit Report', 
      required: true,
      description: 'Recent energy audit (within 12 months)',
      status: formData.documents?.energyAudit ? 'uploaded' : 'pending',
    },
    { 
      id: 'proofOfIncome', 
      name: 'Proof of Income', 
      required: true,
      description: 'W2, tax return, or pay stubs',
      status: formData.documents?.proofOfIncome ? 'uploaded' : 'pending',
    },
    { 
      id: 'propertyPhotos', 
      name: 'Property Photos', 
      required: true,
      description: 'Exterior and interior photos',
      status: formData.documents?.propertyPhotos?.length > 0 ? 'uploaded' : 'pending',
    },
    { 
      id: 'contractorQuote', 
      name: 'Contractor Quote', 
      required: false,
      description: 'Quote for proposed work (optional)',
      status: formData.documents?.contractorQuote ? 'uploaded' : 'pending',
    },
  ];

  const handleUpload = (docId: string) => {
    // Mock upload - RN: Use DocumentPicker here
    console.log('Upload', docId);
  };

  const handleScheduleInspection = () => {
    // Navigate to inspection scheduling
    console.log('Schedule inspection');
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
          Required Documents
        </h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Upload the documents needed for your application
        </p>
      </div>

      {/* Document checklist */}
      <div className="space-y-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="p-4 rounded-xl"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${doc.status === 'uploaded' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold" style={{ color: 'var(--color-text-primary)' }}>
                    {doc.name}
                  </h3>
                  {doc.required && (
                    <span className="text-xs px-2 py-1 rounded" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#EF4444' }}>
                      Required
                    </span>
                  )}
                  {doc.status === 'uploaded' && (
                    <CheckCircle size={16} style={{ color: '#22C55E' }} />
                  )}
                </div>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  {doc.description}
                </p>
              </div>

              <button
                onClick={() => handleUpload(doc.id)}
                className="ml-4 px-4 py-2 rounded-lg flex items-center gap-2"
                style={{
                  background: doc.status === 'uploaded' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(212, 175, 55, 0.2)',
                  color: doc.status === 'uploaded' ? '#22C55E' : 'var(--color-gold)',
                }}
              >
                {/* RN: Replace with Pressable */}
                <Upload size={16} />
                {doc.status === 'uploaded' ? 'Replace' : 'Upload'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Helper card - Schedule inspection */}
      <div 
        className="p-6 rounded-xl"
        style={{
          background: 'rgba(212, 175, 55, 0.1)',
          border: '1px solid rgba(212, 175, 55, 0.2)',
        }}
      >
        <h3 className="font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
          <Camera size={20} style={{ color: 'var(--color-gold)' }} />
          Need property photos?
        </h3>
        <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
          Schedule a drone inspection to get professional photos for your application.
        </p>
        <button
          onClick={handleScheduleInspection}
          className="px-4 py-2 rounded-lg font-bold"
          style={{
            background: 'var(--color-gold)',
            color: '#000',
          }}
        >
          Schedule Inspection →
        </button>
      </div>

      {/* Navigation */}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 py-4 px-8 rounded-xl font-bold flex items-center justify-center gap-2"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'var(--color-text-primary)',
          }}
        >
          <ArrowLeft size={20} />
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 py-4 px-8 rounded-xl font-bold flex items-center justify-center gap-2"
          style={{
            background: 'linear-gradient(135deg, var(--color-gold) 0%, #DAA520 100%)',
            color: '#000',
          }}
        >
          Next
          <ArrowRight size={20} />
        </button>
      </div>
    </motion.div>
  );
}

// Step 4: E-Signature
function Step4Signature({ formData, onChange, onNext, onBack }: any) {
  /* RN: Signature canvas implementation
   * 
   * import SignatureScreen from 'react-native-signature-canvas';
   * 
   * <SignatureScreen
   *   onOK={(signature) => {
   *     onChange({ ...formData, signature, signatureDate: new Date() });
   *   }}
   *   onEmpty={() => console.log('Empty')}
   *   descriptionText="Sign above"
   *   clearText="Clear"
   *   confirmText="Save"
   * />
   */

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
          Sign Your Application
        </h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Your electronic signature confirms the information is accurate
        </p>
      </div>

      {/* Signature pad */}
      <div 
        className="p-6 rounded-xl"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <h3 className="font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
          E-Signature
        </h3>

        {/* Mock signature canvas - RN: Use react-native-signature-canvas */}
        <div 
          className="h-48 rounded-xl flex items-center justify-center"
          style={{
            background: '#fff',
            border: '2px dashed rgba(0, 0, 0, 0.2)',
          }}
        >
          <p style={{ color: '#666' }}>Sign here with your finger or stylus</p>
        </div>

        <div className="flex gap-4 mt-4">
          <button
            className="px-4 py-2 rounded-lg"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'var(--color-text-primary)',
            }}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Legal text */}
      <div 
        className="p-4 rounded-xl text-sm"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: 'var(--color-text-secondary)',
        }}
      >
        <p>
          By signing this application, I certify that all information provided is true and accurate to the best of my knowledge. 
          I understand that false statements may result in denial of the grant or legal action.
        </p>
      </div>

      {/* Navigation */}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 py-4 px-8 rounded-xl font-bold flex items-center justify-center gap-2"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'var(--color-text-primary)',
          }}
        >
          <ArrowLeft size={20} />
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 py-4 px-8 rounded-xl font-bold flex items-center justify-center gap-2"
          style={{
            background: 'linear-gradient(135deg, var(--color-gold) 0%, #DAA520 100%)',
            color: '#000',
          }}
        >
          Review Application
          <ArrowRight size={20} />
        </button>
      </div>
    </motion.div>
  );
}

// Step 5: Review & Submit
function Step5Review({ grant, formData, onSubmit, onBack }: any) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    onSubmit();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
          Review & Submit
        </h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Please review your application before submitting
        </p>
      </div>

      {/* Grant summary */}
      <div 
        className="p-6 rounded-xl text-center"
        style={{
          background: 'rgba(212, 175, 55, 0.1)',
          border: '1px solid rgba(212, 175, 55, 0.2)',
        }}
      >
        <p className="text-sm mb-2" style={{ color: 'var(--color-text-secondary)' }}>
          Applying for:
        </p>
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
          {grant.name}
        </h2>
        <p className="text-3xl font-bold" style={{ color: 'var(--color-gold)' }}>
          ${grant.amount.toLocaleString()}
        </p>
      </div>

      {/* Application summary */}
      <div 
        className="p-6 rounded-xl"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <h3 className="font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
          Application Summary
        </h3>

        <div className="space-y-3">
          <SummaryRow label="Property" value={formData.propertyAddress} />
          <SummaryRow label="Applicant" value={formData.ownerName} />
          <SummaryRow label="Email" value={formData.ownerEmail} />
          <SummaryRow label="Phone" value={formData.ownerPhone} />
          <SummaryRow label="Documents" value="4 files uploaded" />
          <SummaryRow label="Signature" value="✓ Signed" />
        </div>
      </div>

      {/* What happens next */}
      <div 
        className="p-6 rounded-xl"
        style={{
          background: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
        }}
      >
        <h3 className="font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
          What Happens Next?
        </h3>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(59, 130, 246, 0.3)' }}
            >
              <span className="text-xs">1</span>
            </div>
            <div>
              <p className="font-bold" style={{ color: 'var(--color-text-primary)' }}>
                Application Review
              </p>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                Your application will be reviewed within 2-3 business days
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(59, 130, 246, 0.3)' }}
            >
              <span className="text-xs">2</span>
            </div>
            <div>
              <p className="font-bold" style={{ color: 'var(--color-text-primary)' }}>
                Approval Decision
              </p>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                You'll receive an email with the decision (typically 2-4 weeks)
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(59, 130, 246, 0.3)' }}
            >
              <span className="text-xs">3</span>
            </div>
            <div>
              <p className="font-bold" style={{ color: 'var(--color-text-primary)' }}>
                Grant Disbursement
              </p>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                Funds will be sent directly to you or your contractor
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Submit button */}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="flex-1 py-4 px-8 rounded-xl font-bold flex items-center justify-center gap-2"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'var(--color-text-primary)',
            opacity: isSubmitting ? 0.5 : 1,
          }}
        >
          <ArrowLeft size={20} />
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-1 py-4 px-8 rounded-xl font-bold flex items-center justify-center gap-2"
          style={{
            background: isSubmitting 
              ? 'rgba(212, 175, 55, 0.5)' 
              : 'linear-gradient(135deg, var(--color-gold) 0%, #DAA520 100%)',
            color: '#000',
          }}
        >
          {isSubmitting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                ⏳
              </motion.div>
              Submitting...
            </>
          ) : (
            <>
              Submit Application
              <Check size={20} />
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}

// Helper components
function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div style={{ color: 'var(--color-gold)' }}>{icon}</div>
      <div>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{label}</p>
        <p style={{ color: 'var(--color-text-primary)' }}>{value}</p>
      </div>
    </div>
  );
}

function FormField({ label, value, onChange, icon, type = 'text', placeholder, readOnly = false }: any) {
  /* RN: Convert to TextInput with Controller
   * 
   * <Controller
   *   control={control}
   *   name="fieldName"
   *   render={({ field: { onChange, value } }) => (
   *     <View>
   *       <Text style={styles.label}>{label}</Text>
   *       <TextInput
   *         value={value}
   *         onChangeText={onChange}
   *         editable={!readOnly}
   *         style={[styles.input, readOnly && styles.readOnly]}
   *       />
   *     </View>
   *   )}
   * />
   */

  return (
    <div>
      <label className="block text-sm mb-2" style={{ color: 'var(--color-text-secondary)' }}>
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: 'var(--color-text-secondary)' }}>
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          readOnly={readOnly}
          className="w-full py-3 px-4 rounded-lg"
          style={{
            paddingLeft: icon ? '2.5rem' : '1rem',
            background: readOnly ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255, 255, 255, 0.05)',
            border: `1px solid ${readOnly ? 'rgba(34, 197, 94, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
            color: 'var(--color-text-primary)',
          }}
        />
        {/* RN: Replace input with TextInput */}
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span style={{ color: 'var(--color-text-secondary)' }}>{label}:</span>
      <span style={{ color: 'var(--color-text-primary)' }}>{value}</span>
    </div>
  );
}
