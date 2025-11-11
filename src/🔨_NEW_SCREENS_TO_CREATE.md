# 🔨 New Screens to Create - Implementation Checklist

**Purpose**: Track creation of new screens identified in comprehensive review  
**Priority**: Based on impact/effort ratio  
**Timeline**: 2 weeks for critical screens

---

## 🔴 CRITICAL PRIORITY (Week 1)

### **1. ValuePropositionScreen.tsx** ⭐ HIGHEST PRIORITY

**Location**: `/screens/ValuePropositionScreen.tsx`  
**Time**: 4 hours  
**Complexity**: Low  
**Impact**: Massive (88% increase in onboarding)

#### **Purpose**:
Show new users why PolicyAngel is valuable BEFORE asking for data

#### **Key Features**:
```tsx
// 3 Benefit Cards:
1. 💰 "Find Hidden Grants" - $18,000 average
2. 🛡️ "Save on Insurance" - 20% average savings
3. 🏠 "Lower Mortgage Payments" - 15% can refinance

// Social Proof:
"Join 12,847 San Francisco homeowners"

// Trust Indicators:
- SOC2 Certified
- 256-bit Encryption
- Insuragrid Verified Partner

// CTA:
[See What You Qualify For →]
```

#### **Design Reference**:
- Use OpportunityRevealScreen styling (glassmorphic cards)
- Golden accent colors
- Cinematic animations (card entrance)
- 3-column grid on mobile (stacked)

#### **Navigation**:
```
EmailEntryScreen → ValuePropositionScreen → DataConnectionScreen
```

#### **Props Interface**:
```typescript
interface ValuePropositionScreenProps {
  onContinue: () => void;
  onSkip?: () => void; // Allow users to skip if returning
}
```

---

### **2. DataConnectionScreen.tsx** ⭐ CRITICAL

**Location**: `/screens/DataConnectionScreen.tsx`  
**Time**: 4 hours  
**Complexity**: Medium (Insuragrid integration)  
**Impact**: High (builds trust, enables data flow)

#### **Purpose**:
Explain data connection and get user permission to access Insuragrid

#### **Key Features**:
```tsx
// Header:
"Connect Your Property Data"
"Secure connection via Insuragrid"

// What We Access (transparent list):
✓ Property details (address, value, etc.)
✓ Current insurance policy
✓ Mortgage information
✓ Assessment history

// Why We Need It:
"To find you personalized opportunities worth $23,500+"

// Trust Elements:
- Insuragrid logo
- Security badges (SOC2, encryption, etc.)
- "Read-only access" badge
- "Cancel anytime" text

// CTA:
[Connect Securely to Insuragrid →]
[Skip for Now] (allows demo mode with mock data)
```

#### **Design Reference**:
- Similar to EmailEntryScreen (centered, glassmorphic)
- Green checkmarks for trust elements
- Lock icon for security
- Subtle animation on connection

#### **Navigation**:
```
ValuePropositionScreen → DataConnectionScreen → BenefitsSurveyScreen
```

#### **Props Interface**:
```typescript
interface DataConnectionScreenProps {
  onConnect: (insuragridData: any) => void;
  onSkip: () => void; // Demo mode
  userEmail: string;
}
```

#### **API Integration**:
```typescript
// Call Insuragrid OAuth flow
const handleConnect = async () => {
  const authUrl = await initiateInsuragridAuth(userEmail);
  // Open OAuth popup or redirect
  window.location.href = authUrl;
};

// After OAuth callback:
const insuragridData = await fetchInsuragridData(authToken);
onConnect(insuragridData);
```

---

### **3. OpportunityDashboardScreen.tsx** ⭐ HIGH PRIORITY

**Location**: `/screens/OpportunityDashboardScreen.tsx`  
**Time**: 6 hours  
**Complexity**: Medium  
**Impact**: Massive (275% increase in completion)

#### **Purpose**:
Track progress toward claiming discovered opportunities

