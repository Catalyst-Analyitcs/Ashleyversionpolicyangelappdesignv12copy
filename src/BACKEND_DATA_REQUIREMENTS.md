# Backend Data Requirements - Complete List

This document catalogs ALL hardcoded data in the PolicyAngel app that needs to be replaced with real backend API calls.

---

## 🏠 Properties Data

### Location: Multiple screens (PropertiesScreen, PropertyDetailsScreen, LuxuryDashboard)

### Current Hardcoded Data:
```typescript
// 15+ mock properties with San Francisco addresses
const properties = [
  {
    id: "1",
    address: "742 Evergreen Terrace, Pacific Heights",
    city: "San Francisco, CA",
    value: "$2.8M",
    lastInspected: "2 weeks ago",
    status: "active",
    badge: "Premium",
  },
  {
    id: "2", 
    address: "1234 Lombard Street, Russian Hill",
    city: "San Francisco, CA",
    value: "$3.2M",
    // ...
  },
  // ... 13 more properties
];
```

### API Endpoint Needed:
```
GET /api/properties?userId={userId}
POST /api/properties
GET /api/properties/{propertyId}
PATCH /api/properties/{propertyId}
DELETE /api/properties/{propertyId}
```

### Data Fields Required:
- Property ID (unique identifier)
- Address (street, city, state, ZIP)
- GPS Coordinates (latitude, longitude)
- Property value (estimated market value)
- Last inspection date
- Property status (active, inactive, pending)
- Badge/tier (Premium, Standard, etc.)
- Property type (Single Family, Condo, etc.)
- Images (primary photo, gallery)
- Square footage, beds, baths
- Year built
- Lot size
- HOI carrier and policy number
- Coverage amount
- Premium amount
- Deductible
- Policy expiration date
- Risk assessment scores (fire, flood, earthquake)

---

## 🌤️ Weather Data

### Location: WeatherScreen, LiquidGlassHeader, LuxuryDashboard

### Current Hardcoded Data:
```typescript
const weatherData = {
  temperature: "72",
  unit: "°F",
  displayValue: "72°",
  label: "Sunny",
  condition: "clear",
  severity: "safe",
};

// 7-day forecast
const forecast = [
  { day: "Mon", high: 75, low: 62, condition: "sunny" },
  { day: "Tue", high: 73, low: 61, condition: "cloudy" },
  // ... 5 more days
];

// Hourly forecast
const hourlyForecast = [
  { time: "12 PM", temp: 72, condition: "sunny" },
  { time: "1 PM", temp: 73, condition: "sunny" },
  // ... 23 more hours
];
```

### API Endpoint Needed:
```
GET /api/weather/current?location={location}
GET /api/weather/forecast?location={location}&days=7
GET /api/weather/hourly?location={location}&hours=24
GET /api/weather/alerts?location={location}
```

### Data Fields Required:
- Current temperature (Fahrenheit)
- Feels like temperature
- Condition (sunny, cloudy, rainy, etc.)
- Condition code (for icon mapping)
- Humidity percentage
- Wind speed and direction
- UV index
- Pressure
- Visibility
- Sunrise/sunset times
- Air quality index
- 7-day forecast (daily highs/lows)
- 24-hour forecast (hourly)
- Weather alerts (severity, description, expiration)
- Location (city, state)

### Third-Party Integration Options:
- OpenWeatherMap API
- WeatherAPI.com
- National Weather Service API (free for US)

---

## 💬 Chat / AI Assistant Data

### Location: AngelFunctionsScreen

