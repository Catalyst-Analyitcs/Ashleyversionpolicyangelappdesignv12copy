/**
 * ==============================================================================
 * AIASSISTANTSCREEN.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Enhanced AI chat assistant with document context, data sources,
 * voice input, conversation history, and specialized chat types.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. CHAT UI:
 *    - Use react-native-gifted-chat (recommended)
 *    - Or custom FlatList (inverted)
 *    - Bubble styling, avatars, timestamps
 * 
 * 2. KEYBOARD HANDLING:
 *    - KeyboardAvoidingView required
 *    - behavior='padding' for iOS, 'height' for Android
 * 
 * 3. VOICE INPUT:
 *    - expo-speech or react-native-voice
 *    - Record audio and transcribe
 * 
 * 4. DOCUMENT ATTACHMENT:
 *    - Show attached context (weather, property, policy)
 *    - Visual indicators for data sources
 * 
 * 5. REQUIRED API ENDPOINTS:
 *    - POST /api/ai/chat
 *    - GET /api/ai/conversations
 *    - POST /api/ai/voice-to-text
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] Chat messages send/receive
 * - [ ] Typing indicator shows
 * - [ ] Voice input works
 * - [ ] Document context displays
 * - [ ] Conversation history loads
 * - [ ] Keyboard doesn't cover input
 * - [ ] iOS and Android compatible
 * 
 */

import { useState, useRef, useEffect } from "react";
import { Send, Mic, Paperclip, MessageSquare, FileText, Bookmark, Zap, Shield, Home, FileCheck, ChevronDown, ChevronUp, Sparkles, History, ArrowLeft, Camera, MapPin, Calendar, TrendingUp, Bot, X, Cloud, Database, FileBarChart, User } from "lucide-react";
import { Card } from "../components/ui/card";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { motion, AnimatePresence } from "motion/react";
import policyAngelLogo from "figma:asset/66283e8dafc3c31c277ce6add3d2f6d9caa6369b.png";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  loading?: boolean;
}

interface ConversationHistory {
  id: string;
  title: string;
  preview: string;
  timestamp: Date;
  messageCount: number;
}

interface ChatType {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
}

interface SavedMessage {
  id: string;
  content: string;
  timestamp: Date;
  category: string;
}

interface AttachedDocument {
  id: string;
  name: string;
  type: 'weather' | 'property' | 'policy' | 'user';
  icon: any;
  color: string;
  size?: string;
  description?: string;
  screen?: string;
}

interface PolicyAngelAIScreenProps {
  onBack?: () => void;
  onNavigate?: (screen: string) => void;
}

type TabType = 'chat' | 'history' | 'types' | 'saved';