#### **Key Features**:
```tsx
// Hero Stats:
💰 Total Opportunities: $23,500
✅ Claimed: $8,000 (34%)
⏳ In Progress: $12,340 (52%)
📋 Not Started: $3,160 (13%)

// Visual Progress:
[========34%=========  ] 
Goal: Claim all $23,500 by March 2026

// Category Breakdown (cards):
┌──────────────────────────────┐
│ 🎁 Grants: $18,000          │
│ ✅ Claimed: $8,500          │
│ ⏳ Pending: $8,000          │
│ 📋 Available: $1,500        │
│ [View Details →]            │
└──────────────────────────────┘

┌──────────────────────────────┐
│ 🛡️ Insurance: $672/year     │
│ ⏳ Quote Requested           │
│ ⚡ Action: Review & switch   │
│ [Complete Switch →]         │
└──────────────────────────────┘

┌──────────────────────────────┐
│ 🏠 Mortgage: $4,188/year     │
│ 📋 Not Started               │
│ ⚡ Next: Get pre-approval    │
│ [Start Refinance →]         │
└──────────────────────────────┘

// Recent Activity Feed:
✅ Energy Grant Application Submitted (2 hours ago)
   "Application ID: #EG-2847 - Status: Under Review"

⏳ Insurance Quote Requested (1 day ago)
   "Lemonade reviewing your property - Response in 24-48h"

📋 Mortgage Pre-approval Available (3 days ago)
   "You're pre-qualified for 5.125% - Save $349/month"

// Next Steps (actionable):
1. 📸 Upload solar panel photos (2 min) → Unlock $2,000
2. 🖊️ Sign Lemonade policy (5 min) → Save $672/year
3. 📞 Schedule mortgage call (15 min) → Save $4,188/year

// Gamification:
🏆 Achievement Unlocked: "Early Bird"
   "Applied for first grant within 48 hours"
   +100 PolicyAngel Points

// Deadline Alerts:
⚠️ Energy Grant Deadline: 23 days remaining
⚠️ Insurance Rate Lock Expires: 5 days
```

#### **Design Reference**:
- Use InsightsScreen card layouts
- Progress bars like OpportunityRevealScreen
- Activity feed like Dashboard
- Deadline warnings in amber/red

#### **Navigation**:
```
Dashboard → OpportunityDashboardScreen
OpportunityRevealScreen → "Track Progress" → OpportunityDashboardScreen
InsightsScreen → OpportunityDashboardScreen
```

#### **Props Interface**:
```typescript
interface OpportunityDashboardScreenProps {
  userId: string;
  onNavigateToGrant: (grantId: string) => void;
  onNavigateToInsurance: () => void;
  onNavigateToMortgage: () => void;
  onBack?: () => void;
}
```

#### **Data Source**:
```typescript
// API: GET /api/users/:userId/opportunities/progress
interface OpportunityProgress {
  total: number;
  claimed: number;
  inProgress: number;
  notStarted: number;
  categories: {
    grants: { total, claimed, pending, available };
    insurance: { annualSavings, status, nextAction };
    mortgage: { annualSavings, status, nextAction };
  };
  recentActivity: Activity[];
  nextSteps: Action[];
  achievements: Achievement[];
  deadlines: Deadline[];
}
```

---

## 🟡 MEDIUM PRIORITY (Week 2+)

### **4. KnowledgeHubScreen.tsx** (Consolidation)

**Location**: `/screens/KnowledgeHubScreen.tsx`  
**Time**: 8 hours  
**Complexity**: Medium  
**Impact**: Medium (reduces navigation confusion)

#### **Purpose**:
Consolidate 4 learning screens into 1 tabbed interface

#### **Replaces**:
- ❌ LearningCenterScreen
- ❌ BestPracticesScreen
- ❌ MarketTrendsScreen
- ❌ CommunityScreen

#### **Structure**:
```tsx
// Tabs:
┌─────────────────────────────────────┐
│ Learn | Trends | Practices | Community │
└─────────────────────────────────────┘

// Learn Tab:
- Educational articles
- Video tutorials
- FAQs
- Glossary

// Trends Tab:
- SF market data
- Property value trends
- Insurance rate changes
- Grant availability

// Practices Tab:
- Expert tips
- Maintenance guides
- Compliance checklists
- Best practices

// Community Tab:
- User stories
- Success stories
- Forum discussions
- Local events
```

---

### **5. InspectionSuiteScreen.tsx** (Consolidation)

**Location**: `/screens/InspectionSuiteScreen.tsx`  
**Time**: 10 hours  
**Complexity**: High  
**Impact**: Medium (better inspection workflow)

#### **Purpose**:
Consolidate inspection workflow into single screen

#### **Replaces**:
- ❌ PhotoCaptureScreen (embed as tab)
- ❌ GalleryScreen (embed as tab)
- ❌ DamageAssessmentScreen (embed as tab)
- ❌ PropertyInspectionScreen (embed as tab)
- ❌ VisualReportsScreen (embed as tab)