### Current Hardcoded Data:
```typescript
// Initial greeting message
const messages = [
  {
    id: '1',
    type: 'assistant',
    content: 'Hello! I\'m your Policy Angel...',
    timestamp: new Date(),
  }
];

// Conversation history
const conversationHistory = [
  { 
    id: '1', 
    title: 'Property Inspection Help', 
    preview: 'Can you help me schedule a drone...', 
    timestamp: new Date(Date.now() - 86400000), 
    messageCount: 12 
  },
  { 
    id: '2', 
    title: 'Claim Status Update', 
    preview: 'What\'s the status of my recent claim...', 
    timestamp: new Date(Date.now() - 172800000), 
    messageCount: 8 
  },
  // ... 4 more conversations
];

// Quick suggestions
const quickSuggestions = [
  "Schedule property inspection",
  "Check claim status",
  "Review my policy coverage",
  "File a new claim",
  "Apply for resilience grant",
  // ... 13 more suggestions
];

// Chat types
const chatTypes = [
  { id: 'claims', title: 'Claims Assistance', description: 'File and track insurance claims', icon: FileCheck, color: '#60a5fa' },
  { id: 'policy', title: 'Policy Questions', description: 'Get help with your insurance policy', icon: Shield, color: '#34d399' },
  { id: 'inspection', title: 'Property Inspection', description: 'Schedule and manage inspections', icon: Home, color: '#f59e0b' },
  { id: 'emergency', title: 'Emergency Support', description: '24/7 urgent assistance', icon: Zap, color: '#ef4444' },
];

// Saved messages
const savedMessages = [
  { 
    id: '1', 
    content: 'Your property inspection is scheduled for March 15th at 2:00 PM...', 
    timestamp: new Date(Date.now() - 86400000), 
    category: 'Inspection' 
  },
  // ... 2 more saved messages
];
```

### API Endpoint Needed:
```
GET  /api/chat/conversations?userId={userId}
POST /api/chat/conversations
GET  /api/chat/conversations/{conversationId}/messages
POST /api/chat/messages
POST /api/chat/messages/{messageId}/bookmark
DELETE /api/chat/messages/{messageId}/bookmark
GET  /api/chat/suggestions
POST /api/chat/voice
```

### Data Fields Required:
- Conversation ID
- Conversation title (auto-generated or user-set)
- Message ID
- Message type (user or assistant)
- Message content (text)
- Timestamp
- Bookmark status
- Message metadata (intent, confidence, resources)
- Quick suggestions list
- Chat categories/types
- Voice input support

### AI Integration Options:
- OpenAI GPT-4 API
- Anthropic Claude API
- Custom fine-tuned model
- LangChain for conversation management

---

## 📄 Documents Data

### Location: DocumentsScreen, LuxuryDashboard

### Current Hardcoded Data:
```typescript
const documents = [
  {
    id: '1',
    name: 'Home Insurance Policy - 2024',
    type: 'policy',
    size: '2.4 MB',
    uploadDate: '2024-01-15',
    category: 'Insurance',
    thumbnail: '/doc-thumb.png',
  },
  {
    id: '2',
    name: 'Roof Inspection Report',
    type: 'inspection',
    size: '1.8 MB',
    uploadDate: '2024-10-20',
    category: 'Inspections',
  },
  // ... more documents
];

const categories = [
  'Insurance Policies',
  'Inspection Reports',
  'Receipts',
  'Claims',
  'Photos',
  'Other',
];
```

### API Endpoint Needed:
```
GET    /api/documents?userId={userId}
GET    /api/documents/{documentId}
POST   /api/documents/upload
DELETE /api/documents/{documentId}
GET    /api/documents/{documentId}/download
POST   /api/documents/{documentId}/share
GET    /api/documents/categories
PATCH  /api/documents/{documentId}
```

### Data Fields Required:
- Document ID
- Document name/title
- File type (PDF, image, etc.)
- File size
- Upload date
- Category/tag
- Thumbnail URL
- Download URL
- Share link (temporary, expiring)
- Property ID (if property-specific)
- User ID
- Access permissions

### File Storage Options:
- AWS S3
- Google Cloud Storage
- Azure Blob Storage
- Cloudinary (for images)

---

## 📅 Calendar & Events Data

### Location: CalendarScreen, LuxuryDashboard

### Current Hardcoded Data:
```typescript
const upcomingEvents = [
  {
    id: '1',
    title: 'Roof Inspection',
    date: '2024-03-15',
    time: '2:00 PM',
    type: 'inspection',
    property: '742 Evergreen Terrace',
    status: 'scheduled',
  },
  {
    id: '2',
    title: 'Policy Renewal',
    date: '2024-04-01',
    type: 'policy',
    property: '742 Evergreen Terrace',
    status: 'upcoming',
  },
  {
    id: '3',
    title: 'Gutter Maintenance',
    date: '2024-03-22',
    time: '10:00 AM',
    type: 'maintenance',
    property: '1234 Lombard Street',
    status: 'scheduled',
  },
];
```