export function AIAssistantScreen({ onBack, onNavigate }: PolicyAngelAIScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your Policy Angel AI, here to watch over and protect your property and insurance needs. How can I assist you today?',
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<TabType>('chat');
  
  // Quick actions header state
  const [isQuickActionsExpanded, setIsQuickActionsExpanded] = useState(false);
  
  // Attachments state
  const [showAttachments, setShowAttachments] = useState(false);
  const [attachedDocuments, setAttachedDocuments] = useState<AttachedDocument[]>([
    { 
      id: '1', 
      name: 'Weather', 
      type: 'weather', 
      icon: Cloud, 
      color: '#60a5fa', 
      size: '2.4 MB',
      description: 'Current conditions & forecasts',
      screen: 'weather'
    },
    { 
      id: '2', 
      name: 'Property Details', 
      type: 'property', 
      icon: Database, 
      color: '#34d399', 
      size: '1.8 MB',
      description: 'View property information',
      screen: 'property-details'
    },
    { 
      id: '3', 
      name: 'Policy Details', 
      type: 'policy', 
      icon: FileBarChart, 
      color: '#f59e0b', 
      size: '3.2 MB',
      description: 'Review insurance policy',
      screen: 'policy'
    },
    { 
      id: '4', 
      name: 'User Details', 
      type: 'user', 
      icon: User, 
      color: '#a78bfa', 
      size: '0.9 MB',
      description: 'Your profile & preferences',
      screen: 'user-persona'
    },
  ]);

  // Enhanced quick suggestions combining both screens
  const quickSuggestions = [
    "Schedule property inspection",
    "Check claim status",
    "Review my policy coverage",
    "File a new claim",
    "Apply for resilience grant",
    "Upload inspection photos",
    "Request damage assessment",
    "Get premium estimate",
    "Update contact information",
    "Download policy documents",
    "Schedule drone inspection",
    "Review inspection report",
    "Submit storm damage photos",
    "Request policy review",
    "Compare coverage options",
    "Track claim progress",
    "Emergency assistance needed",
    "Question about deductibles",
  ];

  // Mock data for history
  const conversationHistory: ConversationHistory[] = [
    { id: '1', title: 'Property Inspection Help', preview: 'Can you help me schedule a drone...', timestamp: new Date(Date.now() - 86400000), messageCount: 12 },
    { id: '2', title: 'Claim Status Update', preview: 'What\'s the status of my recent claim...', timestamp: new Date(Date.now() - 172800000), messageCount: 8 },
    { id: '3', title: 'Policy Coverage Question', preview: 'Does my policy cover wind damage...', timestamp: new Date(Date.now() - 259200000), messageCount: 15 },
    { id: '4', title: 'Document Upload Assistance', preview: 'I need help uploading my inspection...', timestamp: new Date(Date.now() - 345600000), messageCount: 6 },
    { id: '5', title: 'Grant Application Support', preview: 'How do I apply for the resilience grant...', timestamp: new Date(Date.now() - 432000000), messageCount: 20 },
    { id: '6', title: 'Insurance Premium Inquiry', preview: 'Why did my premium increase this year...', timestamp: new Date(Date.now() - 518400000), messageCount: 10 },
  ];

  // Enhanced chat types with more categories
  const chatTypes: ChatType[] = [
    { id: 'claims', title: 'Claims Assistance', description: 'File and track insurance claims', icon: FileCheck, color: '#60a5fa' },
    { id: 'policy', title: 'Policy Questions', description: 'Get help with your insurance policy', icon: Shield, color: '#34d399' },
    { id: 'inspection', title: 'Property Inspection', description: 'Schedule and manage inspections', icon: Home, color: '#f59e0b' },
    { id: 'emergency', title: 'Emergency Support', description: '24/7 urgent assistance', icon: Zap, color: '#ef4444' },
    { id: 'grants', title: 'Grants & Funding', description: 'Apply for resilience grants', icon: TrendingUp, color: '#8b5cf6' },
    { id: 'general', title: 'General Assistance', description: 'Ask me anything', icon: Bot, color: '#06b6d4' },
  ];

  // Mock data for saved messages
  const savedMessages: SavedMessage[] = [
    { id: '1', content: 'Your property inspection is scheduled for March 15th at 2:00 PM. The drone operator will arrive 15 minutes early for setup.', timestamp: new Date(Date.now() - 86400000), category: 'Inspection' },
    { id: '2', content: 'Based on your policy, wind damage up to $50,000 is covered with a $2,500 deductible. Storm damage requires photo documentation.', timestamp: new Date(Date.now() - 172800000), category: 'Policy' },
    { id: '3', content: 'The Resilience Grant application deadline is April 30th. You\'ll need: proof of ownership, inspection report, and mitigation plan.', timestamp: new Date(Date.now() - 259200000), category: 'Grants' },
  ];

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!inputText.trim() || isSending) return;
    
    const message = inputText.trim();
    setInputText('');
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsSending(true);
    
    // Add loading message
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: '',
      timestamp: new Date(),
      loading: true,
    };
    
    setMessages(prev => [...prev, loadingMessage]);
    
    // Simulate AI response with context-aware replies
    setTimeout(() => {
      const contextResponses = [
        'I understand your request. Let me help you with that right away.',
        'Great question! Based on your policy details, I can provide you with the information you need.',
        'I\'m here to help. Let me pull up the relevant information for you.',
        'I can definitely assist with that. Here\'s what I found...',
      ];
      const randomResponse = contextResponses[Math.floor(Math.random() * contextResponses.length)];
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === loadingMessage.id 
            ? { ...msg, content: randomResponse, loading: false }
            : msg
        )
      );
      setIsSending(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion);
    setActiveTab('chat');
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  };

  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'chat':
        return (
          <div 
            className="flex-1 overflow-y-auto"
            style={{
              paddingBottom: '90px', // Chat bar clearance
            }}
          >
            <div 
              className="flex flex-col"
              style={{ gap: 'var(--spacing-4)' }}
            >
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex"
                  style={{
                    justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                    gap: 'var(--spacing-2)',
                  }}
                >
                  {message.type === 'assistant' && (
                    <motion.div
                      animate={{
                        y: [0, -1, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="relative"
                    >
                      {/* Avatar glow */}
                      <motion.div
                        className="absolute inset-0"
                        animate={{
                          opacity: [0.3, 0.5, 0.3],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        style={{
                          borderRadius: '50%',
                          background: 'radial-gradient(circle, rgba(96, 165, 250, 0.4) 0%, transparent 70%)',
                          filter: 'blur(8px)',
                        }}
                      />
                      <Avatar 
                        className="flex-shrink-0 relative"
                        style={{ 
                          width: '32px', 
                          height: '32px',
                        }}
                      >
                        <AvatarFallback 
                          style={{ 
                            backgroundColor: 'var(--card-bg)',
                            border: '1px solid rgba(96, 165, 250, 0.4)',
                            fontSize: 'var(--text-xs)',
                            color: 'var(--text-primary)',
                            boxShadow: '0 0 12px rgba(96, 165, 250, 0.3)',
                          }}
                        >
                          <img 
                            src={policyAngelLogo} 
                            alt="Policy Angel" 
                            className="w-7 h-7"
                            style={{ 
                              objectFit: 'contain',
                              filter: 'drop-shadow(0 0 4px rgba(96, 165, 250, 0.5))',
                            }}
                          />
                        </AvatarFallback>
                      </Avatar>
                    </motion.div>
                  )}
                  
                  <div style={{ maxWidth: '75%' }}>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="backdrop-blur-sm relative overflow-hidden"
                      style={{
                        paddingTop: 'var(--spacing-4)',
                        paddingBottom: 'var(--spacing-4)',
                        paddingLeft: 'var(--spacing-5)',
                        paddingRight: 'var(--spacing-5)',
                        borderRadius: 'var(--radius-xl)',
                        backgroundColor: message.type === 'user' 
                          ? 'rgba(255, 255, 255, 0.25)' 
                          : 'rgba(255, 255, 255, 0.2)',
                        border: message.type === 'user'
                          ? '1px solid rgba(255, 255, 255, 0.35)'
                          : '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: message.type === 'user' 
                          ? '0 4px 12px rgba(96, 165, 250, 0.15)'
                          : 'var(--effect-card-premium)',
                      }}
                    >
                      {/* Animated gradient background */}
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        animate={{
                          opacity: [0.2, 0.35, 0.2],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        style={{
                          background: message.type === 'user'
                            ? 'linear-gradient(135deg, rgba(96, 165, 250, 0.15), transparent)'
                            : 'var(--inner-glow-subtle)',
                          borderRadius: 'var(--radius-xl)',
                        }}
                      />
                      {message.loading ? (
                        <div className="flex relative z-10" style={{ gap: 'var(--spacing-1)' }}>
                          {[0, 150, 300].map((delay) => (
                            <motion.div
                              key={delay}
                              animate={{
                                y: [0, -8, 0],
                                opacity: [0.5, 1, 0.5],
                              }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: delay / 1000,
                              }}
                              style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--text-primary)',
                                boxShadow: '0 0 6px rgba(96, 165, 250, 0.4)',
                              }}
                            />
                          ))}
                        </div>
                      ) : (
                        <p
                          className="relative z-10"
                          style={{
                            fontSize: 'var(--text-sm)',
                            color: 'var(--text-primary)',
                            lineHeight: '1.5',
                            textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                          }}
                        >
                          {message.content}
                        </p>
                      )}
                    </motion.div>
                  </div>

                  {message.type === 'user' && (
                    <Avatar 
                      className="flex-shrink-0"
                      style={{ 
                        width: '32px', 
                        height: '32px',
                      }}
                    >
                      <AvatarFallback 
                        style={{ 
                          backgroundColor: 'var(--card-bg)',
                          border: '1px solid var(--card-border)',
                          fontSize: 'var(--text-xs)',
                          color: 'var(--text-primary)',
                          boxShadow: 'var(--effect-button-premium)',
                        }}
                      >
                        U
                      </AvatarFallback>
                    </Avatar>
                  )}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        );

      case 'history':
        return (
          <div 
            className="flex-1 overflow-y-auto"
            style={{
              paddingBottom: 'var(--spacing-4)',
            }}
          >
            <div 
              className="flex flex-col"
              style={{ gap: 'var(--spacing-3)' }}
            >
              {conversationHistory.map((conversation, index) => (
                <motion.div
                  key={conversation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05, type: 'spring', damping: 20, stiffness: 400 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="backdrop-blur-sm cursor-pointer relative overflow-hidden group"
                  style={{
                    padding: 'var(--spacing-4)',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: 'var(--effect-card-premium)',
                  }}
                  onClick={() => {
                    setActiveTab('chat');
                    // Load conversation messages here
                  }}
                >
                  {/* Animated gradient overlay */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: index * 0.3,
                    }}
                    style={{
                      background: 'var(--inner-glow-subtle)',
                    }}
                  />
                  {/* Hover shimmer */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                      width: '50%',
                    }}
                  />
                  <div className="flex items-start justify-between relative z-10" style={{ marginBottom: 'var(--spacing-2)' }}>
                    <h3 
                      style={{
                        fontSize: 'var(--text-base)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'var(--text-primary)',
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                      }}
                    >
                      {conversation.title}
                    </h3>
                    <span
                      style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {formatTimestamp(conversation.timestamp)}
                    </span>
                  </div>
                  <p
                    className="relative z-10"
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-secondary)',
                      marginBottom: 'var(--spacing-2)',
                    }}
                  >
                    {conversation.preview}
                  </p>
                  <div className="flex items-center relative z-10" style={{ gap: 'var(--spacing-2)' }}>
                    <motion.div
                      animate={{
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <MessageSquare className="w-4 h-4" style={{ color: '#60a5fa', filter: 'drop-shadow(0 0 4px rgba(96, 165, 250, 0.4))' }} />
                    </motion.div>
                    <span
                      style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-primary)',
                        fontWeight: 'var(--font-weight-medium)',
                      }}
                    >
                      {conversation.messageCount} messages
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'types':
        return (
          <div 
            className="flex-1 overflow-y-auto"
            style={{
              paddingBottom: 'var(--spacing-4)',
            }}
          >
            <div 
              className="grid grid-cols-1 gap-4"
              style={{ gap: 'var(--spacing-4)' }}
            >
              {chatTypes.map((type, index) => {
                const IconComponent = type.icon;
                return (
                  <motion.div
                    key={type.id}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: index * 0.05, type: 'spring', damping: 20, stiffness: 400 }}
                    whileHover={{ scale: 1.02, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className="backdrop-blur-sm cursor-pointer relative overflow-hidden group"
                    style={{
                      padding: 'var(--spacing-5)',
                      borderRadius: 'var(--radius-lg)',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: 'var(--effect-card-premium)',
                    }}
                    onClick={() => {
                      setActiveTab('chat');
                      setInputText(`I need help with ${type.title.toLowerCase()}`);
                    }}
                  >
                    {/* Animated gradient background */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      animate={{
                        opacity: [0.2, 0.4, 0.2],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: index * 0.3,
                      }}
                      style={{
                        background: `linear-gradient(135deg, ${type.color}15, transparent)`,
                      }}
                    />
                    {/* Hover glow */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                      style={{
                        background: `radial-gradient(circle at center, ${type.color}20, transparent 70%)`,
                        filter: 'blur(12px)',
                      }}
                    />
                    <div className="flex items-start relative z-10" style={{ gap: 'var(--spacing-4)' }}>
                      <motion.div
                        className="flex items-center justify-center flex-shrink-0 relative"
                        animate={{
                          y: [0, -2, 0],
                        }}
                        transition={{
                          duration: 3 + index * 0.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: `${type.color}25`,
                          border: `1px solid ${type.color}50`,
                          boxShadow: `0 0 16px ${type.color}30, inset 0 0 12px ${type.color}20`,
                        }}
                      >
                        {/* Icon glow pulse */}
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          animate={{
                            opacity: [0.3, 0.6, 0.3],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                          style={{
                            borderRadius: 'var(--radius-md)',
                            background: `radial-gradient(circle at 30% 30%, ${type.color}40, transparent 60%)`,
                          }}
                        />
                        <motion.div
                          animate={{
                            rotate: [0, 5, -5, 0],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: index * 0.4,
                          }}
                          className="relative z-10"
                        >
                          <IconComponent 
                            className="w-6 h-6" 
                            style={{ 
                              color: type.color,
                              filter: `drop-shadow(0 0 6px ${type.color}60)`,
                            }} 
                          />
                        </motion.div>
                      </motion.div>
                      <div className="flex-1">
                        <h3 
                          style={{
                            fontSize: 'var(--text-base)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: 'var(--text-primary)',
                            marginBottom: 'var(--spacing-1)',
                            textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                          }}
                        >
                          {type.title}
                        </h3>
                        <p
                          style={{
                            fontSize: 'var(--text-sm)',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          {type.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        );

      case 'saved':
        return (
          <div 
            className="flex-1 overflow-y-auto"
            style={{
              paddingBottom: 'var(--spacing-4)',
            }}
          >
            <div 
              className="flex flex-col"
              style={{ gap: 'var(--spacing-3)' }}
            >
              {savedMessages.map((saved, index) => (
                <motion.div
                  key={saved.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05, type: 'spring', damping: 20, stiffness: 400 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="backdrop-blur-sm relative overflow-hidden group"
                  style={{
                    padding: 'var(--spacing-4)',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: 'var(--effect-card-premium)',
                  }}
                >
                  {/* Animated gradient overlay */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: index * 0.3,
                    }}
                    style={{
                      background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.15), transparent)',
                    }}
                  />
                  {/* Hover glow */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                    style={{
                      background: 'radial-gradient(circle at left, rgba(96, 165, 250, 0.2), transparent 70%)',
                      filter: 'blur(12px)',
                    }}
                  />
                  <div className="flex items-start justify-between relative z-10" style={{ marginBottom: 'var(--spacing-3)' }}>
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      style={{
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: '#60a5fa',
                        paddingLeft: 'var(--spacing-2)',
                        paddingRight: 'var(--spacing-2)',
                        paddingTop: '2px',
                        paddingBottom: '2px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'rgba(96, 165, 250, 0.25)',
                        border: '1px solid rgba(96, 165, 250, 0.4)',
                        boxShadow: '0 0 8px rgba(96, 165, 250, 0.3)',
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                      }}
                    >
                      {saved.category}
                    </motion.span>
                    <motion.div
                      animate={{
                        y: [0, -2, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: index * 0.5,
                      }}
                    >
                      <Bookmark 
                        className="w-5 h-5" 
                        style={{ 
                          color: '#60a5fa',
                          filter: 'drop-shadow(0 0 6px rgba(96, 165, 250, 0.5))',
                        }} 
                        fill="#60a5fa" 
                      />
                    </motion.div>
                  </div>
                  <p
                    className="relative z-10"
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-primary)',
                      lineHeight: '1.5',
                      marginBottom: 'var(--spacing-2)',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    {saved.content}
                  </p>
                  <span
                    className="relative z-10"
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    Saved {formatTimestamp(saved.timestamp)}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const tabs = [
    { id: 'chat' as TabType, label: 'Chat', icon: MessageSquare },
    { id: 'types' as TabType, label: 'Categories', icon: Sparkles },
    { id: 'history' as TabType, label: 'History', icon: History },
    { id: 'saved' as TabType, label: 'Saved', icon: Bookmark },
  ];

  return (
    <div 
      className="flex flex-col h-full w-full relative"
      style={{
        paddingLeft: 'var(--spacing-6)',
        paddingRight: 'var(--spacing-6)',
        paddingTop: 'var(--spacing-4)',
        paddingBottom: 'var(--spacing-6)',
      }}
    >
      {/* Tab Navigation */}
      <div 
        className="flex backdrop-blur-sm relative"
        style={{
          gap: 'var(--spacing-2)',
          padding: 'var(--spacing-1)',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          marginBottom: 'var(--spacing-4)',
          boxShadow: 'var(--effect-card-premium)',
        }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            borderRadius: 'var(--radius-lg)',
            background: 'var(--inner-glow-subtle)',
          }}
        />
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', damping: 20, stiffness: 400 }}
              className="flex-1 relative overflow-hidden"
              style={{
                padding: 'var(--spacing-2)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isActive ? 'rgba(255, 255, 255, 0.25)' : 'transparent',
                border: isActive ? '1px solid rgba(255, 255, 255, 0.35)' : '1px solid transparent',
                boxShadow: isActive ? 'var(--effect-button-premium)' : 'none',
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              {/* Active tab glow */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 pointer-events-none"
                  animate={{
                    opacity: [0.4, 0.6, 0.4],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{
                    background: 'var(--inner-glow-medium)',
                    borderRadius: 'var(--radius-md)',
                  }}
                />
              )}
              <div className="flex flex-col items-center relative z-10" style={{ gap: 'var(--spacing-1)' }}>
                <motion.div
                  animate={isActive ? {
                    y: [0, -2, 0],
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <IconComponent 
                    className="w-4 h-4" 
                    style={{ 
                      color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                      filter: isActive ? 'var(--icon-drop-shadow)' : 'none',
                    }} 
                  />
                </motion.div>
                <span
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontWeight: isActive ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)',
                  }}
                >
                  {tab.label}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Content Area */}
      {renderTabContent()}

      {/* Fixed Input Bar - Only show on chat tab */}
      {activeTab === 'chat' && (
        <div 
          className="fixed left-0 right-0 backdrop-blur-md"
          style={{
            bottom: 'calc(var(--nav-height) + var(--spacing-4))',
            paddingLeft: 'var(--spacing-6)',
            paddingRight: 'var(--spacing-6)',
            paddingTop: 'var(--spacing-3)',
            paddingBottom: 'var(--spacing-3)',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Attached Documents Display */}
          <AnimatePresence>
            {showAttachments && attachedDocuments.length > 0 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
                style={{ marginBottom: 'var(--spacing-3)' }}
              >
                <div 
                  className="backdrop-blur-sm"
                  style={{
                    padding: 'var(--spacing-3)',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                  }}
                >
                  <div 
                    className="flex items-center justify-between"
                    style={{ marginBottom: 'var(--spacing-3)' }}
                  >
                    <span
                      style={{
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: 'var(--text-primary)',
                      }}
                    >
                      Attached Data Sources ({attachedDocuments.length})
                    </span>
                    <button
                      onClick={() => setShowAttachments(false)}
                      className="transition-all hover:scale-110 active:scale-95"
                    >
                      <ChevronDown className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                    </button>
                  </div>
                  <div 
                    className="grid grid-cols-2"
                    style={{ gap: 'var(--spacing-2)' }}
                  >
                    {attachedDocuments.map((doc, index) => {
                      const IconComponent = doc.icon;
                      return (
                        <motion.div
                          key={doc.id}
                          initial={{ opacity: 0, scale: 0.9, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8, x: -20 }}
                          transition={{ delay: index * 0.05, type: 'spring', damping: 20, stiffness: 400 }}
                          whileHover={{ scale: 1.03, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className="backdrop-blur-sm relative group overflow-hidden cursor-pointer"
                          style={{
                            padding: 'var(--spacing-3)',
                            borderRadius: 'var(--radius-md)',
                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                            border: '1px solid rgba(255, 255, 255, 0.25)',
                            boxShadow: 'var(--effect-card-premium)',
                          }}
                        >
                          {/* Animated gradient overlay */}
                          <motion.div
                            className="absolute inset-0 pointer-events-none"
                            animate={{
                              opacity: [0.2, 0.4, 0.2],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: 'easeInOut',
                              delay: index * 0.3,
                            }}
                            style={{
                              background: `linear-gradient(135deg, ${doc.color}15, transparent)`,
                            }}
                          />

                          {/* Hover glow effect */}
                          <motion.div
                            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
                            transition={{ duration: 0.3 }}
                            style={{
                              background: `radial-gradient(circle at center, ${doc.color}20, transparent 70%)`,
                              filter: 'blur(8px)',
                            }}
                          />

                          {/* Shimmer effect on hover */}
                          <motion.div
                            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
                            animate={{
                              x: ['-100%', '100%'],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: 'linear',
                            }}
                            style={{
                              background: `linear-gradient(90deg, transparent, ${doc.color}30, transparent)`,
                              width: '50%',
                            }}
                          />

                          <div className="flex items-start relative z-10" style={{ gap: 'var(--spacing-2)' }}>
                            {/* Animated icon container */}
                            <motion.div
                              className="flex items-center justify-center flex-shrink-0 relative"
                              animate={{
                                y: [0, -2, 0],
                              }}
                              transition={{
                                duration: 3 + index * 0.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                              }}
                              style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: 'var(--radius-sm)',
                                backgroundColor: `${doc.color}25`,
                                border: `1px solid ${doc.color}50`,
                                boxShadow: `0 0 12px ${doc.color}30, inset 0 0 8px ${doc.color}20`,
                              }}
                            >
                              {/* Inner glow pulse */}
                              <motion.div
                                className="absolute inset-0 pointer-events-none"
                                animate={{
                                  opacity: [0.3, 0.6, 0.3],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: 'easeInOut',
                                }}
                                style={{
                                  borderRadius: 'var(--radius-sm)',
                                  background: `radial-gradient(circle at 30% 30%, ${doc.color}40, transparent 60%)`,
                                }}
                              />
                              <motion.div
                                animate={{
                                  rotate: [0, 5, -5, 0],
                                  scale: [1, 1.05, 1],
                                }}
                                transition={{
                                  duration: 4,
                                  repeat: Infinity,
                                  ease: 'easeInOut',
                                  delay: index * 0.4,
                                }}
                                className="relative z-10"
                              >
                                <IconComponent 
                                  className="w-5 h-5" 
                                  style={{ 
                                    color: doc.color,
                                    filter: `drop-shadow(0 0 4px ${doc.color}60)`,
                                  }} 
                                />
                              </motion.div>
                            </motion.div>

                            <div className="flex-1 min-w-0">
                              <p
                                style={{
                                  fontSize: 'var(--text-xs)',
                                  fontWeight: 'var(--font-weight-semibold)',
                                  color: 'var(--text-primary)',
                                  marginBottom: '2px',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                                }}
                              >
                                {doc.name}
                              </p>
                              <div className="flex items-center" style={{ gap: '4px' }}>
                                {/* Animated data indicator */}
                                <motion.div
                                  animate={{
                                    opacity: [0.5, 1, 0.5],
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                  }}
                                  style={{
                                    width: '4px',
                                    height: '4px',
                                    borderRadius: '50%',
                                    backgroundColor: '#22c55e',
                                    boxShadow: '0 0 6px #22c55e',
                                  }}
                                />
                                <p
                                  style={{
                                    fontSize: '10px',
                                    color: 'var(--text-secondary)',
                                  }}
                                >
                                  {doc.size}
                                </p>
                              </div>
                            </div>

                            {/* Enhanced remove button */}
                            <motion.button
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileHover={{ 
                                opacity: 1, 
                                scale: 1.1,
                                rotate: 90,
                              }}
                              whileTap={{ scale: 0.9 }}
                              className="opacity-0 group-hover:opacity-100 transition-opacity relative"
                              onClick={(e) => {
                                e.stopPropagation();
                                setAttachedDocuments(docs => docs.filter(d => d.id !== doc.id));
                              }}
                              style={{
                                padding: '4px',
                                borderRadius: 'var(--radius-sm)',
                                backgroundColor: 'rgba(239, 68, 68, 0.25)',
                                border: '1px solid rgba(239, 68, 68, 0.4)',
                                boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)',
                              }}
                            >
                              {/* Remove button glow */}
                              <motion.div
                                className="absolute inset-0 pointer-events-none"
                                whileHover={{
                                  opacity: [0, 1, 0],
                                }}
                                transition={{
                                  duration: 0.6,
                                  repeat: Infinity,
                                }}
                                style={{
                                  borderRadius: 'var(--radius-sm)',
                                  background: 'radial-gradient(circle, rgba(239, 68, 68, 0.6), transparent)',
                                  filter: 'blur(4px)',
                                }}
                              />
                              <X className="w-3 h-3 relative z-10" style={{ color: '#ef4444' }} />
                            </motion.button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div 
            className="backdrop-blur-md flex items-center"
            style={{
              backgroundColor: 'var(--glass-bg)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--glass-border)',
              padding: 'var(--spacing-3)',
              gap: 'var(--spacing-2)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            }}
          >
            <motion.button
              onClick={() => setShowAttachments(!showAttachments)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', damping: 20, stiffness: 400 }}
              className="relative overflow-hidden"
              style={{
                padding: 'var(--spacing-2)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: attachedDocuments.length > 0 ? 'rgba(34, 197, 94, 0.25)' : 'rgba(255, 255, 255, 0.15)',
                border: attachedDocuments.length > 0 ? '1px solid rgba(34, 197, 94, 0.4)' : '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: attachedDocuments.length > 0 ? '0 0 12px rgba(34, 197, 94, 0.3)' : 'var(--effect-button-premium)',
              }}
            >
              {attachedDocuments.length > 0 && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{
                    background: 'radial-gradient(circle, rgba(34, 197, 94, 0.4), transparent 70%)',
                  }}
                />
              )}
              <Paperclip 
                className="w-4 h-4 relative z-10" 
                style={{ 
                  color: attachedDocuments.length > 0 ? '#22c55e' : 'var(--text-secondary)',
                  filter: attachedDocuments.length > 0 ? 'drop-shadow(0 0 4px rgba(34, 197, 94, 0.6))' : 'none',
                }} 
              />
              {attachedDocuments.length > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 flex items-center justify-center"
                  style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    backgroundColor: '#22c55e',
                    border: '1.5px solid rgba(0, 0, 0, 0.3)',
                    boxShadow: '0 0 8px rgba(34, 197, 94, 0.6)',
                  }}
                >
                  <motion.span
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    style={{
                      fontSize: '9px',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'white',
                    }}
                  >
                    {attachedDocuments.length}
                  </motion.span>
                </motion.div>
              )}
            </motion.button>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 bg-transparent outline-none placeholder:text-gray-400"
              style={{ 
                color: 'var(--text-primary)',
                fontSize: 'var(--text-sm)',
              }}
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', damping: 20, stiffness: 400 }}
              className="relative overflow-hidden"
              style={{
                padding: 'var(--spacing-2)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'rgba(96, 165, 250, 0.2)',
                border: '1px solid rgba(96, 165, 250, 0.3)',
                boxShadow: '0 0 8px rgba(96, 165, 250, 0.3)',
              }}
            >
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  background: 'radial-gradient(circle, rgba(96, 165, 250, 0.4), transparent 70%)',
                }}
              />
              <Mic 
                className="w-4 h-4 relative z-10" 
                style={{ 
                  color: '#60a5fa',
                  filter: 'drop-shadow(0 0 4px rgba(96, 165, 250, 0.6))',
                }} 
              />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', damping: 20, stiffness: 400 }}
              className="relative overflow-hidden"
              style={{
                padding: 'var(--spacing-2)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: inputText.trim() ? 'rgba(96, 165, 250, 0.3)' : 'rgba(255, 255, 255, 0.15)',
                border: inputText.trim() ? '1px solid rgba(96, 165, 250, 0.4)' : '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: inputText.trim() ? '0 0 12px rgba(96, 165, 250, 0.4)' : 'var(--effect-button-premium)',
              }}
              onClick={sendMessage}
              disabled={!inputText.trim() || isSending}
            >
              {inputText.trim() && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{
                    opacity: [0.4, 0.6, 0.4],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{
                    background: 'radial-gradient(circle, rgba(96, 165, 250, 0.5), transparent 70%)',
                  }}
                />
              )}
              <Send 
                className="w-4 h-4 relative z-10" 
                style={{ 
                  color: inputText.trim() ? '#60a5fa' : 'var(--text-secondary)',
                  filter: inputText.trim() ? 'drop-shadow(0 0 4px rgba(96, 165, 250, 0.6))' : 'none',
                }} 
              />
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}
