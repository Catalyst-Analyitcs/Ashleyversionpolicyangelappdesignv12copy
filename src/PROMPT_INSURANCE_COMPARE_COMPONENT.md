# 🎯 Prompt for Generating Insurance Compare Components

Use these prompts when asking AI to create or modify insurance comparison features in PolicyAngel.

---

## ✨ Component Generation Prompt

### For InsuranceCompareCard Widget

```
Create a React component called InsuranceCompareCard for PolicyAngel app with:

DESIGN:
- Glassmorphic card with backdrop blur
- Golden branding (color-goldenrod from design system)
- Dark theme with white text
- Animated gradient orbs in background
- Premium depth effects with shadows and glows

FEATURES:
- Show current premium vs recommended premium
- Display monthly and annual savings
- Animated savings counter (count up effect)
- List 3 key benefits (coverage increase, faster claims, earthquake coverage)
- CTA button "Compare & Switch Now" with arrow icon
- Trust badge "Powered by Insuragrid"
- Sparkles icon with pulse animation for AI badge
- Compact mode option to hide benefits list

DESIGN SYSTEM USAGE:
- Use CSS variables from /styles/globals.css for:
  - Colors: rgb(var(--color-goldenrod)), rgb(var(--color-text-primary))
  - Spacing: var(--spacing-6), var(--spacing-3), etc.
  - Typography: Roboto font family, var(--text-lg), var(--font-weight-semibold)
  - Border radius: var(--radius-2xl), var(--radius-3xl)
  - Transitions: var(--transition-button)
  - Shadows: var(--shadow-depth-md), var(--glow-subtle)

PROPS:
- onNavigate: () => void (required)
- currentPremium: number (default 245)
- recommendedPremium: number (default 189)
- coverageIncrease: string (default '+$50K')
- claimSpeed: string (default '3-5 days')
- compact: boolean (default false)

ICONS:
- Use lucide-react: Shield, TrendingDown, ArrowRight, CheckCircle, Sparkles

ANIMATIONS:
- Use motion/react (Framer Motion)
- Entrance: fade in + slide up
- Hover: lift card (-4px translate)
- Savings counter: animated counting from 0
- Sparkles: rotating pulse animation
- Button: scale on hover/tap

Must be TypeScript, use inline styles for CSS variables, maintain luxury aesthetic.
```

---

## 🎨 Style System Prompt

### For Applying Design System

```
Update the component to use PolicyAngel design system from /styles/globals.css:

REPLACE ALL:
- Hardcoded colors → CSS variables (rgb(var(--color-*)))
- Hardcoded spacing → Spacing tokens (var(--spacing-*))
- Hardcoded font sizes → Typography tokens (var(--text-*))
- Hardcoded font weights → Weight tokens (var(--font-weight-*))
- Hardcoded border radius → Radius tokens (var(--radius-*))
- Hardcoded transitions → Transition tokens (var(--transition-*))
- Hardcoded shadows → Shadow tokens (var(--shadow-depth-*), var(--glow-*))

TYPOGRAPHY:
- Font family: 'Roboto, sans-serif'
- Never use Tailwind text-* classes for size/weight
- Use inline style with CSS variables

EXAMPLE BEFORE:
```tsx
<h1 className="text-2xl font-bold">Title</h1>
```

EXAMPLE AFTER:
```tsx
<h1 
  className="text-white"
  style={{
    fontFamily: 'Roboto, sans-serif',
    fontSize: 'var(--text-2xl)',
    fontWeight: 'var(--font-weight-bold)',
  }}
>
  Title
</h1>
```

GOLDEN BRANDING:
- Primary accent: linear-gradient(135deg, rgb(var(--color-goldenrod)), rgb(214, 158, 46))
- Glow effect: boxShadow: 'var(--glow-medium)'
- Icon containers: Use golden gradients

GLASSMORPHISM:
- background: 'rgba(255, 255, 255, 0.03)'
- backdropFilter: 'blur(20px)'
- border: '1px solid rgba(255, 255, 255, 0.1)'
```

---

## 🔗 Integration Prompt

### For Adding to Existing Screens

```
Add InsuranceCompareCard to the [SCREEN_NAME]:

PLACEMENT:
- Add after [SECTION_NAME] section
- Include section heading "💰 Recommended for You"
- Use proper spacing with design system tokens

CODE TO ADD:
```tsx
import { InsuranceCompareCard } from '../components/InsuranceCompareCard';