### API Endpoint Needed:
```
GET    /api/calendar/events?userId={userId}&start={startDate}&end={endDate}
POST   /api/calendar/events
GET    /api/calendar/events/{eventId}
PATCH  /api/calendar/events/{eventId}
DELETE /api/calendar/events/{eventId}
GET    /api/calendar/upcoming?userId={userId}&limit=5
```

### Data Fields Required:
- Event ID
- Event title
- Event date (ISO format)
- Event time
- Event type (inspection, maintenance, policy, claim, etc.)
- Property ID
- Status (scheduled, completed, cancelled)
- Description
- Reminder settings
- Recurrence rules (if recurring)
- Attendees/participants
- Location/address
- Notes

---

## 💰 Grants Data

### Location: GrantsScreen, LuxuryDashboard

### Current Hardcoded Data:
```typescript
const grants = [
  {
    id: '1',
    name: 'California Earthquake Retrofit Grant',
    amount: '$5,000 - $50,000',
    deadline: 'April 30, 2025',
    status: 'open',
    eligibility: 'Homeowners in high-risk zones',
    description: 'Funding for seismic retrofitting...',
    requirements: [
      'Proof of ownership',
      'Inspection report',
      'Contractor estimates',
    ],
  },
  {
    id: '2',
    name: 'Fire Resilience Grant Program',
    amount: 'Up to $10,000',
    deadline: 'June 15, 2025',
    status: 'open',
    // ...
  },
  // ... more grants
];

const applications = [
  {
    id: 'app-1',
    grantId: '1',
    grantName: 'California Earthquake Retrofit Grant',
    submittedDate: '2024-02-10',
    status: 'under review',
    estimatedDecision: '2024-03-15',
  },
];
```

### API Endpoint Needed:
```
GET  /api/grants?location={location}&status=open
GET  /api/grants/{grantId}
POST /api/grants/applications
GET  /api/grants/applications?userId={userId}
GET  /api/grants/applications/{applicationId}
PATCH /api/grants/applications/{applicationId}
GET  /api/grants/eligibility?propertyId={propertyId}
```

### Data Fields Required:
- Grant ID
- Grant name
- Funding amount (min/max)
- Application deadline
- Grant status (open, closed, upcoming)
- Eligibility criteria
- Description
- Requirements list
- Application process steps
- Contact information
- Application ID
- User ID
- Property ID
- Submission date
- Application status (draft, submitted, under review, approved, denied)
- Decision date
- Funding amount awarded

---

## 🎨 Gallery & Photos Data

### Location: GalleryScreen, PhotoCaptureScreen, PropertyDetailsScreen

### Current Hardcoded Data:
```typescript
const photos = [
  {
    id: '1',
    uri: 'https://example.com/photo1.jpg',
    thumbnail: 'https://example.com/photo1-thumb.jpg',
    takenDate: '2024-11-05',
    location: '742 Evergreen Terrace',
    propertyId: 'prop-1',
    category: 'exterior',
    tags: ['roof', 'damage', 'inspection'],
  },
  {
    id: '2',
    uri: 'https://example.com/photo2.jpg',
    takenDate: '2024-11-04',
    category: 'interior',
    tags: ['kitchen', 'renovation'],
  },
  // ... more photos
];

const albums = [
  {
    id: 'album-1',
    name: 'Roof Inspection - March 2024',
    coverPhoto: 'photo-id-1',
    photoCount: 15,
    createdDate: '2024-03-15',
  },
];
```

### API Endpoint Needed:
```
GET    /api/gallery/photos?userId={userId}&propertyId={propertyId}
POST   /api/gallery/upload
GET    /api/gallery/photos/{photoId}
DELETE /api/gallery/photos/{photoId}
PATCH  /api/gallery/photos/{photoId} (for tags, category)
GET    /api/gallery/albums?userId={userId}
POST   /api/gallery/albums
GET    /api/gallery/albums/{albumId}/photos
```

### Data Fields Required:
- Photo ID
- Photo URL (full size)
- Thumbnail URL
- Upload/taken date
- Property ID
- Category (exterior, interior, damage, repair, etc.)
- Tags (searchable)
- GPS coordinates (if available)
- EXIF data
- User ID
- Album ID
- File size
- Dimensions (width/height)

