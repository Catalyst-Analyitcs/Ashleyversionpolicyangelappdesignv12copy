/**
 * ==============================================================================
 * ANGELFUNCTIONSSCREEN.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: AI-powered chat interface for policy assistance, claims help, and
 * property questions. Features tabbed interface with chat, history, saved messages.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. CHAT UI LIBRARY (RECOMMENDED):
 *    - OPTION A: react-native-gifted-chat (Most popular, feature-rich)
 *      npm install react-native-gifted-chat
 *      Pros: Built-in message bubbles, typing indicators, quick replies
 *      Cons: Less customizable styling
 * 
 *    - OPTION B: Build custom with FlatList
 *      More control but more work
 *      Use FlatList with inverted={true} for chat behavior
 * 
 * 2. KEYBOARD HANDLING:
 *    - CURRENT: Standard web input
 *    - REACT NATIVE: KeyboardAvoidingView required
 *    - Import: KeyboardAvoidingView from 'react-native'
 *    - Behavior: 'padding' for iOS, 'height' for Android
 *    - Also use: Keyboard.dismiss() for tap-to-dismiss
 * 
 * 3. TEXT INPUT:
 *    - input → TextInput
 *    - onChange → onChangeText
 *    - Add multiline={true} for multi-line support
 *    - Add maxLength for character limits
 *    - Use onSubmitEditing for send on enter
 * 
 * 4. SCROLL BEHAVIOR:
 *    - Auto-scroll to bottom on new message
 *    - Use ref.scrollToEnd() or FlatList scrollToIndex
 *    - Inverted list for chat (messages grow upward)
 * 
 * 5. TABS:
 *    - CURRENT: State-based tab switching
 *    - REACT NATIVE: Use react-native-tab-view or custom
 *    - Or use React Navigation's Tab Navigator
 * 
 * 6. ICONS:
 *    - lucide-react → react-native-vector-icons
 *    - Or use @expo/vector-icons (Expo)
 *    - Icons: Ionicons, Feather, MaterialIcons
 * 
 * 7. ANIMATIONS:
 *    - Typing indicator animation
 *    - Message appearance animation
 *    - Use react-native-reanimated for smooth effects
 * 
 * 8. VOICE INPUT (OPTIONAL):
 *    - Use expo-speech for text-to-speech
 *    - Use expo-av for voice recording
 *    - Or react-native-voice for speech-to-text
 * 
 * ==============================================================================
 * TANSTACK QUERY INTEGRATION
 * ==============================================================================
 * 
 * REPLACE LOCAL STATE WITH API CALLS:
 * 
 * 1. Fetch Conversation History:
 *    const { data: conversations } = useQuery({
 *      queryKey: ['chat', 'conversations', userId],
 *      queryFn: () => chatApi.getConversations(userId),
 *    });
 * 
 * 2. Fetch Current Conversation Messages:
 *    const { data: messages } = useQuery({
 *      queryKey: ['chat', 'messages', conversationId],
 *      queryFn: () => chatApi.getMessages(conversationId),
 *      enabled: !!conversationId,
 *    });
 * 
 * 3. Send Message Mutation:
 *    const sendMutation = useMutation({
 *      mutationFn: (message: string) => chatApi.sendMessage(conversationId, message),
 *      onSuccess: (response) => {
 *        queryClient.invalidateQueries(['chat', 'messages']);
 *      },
 *    });
 * 
 * 4. Bookmark Message Mutation:
 *    const bookmarkMutation = useMutation({
 *      mutationFn: (messageId: string) => chatApi.bookmarkMessage(messageId),
 *      onSuccess: () => {
 *        queryClient.invalidateQueries(['chat', 'saved']);
 *      },
 *    });
 * 
 * ==============================================================================
 * ZUSTAND STORE INTEGRATION
 * ==============================================================================
 * 
 * CREATE: stores/useChatStore.ts
 * 
 * interface ChatState {
 *   currentConversationId: string | null;
 *   activeTab: 'chat' | 'history' | 'types' | 'saved';
 *   isTyping: boolean;
 *   
 *   setCurrentConversation: (id: string) => void;
 *   setActiveTab: (tab: TabType) => void;
 *   setTyping: (typing: boolean) => void;
 * }
 * 
 * ==============================================================================
 * MOCK DATA - NEEDS BACKEND API
 * ==============================================================================
 * 
 * HARDCODED DATA LOCATIONS:
 * 
 * 1. INITIAL MESSAGE (line 45-52):
 *    - Greeting message from AI assistant
 *    - REPLACE WITH: GET /api/chat/conversations/{id}/messages
 * 
 * 2. QUICK SUGGESTIONS (lines 68-87):
 *    - 18 pre-written suggestion prompts
 *    - REPLACE WITH: GET /api/chat/suggestions
 * 
 * 3. CONVERSATION HISTORY (lines 90-97):
 *    - 6 past conversations with titles, previews
 *    - REPLACE WITH: GET /api/chat/conversations?userId={userId}
 * 
 * 4. CHAT TYPES (lines 100-105):
 *    - 4 specialized chat categories (Claims, Policy, Inspection, Emergency)
 *    - REPLACE WITH: GET /api/chat/types or hardcode in config
 * 
 * 5. SAVED MESSAGES (lines 108-112):
 *    - 3 bookmarked messages
 *    - REPLACE WITH: GET /api/chat/saved?userId={userId}
 * 
 * ==============================================================================
 * BACKEND API ENDPOINTS NEEDED
 * ==============================================================================
 * 
 * 1. GET /api/chat/conversations
 *    Query: userId={userId}
 *    Returns: List of conversation objects
 *    Response: {
 *      conversations: [{
 *        id: string,
 *        title: string,
 *        preview: string,
 *        timestamp: ISO date,
 *        messageCount: number,
 *        unreadCount: number
 *      }]
 *    }
 * 
 * 2. POST /api/chat/conversations
 *    Body: { userId, initialMessage?, type? }
 *    Returns: New conversation ID
 * 
 * 3. GET /api/chat/conversations/{conversationId}/messages
 *    Query: limit={limit}, offset={offset}
 *    Returns: Message list with pagination
 *    Response: {
 *      messages: [{
 *        id: string,
 *        conversationId: string,
 *        type: 'user' | 'assistant',
 *        content: string,
 *        timestamp: ISO date,
 *        isBookmarked: boolean,
 *        metadata?: { intent, confidence, relatedResources }
 *      }],
 *      hasMore: boolean
 *    }
 * 
 * 4. POST /api/chat/messages
 *    Body: {
 *      conversationId: string,
 *      content: string,
 *      userId: string
 *    }
 *    Returns: {
 *      userMessage: Message,
 *      assistantResponse: Message (streamed or immediate)
 *    }
 * 
 * 5. POST /api/chat/messages/{messageId}/bookmark
 *    Body: { category?: string }
 *    Returns: Updated message with bookmark status
 * 
 * 6. DELETE /api/chat/messages/{messageId}/bookmark
 *    Returns: Success status
 * 
 * 7. GET /api/chat/saved
 *    Query: userId={userId}
 *    Returns: List of bookmarked messages
 * 
 * 8. GET /api/chat/suggestions
 *    Query: userId={userId}, context?={context}
 *    Returns: { suggestions: string[] }
 *    Context-aware suggestions based on user history
 * 
 * 9. POST /api/chat/voice
 *    Body: FormData with audio file
 *    Returns: { transcript: string, confidence: number }
 * 
 * 10. GET /api/chat/types
 *     Returns: List of chat categories/specializations
 * 
 * ==============================================================================
 * AI INTEGRATION OPTIONS
 * ==============================================================================
 * 
 * OPTION 1: OpenAI GPT-4
 * - Use OpenAI API on backend
 * - Stream responses for real-time feel
 * - Fine-tune for insurance domain
 * 
 * OPTION 2: Anthropic Claude
 * - Better for longer context
 * - Strong reasoning capabilities
 * 
 * OPTION 3: Custom Model
 * - Fine-tuned LLaMA or Mistral
 * - Host on your infrastructure
 * - More control over responses
 * 
 * OPTION 4: LangChain
 * - Orchestrate multiple LLMs
 * - Add RAG (Retrieval Augmented Generation)
 * - Connect to policy database for accurate info
 * 
 * ==============================================================================
 * REACT NATIVE COMPONENT MAPPING
 * ==============================================================================
 * 
 * WEB → REACT NATIVE:
 * - div → View
 * - input → TextInput
 * - button → TouchableOpacity or Pressable
 * - Card → Custom View with styles
 * - Avatar → Image with circular style
 * - Scroll container → FlatList (inverted for chat)
 * - Tab buttons → Custom tab bar or react-native-tab-view
 * 
 * ==============================================================================
 * REACT NATIVE EXAMPLE STRUCTURE
 * ==============================================================================
 * 
 * import { View, Text, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
 * import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
 * import { useQuery, useMutation } from '@tanstack/react-query';
 * import { useChatStore } from '../stores/useChatStore';
 * 
 * export function AngelFunctionsScreen() {
 *   const { currentConversationId } = useChatStore();
 *   const { data: messages, isLoading } = useQuery({
 *     queryKey: ['chat', 'messages', currentConversationId],
 *     queryFn: () => chatApi.getMessages(currentConversationId),
 *   });
 *   
 *   const sendMutation = useMutation({
 *     mutationFn: (message) => chatApi.sendMessage(currentConversationId, message),
 *   });
 * 
 *   return (
 *     <KeyboardAvoidingView 
 *       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
 *       style={{ flex: 1 }}
 *     >
 *       <GiftedChat
 *         messages={messages}
 *         onSend={(msgs) => sendMutation.mutate(msgs[0].text)}
 *         user={{ _id: userId }}
 *         renderBubble={CustomBubble}
 *         renderInputToolbar={CustomInputToolbar}
 *       />
 *     </KeyboardAvoidingView>
 *   );
 * }
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] Messages load from API
 * - [ ] Send message posts to backend
 * - [ ] AI response appears in chat
 * - [ ] Typing indicator shows while waiting
 * - [ ] Keyboard doesn't cover input
 * - [ ] Scroll to bottom on new message
 * - [ ] Quick suggestions are tappable
 * - [ ] Conversation history loads
 * - [ ] Saved messages bookmarking works
 * - [ ] Voice input captures audio (if implemented)
 * - [ ] Emoji picker works (if added)
 * - [ ] Long messages wrap properly
 * - [ ] Timestamps display correctly
 * - [ ] Tab switching is smooth
 * - [ ] Works on both iOS and Android
 * 
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Mic, Paperclip, MessageSquare, FileText, Bookmark, Zap, Shield, Home, FileCheck, ChevronDown, ChevronUp, Sparkles, History, ArrowLeft, Cloud, Building2, FileBarChart, User, ArrowRight, Plus, Upload, CheckCircle, RefreshCw, AlertTriangle, WifiOff, Clock } from "lucide-react";
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

interface AttachmentCard {
  id: string;
  name: string;
  type: 'weather' | 'property' | 'policy' | 'user' | 'custom';
  icon: any;
  color: string;
  gradient: string;
  description: string;
  screen: string;
  previewData?: any;
}

interface AngelFunctionsScreenProps {
  onBack?: () => void;
  onNavigate?: (screen: string) => void;
}

type TabType = 'chat' | 'history' | 'types' | 'saved';

export function AngelFunctionsScreen({ onBack, onNavigate }: AngelFunctionsScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m PolicyAngel, your personal guide for everything related to your San Francisco properties. I can help with insurance, maintenance, grants, and more. What would you like to know?',
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<TabType>('chat');
  
  // Drag scrolling state
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Quick actions header state
  const [isQuickActionsExpanded, setIsQuickActionsExpanded] = useState(false);

  // Attachment cards state
  const [showAttachmentCards, setShowAttachmentCards] = useState(false);
  
  // Flipped cards state - track which cards are flipped
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  // Enhanced card states for active status, sync status, and timestamps
  const [cardStates, setCardStates] = useState({
    '1': { isActive: true, status: 'synced' as 'synced' | 'syncing' | 'error', lastUpdated: new Date(Date.now() - 900000) }, // 15 min ago
    '2': { isActive: true, status: 'synced' as 'synced' | 'syncing' | 'error', lastUpdated: new Date(Date.now() - 1800000) }, // 30 min ago
    '3': { isActive: true, status: 'synced' as 'synced' | 'syncing' | 'error', lastUpdated: new Date(Date.now() - 3600000) }, // 1 hour ago
    '4': { isActive: false, status: 'synced' as 'synced' | 'syncing' | 'error', lastUpdated: new Date(Date.now() - 7200000) }, // 2 hours ago
    '5': { isActive: false, status: 'synced' as 'synced' | 'syncing' | 'error', lastUpdated: new Date() },
  });

  // Toggle card active state
  const toggleCardActive = (cardId: string) => {
    setCardStates(prev => ({
      ...prev,
      [cardId]: {
        ...prev[cardId],
        isActive: !prev[cardId].isActive,
      }
    }));
  };

  // Format time ago helper
  const formatTimeAgo = (date: Date): string => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  // Attachment cards data - Premium luxury designs with screen previews
  const attachmentCards: AttachmentCard[] = [
    {
      id: '1',
      name: 'Weather',
      type: 'weather',
      icon: Cloud,
      color: '#60a5fa',
      gradient: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 35%, #60a5fa 65%, #93c5fd 100%)',
      description: 'Live conditions & forecasts',
      screen: 'weather',
      previewData: {
        temp: '72°',
        condition: 'Partly Cloudy',
        location: 'San Francisco, CA'
      }
    },
    {
      id: '2',
      name: 'Policy Details',
      type: 'policy',
      icon: FileBarChart,
      color: '#D4AF37',
      gradient: 'linear-gradient(135deg, #854d0e 0%, #ca8a04 25%, #D4AF37 50%, #fbbf24 75%, #fde68a 100%)',
      description: 'Coverage & benefits overview',
      screen: 'policy',
      previewData: {
        coverage: '$850K',
        status: 'Active',
        expiry: '2025'
      }
    },
    {
      id: '3',
      name: 'Property Details',
      type: 'property',
      icon: Building2,
      color: '#34d399',
      gradient: 'linear-gradient(135deg, #064e3b 0%, #059669 35%, #10b981 60%, #6ee7b7 100%)',
      description: 'Property specs & valuation',
      screen: 'property-details',
      previewData: {
        value: '$1.2M',
        sqft: '2,400',
        type: 'Single Family'
      }
    },
    {
      id: '4',
      name: 'User Details',
      type: 'user',
      icon: User,
      color: '#a78bfa',
      gradient: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 35%, #a78bfa 65%, #ddd6fe 100%)',
      description: 'Profile & contact information',
      screen: 'user-persona',
      previewData: {
        initials: 'JD',
        name: 'John Doe',
        role: 'Homeowner'
      }
    },
    {
      id: '5',
      name: 'Add Custom Context',
      type: 'custom',
      icon: Plus,
      color: '#D4AF37',
      gradient: 'linear-gradient(135deg, rgba(15, 15, 15, 0.6) 0%, rgba(30, 30, 30, 0.6) 100%)',
      description: 'Upload files or add information',
      screen: 'add-context',
      previewData: null
    }
  ];

  // Quick suggestions for chat
  const quickSuggestions = [
    "Schedule property inspection",
    "Check claim status",
    "Review my policy coverage",
    "File a new claim",
    "Apply for resilience grant",
    "Upload inspection photos",
    "Request damage assessment",
    "Get premium estimate",
    "Update my contact information",
    "Download policy documents",
    "Schedule drone inspection",
    "Review inspection report",
    "Submit storm damage photos",
    "Request policy review",
    "Compare coverage options",
    "Track my claim progress",
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

  // Mock data for chat types
  const chatTypes: ChatType[] = [
    { id: 'claims', title: 'Claims Assistance', description: 'File and track insurance claims', icon: FileCheck, color: '#60a5fa' },
    { id: 'policy', title: 'Policy Questions', description: 'Get help with your insurance policy', icon: Shield, color: '#34d399' },
    { id: 'inspection', title: 'Property Inspection', description: 'Schedule and manage inspections', icon: Home, color: '#f59e0b' },
    { id: 'emergency', title: 'Emergency Support', description: '24/7 urgent assistance', icon: Zap, color: '#ef4444' },
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

  const sendMessage = useCallback(async () => {
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
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === loadingMessage.id 
            ? { ...msg, content: 'I understand your request. Let me help you with that.', loading: false }
            : msg
        )
      );
      setIsSending(false);
    }, 1500);
  }, [inputText, isSending]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }, [sendMessage]);

  const formatTimestamp = useCallback((date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  }, []);

  // Toggle card flip
  const toggleCardFlip = useCallback((cardId: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  }, []);

  // Get detailed data for card back side - San Francisco specific data
  const getCardBackData = (card: AttachmentCard) => {
    switch (card.type) {
      case 'weather':
        return {
          title: 'Current Weather Data',
          items: [
            { label: 'Temperature', value: '72°F', sublabel: 'Feels like 68°F' },
            { label: 'Conditions', value: 'Partly Cloudy', sublabel: 'UV Index: 6' },
            { label: 'Wind', value: '12 mph W', sublabel: 'Gusts to 18 mph' },
            { label: 'Humidity', value: '65%', sublabel: 'Visibility: 10 mi' },
            { label: 'Pressure', value: '30.12 in', sublabel: 'Steady' },
            { label: 'Sunset', value: '5:47 PM', sublabel: 'Golden hour' }
          ]
        };
      case 'policy':
        return {
          title: 'Policy Information',
          items: [
            { label: 'Coverage Amount', value: '$850,000', sublabel: 'Dwelling coverage' },
            { label: 'Annual Premium', value: '$2,847/yr', sublabel: 'Paid in full' },
            { label: 'Deductible', value: '$2,500', sublabel: 'Standard' },
            { label: 'Policy Type', value: 'HO-3', sublabel: 'Special form' },
            { label: 'Carrier', value: 'State Farm', sublabel: 'A+ Rated' },
            { label: 'Renewal Date', value: 'Dec 15, 2025', sublabel: '45 days away' }
          ]
        };
      case 'property':
        return {
          title: 'Property Details',
          items: [
            { label: 'Market Value', value: '$1.2M', sublabel: 'Zillow estimate' },
            { label: 'Square Footage', value: '2,400 sq ft', sublabel: '4 bed, 3 bath' },
            { label: 'Year Built', value: '1998', sublabel: '26 years old' },
            { label: 'Property Type', value: 'Single Family', sublabel: 'Detached' },
            { label: 'Location', value: 'Noe Valley', sublabel: 'San Francisco, CA' },
            { label: 'Lot Size', value: '4,500 sq ft', sublabel: '0.10 acres' }
          ]
        };
      case 'user':
        return {
          title: 'User Profile',
          items: [
            { label: 'Name', value: 'John Doe', sublabel: 'Primary account' },
            { label: 'Email', value: 'john@email.com', sublabel: 'Verified' },
            { label: 'Phone', value: '(415) 555-0123', sublabel: 'Mobile' },
            { label: 'Member Since', value: 'Jan 2023', sublabel: '22 months' },
            { label: 'Properties', value: '1 Property', sublabel: 'Active' },
            { label: 'Plan', value: 'Premium', sublabel: 'All features' }
          ]
        };
      case 'custom':
        return {
          title: 'Add Custom Context',
          items: [
            { label: 'Upload Documents', value: 'PDF, Images', sublabel: 'Drag & drop' },
            { label: 'Add Notes', value: 'Text entry', sublabel: 'Rich text' },
            { label: 'Link External Data', value: 'APIs', sublabel: 'Connect services' },
            { label: 'Voice Recording', value: 'Audio notes', sublabel: 'Transcription' },
            { label: 'Scan Documents', value: 'Camera', sublabel: 'OCR enabled' },
            { label: 'Import Data', value: 'CSV, JSON', sublabel: 'Batch upload' }
          ]
        };
      default:
        return { title: 'Details', items: [] };
    }
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
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    type: 'spring',
                    damping: 25,
                    stiffness: 500,
                    delay: index * 0.1,
                  }}
                  className="flex"
                  style={{
                    justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                    gap: 'var(--spacing-2)',
                  }}
                >
                  {message.type === 'assistant' && (
                    <motion.div
                      animate={{
                        y: [0, -2, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="relative"
                    >
                      {/* Avatar glow effect */}
                      <motion.div
                        className="absolute inset-0"
                        animate={{
                          opacity: [0.3, 0.6, 0.3],
                          scale: [1, 1.3, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        style={{
                          borderRadius: '50%',
                          background: 'radial-gradient(circle, rgba(96, 165, 250, 0.5) 0%, transparent 70%)',
                          filter: 'blur(10px)',
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
                            border: '1px solid rgba(96, 165, 250, 0.5)',
                            fontSize: 'var(--text-xs)',
                            color: 'var(--text-primary)',
                            boxShadow: '0 0 16px rgba(96, 165, 250, 0.4)',
                          }}
                        >
                          PA
                        </AvatarFallback>
                      </Avatar>
                    </motion.div>
                  )}
                  
                  <motion.div 
                    style={{ maxWidth: '75%' }}
                    whileHover={{ 
                      scale: message.type === 'user' ? 1.03 : 1.02,
                      y: message.type === 'user' ? -2 : 0,
                    }}
                    transition={{ type: 'spring', damping: 20, stiffness: 400 }}
                  >
                    <motion.div
                      className="backdrop-blur-sm relative overflow-hidden group"
                      style={{
                        paddingTop: 'var(--spacing-4)',
                        paddingBottom: 'var(--spacing-4)',
                        paddingLeft: 'var(--spacing-5)',
                        paddingRight: 'var(--spacing-5)',
                        borderRadius: 'var(--radius-xl)',
                        backgroundColor: message.type === 'user' 
                          ? 'rgba(255, 255, 255, 0.28)' 
                          : 'rgba(96, 165, 250, 0.15)',
                        border: message.type === 'user'
                          ? '1px solid rgba(255, 215, 0, 0.4)'
                          : '1px solid rgba(96, 165, 250, 0.4)',
                        boxShadow: message.type === 'user'
                          ? '0 12px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 215, 0, 0.15)'
                          : '0 8px 28px rgba(96, 165, 250, 0.25), inset 0 1px 0 rgba(96, 165, 250, 0.3)',
                      }}
                    >
                      {/* ASSISTANT: AI Processing waves effect */}
                      {message.type === 'assistant' && (
                        <>
                          <motion.div
                            className="absolute inset-0 pointer-events-none"
                            animate={{
                              opacity: [0.2, 0.4, 0.2],
                              scale: [1, 1.05, 1],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                            style={{
                              background: 'radial-gradient(circle at 30% 50%, rgba(96, 165, 250, 0.3), transparent 60%)',
                              borderRadius: 'var(--radius-xl)',
                            }}
                          />
                          <motion.div
                            className="absolute inset-0 pointer-events-none"
                            animate={{
                              opacity: [0.15, 0.35, 0.15],
                              scale: [1, 1.08, 1],
                            }}
                            transition={{
                              duration: 3.5,
                              repeat: Infinity,
                              ease: 'easeInOut',
                              delay: 0.5,
                            }}
                            style={{
                              background: 'radial-gradient(circle at 70% 50%, rgba(59, 130, 246, 0.25), transparent 60%)',
                              borderRadius: 'var(--radius-xl)',
                            }}
                          />
                          {/* AI Scan line effect */}
                          <motion.div
                            className="absolute inset-0 pointer-events-none"
                            animate={{
                              y: ['-100%', '200%'],
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: 'linear',
                            }}
                            style={{
                              background: 'linear-gradient(to bottom, transparent, rgba(96, 165, 250, 0.4) 50%, transparent)',
                              height: '50%',
                            }}
                          />
                        </>
                      )}

                      {/* USER: Golden luxury gradient */}
                      {message.type === 'user' && (
                        <>
                          <motion.div
                            className="absolute inset-0 pointer-events-none"
                            animate={{
                              opacity: [0.15, 0.35, 0.15],
                            }}
                            transition={{
                              duration: 5,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                            style={{
                              background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.25) 0%, rgba(255, 255, 255, 0.2) 50%, transparent)',
                              borderRadius: 'var(--radius-xl)',
                            }}
                          />
                          {/* Golden particle glow */}
                          <motion.div
                            className="absolute inset-0 pointer-events-none"
                            animate={{
                              opacity: [0.1, 0.3, 0.1],
                              rotate: [0, 180, 360],
                            }}
                            transition={{
                              duration: 8,
                              repeat: Infinity,
                              ease: 'linear',
                            }}
                            style={{
                              background: 'radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.3), transparent 50%)',
                              borderRadius: 'var(--radius-xl)',
                            }}
                          />
                        </>
                      )}
                      
                      {/* Shimmer effect on hover - Different speeds */}
                      <motion.div
                        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
                        animate={{
                          x: ['-150%', '150%'],
                        }}
                        transition={{
                          duration: message.type === 'user' ? 2 : 1.2,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                        style={{
                          background: message.type === 'user'
                            ? 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.5), rgba(255, 255, 255, 0.6), rgba(255, 215, 0, 0.5), transparent)'
                            : 'linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.5), transparent)',
                          width: '150%',
                        }}
                      />
                      
                      {/* Edge glow - Different colors */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          borderRadius: 'var(--radius-xl)',
                          background: message.type === 'user'
                            ? 'linear-gradient(to bottom right, rgba(255, 215, 0, 0.25) 0%, rgba(255, 255, 255, 0.2) 30%, transparent 60%)'
                            : 'linear-gradient(to bottom right, rgba(96, 165, 250, 0.3) 0%, rgba(59, 130, 246, 0.2) 40%, transparent 70%)',
                        }}
                      />
                      
                      <div className="relative z-10">
                        {message.loading ? (
                          <div className="flex" style={{ gap: 'var(--spacing-1)' }}>
                            <motion.div
                              animate={{
                                y: [0, -8, 0],
                                opacity: [0.5, 1, 0.5],
                              }}
                              transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: 0,
                              }}
                              style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                backgroundColor: '#60a5fa',
                                boxShadow: '0 0 8px rgba(96, 165, 250, 0.8)',
                              }}
                            />
                            <motion.div
                              animate={{
                                y: [0, -8, 0],
                                opacity: [0.5, 1, 0.5],
                              }}
                              transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: 0.15,
                              }}
                              style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                backgroundColor: '#60a5fa',
                                boxShadow: '0 0 8px rgba(96, 165, 250, 0.8)',
                              }}
                            />
                            <motion.div
                              animate={{
                                y: [0, -8, 0],
                                opacity: [0.5, 1, 0.5],
                              }}
                              transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: 0.3,
                              }}
                              style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                backgroundColor: '#60a5fa',
                                boxShadow: '0 0 8px rgba(96, 165, 250, 0.8)',
                              }}
                            />
                          </div>
                        ) : (
                          <p
                            style={{
                              fontSize: 'var(--text-sm)',
                              color: 'var(--text-primary)',
                              lineHeight: '1.5',
                            }}
                          >
                            {message.content}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>

                  {message.type === 'user' && (
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                      transition={{ type: 'spring', damping: 15, stiffness: 400 }}
                      className="relative"
                    >
                      {/* Golden glow for user avatar */}
                      <motion.div
                        className="absolute inset-0"
                        animate={{
                          opacity: [0.4, 0.7, 0.4],
                          scale: [1, 1.4, 1],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        style={{
                          borderRadius: '50%',
                          background: 'radial-gradient(circle, rgba(255, 215, 0, 0.6) 0%, rgba(255, 215, 0, 0.3) 40%, transparent 70%)',
                          filter: 'blur(12px)',
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
                            border: '1px solid rgba(255, 215, 0, 0.6)',
                            fontSize: 'var(--text-xs)',
                            color: 'var(--text-primary)',
                            boxShadow: '0 0 16px rgba(255, 215, 0, 0.5), 0 0 8px rgba(255, 255, 255, 0.3)',
                          }}
                        >
                          U
                        </AvatarFallback>
                      </Avatar>
                    </motion.div>
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
              {conversationHistory.map((conversation) => (
                <div
                  key={conversation.id}
                  className="backdrop-blur-sm cursor-pointer transition-all hover:scale-[1.02]"
                  style={{
                    padding: 'var(--spacing-4)',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                  }}
                  onClick={() => {
                    setActiveTab('chat');
                    // Load conversation messages here
                  }}
                >
                  <div className="flex items-start justify-between" style={{ marginBottom: 'var(--spacing-2)' }}>
                    <h3 
                      style={{
                        fontSize: 'var(--text-base)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: 'var(--text-primary)',
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
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-secondary)',
                      marginBottom: 'var(--spacing-2)',
                    }}
                  >
                    {conversation.preview}
                  </p>
                  <div className="flex items-center" style={{ gap: 'var(--spacing-2)' }}>
                    <MessageSquare className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                    <span
                      style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {conversation.messageCount} messages
                    </span>
                  </div>
                </div>
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
              {chatTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <div
                    key={type.id}
                    className="backdrop-blur-sm cursor-pointer transition-all hover:scale-[1.02]"
                    style={{
                      padding: 'var(--spacing-5)',
                      borderRadius: 'var(--radius-lg)',
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                    }}
                    onClick={() => {
                      setActiveTab('chat');
                      // Initialize chat with this type
                    }}
                  >
                    <div className="flex items-start" style={{ gap: 'var(--spacing-4)' }}>
                      <div
                        className="flex items-center justify-center flex-shrink-0"
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: `${type.color}20`,
                          border: `1px solid ${type.color}40`,
                        }}
                      >
                        <IconComponent className="w-6 h-6" style={{ color: type.color }} />
                      </div>
                      <div className="flex-1">
                        <h3 
                          style={{
                            fontSize: 'var(--text-base)',
                            fontWeight: 'var(--font-weight-medium)',
                            color: 'var(--text-primary)',
                            marginBottom: 'var(--spacing-1)',
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
                  </div>
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
              {savedMessages.map((saved) => (
                <div
                  key={saved.id}
                  className="backdrop-blur-sm"
                  style={{
                    padding: 'var(--spacing-4)',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                  }}
                >
                  <div className="flex items-start justify-between" style={{ marginBottom: 'var(--spacing-3)' }}>
                    <span
                      style={{
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: '#60a5fa',
                        paddingLeft: 'var(--spacing-2)',
                        paddingRight: 'var(--spacing-2)',
                        paddingTop: '2px',
                        paddingBottom: '2px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'rgba(96, 165, 250, 0.2)',
                        border: '1px solid rgba(96, 165, 250, 0.3)',
                      }}
                    >
                      {saved.category}
                    </span>
                    <Bookmark className="w-5 h-5" style={{ color: '#60a5fa' }} fill="#60a5fa" />
                  </div>
                  <p
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-primary)',
                      lineHeight: '1.5',
                      marginBottom: 'var(--spacing-2)',
                    }}
                  >
                    {saved.content}
                  </p>
                  <span
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    Saved {formatTimestamp(saved.timestamp)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

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
      {/* Collapsible Quick Actions Header with Toggle Button */}
      <div className="relative" style={{ marginBottom: '0' }}>
        {/* Collapsible Quick Actions Header */}
        <div
          className="overflow-hidden transition-all"
          style={{
            maxHeight: isQuickActionsExpanded ? '300px' : '0px',
            transitionDuration: '300ms',
            transitionTimingFunction: 'ease-in-out',
          }}
        >
          {/* Top Section: Large Card + 3 Small Action Cards */}
          <div
            className="grid grid-cols-[1.8fr_0.9fr]"
            style={{ gap: 'var(--spacing-3)', paddingTop: 'var(--spacing-4)', paddingBottom: 'var(--spacing-5)' }}
          >
            {/* Large Card with Purple/Blue Glow - Left */}
            <div
              className="ring-2 ring-purple-500 ring-offset-2 ring-offset-transparent backdrop-blur-sm transition-all"
              style={{
                aspectRatio: '1',
                borderRadius: 'var(--radius-2xl)',
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              }}
            >
              {/* AI Angel Status */}
              <div className="w-full h-full flex flex-col items-center justify-center" style={{ gap: 'var(--spacing-3)' }}>
                <Sparkles
                  className="w-12 h-12"
                  style={{ color: '#a78bfa' }}
                />
                <div className="text-center">
                  <div
                    style={{
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--text-primary)',
                      marginBottom: 'var(--spacing-1)',
                    }}
                  >
                    PolicyAngel Assistant
                  </div>
                  <div
                    className="flex items-center justify-center"
                    style={{ gap: 'var(--spacing-2)' }}
                  >
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: '#34d399',
                      }}
                    />
                    <span
                      style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Small Action Cards - Right */}
            <div
              className="flex flex-col justify-between"
              style={{ gap: 'var(--spacing-3)' }}
            >
              {/* Voice Mode Card */}
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
                onClick={() => {
                  setActiveTab('chat');
                }}
              >
                <div className="flex items-center h-full" style={{ gap: 'var(--spacing-2)' }}>
                  <Mic className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--icon-color)' }} />
                  <span
                    className="truncate"
                    style={{
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    Voice
                  </span>
                </div>
              </button>

              {/* History Card */}
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
                onClick={() => {
                  setActiveTab('history');
                }}
              >
                <div className="flex items-center h-full" style={{ gap: 'var(--spacing-2)' }}>
                  <History className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--icon-color)' }} />
                  <span
                    className="truncate"
                    style={{
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    History
                  </span>
                </div>
              </button>

              {/* Saved Card */}
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
                onClick={() => {
                  setActiveTab('saved');
                }}
              >
                <div className="flex items-center h-full" style={{ gap: 'var(--spacing-2)' }}>
                  <Bookmark className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--icon-color)' }} />
                  <span
                    className="truncate"
                    style={{
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    Saved
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Toggle Button - Positioned at Bottom Right of Header */}

      </div>

      {/* Tabs Navigation */}
      <div 
        className="backdrop-blur-sm"
        style={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          marginBottom: 'var(--spacing-4)',
          paddingTop: '0',
          marginTop: 'calc(-1 * var(--spacing-2))',
        }}
      >
        <nav 
          className="flex"
          style={{ 
            gap: 'var(--spacing-6)',
            marginBottom: '-1px',
          }}
        >
          {/* Chat Tab */}
          <button
            onClick={() => setActiveTab('chat')}
            className="flex items-center transition-all"
            style={{
              paddingLeft: 'var(--spacing-1)',
              paddingRight: 'var(--spacing-1)',
              paddingTop: 'var(--spacing-4)',
              paddingBottom: 'var(--spacing-4)',
              borderBottom: activeTab === 'chat' ? '2px solid #60a5fa' : '2px solid transparent',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-medium)',
              color: activeTab === 'chat' ? '#60a5fa' : 'var(--text-secondary)',
              whiteSpace: 'nowrap',
            }}
          >
            Chat
            {activeTab === 'chat' && (
              <span
                className="ml-2"
                style={{
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(96, 165, 250, 0.2)',
                  paddingLeft: 'var(--spacing-2)',
                  paddingRight: 'var(--spacing-2)',
                  paddingTop: '2px',
                  paddingBottom: '2px',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: '#60a5fa',
                }}
              >
                {messages.length}
              </span>
            )}
          </button>

          {/* History Tab */}
          <button
            onClick={() => setActiveTab('history')}
            className="flex items-center transition-all"
            style={{
              paddingLeft: 'var(--spacing-1)',
              paddingRight: 'var(--spacing-1)',
              paddingTop: 'var(--spacing-4)',
              paddingBottom: 'var(--spacing-4)',
              borderBottom: activeTab === 'history' ? '2px solid #60a5fa' : '2px solid transparent',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-medium)',
              color: activeTab === 'history' ? '#60a5fa' : 'var(--text-secondary)',
              whiteSpace: 'nowrap',
            }}
          >
            History
            <span
              className="ml-2"
              style={{
                borderRadius: '9999px',
                backgroundColor: activeTab === 'history' 
                  ? 'rgba(96, 165, 250, 0.2)' 
                  : 'rgba(255, 255, 255, 0.1)',
                paddingLeft: 'var(--spacing-2)',
                paddingRight: 'var(--spacing-2)',
                paddingTop: '2px',
                paddingBottom: '2px',
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-medium)',
                color: activeTab === 'history' ? '#60a5fa' : 'var(--text-secondary)',
              }}
            >
              12
            </span>
          </button>

          {/* Types Tab */}
          <button
            onClick={() => setActiveTab('types')}
            className="flex items-center transition-all"
            style={{
              paddingLeft: 'var(--spacing-1)',
              paddingRight: 'var(--spacing-1)',
              paddingTop: 'var(--spacing-4)',
              paddingBottom: 'var(--spacing-4)',
              borderBottom: activeTab === 'types' ? '2px solid #60a5fa' : '2px solid transparent',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-medium)',
              color: activeTab === 'types' ? '#60a5fa' : 'var(--text-secondary)',
              whiteSpace: 'nowrap',
            }}
          >
            Types
          </button>

          {/* Saved Tab */}
          <button
            onClick={() => setActiveTab('saved')}
            className="flex items-center transition-all"
            style={{
              paddingLeft: 'var(--spacing-1)',
              paddingRight: 'var(--spacing-1)',
              paddingTop: 'var(--spacing-4)',
              paddingBottom: 'var(--spacing-4)',
              borderBottom: activeTab === 'saved' ? '2px solid #60a5fa' : '2px solid transparent',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-medium)',
              color: activeTab === 'saved' ? '#60a5fa' : 'var(--text-secondary)',
              whiteSpace: 'nowrap',
            }}
          >
            Saved
            <span
              className="ml-2"
              style={{
                borderRadius: '9999px',
                backgroundColor: activeTab === 'saved' 
                  ? 'rgba(96, 165, 250, 0.2)' 
                  : 'rgba(255, 255, 255, 0.1)',
                paddingLeft: 'var(--spacing-2)',
                paddingRight: 'var(--spacing-2)',
                paddingTop: '2px',
                paddingBottom: '2px',
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-medium)',
                color: activeTab === 'saved' ? '#60a5fa' : 'var(--text-secondary)',
              }}
            >
              3
            </span>
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {renderTabContent()}

      {/* Custom Chat Composer Bar - Bottom (only show on chat tab) */}
      {activeTab === 'chat' && (
        <>
          {/* Quick Suggestions - Horizontally scrollable pills */}
          <div
            className="absolute left-0 right-0 overflow-x-auto overflow-y-hidden"
            style={{
              bottom: 'calc(var(--spacing-5) + 62px)', // Above the chat input
              paddingLeft: 'var(--spacing-6)',
              paddingRight: 'var(--spacing-6)',
              zIndex: 99,
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-x',
              // Hide scrollbar
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            ref={scrollContainerRef}
            onMouseDown={(e) => {
              setIsDragging(true);
              setStartX(e.clientX - scrollContainerRef.current!.offsetLeft);
              setScrollLeft(scrollContainerRef.current!.scrollLeft);
            }}
            onMouseLeave={() => setIsDragging(false)}
            onMouseUp={() => setIsDragging(false)}
            onMouseMove={(e) => {
              if (!isDragging) return;
              e.preventDefault();
              const x = e.clientX - scrollContainerRef.current!.offsetLeft;
              const walk = (x - startX) * 1.5; // Adjust sensitivity here
              scrollContainerRef.current!.scrollLeft = scrollLeft - walk;
            }}
          >
            <style>{`
              .scroll-container::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            <div 
              className="flex flex-nowrap"
              style={{ 
                gap: 'var(--spacing-2)',
                paddingBottom: 'var(--spacing-2)',
                width: 'max-content',
              }}
            >
              {quickSuggestions.map((suggestion, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: index * 0.05,
                    type: 'spring',
                    damping: 20,
                    stiffness: 400,
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setInputText(suggestion);
                  }}
                  className="backdrop-blur-sm flex-shrink-0 relative overflow-hidden group"
                  style={{
                    paddingLeft: 'var(--spacing-5)',
                    paddingRight: 'var(--spacing-5)',
                    paddingTop: 'var(--spacing-4)',
                    paddingBottom: 'var(--spacing-4)',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    fontSize: 'var(--text-base)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: 'var(--text-primary)',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
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
                      background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.2), transparent)',
                      borderRadius: 'var(--radius-full)',
                    }}
                  />
                  
                  {/* Hover shimmer effect */}
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
                      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                      width: '50%',
                    }}
                  />
                  
                  {/* Hover glow */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                    style={{
                      background: 'radial-gradient(circle at center, rgba(96, 165, 250, 0.25), transparent 70%)',
                      filter: 'blur(8px)',
                      borderRadius: 'var(--radius-full)',
                    }}
                  />
                  
                  <span className="relative z-10">{suggestion}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Attachment Cards - Credit Card Style */}
          <AnimatePresence>
            {showAttachmentCards && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="absolute left-0 right-0"
                style={{
                  bottom: 'calc(var(--spacing-5) + 60px)',
                  paddingLeft: 'var(--spacing-6)',
                  paddingRight: 'var(--spacing-6)',
                  zIndex: 99,
                }}
              >
                <div
                  className="backdrop-blur-xl relative overflow-hidden"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    borderRadius: 'var(--radius-2xl)',
                    padding: 'var(--spacing-5)',
                    border: '1px solid rgba(212, 175, 55, 0.25)',
                    boxShadow: `
                      0 25px 70px rgba(0, 0, 0, 0.8),
                      0 10px 30px rgba(212, 175, 55, 0.2),
                      inset 0 1px 1px rgba(255, 255, 255, 0.2),
                      inset 0 -1px 1px rgba(0, 0, 0, 0.5),
                      0 0 60px rgba(212, 175, 55, 0.1)
                    `,
                  }}
                >
                  {/* Luxury diagonal pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-5"
                    style={{
                      backgroundImage: `
                        repeating-linear-gradient(
                          45deg,
                          rgba(212, 175, 55, 0.1) 0px,
                          transparent 1px,
                          transparent 10px,
                          rgba(212, 175, 55, 0.1) 11px
                        )
                      `,
                      pointerEvents: 'none',
                    }}
                  />
                  
                  {/* Subtle radial glow */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      background: 'radial-gradient(ellipse at top, rgba(212, 175, 55, 0.15), transparent 60%)',
                      pointerEvents: 'none',
                    }}
                  />
                  {/* Premium header with gradient text */}
                  <div style={{ marginBottom: 'var(--spacing-4)' }}>
                    <p
                      style={{
                        fontSize: 'var(--text-sm)',
                        background: 'linear-gradient(135deg, #D4AF37 0%, #fbbf24 50%, #D4AF37 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        textAlign: 'center',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                      }}
                    >
                      ✦ Contextual Intelligence ✦
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
                    {attachmentCards.map((card, index) => {
                      const IconComponent = card.icon;
                      const isCustomCard = card.type === 'custom';
                      const isFlipped = flippedCards.has(card.id);
                      const backData = getCardBackData(card);
                      
                      return (
                        <div
                          key={card.id}
                          style={{
                            perspective: '1000px',
                            width: '100%',
                            height: isFlipped ? 'auto' : '90px',
                            minHeight: '90px',
                            position: 'relative',
                            zIndex: isFlipped ? 200 : 1,
                          }}
                        >
                          <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ 
                              opacity: 1, 
                              x: 0,
                              rotateY: isFlipped ? 180 : 0,
                              scale: isFlipped ? 1.05 : 1,
                            }}
                            transition={{ 
                              opacity: { delay: index * 0.1 },
                              x: { delay: index * 0.1, type: 'spring', damping: 20, stiffness: 200 },
                              rotateY: { duration: 0.6, ease: 'easeInOut' },
                              scale: { duration: 0.3, ease: 'easeOut' }
                            }}
                            style={{
                              width: '100%',
                              height: '100%',
                              position: 'relative',
                              transformStyle: 'preserve-3d',
                            }}
                          >
                            {/* FRONT SIDE */}
                            <motion.div
                              whileHover={{ scale: isFlipped ? 1 : (isCustomCard ? 1.04 : 1.03), y: isFlipped ? 0 : -2 }}
                              onClick={() => toggleCardFlip(card.id)}
                              className="relative overflow-hidden group"
                              style={{
                                width: '100%',
                                height: '90px',
                                borderRadius: 'var(--radius-xl)',
                                background: card.gradient,
                                border: isCustomCard 
                                  ? `2px dashed ${card.color}` 
                                  : `2px solid ${card.color}`,
                                boxShadow: isCustomCard 
                                  ? `
                                    0 10px 30px -5px rgba(0, 0, 0, 0.5),
                                    0 5px 15px -3px ${card.color}60,
                                    0 0 0 1px ${card.color}30,
                                    inset 0 1px 2px rgba(212, 175, 55, 0.3)
                                  `
                                  : `
                                    0 10px 30px -5px rgba(0, 0, 0, 0.5),
                                    0 5px 15px -3px ${card.color}40,
                                    0 0 0 1px ${card.color}20,
                                    inset 0 2px 4px rgba(255, 255, 255, 0.25),
                                    inset 0 -2px 4px rgba(0, 0, 0, 0.2)
                                  `,
                                textAlign: 'left',
                                position: 'absolute',
                                backfaceVisibility: 'hidden',
                                cursor: 'pointer',
                                transformStyle: 'preserve-3d',
                              }}
                            >
                          {/* Metallic texture overlay - only for non-custom cards */}
                          {!isCustomCard && (
                            <div
                              className="absolute inset-0 opacity-10"
                              style={{
                                backgroundImage: `
                                  repeating-linear-gradient(
                                    0deg,
                                    rgba(255, 255, 255, 0) 0px,
                                    rgba(255, 255, 255, 0.03) 1px,
                                    rgba(255, 255, 255, 0) 2px
                                  )
                                `,
                                pointerEvents: 'none',
                              }}
                            />
                          )}

                          {/* Custom card special pattern - dotted grid */}
                          {isCustomCard && (
                            <div
                              className="absolute inset-0 opacity-20"
                              style={{
                                backgroundImage: `
                                  radial-gradient(circle, rgba(212, 175, 55, 0.3) 1px, transparent 1px)
                                `,
                                backgroundSize: '20px 20px',
                                pointerEvents: 'none',
                              }}
                            />
                          )}

                          {/* Holographic shimmer effect */}
                          <motion.div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100"
                            animate={{
                              background: isCustomCard 
                                ? [
                                    `linear-gradient(120deg, transparent 0%, rgba(212, 175, 55, 0.5) 50%, transparent 100%)`,
                                    `linear-gradient(240deg, transparent 0%, rgba(212, 175, 55, 0.5) 50%, transparent 100%)`,
                                  ]
                                : [
                                    `linear-gradient(120deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)`,
                                    `linear-gradient(240deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)`,
                                  ],
                            }}
                            transition={{
                              duration: isCustomCard ? 1.5 : 2,
                              repeat: Infinity,
                              ease: 'linear',
                            }}
                            style={{
                              pointerEvents: 'none',
                            }}
                          />
                          
                          {/* Premium glow effect */}
                          <motion.div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100"
                            transition={{ duration: 0.4 }}
                            style={{
                              background: `radial-gradient(circle at 50% 50%, ${card.color}${isCustomCard ? '60' : '50'}, transparent 60%)`,
                              filter: 'blur(25px)',
                              pointerEvents: 'none',
                            }}
                          />

                          {/* Edge highlight */}
                          <div
                            className="absolute inset-0"
                            style={{
                              borderRadius: 'var(--radius-xl)',
                              padding: '1px',
                              background: isCustomCard 
                                ? `linear-gradient(135deg, rgba(212, 175, 55, 0.5) 0%, transparent 50%, rgba(212, 175, 55, 0.3) 100%)`
                                : `linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 50%, rgba(255, 255, 255, 0.2) 100%)`,
                              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                              WebkitMaskComposite: 'xor',
                              maskComposite: 'exclude',
                              pointerEvents: 'none',
                            }}
                          />

                          {/* PHASE 1A: TOGGLE SWITCH (Top-Left) - Slightly Smaller */}
                          {/* 
                            RN: Replace motion.button with Animated.View + TouchableOpacity
                            - Import: Animated, TouchableOpacity from 'react-native'
                            - whileTap → Use Animated.spring for scale effect
                            - onClick → onPress
                            - cursor: 'pointer' → Not needed in RN
                            - boxShadow → Use react-native-shadow-2 or elevation (Android) + shadowProps (iOS)
                            
                            Example:
                            <TouchableOpacity
                              onPress={() => toggleCardActive(card.id)}
                              activeOpacity={0.8}
                              className="absolute z-20"
                              style={{
                                top: 8,
                                left: 8,
                                width: 36,
                                height: 18,
                                borderRadius: 9,
                                backgroundColor: cardStates[card.id]?.isActive 
                                  ? `${card.color}40` 
                                  : 'rgba(255, 255, 255, 0.1)',
                                borderWidth: 1,
                                borderColor: cardStates[card.id]?.isActive ? card.color : 'rgba(255, 255, 255, 0.2)',
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: 2,
                                shadowColor: card.color,
                                shadowOffset: { width: 0, height: 0 },
                                shadowOpacity: cardStates[card.id]?.isActive ? 0.3 : 0,
                                shadowRadius: 10,
                                elevation: cardStates[card.id]?.isActive ? 5 : 0,
                              }}
                            >
                          */}
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCardActive(card.id);
                            }}
                            style={{
                              position: 'absolute',
                              top: 'var(--spacing-2)',
                              left: 'var(--spacing-2)',
                              width: '36px',
                              height: '18px',
                              borderRadius: '9px',
                              backgroundColor: cardStates[card.id]?.isActive 
                                ? `${card.color}40` 
                                : 'rgba(255, 255, 255, 0.1)',
                              border: `1px solid ${cardStates[card.id]?.isActive ? card.color : 'rgba(255, 255, 255, 0.2)'}`,
                              display: 'flex',
                              alignItems: 'center',
                              padding: '2px',
                              cursor: 'pointer',
                              zIndex: 20,
                              boxShadow: cardStates[card.id]?.isActive 
                                ? `0 0 10px ${card.color}50` 
                                : 'none',
                            }}
                          >
                            {/* 
                              RN: Animated sliding dot
                              - Use Animated.Value for x position
                              - animate → Use Animated.spring or Animated.timing
                              - x translation → Use transform: [{ translateX: animatedValue }]
                              
                              Example:
                              const slideAnim = useRef(new Animated.Value(cardStates[card.id]?.isActive ? 16 : 0)).current;
                              
                              useEffect(() => {
                                Animated.spring(slideAnim, {
                                  toValue: cardStates[card.id]?.isActive ? 16 : 0,
                                  stiffness: 500,
                                  damping: 30,
                                  useNativeDriver: true,
                                }).start();
                              }, [cardStates[card.id]?.isActive]);
                              
                              <Animated.View
                                style={{
                                  width: 14,
                                  height: 14,
                                  borderRadius: 7,
                                  backgroundColor: cardStates[card.id]?.isActive ? card.color : 'rgba(255, 255, 255, 0.4)',
                                  transform: [{ translateX: slideAnim }],
                                }}
                              />
                            */}
                            <motion.div
                              animate={{ x: cardStates[card.id]?.isActive ? 16 : 0 }}
                              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                              style={{
                                width: '14px',
                                height: '14px',
                                borderRadius: '50%',
                                backgroundColor: cardStates[card.id]?.isActive ? card.color : 'rgba(255, 255, 255, 0.4)',
                                boxShadow: cardStates[card.id]?.isActive 
                                  ? `0 0 6px ${card.color}70` 
                                  : 'none',
                              }}
                            />
                          </motion.button>

                          {/* PHASE 1A: STATUS DOT (Top-Right) - Minimal, No Text */}
                          {/* 
                            RN: Pulsing status indicator
                            - MINIMALIST DESIGN: Small 6px dot only, NO text label
                            - motion.div → Animated.View with scale animation
                            - animate scale → Use Animated.loop with Animated.sequence
                            - boxShadow → Use shadowProps (iOS) or react-native-shadow-2
                            - Conditional pulsing based on status (syncing = faster)
                            
                            Example:
                            const pulseAnim = useRef(new Animated.Value(1)).current;
                            
                            useEffect(() => {
                              const duration = cardStates[card.id]?.status === 'syncing' ? 1500 : 3000;
                              Animated.loop(
                                Animated.sequence([
                                  Animated.timing(pulseAnim, {
                                    toValue: cardStates[card.id]?.status === 'syncing' ? 1.3 : 1.2,
                                    duration: duration / 2,
                                    easing: Easing.inOut(Easing.ease),
                                    useNativeDriver: true,
                                  }),
                                  Animated.timing(pulseAnim, {
                                    toValue: 1,
                                    duration: duration / 2,
                                    easing: Easing.inOut(Easing.ease),
                                    useNativeDriver: true,
                                  }),
                                ])
                              ).start();
                            }, [cardStates[card.id]?.status]);
                            
                            {cardStates[card.id]?.isActive && (
                              <Animated.View
                                className="absolute z-20"
                                style={{
                                  top: 10,
                                  right: 10,
                                  width: 6,
                                  height: 6,
                                  borderRadius: 3,
                                  backgroundColor: cardStates[card.id]?.status === 'synced' 
                                    ? '#22C55E'
                                    : cardStates[card.id]?.status === 'syncing'
                                    ? '#3B82F6'
                                    : '#EF4444',
                                  transform: [{ scale: pulseAnim }],
                                  shadowColor: cardStates[card.id]?.status === 'synced' 
                                    ? '#22C55E'
                                    : cardStates[card.id]?.status === 'syncing'
                                    ? '#3B82F6'
                                    : '#EF4444',
                                  shadowOffset: { width: 0, height: 0 },
                                  shadowOpacity: 0.4,
                                  shadowRadius: 8,
                                }}
                              />
                            )}
                          */}
                          {cardStates[card.id]?.isActive && (
                            <motion.div
                              animate={{ 
                                scale: cardStates[card.id]?.status === 'syncing' ? [1, 1.3, 1] : [1, 1.2, 1] 
                              }}
                              transition={{ 
                                repeat: Infinity, 
                                duration: cardStates[card.id]?.status === 'syncing' ? 1.5 : 3,
                                ease: 'easeInOut' 
                              }}
                              style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                backgroundColor: cardStates[card.id]?.status === 'synced' 
                                  ? '#22C55E'
                                  : cardStates[card.id]?.status === 'syncing'
                                  ? '#3B82F6'
                                  : '#EF4444',
                                boxShadow: `0 0 8px ${
                                  cardStates[card.id]?.status === 'synced' 
                                    ? 'rgba(34, 197, 94, 0.4)'
                                    : cardStates[card.id]?.status === 'syncing'
                                    ? 'rgba(59, 130, 246, 0.4)'
                                    : 'rgba(239, 68, 68, 0.4)'
                                }`,
                                zIndex: 20,
                              }}
                            />
                          )}

                          {/* PHASE 1A: CONSOLIDATED STATUS (Bottom-Right) - Icon + Time Only */}
                          {/* 
                            RN: Consolidated status indicator - MINIMALIST DESIGN
                            - IMPROVEMENT: Merged timestamp + sync status into ONE element
                            - REDUCED: From 2 separate elements to 1 (50% less clutter)
                            - div → View with NativeWind classes
                            - display: flex → className="flex-row items-center"
                            - gap → Use marginRight/marginLeft or gap-1 (NativeWind v4)
                            - fontSize: '9px' → className="text-[9px]"
                            - Icons → @expo/vector-icons or react-native-vector-icons
                            
                            SMART CONTEXTUAL TEXT:
                            - Synced: "✓ 15m" (check icon + shortened time)
                            - Syncing: "↻ Now" (rotating spinner + "Now")
                            - Error: "⚠ Retry" (warning icon + actionable text)
                            
                            Example:
                            <View 
                              className="absolute z-20 flex-row items-center gap-1"
                              style={{
                                bottom: 8,
                                right: 10,
                              }}
                            >
                              {cardStates[card.id]?.status === 'synced' && (
                                <Ionicons name="checkmark-circle" size={12} color="rgba(255, 255, 255, 0.6)" />
                              )}
                              {cardStates[card.id]?.status === 'syncing' && (
                                <Animated.View style={{ transform: [{ rotate: rotateAnim }] }}>
                                  <Ionicons name="refresh" size={12} color="rgba(59, 130, 246, 0.8)" />
                                </Animated.View>
                              )}
                              {cardStates[card.id]?.status === 'error' && (
                                <Ionicons name="warning" size={12} color="rgba(239, 68, 68, 0.8)" />
                              )}
                              
                              <Text 
                                className="text-[9px] font-medium"
                                style={{ 
                                  color: cardStates[card.id]?.isActive 
                                    ? 'rgba(255, 255, 255, 0.6)'
                                    : 'rgba(255, 255, 255, 0.4)' 
                                }}
                              >
                                {cardStates[card.id]?.status === 'syncing' 
                                  ? 'Now' 
                                  : cardStates[card.id]?.status === 'error'
                                  ? 'Retry'
                                  : formatTimeAgo(cardStates[card.id]?.lastUpdated).replace(' ago', '')
                                }
                              </Text>
                            </View>
                            
                            ROTATING ICON ANIMATION:
                            const rotateAnim = useRef(new Animated.Value(0)).current;
                            
                            useEffect(() => {
                              if (cardStates[card.id]?.status === 'syncing') {
                                Animated.loop(
                                  Animated.timing(rotateAnim, {
                                    toValue: 1,
                                    duration: 1000,
                                    easing: Easing.linear,
                                    useNativeDriver: true,
                                  })
                                ).start();
                              }
                            }, [cardStates[card.id]?.status]);
                            
                            const rotate = rotateAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: ['0deg', '360deg'],
                            });
                          */}
                          <div
                            style={{
                              position: 'absolute',
                              bottom: 'var(--spacing-2)',
                              right: '10px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '9px',
                              fontWeight: '500',
                              color: cardStates[card.id]?.isActive 
                                ? 'rgba(255, 255, 255, 0.6)'
                                : 'rgba(255, 255, 255, 0.4)',
                              zIndex: 20,
                            }}
                          >
                            {/* Smart contextual status icon */}
                            {/* RN: Replace with Ionicons - checkmark-circle, refresh, warning */}
                            {cardStates[card.id]?.status === 'synced' && (
                              <CheckCircle size={12} style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
                            )}
                            {cardStates[card.id]?.status === 'syncing' && (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                              >
                                <RefreshCw size={12} style={{ color: 'rgba(59, 130, 246, 0.8)' }} />
                              </motion.div>
                            )}
                            {cardStates[card.id]?.status === 'error' && (
                              <AlertTriangle size={12} style={{ color: 'rgba(239, 68, 68, 0.8)' }} />
                            )}
                            
                            {/* Time display with smart formatting */}
                            {/* RN: span → Text component */}
                            <span>
                              {cardStates[card.id]?.status === 'syncing' 
                                ? 'Now' 
                                : cardStates[card.id]?.status === 'error'
                                ? 'Retry'
                                : formatTimeAgo(cardStates[card.id]?.lastUpdated || new Date()).replace(' ago', '')
                              }
                            </span>
                          </div>

                          <div className="flex items-center relative z-10 h-full" style={{ 
                            padding: 'var(--spacing-4)', 
                            paddingRight: card.previewData ? '80px' : 'var(--spacing-4)', // Extra space for preview badge
                            gap: 'var(--spacing-4)' 
                          }}>
                            {/* Premium Icon Container */}
                            <motion.div
                              whileHover={{ 
                                rotate: isCustomCard ? 0 : [0, -5, 5, -5, 0], 
                                scale: isCustomCard ? 1.2 : 1.15 
                              }}
                              transition={{ type: 'spring', damping: 12, stiffness: 400 }}
                              className="flex-shrink-0 flex items-center justify-center relative"
                              style={{
                                width: '58px',
                                height: '58px',
                                borderRadius: isCustomCard ? '50%' : 'var(--radius-lg)',
                                background: isCustomCard
                                  ? `
                                    linear-gradient(135deg, 
                                      rgba(212, 175, 55, 0.4) 0%, 
                                      rgba(212, 175, 55, 0.2) 50%,
                                      rgba(212, 175, 55, 0.35) 100%
                                    )
                                  `
                                  : `
                                    linear-gradient(135deg, 
                                      rgba(255, 255, 255, 0.3) 0%, 
                                      rgba(255, 255, 255, 0.15) 50%,
                                      rgba(255, 255, 255, 0.25) 100%
                                    )
                                  `,
                                backdropFilter: 'blur(12px)',
                                border: isCustomCard 
                                  ? '2px dashed rgba(212, 175, 55, 0.6)' 
                                  : '2px solid rgba(255, 255, 255, 0.4)',
                                boxShadow: isCustomCard
                                  ? `
                                    0 8px 20px ${card.color}70,
                                    inset 0 2px 4px rgba(212, 175, 55, 0.4),
                                    inset 0 -2px 4px rgba(0, 0, 0, 0.2),
                                    0 0 25px ${card.color}40
                                  `
                                  : `
                                    0 8px 20px ${card.color}60,
                                    inset 0 2px 4px rgba(255, 255, 255, 0.5),
                                    inset 0 -2px 4px rgba(0, 0, 0, 0.2),
                                    0 0 20px ${card.color}30
                                  `,
                              }}
                            >
                              {/* Icon glow pulse */}
                              <motion.div
                                animate={{
                                  opacity: isCustomCard ? [0.6, 1, 0.6] : [0.5, 0.8, 0.5],
                                  scale: isCustomCard ? [1, 1.3, 1] : [1, 1.2, 1],
                                }}
                                transition={{
                                  duration: isCustomCard ? 1.5 : 2,
                                  repeat: Infinity,
                                  ease: 'easeInOut',
                                }}
                                className="absolute inset-0"
                                style={{
                                  background: `radial-gradient(circle, ${card.color}${isCustomCard ? '70' : '60'}, transparent 70%)`,
                                  borderRadius: isCustomCard ? '50%' : 'var(--radius-lg)',
                                  filter: 'blur(8px)',
                                }}
                              />
                              
                              {/* Plus icon rotation animation for custom card */}
                              {isCustomCard ? (
                                <motion.div
                                  animate={{
                                    rotate: [0, 90, 0],
                                  }}
                                  transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                  }}
                                  className="relative z-10"
                                >
                                  <IconComponent
                                    className="w-8 h-8"
                                    style={{
                                      color: '#D4AF37',
                                      filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 10px rgba(212, 175, 55, 0.6))',
                                      strokeWidth: 2.5,
                                    }}
                                  />
                                </motion.div>
                              ) : (
                                <IconComponent
                                  className="w-7 h-7 relative z-10"
                                  style={{
                                    color: 'white',
                                    filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.4))',
                                  }}
                                />
                              )}
                            </motion.div>

                            {/* Premium Content */}
                            <div className="flex-1 min-w-0">
                              <h3
                                style={isCustomCard ? {
                                  fontSize: '17px',
                                  fontWeight: '600',
                                  background: 'linear-gradient(135deg, #D4AF37 0%, #fbbf24 50%, #D4AF37 100%)',
                                  WebkitBackgroundClip: 'text',
                                  WebkitTextFillColor: 'transparent',
                                  backgroundClip: 'text',
                                  marginBottom: '4px',
                                  textShadow: '0 2px 8px rgba(212, 175, 55, 0.3)',
                                  letterSpacing: '0.02em',
                                } : {
                                  fontSize: '17px',
                                  fontWeight: '600',
                                  color: 'white',
                                  marginBottom: '4px',
                                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 255, 255, 0.3)',
                                  letterSpacing: '0.02em',
                                }}
                              >
                                {card.name}
                              </h3>
                              <p
                                style={{
                                  fontSize: '12px',
                                  color: isCustomCard ? 'rgba(212, 175, 55, 0.9)' : 'rgba(255, 255, 255, 0.85)',
                                  textShadow: isCustomCard 
                                    ? '0 1px 3px rgba(0, 0, 0, 0.4), 0 0 10px rgba(212, 175, 55, 0.2)'
                                    : '0 1px 3px rgba(0, 0, 0, 0.4)',
                                  letterSpacing: '0.01em',
                                }}
                              >
                                {card.description}
                              </p>
                            </div>

                            {/* Premium Arrow/Upload icon with circle background - Only show when there's NO preview badge */}
                            {!card.previewData && (
                              <motion.div
                                className="flex-shrink-0 flex items-center justify-center"
                                initial={{ opacity: 0.6, x: 0 }}
                                whileHover={{ opacity: 1, x: isCustomCard ? 0 : 4, y: isCustomCard ? -2 : 0 }}
                                animate={isCustomCard ? {
                                  y: [0, -4, 0],
                                } : {}}
                                transition={isCustomCard ? {
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: 'easeInOut',
                                } : { duration: 0.2 }}
                                style={{
                                  width: '36px',
                                  height: '36px',
                                  borderRadius: '50%',
                                  background: isCustomCard 
                                    ? 'rgba(212, 175, 55, 0.25)'
                                    : 'rgba(255, 255, 255, 0.15)',
                                  backdropFilter: 'blur(8px)',
                                  border: isCustomCard 
                                    ? '1.5px solid rgba(212, 175, 55, 0.5)'
                                    : '1.5px solid rgba(255, 255, 255, 0.3)',
                                  boxShadow: isCustomCard
                                    ? 'inset 0 1px 2px rgba(212, 175, 55, 0.5), 0 2px 8px rgba(0, 0, 0, 0.2), 0 0 15px rgba(212, 175, 55, 0.3)'
                                    : 'inset 0 1px 2px rgba(255, 255, 255, 0.4), 0 2px 8px rgba(0, 0, 0, 0.2)',
                                }}
                              >
                                {isCustomCard ? (
                                  <Upload
                                    className="w-5 h-5"
                                    style={{
                                      color: '#D4AF37',
                                      filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 8px rgba(212, 175, 55, 0.5))',
                                    }}
                                  />
                                ) : (
                                  <ArrowRight
                                    className="w-5 h-5"
                                    style={{
                                      color: 'white',
                                      filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4))',
                                    }}
                                  />
                                )}
                              </motion.div>
                            )}
                          </div>

                          {/* Bottom gradient shine */}
                          <div
                            className="absolute bottom-0 left-0 right-0 opacity-40"
                            style={{
                              height: '30%',
                              background: 'linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent)',
                              pointerEvents: 'none',
                            }}
                          />

                          {/* Screen Preview Data Overlay */}
                          {card.previewData && (
                            <div
                              className="absolute top-2 right-2 z-20"
                              style={{
                                pointerEvents: 'none',
                              }}
                            >
                              {/* Weather Preview */}
                              {card.type === 'weather' && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: index * 0.1 + 0.3 }}
                                  className="backdrop-blur-md"
                                  style={{
                                    padding: '6px 10px',
                                    borderRadius: 'var(--radius-lg)',
                                    background: 'rgba(255, 255, 255, 0.15)',
                                    border: '1px solid rgba(255, 255, 255, 0.3)',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
                                  }}
                                >
                                  <div style={{ textAlign: 'right' }}>
                                    <p style={{ 
                                      fontSize: '18px', 
                                      fontWeight: '700',
                                      color: 'white',
                                      lineHeight: '1',
                                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                                    }}>
                                      {card.previewData.temp}
                                    </p>
                                    <p style={{ 
                                      fontSize: '9px', 
                                      color: 'rgba(255, 255, 255, 0.85)',
                                      marginTop: '2px',
                                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                                    }}>
                                      {card.previewData.condition}
                                    </p>
                                  </div>
                                </motion.div>
                              )}

                              {/* Policy Preview */}
                              {card.type === 'policy' && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: index * 0.1 + 0.3 }}
                                  className="backdrop-blur-md"
                                  style={{
                                    padding: '6px 10px',
                                    borderRadius: 'var(--radius-lg)',
                                    background: 'rgba(0, 0, 0, 0.4)',
                                    border: '1px solid rgba(212, 175, 55, 0.3)',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(212, 175, 55, 0.3)',
                                  }}
                                >
                                  <div style={{ textAlign: 'right' }}>
                                    <p style={{ 
                                      fontSize: '18px', 
                                      fontWeight: '700',
                                      color: '#fbbf24',
                                      lineHeight: '1',
                                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                                    }}>
                                      {card.previewData.coverage}
                                    </p>
                                    <p style={{ 
                                      fontSize: '9px', 
                                      color: 'rgba(251, 191, 36, 0.85)',
                                      marginTop: '2px',
                                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                                    }}>
                                      {card.previewData.status}
                                    </p>
                                  </div>
                                </motion.div>
                              )}

                              {/* Property Preview */}
                              {card.type === 'property' && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: index * 0.1 + 0.3 }}
                                  className="backdrop-blur-md"
                                  style={{
                                    padding: '6px 10px',
                                    borderRadius: 'var(--radius-lg)',
                                    background: 'rgba(16, 185, 129, 0.2)',
                                    border: '1px solid rgba(52, 211, 153, 0.3)',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(52, 211, 153, 0.3)',
                                  }}
                                >
                                  <div style={{ textAlign: 'right' }}>
                                    <p style={{ 
                                      fontSize: '18px', 
                                      fontWeight: '700',
                                      color: '#6ee7b7',
                                      lineHeight: '1',
                                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                                    }}>
                                      {card.previewData.value}
                                    </p>
                                    <p style={{ 
                                      fontSize: '9px', 
                                      color: 'rgba(110, 231, 183, 0.85)',
                                      marginTop: '2px',
                                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                                    }}>
                                      {card.previewData.sqft} sq ft
                                    </p>
                                  </div>
                                </motion.div>
                              )}

                              {/* User Preview */}
                              {card.type === 'user' && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: index * 0.1 + 0.3 }}
                                  className="backdrop-blur-md flex items-center justify-center"
                                  style={{
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.4) 0%, rgba(167, 139, 250, 0.3) 100%)',
                                    border: '2px solid rgba(167, 139, 250, 0.5)',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(167, 139, 250, 0.4)',
                                  }}
                                >
                                  <p style={{ 
                                    fontSize: '16px', 
                                    fontWeight: '700',
                                    color: '#ddd6fe',
                                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                                  }}>
                                    {card.previewData.initials}
                                  </p>
                                </motion.div>
                              )}
                            </div>
                          )}
                            </motion.div>

                            {/* BACK SIDE */}
                            <motion.div
                              onClick={() => toggleCardFlip(card.id)}
                              className="relative overflow-hidden"
                              style={{
                                width: '100%',
                                minHeight: '90px',
                                borderRadius: 'var(--radius-xl)',
                                background: `linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%)`,
                                border: `2px solid ${card.color}`,
                                boxShadow: `
                                  0 20px 60px -10px rgba(0, 0, 0, 0.9),
                                  0 10px 30px -5px ${card.color}60,
                                  0 5px 15px -3px ${card.color}40,
                                  0 0 0 1px ${card.color}30,
                                  inset 0 2px 4px rgba(255, 255, 255, 0.1),
                                  0 0 40px ${card.color}20
                                `,
                                padding: 'var(--spacing-4)',
                                position: 'absolute',
                                backfaceVisibility: 'hidden',
                                transform: 'rotateY(180deg)',
                                cursor: 'pointer',
                              }}
                            >
                              {/* Gradient overlay */}
                              <div
                                className="absolute inset-0 opacity-30"
                                style={{
                                  background: `radial-gradient(circle at top right, ${card.color}40, transparent 70%)`,
                                  pointerEvents: 'none',
                                }}
                              />
                              
                              {/* Content */}
                              <div className="relative z-10" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
                                {/* Header */}
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-2)' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                                    <div
                                      style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: 'var(--radius-lg)',
                                        backgroundColor: `${card.color}20`,
                                        border: `1px solid ${card.color}40`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                      }}
                                    >
                                      <IconComponent size={18} style={{ color: card.color }} />
                                    </div>
                                    <h4 style={{ 
                                      fontSize: 'var(--text-sm)', 
                                      color: 'white',
                                      fontWeight: '600'
                                    }}>
                                      {backData.title}
                                    </h4>
                                  </div>
                                  <span style={{ 
                                    fontSize: '11px', 
                                    color: 'rgba(255, 255, 255, 0.4)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                  }}>
                                    Tap to flip
                                  </span>
                                </div>

                                {/* Data Grid */}
                                <div style={{ 
                                  display: 'grid', 
                                  gridTemplateColumns: 'repeat(2, 1fr)', 
                                  gap: 'var(--spacing-2)',
                                  marginBottom: 'var(--spacing-2)'
                                }}>
                                  {backData.items.slice(0, 4).map((item, idx) => (
                                    <div 
                                      key={idx}
                                      style={{
                                        padding: 'var(--spacing-2)',
                                        borderRadius: 'var(--radius-md)',
                                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                      }}
                                    >
                                      <p style={{ 
                                        fontSize: '10px', 
                                        color: 'rgba(255, 255, 255, 0.5)',
                                        marginBottom: '2px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                      }}>
                                        {item.label}
                                      </p>
                                      <p style={{ 
                                        fontSize: '13px', 
                                        color: 'white',
                                        fontWeight: '600'
                                      }}>
                                        {item.value}
                                      </p>
                                      {item.sublabel && (
                                        <p style={{ 
                                          fontSize: '10px', 
                                          color: `${card.color}`,
                                          marginTop: '2px'
                                        }}>
                                          {item.sublabel}
                                        </p>
                                      )}
                                    </div>
                                  ))}
                                </div>

                                {/* View Details Button */}
                                {card.type !== 'custom' && onNavigate && (
                                  <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onNavigate(card.screen);
                                      setShowAttachmentCards(false);
                                    }}
                                    style={{
                                      width: '100%',
                                      padding: 'var(--spacing-2)',
                                      borderRadius: 'var(--radius-lg)',
                                      background: `linear-gradient(135deg, ${card.color}60 0%, ${card.color}40 100%)`,
                                      border: `1px solid ${card.color}`,
                                      color: 'white',
                                      fontSize: 'var(--text-sm)',
                                      fontWeight: '600',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      gap: 'var(--spacing-2)',
                                      cursor: 'pointer',
                                      boxShadow: `0 4px 12px ${card.color}30`,
                                    }}
                                  >
                                    <span>View Full Details</span>
                                    <ArrowRight size={16} />
                                  </motion.button>
                                )}

                                {/* Custom card upload button */}
                                {card.type === 'custom' && (
                                  <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // Handle custom context upload
                                    }}
                                    style={{
                                      width: '100%',
                                      padding: 'var(--spacing-2)',
                                      borderRadius: 'var(--radius-lg)',
                                      background: `linear-gradient(135deg, ${card.color}60 0%, ${card.color}40 100%)`,
                                      border: `2px dashed ${card.color}`,
                                      color: 'white',
                                      fontSize: 'var(--text-sm)',
                                      fontWeight: '600',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      gap: 'var(--spacing-2)',
                                      cursor: 'pointer',
                                    }}
                                  >
                                    <Upload size={16} />
                                    <span>Upload Context</span>
                                  </motion.button>
                                )}
                              </div>
                            </motion.div>
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div
            className="absolute left-0 right-0 flex items-center"
            style={{
              bottom: 'var(--spacing-5)',
              paddingLeft: 'var(--spacing-6)',
              paddingRight: 'var(--spacing-6)',
              gap: 'var(--spacing-2)',
              zIndex: 100,
            }}
          >
            {/* Input Container - Pill shape with PA logo inside on left */}
            <div
              className="relative flex items-center backdrop-blur-sm"
              style={{
                flex: 1,
                height: '50px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '44px',
                paddingLeft: '56px', // Space for PA logo
                paddingRight: '52px', // Space for send/mic button
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
              }}
            >
              {/* PA Logo Icon - Inside left of input */}
              <button
                onClick={onBack}
                className="absolute flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                style={{
                  left: '5px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
                  zIndex: 10,
                  cursor: 'pointer',
                }}
              >
                <img 
                  src={policyAngelLogo}
                  alt="PolicyAngel"
                  style={{ width: '32px', height: '32px', pointerEvents: 'none' }}
                />
              </button>

              {/* Text Input */}
              <input
                type="text"
                placeholder="Ask anything"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isSending}
                className="flex-1 bg-transparent border-0 outline-none"
                style={{
                  height: '50px',
                  fontSize: 'var(--text-base)',
                  color: 'var(--text-primary)',
                  paddingLeft: '0',
                  paddingRight: '0',
                }}
              />

              {/* Send/Mic button inside input on right */}
              <button
                onClick={sendMessage}
                disabled={!inputText.trim() || isSending}
                className="absolute flex items-center justify-center transition-all active:scale-95"
                style={{
                  right: '6px',
                  width: '40px',
                  height: '40px',
                  opacity: !inputText.trim() || isSending ? 0.5 : 1,
                }}
              >
                {isSending ? (
                  <div 
                    className="animate-spin"
                    style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderTopColor: 'var(--text-primary)',
                      borderRadius: '50%',
                    }}
                  />
                ) : inputText.trim() ? (
                  <Send className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
                ) : (
                  <Mic className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
                )}
              </button>
            </div>

            {/* Document Upload button - Separate icon outside */}
            <button
              onClick={() => {
                setShowAttachmentCards(!showAttachmentCards);
              }}
              className="backdrop-blur-sm transition-all hover:scale-105 active:scale-95 relative"
              style={{
                width: '50px',
                height: '50px',
                borderRadius: 'var(--radius-xl)',
                backgroundColor: showAttachmentCards ? 'rgba(212, 175, 55, 0.3)' : 'rgba(255, 255, 255, 0.2)',
                border: showAttachmentCards ? '1px solid rgba(212, 175, 55, 0.6)' : '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: showAttachmentCards 
                  ? '0 4px 12px rgba(212, 175, 55, 0.4), 0 0 20px rgba(212, 175, 55, 0.3)' 
                  : '0 4px 12px rgba(0, 0, 0, 0.25)',
              }}
            >
              <div className="flex items-center justify-center w-full h-full">
                <Paperclip 
                  className="w-6 h-6" 
                  style={{ 
                    color: showAttachmentCards ? '#D4AF37' : 'var(--text-primary)',
                    filter: showAttachmentCards ? 'drop-shadow(0 0 4px rgba(212, 175, 55, 0.6))' : 'none',
                  }} 
                />
              </div>
            </button>
          </div>
        </>
      )}
    </div>
  );
}