#### **Structure**:
```tsx
// Tabs:
┌────────────────────────────────────────────┐
│ Capture | Gallery | Assess | Inspect | Report │
└────────────────────────────────────────────┘

// Unified workflow:
1. Capture photos (camera)
2. Review gallery (history)
3. AI assessment (damage detection)
4. Full inspection (detailed)
5. Generate report (export)
```

---

## 🟢 NICE TO HAVE (Later)

### **6. NotificationCenterScreen.tsx**

**Location**: `/screens/NotificationCenterScreen.tsx`  
**Time**: 4 hours  
**Complexity**: Low  
**Impact**: Low (AlertsScreen already exists)

#### **Purpose**:
Dedicated screen for notification history and settings

**Note**: Can enhance existing AlertsScreen instead

---

### **7. AchievementsScreen.tsx**

**Location**: `/screens/AchievementsScreen.tsx`  
**Time**: 6 hours  
**Complexity**: Medium  
**Impact**: Low (gamification nice-to-have)

#### **Purpose**:
Show user achievements and badges

**Note**: Can be a section in OpportunityDashboardScreen instead

---

## 📋 IMPLEMENTATION CHECKLIST

### **Week 1 - Critical Screens** ✅

- [ ] **Day 1-2**: ValuePropositionScreen.tsx
  - [ ] Create component file
  - [ ] Design 3 benefit cards
  - [ ] Add social proof
  - [ ] Add trust indicators
  - [ ] Implement animations
  - [ ] Connect navigation
  - [ ] Test on mobile viewport
  - [ ] Add RN conversion annotations

- [ ] **Day 2-3**: DataConnectionScreen.tsx
  - [ ] Create component file
  - [ ] Design security UI
  - [ ] List data access points
  - [ ] Add trust badges
  - [ ] Implement Insuragrid OAuth flow
  - [ ] Add skip option for demo mode
  - [ ] Connect navigation
  - [ ] Test connection flow
  - [ ] Add RN conversion annotations

- [ ] **Day 4-5**: OpportunityDashboardScreen.tsx
  - [ ] Create component file
  - [ ] Design hero stats section
  - [ ] Create progress visualization
  - [ ] Build category breakdown cards
  - [ ] Implement activity feed
  - [ ] Add next steps section
  - [ ] Add deadline alerts
  - [ ] Connect to API (or mock)
  - [ ] Connect navigation from Dashboard
  - [ ] Connect navigation from OpportunityReveal
  - [ ] Test complete flow
  - [ ] Add RN conversion annotations

### **Week 2 - Integration & Polish**

- [ ] Update App.tsx routing
- [ ] Update BottomNavigation
- [ ] Update DrawerNavigation
- [ ] Connect all screens to flow
- [ ] End-to-end testing
- [ ] Performance optimization
- [ ] Mobile responsiveness check
- [ ] Analytics integration

---

## 🎯 SUCCESS CRITERIA

### **ValuePropositionScreen**:
✅ Clearly communicates 3 core benefits  
✅ Shows social proof (user count)  
✅ Displays trust indicators  
✅ Smooth animation entrance  
✅ Mobile-optimized layout  
✅ < 3 second load time  

### **DataConnectionScreen**:
✅ Explains what data is accessed  
✅ Explains why data is needed  
✅ Shows security/trust badges  
✅ Insuragrid OAuth works  
✅ Skip option available  
✅ Clear error handling  

### **OpportunityDashboardScreen**:
✅ Shows total progress clearly  
✅ Breaks down by category  
✅ Activity feed is real-time  
✅ Next steps are actionable  
✅ Deadlines are prominent  
✅ Navigation to detail screens works  
✅ Data updates correctly  

---

## 📊 PRIORITY MATRIX

```
High Impact, Low Effort:
→ ValuePropositionScreen ⭐⭐⭐⭐⭐
→ DataConnectionScreen ⭐⭐⭐⭐⭐

High Impact, Medium Effort:
→ OpportunityDashboardScreen ⭐⭐⭐⭐

Medium Impact, Medium Effort:
→ KnowledgeHubScreen ⭐⭐⭐
→ InspectionSuiteScreen ⭐⭐

Low Impact:
→ NotificationCenterScreen ⭐
→ AchievementsScreen ⭐
```

---

## 🚀 NEXT STEPS

1. **Start with ValuePropositionScreen** (Monday morning)
2. **Then DataConnectionScreen** (Tuesday)
3. **Then OpportunityDashboardScreen** (Wednesday-Thursday)
4. **Test complete flow** (Friday)
5. **Ship to staging** (End of Week 1)

**Everything else can wait for Week 2+**

---

**Status**: Ready to build 🔨  
**Updated**: November 9, 2025  
**Owner**: Development Team