---

## 📊 Dashboard Metrics Data

### Location: LuxuryDashboard

### Current Hardcoded Data:
```typescript
// Quick Actions
const quickActions = [
  { id: 'inspect', title: 'Schedule Inspection', icon: 'calendar-check', count: 3 },
  { id: 'claim', title: 'File Claim', icon: 'file-text' },
  { id: 'policy', title: 'View Policy', icon: 'shield', badge: 'Expires Soon' },
  { id: 'documents', title: 'Documents', icon: 'folder', count: 12 },
  { id: 'emergency', title: 'Emergency', icon: 'alert-circle' },
  { id: 'grants', title: 'Grants', icon: 'dollar-sign', badge: 'New' },
];

// Property Status Cards
const statusCards = [
  { label: 'Coverage', value: '$450K', status: 'active', icon: 'shield' },
  { label: 'Premium', value: '$2,400/yr', status: 'due', icon: 'dollar-sign', dueDate: 'Mar 15' },
  { label: 'Deductible', value: '$2,500', status: 'normal', icon: 'info' },
  { label: 'Next Inspection', value: 'Mar 15', status: 'upcoming', icon: 'calendar' },
];

// Recent Activities
const activities = [
  { 
    id: '1', 
    title: 'Roof inspection completed', 
    description: '742 Evergreen Terrace',
    date: '2 days ago', 
    icon: 'check-circle',
    type: 'inspection',
  },
  { 
    id: '2', 
    title: 'Policy renewed', 
    description: 'State Farm - #SF-12345',
    date: '1 week ago', 
    icon: 'shield',
    type: 'policy',
  },
  { 
    id: '3', 
    title: 'Document uploaded', 
    description: 'Roof Inspection Report.pdf',
    date: '2 weeks ago', 
    icon: 'file-text',
    type: 'document',
  },
];
```

### API Endpoint Needed:
```
GET /api/dashboard/metrics?userId={userId}
GET /api/dashboard/quick-actions?userId={userId}
GET /api/dashboard/activities?userId={userId}&limit=10
GET /api/dashboard/status?propertyId={propertyId}
```

### Data Fields Required:
- Quick action items (title, icon, badge, count)
- Property metrics (coverage, premium, deductible)
- Next scheduled events
- Recent activity feed (title, description, timestamp, type, icon)
- Notifications/alerts count
- Overdue items count

---

## 👥 Agents & Services Data

### Location: FindAgentsScreen, LocateServicesScreen

### Current Hardcoded Data:
```typescript
const agents = [
  {
    id: '1',
    name: 'Sarah Johnson',
    title: 'Senior Insurance Agent',
    company: 'State Farm',
    photo: 'https://example.com/agent1.jpg',
    rating: 4.9,
    reviewCount: 127,
    specialty: 'Home Insurance',
    location: 'San Francisco, CA',
    distance: '2.3 miles',
    phone: '(415) 555-0123',
    email: 'sarah.j@statefarm.com',
  },
  // ... more agents
];

const services = [
  {
    id: '1',
    name: 'Bay Area Roof Inspectors',
    category: 'Inspection',
    rating: 4.8,
    reviewCount: 89,
    location: 'San Francisco, CA',
    distance: '1.5 miles',
    price: '$$',
    availability: 'Next available: Tomorrow',
    photo: 'https://example.com/service1.jpg',
  },
  // ... more services
];
```

### API Endpoint Needed:
```
GET  /api/agents?location={location}&specialty={specialty}
GET  /api/agents/{agentId}
GET  /api/agents/nearby?lat={lat}&lng={lng}&radius={radius}
POST /api/agents/{agentId}/contact
GET  /api/agents/{agentId}/reviews
GET  /api/services?category={category}&location={location}
GET  /api/services/{serviceId}
GET  /api/services/categories
```

### Data Fields Required:
- Agent/Service ID
- Name
- Photo/logo URL
- Company/business name
- Rating (0-5)
- Review count
- Specialty/category
- Location (address, city, state)
- GPS coordinates
- Distance from user
- Contact info (phone, email, website)
- Availability
- Price range
- Certifications/licenses
- Years in business
- Service area

---

## 🏘️ Community Data

