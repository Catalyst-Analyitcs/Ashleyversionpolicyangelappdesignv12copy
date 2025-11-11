# 🎯 Prompt for Generating Mortgage Compare Components

Use these prompts when asking AI to create or modify mortgage comparison features in PolicyAngel.

---

## ✨ Component Generation Prompt

### For MortgageCompareCard Widget

```
Create a React component called MortgageCompareCard for PolicyAngel app with:

DESIGN:
- Glassmorphic card with backdrop blur
- Golden branding (color-goldenrod from design system)
- Dark theme with white text
- Animated gradient orbs in background
- Premium depth effects with shadows and glows

FEATURES:
- Show current rate vs recommended rate
- Display current payment vs new payment  
- Animated savings counter (count up effect)
- Rate reduction percentage badge (purple accent)
- Break-even analysis preview
- List 3 key benefits (rate savings, payment reduction, closing costs)
- CTA button "Compare Rates & Refinance" with arrow icon
- Trust badge "Powered by Insuragrid"
- Sparkles icon with pulse animation for AI badge
- Compact mode option to hide benefits list and break-even

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
- currentRate: number (default 6.5)
- currentPayment: number (default 2528)
- recommendedRate: number (default 5.125)
- recommendedPayment: number (default 2179)
- breakEvenMonths: number (default 9)
- closingCosts: number (default 3200)
- compact: boolean (default false)

ICONS:
- Use lucide-react: Home, TrendingDown, ArrowRight, CheckCircle, Sparkles, Percent, Clock

ANIMATIONS:
- Use motion/react (Framer Motion)
- Entrance: fade in + slide up
- Hover: lift card (-4px translate)
- Savings counter: animated counting from 0
- Rate badge: scale in animation
- Sparkles: rotating pulse animation
- Button: scale on hover/tap

COLOR ACCENTS:
- Golden gradient: Primary branding
- Emerald green: Savings highlight
- Purple/indigo: Rate reduction badge
- Blue: Break-even analysis

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
Add MortgageCompareCard to the [SCREEN_NAME]:

PLACEMENT:
- Add after [SECTION_NAME] section
- Include section heading "💰 Refinance Opportunity"
- Use proper spacing with design system tokens

CODE TO ADD:
```tsx
import { MortgageCompareCard } from '../components/MortgageCompareCard';

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
    💰 Refinance Opportunity
  </h2>
  
  <MortgageCompareCard
    onNavigate={() => onNavigateToMortgageOptimizer?.()}
    currentRate={6.5}
    currentPayment={2528}
    recommendedRate={5.125}
    recommendedPayment={2179}
    breakEvenMonths={9}
    closingCosts={3200}
  />
</div>
```

NAVIGATION:
- Ensure onNavigateToMortgageOptimizer prop exists in parent
- Wire up to screen state management or React Navigation
```

---

## 📊 Data Integration Prompt

### For Connecting Real APIs

```
Connect MortgageCompareCard to Insuragrid API:

REQUIREMENTS:
- Use TanStack Query for data fetching
- Fetch mortgage comparison data from /api/mortgage/compare
- Show loading state while fetching
- Handle errors gracefully
- Cache data for 24 hours (rates change daily)

IMPLEMENTATION:
```tsx
import { useQuery } from '@tanstack/react-query';
import { fetchMortgageComparison } from '../utils/insuragridApi';

function ParentComponent({ propertyId }: { propertyId: string }) {
  const { 
    data: comparison, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['mortgage-comparison', propertyId],
    queryFn: () => fetchMortgageComparison(propertyId),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });

  if (isLoading) return <SkeletonCard />;
  if (error) return <ErrorCard />;
  if (!comparison) return null;

  return (
    <MortgageCompareCard
      onNavigate={handleNavigate}
      currentRate={comparison.current.rate}
      currentPayment={comparison.current.monthlyPayment}
      recommendedRate={comparison.recommended.rate}
      recommendedPayment={comparison.recommended.monthlyPayment}
      breakEvenMonths={comparison.breakEvenMonths}
      closingCosts={comparison.closingCosts}
    />
  );
}
```

API ENDPOINT:
- GET /api/mortgage/compare?propertyId={id}
- Returns: { current: {...}, recommended: {...}, breakEvenMonths, closingCosts }
```