// Inside component, in the appropriate section
<div style={{ 
  padding: '0 var(--spacing-6)',
  marginBottom: 'var(--spacing-6)' 
}}>
  <h2 
    className="text-white"
    style={{
      fontFamily: 'Roboto, sans-serif',
      fontSize: 'var(--text-xl)',
      fontWeight: 'var(--font-weight-semibold)',
      marginBottom: 'var(--spacing-4)',
    }}
  >
    💰 Recommended for You
  </h2>
  
  <InsuranceCompareCard
    onNavigate={() => onNavigateToInsuranceOptimizer?.()}
    currentPremium={245}
    recommendedPremium={189}
    coverageIncrease="+$50K"
    claimSpeed="3-5 days"
  />
</div>
```

NAVIGATION:
- Ensure onNavigateToInsuranceOptimizer prop exists in parent
- Wire up to screen state management or React Navigation
```

---

## 📊 Data Integration Prompt

### For Connecting Real APIs

```
Connect InsuranceCompareCard to Insuragrid API:

REQUIREMENTS:
- Use TanStack Query for data fetching
- Fetch insurance comparison data from /api/insurance/compare
- Show loading state while fetching
- Handle errors gracefully
- Cache data for 5 minutes

IMPLEMENTATION:
```tsx
import { useQuery } from '@tanstack/react-query';
import { fetchInsuranceComparison } from '../utils/insuragridApi';

function ParentComponent({ propertyId }: { propertyId: string }) {
  const { 
    data: comparison, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['insurance-comparison', propertyId],
    queryFn: () => fetchInsuranceComparison(propertyId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) return <SkeletonCard />;
  if (error) return <ErrorCard />;
  if (!comparison) return null;

  return (
    <InsuranceCompareCard
      onNavigate={handleNavigate}
      currentPremium={comparison.current.monthlyPremium}
      recommendedPremium={comparison.recommended.monthlyPremium}
      coverageIncrease={comparison.coverageIncrease}
      claimSpeed={comparison.recommended.claimSpeed}
    />
  );
}
```

API ENDPOINT:
- GET /api/insurance/compare?propertyId={id}
- Returns: { current: {...}, recommended: {...}, coverageIncrease, annualSavings }
```

---

## 🎬 Animation Enhancement Prompt

### For Adding Motion

```
Enhance InsuranceCompareCard animations:

ADD ANIMATIONS:
1. Staggered entrance for child elements
2. Hover glow effect on card
3. Pulsing gradient background
4. Number counter animation for savings
5. Sparkle icon rotation animation
6. Button scale and shadow on hover

USE MOTION/REACT:
```tsx
import { motion } from 'motion/react';

// Card entrance
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
>

// Staggered children
{items.map((item, i) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: i * 0.1 }}
  >
    {item.content}
  </motion.div>
))}

