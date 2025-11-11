/**
 * ==============================================================================
 * BENEFITSSURVEYSCREEN.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Multi-step survey for benefits eligibility and personalization.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. MULTI-STEP FORM:
 *    - Progress indicator
 *    - Next/Previous navigation
 *    - Form validation
 * 
 * 2. FORM CONTROLS:
 *    - TextInput, RadioButtons, Checkboxes
 *    - Custom components for each
 * 
 * 3. REQUIRED API:
 *    - POST /api/survey/submit
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] Steps navigate correctly
 * - [ ] Validation works
 * - [ ] Submit successful
 * - [ ] iOS and Android compatible
 * 
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, ChevronRight, Check, Award, Home, DollarSign, 
  Calendar, Users, Shield, Zap, TrendingUp, FileText, Star,
  CheckCircle, AlertCircle, Info
} from 'lucide-react';
import { LiquidGlassHeader } from '../components/LiquidGlassHeader';
import { Progress } from '../components/ui/progress';
import { Button } from '../components/ui/button';
import { RadioGroup } from '../components/ui/radio-group';
import { Checkbox } from '../components/ui/checkbox';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner@2.0.3';

/* ==================== TYPES ==================== */
interface SurveyQuestion {
  id: string;
  type: 'single' | 'multiple' | 'text' | 'number' | 'year';
  category: string;
  question: string;
  description?: string;
  icon: React.ReactNode;
  options?: string[];
  placeholder?: string;
  required: boolean;
  helpText?: string;
}

interface SurveyAnswer {
  questionId: string;
  answer: string | string[];
}

/* ==================== SURVEY QUESTIONS ==================== */
const SURVEY_QUESTIONS: SurveyQuestion[] = [
  {
    id: 'homeowner-status',
    type: 'single',
    category: 'Property',
    question: 'What is your homeownership status?',
    description: 'This helps us understand your property situation',
    icon: <Home size={24} />,
    options: [
      'Own - Primary Residence',
      'Own - Secondary Home',
      'Own - Investment Property',
      'Rent',
      'Other'
    ],
    required: true,
    helpText: 'Many grants require primary homeownership'
  },
  {
    id: 'property-year',
    type: 'year',
    category: 'Property',
    question: 'What year was your home built?',
    description: 'Older homes may qualify for renovation grants',
    icon: <Calendar size={24} />,
    placeholder: 'e.g., 1985',
    required: true,
    helpText: 'Homes built before 2000 often qualify for energy efficiency grants'
  },
  {
    id: 'household-income',
    type: 'single',
    category: 'Financial',
    question: 'What is your annual household income range?',
    description: 'Income thresholds determine grant eligibility',
    icon: <DollarSign size={24} />,
    options: [
      'Under $35,000',
      '$35,000 - $50,000',
      '$50,000 - $75,000',
      '$75,000 - $100,000',
      '$100,000 - $150,000',
      'Over $150,000'
    ],
    required: true,
    helpText: 'Many grants target low to moderate income households'
  },
  {
    id: 'household-size',
    type: 'single',
    category: 'Household',
    question: 'How many people live in your household?',
    description: 'Household size affects income eligibility limits',
    icon: <Users size={24} />,
    options: [
      '1 person',
      '2 people',
      '3 people',
      '4 people',
      '5 or more people'
    ],
    required: true,
    helpText: 'Larger households have higher income thresholds'
  },
  {
    id: 'veteran-status',
    type: 'single',
    category: 'Demographics',
    question: 'Are you or your spouse a military veteran?',
    description: 'Veterans may qualify for special programs',
    icon: <Shield size={24} />,
    options: [
      'Yes - Currently serving',
      'Yes - Veteran',
      'Yes - Spouse of veteran',
      'No'
    ],
    required: true,
    helpText: 'VA programs offer exclusive benefits for veterans'
  },
  {
    id: 'property-improvements',
    type: 'multiple',
    category: 'Improvements',
    question: 'Which home improvements are you interested in?',
    description: 'Select all that apply',
    icon: <Zap size={24} />,
    options: [
      'Energy Efficiency (HVAC, Insulation)',
      'Solar Panel Installation',
      'Roof Replacement',
      'Window Replacement',
      'Storm Hardening',
      'Wildfire Mitigation',
      'Accessibility Modifications',
      'Foundation Repair',
      'Electrical Upgrades',
      'Plumbing Upgrades'
    ],
    required: false,
    helpText: 'Different grants cover different improvement types'
  },
  {
    id: 'disaster-risk',
    type: 'multiple',
    category: 'Risk',
    question: 'Is your property at risk for any of these?',
    description: 'Select all that apply',
    icon: <AlertCircle size={24} />,
    options: [
      'Hurricanes/Tropical Storms',
      'Flooding',
      'Tornadoes',
      'Earthquakes',
      'Wildfires',
      'Winter Storms',
      'None of these'
    ],
    required: false,
    helpText: 'Disaster mitigation grants target high-risk areas'
  },
  {
    id: 'disabilities',
    type: 'single',
    category: 'Demographics',
    question: 'Does anyone in your household have a disability?',
    description: 'Special programs exist for accessibility improvements',
    icon: <Users size={24} />,
    options: [
      'Yes',
      'No',
      'Prefer not to say'
    ],
    required: false,
    helpText: 'Accessibility grants help modify homes for disabilities'
  },
  {
    id: 'energy-costs',
    type: 'single',
    category: 'Financial',
    question: 'What is your approximate monthly energy bill?',
    description: 'High energy costs may indicate need for efficiency upgrades',
    icon: <TrendingUp size={24} />,
    options: [
      'Under $100',
      '$100 - $200',
      '$200 - $300',
      '$300 - $400',
      'Over $400'
    ],
    required: false,
    helpText: 'Energy efficiency grants can significantly reduce bills'
  },
  {
    id: 'insurance-claims',
    type: 'single',
    category: 'Insurance',
    question: 'Have you filed any insurance claims in the past 5 years?',
    description: 'Previous claims may affect eligibility',
    icon: <FileText size={24} />,
    options: [
      'No claims',
      '1 claim',
      '2-3 claims',
      '4 or more claims'
    ],
    required: false,
    helpText: 'Mitigation grants prioritize high-claim properties'
  },
  {
    id: 'additional-info',
    type: 'text',
    category: 'Additional',
    question: 'Is there anything else we should know?',
    description: 'Optional: Share any additional information that might help us match you with programs',
    icon: <Info size={24} />,
    placeholder: 'e.g., Recent property damage, upcoming renovations, specific concerns...',
    required: false
  }
];