---

## 🎬 Animation Enhancement Prompt

### For Adding Motion

```
Enhance MortgageCompareCard animations:

ADD ANIMATIONS:
1. Staggered entrance for child elements
2. Hover glow effect on card
3. Pulsing gradient background
4. Number counter animation for savings and rate
5. Sparkle icon rotation animation
6. Rate badge scale-in animation
7. Button scale and shadow on hover

USE MOTION/REACT:
```tsx
import { motion } from 'motion/react';

// Card entrance
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
>

// Staggered badges
<motion.div
  initial={{ scale: 0.95 }}
  animate={{ scale: 1 }}
  transition={{ delay: 0.1 }}
>

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

// Pulsing check mark
<motion.div
  animate={{ scale: [1, 1.2, 1] }}
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
Create tests for MortgageCompareCard:

TEST SUITE:
1. Renders with default props
2. Renders with custom props
3. Displays correct savings calculation
4. Displays correct rate reduction
5. Savings counter animates properly
6. onNavigate callback fires on click
7. Compact mode hides benefits and break-even
8. Hover states work correctly
9. Animations complete without errors

TESTING LIBRARY:
- Use React Testing Library
- Use @testing-library/user-event for interactions
- Mock motion/react animations

EXAMPLE TEST:
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { MortgageCompareCard } from './MortgageCompareCard';

describe('MortgageCompareCard', () => {
  it('displays correct savings amount', () => {
    render(
      <MortgageCompareCard
        onNavigate={() => {}}
        currentPayment={3000}
        recommendedPayment={2500}
      />
    );
    
    // Should show $500 monthly savings
    expect(screen.getByText(/\$500/)).toBeInTheDocument();
    // Should show $6,000 annual savings
    expect(screen.getByText(/\$6,000\/year/)).toBeInTheDocument();
  });

  it('displays correct rate reduction', () => {
    render(
      <MortgageCompareCard
        onNavigate={() => {}}
        currentRate={6.5}
        recommendedRate={5.0}
      />
    );
    
    // Should show 1.500% rate reduction
    expect(screen.getByText(/1\.500%/)).toBeInTheDocument();
  });

  it('calls onNavigate when clicked', () => {
    const mockNavigate = jest.fn();
    render(
      <MortgageCompareCard onNavigate={mockNavigate} />
    );
    
    fireEvent.click(screen.getByRole('button', { name: /compare rates/i }));
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});
```
```

---

## 📱 Responsive Design Prompt

### For Mobile Optimization

```
Make MortgageCompareCard responsive for all devices:

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

## 🚀 Quick Start Prompts

### Copy-paste these for instant results

**Generate basic card:**
```
Create MortgageCompareCard component with glassmorphic design, golden branding, 
rate comparison, savings display, break-even analysis, and CTA button. Use 
PolicyAngel design system CSS variables from globals.css. Include animated 
counter, motion animations, and TypeScript types.
```

**Update to design system:**
```
Update [COMPONENT] to use PolicyAngel design system variables for colors, spacing, 
typography, borders, and transitions. Replace all hardcoded values with var(--*) 
CSS variables from globals.css. Font must be Roboto.
```

**Add to screen:**
```
Add MortgageCompareCard to [SCREEN] after [SECTION]. Include section heading,
proper spacing with design system tokens, and wire up navigation to 
MortgageOptimizerScreen.
```

**Connect API:**
```
Connect MortgageCompareCard to Insuragrid API using TanStack Query. Fetch data 
from /api/mortgage/compare, show loading state, handle errors, cache for 24 hours.
```

---

## 💡 Best Practices

When creating or modifying mortgage comparison components:

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

Use these prompts to quickly generate, modify, or extend mortgage comparison components 
that perfectly match PolicyAngel's luxury aesthetic and design system.