### Location: CommunityScreen

### Current Hardcoded Data:
```typescript
const communityPosts = [
  {
    id: '1',
    author: 'Jessica M.',
    authorPhoto: 'https://example.com/user1.jpg',
    neighborhood: 'Pacific Heights',
    title: 'Recommended Roofer',
    content: 'Just had my roof inspected by Bay Area Roofing...',
    timestamp: '2 hours ago',
    likes: 24,
    comments: 7,
    category: 'Recommendations',
  },
  {
    id: '2',
    author: 'Michael T.',
    neighborhood: 'Russian Hill',
    title: 'Storm Damage Warning',
    content: 'Heavy winds expected this weekend...',
    timestamp: '5 hours ago',
    likes: 18,
    comments: 12,
    category: 'Weather Alert',
    isPinned: true,
  },
  // ... more posts
];

const neighborhoods = [
  {
    id: '1',
    name: 'Pacific Heights',
    memberCount: 1247,
    postCount: 89,
    safetyScore: 92,
    averageHomeValue: '$2.5M',
  },
  // ... more neighborhoods
];
```

### API Endpoint Needed:
```
GET  /api/community/posts?neighborhood={neighborhood}
POST /api/community/posts
GET  /api/community/posts/{postId}
GET  /api/community/posts/{postId}/comments
POST /api/community/posts/{postId}/comments
POST /api/community/posts/{postId}/like
GET  /api/community/neighborhoods
GET  /api/community/neighborhoods/{neighborhoodId}
```

### Data Fields Required:
- Post ID
- Author ID, name, photo
- Neighborhood
- Post title
- Post content
- Timestamp
- Likes count
- Comments count
- Category
- Is pinned
- Neighborhood ID, name
- Member count
- Safety score
- Average home value
- Recent activity

---

## 📈 Reports & Insights Data

### Location: ReportsScreen, InsightsScreen, VisualReportsScreen

### Current Hardcoded Data:
```typescript
const insights = [
  {
    id: '1',
    title: 'Fire Risk Increasing',
    description: 'Based on climate data, fire risk in your area has increased 15%',
    severity: 'warning',
    propertyId: 'prop-1',
    recommendations: [
      'Install fire-resistant landscaping',
      'Update insurance coverage',
      'Schedule annual inspection',
    ],
  },
  {
    id: '2',
    title: 'Property Value Trend',
    description: 'Your property value has increased 8.3% year-over-year',
    severity: 'info',
    chartData: [/* historical data */],
  },
];

const riskScores = {
  overall: 85,
  fire: 72,
  flood: 15,
  earthquake: 88,
  theft: 45,
};

const marketTrends = {
  averageHomeValue: {
    current: 2800000,
    change: '+8.3%',
    chartData: [/* monthly data */],
  },
  averagePremium: {
    current: 2400,
    change: '+3.2%',
    chartData: [/* monthly data */],
  },
};
```

### API Endpoint Needed:
```
GET /api/insights/property/{propertyId}
GET /api/insights/risk-assessment?propertyId={propertyId}
GET /api/insights/market-trends?location={location}
GET /api/reports/visual?propertyId={propertyId}&type={type}
GET /api/reports/recommendations?propertyId={propertyId}
```

### Data Fields Required:
- Insight ID
- Title
- Description
- Severity (info, warning, danger)
- Property ID
- Recommendations list
- Risk scores (overall, fire, flood, earthquake, etc.)
- Market trends (value, premium, claims)
- Time series data for charts
- Comparative data (neighborhood average, city average)
- Historical data

---

## 🚨 Alerts & Notifications Data

### Location: AlertsScreen, LiquidGlassHeader

### Current Hardcoded Data:
```typescript
const alerts = [
  {
    id: '1',
    type: 'weather',
    severity: 'warning',
    title: 'High Wind Warning',
    message: 'Winds up to 50 mph expected in your area',
    timestamp: '1 hour ago',
    expiresAt: '2024-11-08T18:00:00Z',
    actionRequired: true,
    actions: [
      { label: 'View Safety Tips', action: 'navigate:best-practices' },
      { label: 'Dismiss', action: 'dismiss' },
    ],
  },
  {
    id: '2',
    type: 'policy',
    severity: 'info',
    title: 'Policy Renewal Reminder',
    message: 'Your policy renews in 30 days',
    timestamp: '2 days ago',
    actionRequired: false,
  },
  {
    id: '3',
    type: 'maintenance',
    severity: 'normal',
    title: 'Inspection Due',
    message: 'Annual roof inspection recommended',
    timestamp: '1 week ago',
  },
];
```

