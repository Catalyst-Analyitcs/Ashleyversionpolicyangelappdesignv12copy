# 🎯 How to View New Optimizer Screens

## Quick Access Guide

### 📍 Where to Find the Buttons

**Navigate to the Insights Screen:**
1. Click the **lightbulb icon** (💡) in the bottom navigation
2. You'll see the new optimizer screen buttons right below the golden "View My Opportunities" button

### 🔘 Available Buttons

#### 1. **Insurance Optimizer** (Blue)
- **Icon:** Shield 🛡️
- **Color:** Blue gradient with glassmorphic effect
- **What it does:** Opens the InsuranceOptimizerScreen showing:
  - Current insurance policies
  - AI-powered savings recommendations
  - Competitive quotes from Insuragrid
  - Coverage gap analysis
  - One-click policy switching

#### 2. **Mortgage Optimizer** (Purple)
- **Icon:** Dollar Sign 💵
- **Color:** Purple gradient with glassmorphic effect
- **What it does:** Opens the MortgageOptimizerScreen showing:
  - Current mortgage details
  - Refinancing opportunities
  - Rate comparison
  - Potential savings calculations
  - Personalized recommendations

### 📂 Complete Screen Inventory

Here are all the critical screens available in PolicyAngel:

#### ✅ Completed Screens:

1. **OpportunityRevealScreen** (`/screens/OpportunityRevealScreen.tsx`)
   - The "magic moment" showing $23,500+ in opportunities
   - Access: Shown after email entry or from Insights tab

2. **GrantApplicationScreen** (`/screens/GrantApplicationScreen.tsx`)
   - One-click grant applications
   - Multi-step form with progress tracking
   - Access: From grants list or property details

3. **InsuranceOptimizerScreen** (`/screens/InsuranceOptimizerScreen.tsx`)
   - **NEW!** Insurance savings and optimization
   - Access: Insights tab → Insurance Optimizer button

4. **MortgageOptimizerScreen** (`/screens/MortgageOptimizerScreen.tsx`)
   - **NEW!** Mortgage refinancing opportunities
   - Access: Insights tab → Mortgage Optimizer button

#### 🎨 Visual Design

All optimizer buttons feature:
- **Glassmorphic backdrop blur** for luxury feel
- **Gradient backgrounds** matching screen theme
- **Hover animations** (scale on hover)
- **Click animations** (scale down on tap)
- **Glowing shadows** with colored borders
- **Icon + label layout** for clarity

### 🧭 Navigation Flow

```
Bottom Nav (Insights) 
  → InsightsScreen
    → View My Opportunities → OpportunityRevealScreen
    → Insurance Optimizer → InsuranceOptimizerScreen
    → Mortgage Optimizer → MortgageOptimizerScreen
```

### 💡 Design System Details

**Button Styling:**
- Insurance: `rgba(59, 130, 246, 0.2)` blue gradient
- Mortgage: `rgba(168, 85, 247, 0.2)` purple gradient
- Both use 2px solid borders with 50% opacity
- Box shadows: `0 4px 16px` with 30% opacity glow
- Border radius: `var(--radius-xl)`
- Padding: `var(--spacing-4)`

### 📱 Testing Checklist

- [x] Buttons appear on Insights screen
- [x] Click Insurance Optimizer → opens InsuranceOptimizerScreen
- [x] Click Mortgage Optimizer → opens MortgageOptimizerScreen
- [x] Back buttons return to Insights screen
- [x] No header/bottom nav shown on optimizer screens (full-screen experience)
- [x] Animations work smoothly
- [x] Responsive to different screen sizes

### 🔧 Files Modified

1. `/screens/InsightsScreen.tsx`
   - Added `onNavigateToInsuranceOptimizer` prop
   - Added `onNavigateToMortgageOptimizer` prop
   - Added optimizer button section with 2-column grid

2. `/App.tsx`
   - Added `'insurance-optimizer'` and `'mortgage-optimizer'` to ScreenType
   - Imported InsuranceOptimizerScreen and MortgageOptimizerScreen
   - Added screen titles to getPageTitle()
   - Added navigation props to InsightsScreen
   - Added conditional rendering for optimizer screens
   - Excluded optimizer screens from header/bottom nav

### 🎨 Golden Ratio Layout

The buttons are arranged in a **2-column grid** with:
- Gap: `var(--spacing-3)`
- Each button takes 50% width
- Maintains consistent spacing with rest of UI
- Follows PolicyAngel's luxury design system

---

**Quick Test:** Go to Insights tab → Click blue "Insurance Optimizer" button → See the optimizer screen!