/* ==================== ANIMATION VARIANTS ==================== */
const pageVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0
  })
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
};

/* ==================== HELPER FUNCTIONS ==================== */
const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    'Property': 'rgb(var(--color-copa-blue))',
    'Financial': 'rgb(var(--color-success))',
    'Household': 'rgb(var(--color-info))',
    'Demographics': 'rgb(var(--color-goldenrod))',
    'Improvements': 'rgb(var(--color-electric-blue))',
    'Risk': 'rgb(var(--color-warning))',
    'Insurance': 'rgb(var(--color-copa-blue))',
    'Additional': 'rgb(var(--color-text-secondary))'
  };
  return colors[category] || 'rgb(var(--color-copa-blue))';
};

/* ==================== MAIN COMPONENT ==================== */
interface BenefitsSurveyScreenProps {
  onBack?: () => void;
}

export function BenefitsSurveyScreen({ onBack }: BenefitsSurveyScreenProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<SurveyAnswer[]>([]);
  const [direction, setDirection] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = SURVEY_QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / SURVEY_QUESTIONS.length) * 100;

  // Get current answer
  const getCurrentAnswer = () => {
    const existingAnswer = answers.find(a => a.questionId === currentQuestion.id);
    return existingAnswer?.answer || (currentQuestion.type === 'multiple' ? [] : '');
  };

  // Update answer
  const updateAnswer = (answer: string | string[]) => {
    setAnswers(prev => {
      const filtered = prev.filter(a => a.questionId !== currentQuestion.id);
      return [...filtered, { questionId: currentQuestion.id, answer }];
    });
  };

  // Navigation
  const goToNext = () => {
    const currentAnswer = getCurrentAnswer();
    
    // Validate required questions
    if (currentQuestion.required && !currentAnswer) {
      toast.error('Please answer this question to continue');
      return;
    }

    if (currentQuestion.required && Array.isArray(currentAnswer) && currentAnswer.length === 0) {
      toast.error('Please select at least one option');
      return;
    }

    if (currentQuestionIndex < SURVEY_QUESTIONS.length - 1) {
      setDirection(1);
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Last question - show completion
      setIsComplete(true);
    }
  };

  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setDirection(-1);
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('Survey completed! Analyzing your eligibility...');
    setIsSubmitting(false);
    
    // Navigate back after a delay
    setTimeout(() => {
      if (onBack) onBack();
    }, 1500);
  };

  // Render answer input based on question type
  const renderAnswerInput = () => {
    const currentAnswer = getCurrentAnswer();

    switch (currentQuestion.type) {
      case 'single':
        return (
          <motion.div 
            className="flex flex-col" 
            style={{ gap: 'var(--spacing-2)' }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {currentQuestion.options?.map((option, index) => (
              <motion.button
                key={option}
                variants={itemVariants}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => updateAnswer(option)}
                className="backdrop-blur-sm"
                style={{
                  padding: 'var(--spacing-4)',
                  backgroundColor: currentAnswer === option 
                    ? `${getCategoryColor(currentQuestion.category)}20`
                    : 'var(--glass-bg)',
                  border: currentAnswer === option 
                    ? `2px solid ${getCategoryColor(currentQuestion.category)}`
                    : '1px solid var(--glass-border)',
                  borderRadius: 'var(--radius-lg)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  boxShadow: currentAnswer === option 
                    ? 'var(--shadow-depth-md)' 
                    : 'var(--shadow-depth-sm)',
                  transition: 'var(--transition-card)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span style={{ 
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-base)',
                  fontWeight: currentAnswer === option 
                    ? 'var(--font-weight-semibold)' 
                    : 'var(--font-weight-normal)'
                }}>
                  {option}
                </span>
                {currentAnswer === option && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  >
                    <CheckCircle 
                      size={20} 
                      style={{ color: getCategoryColor(currentQuestion.category) }} 
                    />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </motion.div>
        );

      case 'multiple':
        return (
          <motion.div 
            className="flex flex-col" 
            style={{ gap: 'var(--spacing-2)' }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {currentQuestion.options?.map((option) => {
              const isSelected = Array.isArray(currentAnswer) && currentAnswer.includes(option);
              
              return (
                <motion.button
                  key={option}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const current = Array.isArray(currentAnswer) ? currentAnswer : [];
                    if (isSelected) {
                      updateAnswer(current.filter(a => a !== option));
                    } else {
                      updateAnswer([...current, option]);
                    }
                  }}
                  className="backdrop-blur-sm"
                  style={{
                    padding: 'var(--spacing-4)',
                    backgroundColor: isSelected 
                      ? `${getCategoryColor(currentQuestion.category)}20`
                      : 'var(--glass-bg)',
                    border: isSelected 
                      ? `2px solid ${getCategoryColor(currentQuestion.category)}`
                      : '1px solid var(--glass-border)',
                    borderRadius: 'var(--radius-lg)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    boxShadow: isSelected 
                      ? 'var(--shadow-depth-md)' 
                      : 'var(--shadow-depth-sm)',
                    transition: 'var(--transition-card)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span style={{ 
                    color: 'var(--text-primary)',
                    fontSize: 'var(--text-base)',
                    fontWeight: isSelected 
                      ? 'var(--font-weight-semibold)' 
                      : 'var(--font-weight-normal)'
                  }}>
                    {option}
                  </span>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    >
                      <CheckCircle 
                        size={20} 
                        style={{ color: getCategoryColor(currentQuestion.category) }} 
                      />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        );

      case 'year':
      case 'number':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Input
              type="number"
              value={currentAnswer as string}
              onChange={(e) => updateAnswer(e.target.value)}
              placeholder={currentQuestion.placeholder}
              style={{
                fontSize: 'var(--text-lg)',
                padding: 'var(--spacing-4)',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-primary)',
                boxShadow: 'var(--shadow-depth-sm)'
              }}
            />
          </motion.div>
        );

      case 'text':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Textarea
              value={currentAnswer as string}
              onChange={(e) => updateAnswer(e.target.value)}
              placeholder={currentQuestion.placeholder}
              rows={5}
              style={{
                fontSize: 'var(--text-base)',
                padding: 'var(--spacing-4)',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-primary)',
                boxShadow: 'var(--shadow-depth-sm)',
                resize: 'vertical'
              }}
            />
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (isComplete) {
    return (
      <div className="flex flex-col h-full w-full" style={{ position: 'relative', zIndex: 'var(--z-base)' }}>
        <LiquidGlassHeader 
          title="Benefits Survey" 
          showBackButton={true}
          onBackPress={onBack}
          hideAccountButton={true}
        />

        <div 
          className="flex-1 flex flex-col items-center justify-center"
          style={{ 
            padding: 'var(--spacing-6)',
            paddingBottom: 'calc(var(--nav-height) + var(--spacing-8))'
          }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              backgroundColor: 'rgba(var(--color-success), 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 'var(--spacing-6)',
              boxShadow: 'var(--shadow-depth-lg)'
            }}
          >
            <CheckCircle size={60} style={{ color: 'rgb(var(--color-success))' }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              color: 'var(--text-primary)',
              marginBottom: 'var(--spacing-3)',
              textAlign: 'center'
            }}
          >
            Survey Complete!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              color: 'var(--text-secondary)',
              fontSize: 'var(--text-base)',
              textAlign: 'center',
              marginBottom: 'var(--spacing-8)',
              maxWidth: '400px'
            }}
          >
            Thank you for completing the benefits survey. We're analyzing your answers to match you with available grants and programs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="backdrop-blur-md"
            style={{
              padding: 'var(--spacing-5)',
              backgroundColor: 'rgba(var(--color-copa-blue), 0.1)',
              border: '1px solid rgba(var(--color-copa-blue), 0.3)',
              borderRadius: 'var(--radius-lg)',
              marginBottom: 'var(--spacing-6)',
              maxWidth: '400px',
              width: '100%'
            }}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 'var(--spacing-2)',
              marginBottom: 'var(--spacing-2)'
            }}>
              <Star size={20} style={{ color: 'rgb(var(--color-goldenrod))' }} />
              <span style={{ 
                color: 'var(--text-primary)',
                fontWeight: 'var(--font-weight-semibold)'
              }}>
                What's Next?
              </span>
            </div>
            <ul style={{ 
              color: 'var(--text-secondary)',
              fontSize: 'var(--text-sm)',
              lineHeight: '1.6',
              paddingLeft: 'var(--spacing-5)',
              margin: 0
            }}>
              <li>We'll match you with eligible grants</li>
              <li>You'll see personalized recommendations</li>
              <li>Track applications in your profile</li>
            </ul>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            disabled={isSubmitting}
            style={{
              width: '100%',
              maxWidth: '400px',
              padding: 'var(--spacing-4)',
              backgroundColor: 'rgb(var(--color-copa-blue))',
              border: 'none',
              borderRadius: 'var(--radius-lg)',
              color: 'white',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-weight-bold)',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              boxShadow: 'var(--effect-button-premium)',
              transition: 'var(--transition-button)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--spacing-2)',
              opacity: isSubmitting ? 0.7 : 1
            }}
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Zap size={20} />
                </motion.div>
                Processing...
              </>
            ) : (
              <>
                <Award size={20} />
                View My Matches
              </>
            )}
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full" style={{ position: 'relative', zIndex: 'var(--z-base)' }}>
      <LiquidGlassHeader 
        title="Benefits Survey" 
        showBackButton={true}
        onBackPress={onBack}
        hideAccountButton={true}
      />

      <div 
        className="flex-1 overflow-y-auto"
        style={{
          paddingTop: 'var(--spacing-4)',
          paddingBottom: 'calc(var(--nav-height) + 140px)' // Extra space for nav buttons + bottom nav
        }}
      >
        {/* Progress Bar */}
        <div style={{ 
          paddingLeft: 'var(--spacing-6)', 
          paddingRight: 'var(--spacing-6)',
          marginBottom: 'var(--spacing-4)'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: 'var(--spacing-2)'
          }}>
            <span style={{ 
              color: 'var(--text-secondary)', 
              fontSize: 'var(--text-sm)' 
            }}>
              Question {currentQuestionIndex + 1} of {SURVEY_QUESTIONS.length}
            </span>
            <span style={{ 
              color: 'rgb(var(--color-copa-blue))', 
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-semibold)'
            }}>
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} style={{ height: '8px' }} />
        </div>

        {/* Question Card */}
        <div style={{ 
          paddingLeft: 'var(--spacing-6)', 
          paddingRight: 'var(--spacing-6)',
          marginBottom: 'var(--spacing-6)'
        }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentQuestion.id}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
            >
              {/* Category Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{ marginBottom: 'var(--spacing-3)' }}
              >
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-2)',
                  padding: 'var(--spacing-2) var(--spacing-3)',
                  backgroundColor: `${getCategoryColor(currentQuestion.category)}20`,
                  border: `1px solid ${getCategoryColor(currentQuestion.category)}`,
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: getCategoryColor(currentQuestion.category)
                }}>
                  {currentQuestion.icon}
                  {currentQuestion.category}
                </div>
              </motion.div>

              {/* Question */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                style={{
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--spacing-2)',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'var(--font-weight-bold)'
                }}
              >
                {currentQuestion.question}
                {currentQuestion.required && (
                  <span style={{ color: 'rgb(var(--color-error))', marginLeft: 'var(--spacing-1)' }}>*</span>
                )}
              </motion.h2>

              {/* Description */}
              {currentQuestion.description && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: 'var(--text-sm)',
                    marginBottom: 'var(--spacing-4)'
                  }}
                >
                  {currentQuestion.description}
                </motion.p>
              )}

              {/* Help Text */}
              {currentQuestion.helpText && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="backdrop-blur-sm"
                  style={{
                    padding: 'var(--spacing-3)',
                    backgroundColor: 'rgba(var(--color-info), 0.1)',
                    border: '1px solid rgba(var(--color-info), 0.3)',
                    borderRadius: 'var(--radius-lg)',
                    marginBottom: 'var(--spacing-5)',
                    display: 'flex',
                    gap: 'var(--spacing-2)'
                  }}
                >
                  <Info size={16} style={{ color: 'rgb(var(--color-info))', marginTop: '2px', flexShrink: 0 }} />
                  <span style={{
                    color: 'var(--text-secondary)',
                    fontSize: 'var(--text-sm)',
                    lineHeight: '1.5'
                  }}>
                    {currentQuestion.helpText}
                  </span>
                </motion.div>
              )}

              {/* Answer Input */}
              {renderAnswerInput()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div 
        className="backdrop-blur-md"
        style={{
          position: 'fixed',
          bottom: 'calc(var(--nav-height) + var(--spacing-5))',
          left: 'var(--spacing-6)',
          right: 'var(--spacing-6)',
          maxWidth: 'calc(var(--mobile-max-width) - var(--spacing-12))',
          margin: '0 auto',
          display: 'flex',
          gap: 'var(--spacing-3)',
          padding: 'var(--spacing-4)',
          backgroundColor: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-depth-lg)',
          zIndex: 'calc(var(--z-navigation) - 1)'
        }}
      >
        <motion.button
          whileHover={{ scale: currentQuestionIndex > 0 ? 1.05 : 1 }}
          whileTap={{ scale: currentQuestionIndex > 0 ? 0.95 : 1 }}
          onClick={goToPrevious}
          disabled={currentQuestionIndex === 0}
          style={{
            flex: 1,
            padding: 'var(--spacing-3)',
            backgroundColor: currentQuestionIndex === 0 
              ? 'rgba(var(--color-background-secondary), 0.5)' 
              : 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--radius-lg)',
            color: currentQuestionIndex === 0 
              ? 'var(--text-disabled)' 
              : 'var(--text-primary)',
            fontSize: 'var(--text-base)',
            fontWeight: 'var(--font-weight-semibold)',
            cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer',
            boxShadow: currentQuestionIndex === 0 ? 'none' : 'var(--shadow-depth-sm)',
            transition: 'var(--transition-button)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--spacing-2)'
          }}
        >
          <ChevronLeft size={20} />
          Previous
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={goToNext}
          style={{
            flex: 2,
            padding: 'var(--spacing-3)',
            backgroundColor: 'rgb(var(--color-copa-blue))',
            border: 'none',
            borderRadius: 'var(--radius-lg)',
            color: 'white',
            fontSize: 'var(--text-base)',
            fontWeight: 'var(--font-weight-bold)',
            cursor: 'pointer',
            boxShadow: 'var(--effect-button-premium)',
            transition: 'var(--transition-button)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--spacing-2)'
          }}
        >
          {currentQuestionIndex === SURVEY_QUESTIONS.length - 1 ? (
            <>
              Complete Survey
              <Check size={20} />
            </>
          ) : (
            <>
              Next
              <ChevronRight size={20} />
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