// Hover effects
<motion.div
  whileHover={{ y: -4, scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>

// Continuous animations
<motion.div
  animate={{ rotate: [0, 10, 0] }}
  transition={{ duration: 2, repeat: Infinity }}
>
```

PERFORMANCE:
- Use transform properties for smooth animations
- Avoid animating layout properties (width, height)
- Use will-change sparingly
- Test on mobile devices
```

---

## 🧪 Testing Prompt

### For Component Testing

```
Create tests for InsuranceCompareCard:

TEST SUITE:
1. Renders with default props
2. Renders with custom props
3. Displays correct savings calculation
4. Savings counter animates properly
5. onNavigate callback fires on click
6. Compact mode hides benefits list
7. Hover states work correctly
8. Animations complete without errors

TESTING LIBRARY:
- Use React Testing Library
- Use @testing-library/user-event for interactions
- Mock motion/react animations

EXAMPLE TEST:
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { InsuranceCompareCard } from './InsuranceCompareCard';

describe('InsuranceCompareCard', () => {
  it('displays correct savings amount', () => {
    render(
      <InsuranceCompareCard
        onNavigate={() => {}}
        currentPremium={300}
        recommendedPremium={200}
      />
    );
    
    // Should show $100 monthly savings
    expect(screen.getByText(/\$100/)).toBeInTheDocument();
    // Should show $1,200 annual savings
    expect(screen.getByText(/\$1,200\/year/)).toBeInTheDocument();
  });

  it('calls onNavigate when clicked', () => {
    const mockNavigate = jest.fn();
    render(
      <InsuranceCompareCard onNavigate={mockNavigate} />
    );
    
    fireEvent.click(screen.getByRole('button', { name: /compare & switch/i }));
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});
```
```

---

## 📱 Responsive Design Prompt

### For Mobile Optimization

```
Make InsuranceCompareCard responsive for all devices:

BREAKPOINTS:
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

ADJUSTMENTS:
Mobile:
- Reduce padding from var(--spacing-6) to var(--spacing-4)
- Stack comparison grid vertically on very small screens
- Reduce font sizes slightly (use --text-sm instead of --text-base)
- Ensure touch targets are minimum 44x44px

Tablet:
- Use default spacing and sizing
- Keep grid as 2-column layout

Desktop:
- Add max-width constraint (600px)
- Center card if needed
- Slightly larger hover effects

USE MEDIA QUERIES:
```tsx
<div
  style={{
    padding: 'var(--spacing-6)',
    '@media (max-width: 767px)': {
      padding: 'var(--spacing-4)',
    },
  }}
>
```

OR USE TAILWIND:
```tsx
<div className="p-4 md:p-6">
```

TEST ON:
- iPhone SE (375px)
- iPhone 14 Pro (393px)
- iPad (768px)
- Desktop (1440px)
```

---

## 🎨 Variant Prompt

### For Creating Card Variants

```
Create variant of InsuranceCompareCard for mortgage optimization:

CHANGES:
- Replace Shield icon with Home icon
- Change "Insurance Optimizer" to "Mortgage Optimizer"
- Update messaging:
  - "Current Rate" vs "Recommended Rate"
  - Show rate as percentage (5.25% → 4.75%)
  - Show monthly payment difference
  - "Refinance & Save" CTA button
- Use blue gradient instead of golden
- Update benefits list:
  - "Lower interest rate"
  - "Reduce monthly payment"
  - "Save $150K over loan term"

COMPONENT NAME: MortgageCompareCard

PROPS:
- currentRate: number (percentage)
- recommendedRate: number (percentage)
- currentPayment: number
- recommendedPayment: number
- termSavings: string (e.g., "$150K over 30 years")

Maintain same structure and design system usage as InsuranceCompareCard.
```

---

## 📝 Documentation Prompt

### For Auto-Documentation

```
Create comprehensive documentation for InsuranceCompareCard:

INCLUDE:
- Component purpose and features
- Props API table with types and descriptions
- Usage examples (3-5 scenarios)
- Design system integration details
- Animation specifications
- Accessibility considerations
- Testing guidelines
- Troubleshooting common issues
- Related components and screens
- Screenshots or visual examples

FORMAT:
- Use Markdown
- Include code blocks with syntax highlighting
- Add emoji section headers for readability
- Create table of contents for long docs
- Link to related documentation

SAVE AS: /docs/components/InsuranceCompareCard.md
```

---

## 🚀 Quick Start Prompts

### Copy-paste these for instant results

**Generate basic card:**
```
Create InsuranceCompareCard component with glassmorphic design, golden branding, 
savings comparison, and CTA button. Use PolicyAngel design system CSS variables 
from globals.css. Include animated counter, motion animations, and TypeScript types.
```

**Update to design system:**
```
Update [COMPONENT] to use PolicyAngel design system variables for colors, spacing, 
typography, borders, and transitions. Replace all hardcoded values with var(--*) 
CSS variables from globals.css. Font must be Roboto.
```

**Add to screen:**
```
Add InsuranceCompareCard to [SCREEN] after [SECTION]. Include section heading,
proper spacing with design system tokens, and wire up navigation to 
InsuranceOptimizerScreen.
```

**Connect API:**
```
Connect InsuranceCompareCard to Insuragrid API using TanStack Query. Fetch data 
from /api/insurance/compare, show loading state, handle errors, cache for 5 minutes.
```

---

## 💡 Best Practices

When creating or modifying insurance comparison components:

1. **Always use design system** - Never hardcode colors, spacing, or typography
2. **Follow naming conventions** - ComponentName in PascalCase
3. **Type everything** - Full TypeScript with interfaces for all props
4. **Animate thoughtfully** - Enhance UX without degrading performance
5. **Mobile-first** - Design for small screens, enhance for large
6. **Accessibility** - Proper ARIA labels, keyboard navigation, focus states
7. **Error handling** - Graceful degradation when data is unavailable
8. **Performance** - Lazy load, memoize, optimize re-renders
9. **Documentation** - Clear comments and external docs
10. **Testing** - Unit tests, integration tests, visual regression tests

---

## 🎉 You're Equipped!

Use these prompts to quickly generate, modify, or extend insurance comparison components 
that perfectly match PolicyAngel's luxury aesthetic and design system.