### API Endpoint Needed:
```
GET    /api/alerts?userId={userId}&status=active
GET    /api/alerts/{alertId}
PATCH  /api/alerts/{alertId}/dismiss
POST   /api/alerts/preferences
GET    /api/notifications?userId={userId}
PATCH  /api/notifications/{notificationId}/read
```

### Data Fields Required:
- Alert ID
- Type (weather, policy, claim, maintenance, etc.)
- Severity (info, warning, danger)
- Title
- Message
- Timestamp
- Expiration time
- Action required (boolean)
- Actions list (label, action type)
- Read status
- Dismissed status

---

## 🔐 User Profile Data

### Location: UserPersonaScreen, SettingsScreen

### Current Hardcoded Data:
```typescript
const userProfile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  initials: 'JD',
  phone: '(415) 555-0123',
  location: 'San Francisco, CA',
  photo: 'https://example.com/profile.jpg',
  preferences: {
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    theme: 'dark',
    language: 'en',
  },
  subscription: {
    plan: 'Premium',
    status: 'active',
    renewalDate: '2025-03-15',
  },
};
```

### API Endpoint Needed:
```
GET   /api/user/profile
PATCH /api/user/profile
POST  /api/user/avatar
GET   /api/user/preferences
PATCH /api/user/preferences
GET   /api/user/subscription
```

### Data Fields Required:
- User ID
- Name (first, last)
- Email
- Phone
- Profile photo URL
- Location (address, city, state, ZIP)
- Preferences (notifications, theme, language)
- Subscription info (plan, status, renewal date)
- Account creation date
- Last login

---

## 📊 Summary Statistics

### Total Hardcoded Data Points: ~500+

### By Category:
- **Properties**: 15+ mock properties × 20 fields each = 300+ data points
- **Weather**: 50+ data points (current, forecast, alerts)
- **Chat**: 30+ mock conversations and messages
- **Documents**: 20+ mock documents
- **Calendar**: 15+ mock events
- **Grants**: 10+ mock grants
- **Photos**: 20+ mock images
- **Agents**: 15+ mock agents
- **Services**: 15+ mock service providers
- **Community**: 20+ mock posts
- **Alerts**: 10+ mock alerts
- **Dashboard**: 30+ metrics and activities

### Critical API Endpoints Count: 80+

### Third-Party Services Needed:
1. **Weather API** (OpenWeatherMap, WeatherAPI)
2. **Maps API** (Google Maps, Mapbox)
3. **AI/Chat API** (OpenAI, Anthropic)
4. **File Storage** (AWS S3, Cloudinary)
5. **Push Notifications** (Firebase, OneSignal)
6. **Analytics** (Mixpanel, Amplitude)

---

## 🎯 Implementation Priority

### Phase 1 (MVP - Core Features)
1. ✅ **Authentication** (login, register, token management)
2. ✅ **Properties** (CRUD operations, list view)
3. ✅ **Weather** (current conditions, basic forecast)
4. ✅ **Dashboard** (metrics, quick actions)
5. ✅ **User Profile** (view/edit profile)

### Phase 2 (Key Features)
6. **Calendar** (events, scheduling)
7. **Documents** (upload, view, download)
8. **Alerts** (notifications, push)
9. **Property Details** (deep dive, maps)
10. **Chat** (basic AI assistant)

### Phase 3 (Advanced Features)
11. **Grants** (search, apply)
12. **Gallery** (photo management)
13. **Agents & Services** (directory, contact)
14. **Insights** (risk assessment, trends)
15. **Community** (posts, comments)

### Phase 4 (Nice-to-Have)
16. **Reports** (visual reports, analytics)
17. **Voice Input** (speech-to-text)
18. **Offline Mode** (caching, sync)
19. **Social Features** (sharing, invites)
20. **Advanced AI** (predictions, recommendations)

---

This comprehensive list should give your backend team everything they need to build the API!

