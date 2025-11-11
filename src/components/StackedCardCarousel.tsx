/**
 * ==============================================================================
 * STACKEDCARDCAROUSEL.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Stacked card carousel with swipe-to-next functionality.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. CARD STACK:
 *    - Use Animated.View for each card
 *    - Absolute positioning with offsets
 *    - Z-index for layering
 * 
 * 2. SWIPE GESTURE:
 *    - PanGestureHandler from react-native-gesture-handler
 *    - Track translation and velocity
 *    - Snap to next card or return
 * 
 * 3. ANIMATIONS:
 *    - react-native-reanimated
 *    - Smooth card transitions
 *    - Spring animations
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] Cards stack correctly
 * - [ ] Swipe reveals next card
 * - [ ] Animation smooth
 * - [ ] Cards cycle properly
 * - [ ] iOS and Android compatible
 * 
 */

import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { QuickActionCard, QuickActionCardProps } from './QuickActionCard';

// Use CSS variables for configuration
const CARD_OFFSET = 40; // var(--carousel-card-offset) - reduced from 50px
const SWIPE_THRESHOLD = 100; // Threshold for removing a card (in pixels)

export interface StackedCardCarouselProps {
  cards: Omit<QuickActionCardProps, 'size'>[];
  onCardChange?: (index: number) => void;
  className?: string;
}

export function StackedCardCarousel({
  cards,
  onCardChange,
  className = '',
}: StackedCardCarouselProps) {
  const [visibleCards, setVisibleCards] = useState(cards.slice(0, 3));
  const [removingCardId, setRemovingCardId] = useState<number | null>(null);

  // Update visible cards when cards prop changes
  useEffect(() => {
    setVisibleCards(cards.slice(0, 3));
  }, [cards]);

  const removeCard = (index: number) => {
    setRemovingCardId(index);
    
    // Wait for animation to complete before removing
    setTimeout(() => {
      setVisibleCards(prev => {
        const newCards = prev.filter((_, i) => i !== index);
        onCardChange?.(0); // Reset to first card
        return newCards;
      });
      setRemovingCardId(null);
    }, 300);
  };

  const getCardStyle = (index: number) => {
    if (index === 0) {
      // Current/focused card - 100% opacity and scale per spec
      return {
        opacity: 1,
        scale: 1,
        translateY: 0,
        zIndex: 30, // Highest z-index for front card
      };
    }

    if (index === 1) {
      // Next card (peeking behind) - matches Figma opacity: 0.8
      return {
        opacity: 0.8,
        scale: 0.98, // Subtle scale difference
        translateY: -CARD_OFFSET, // 40px behind
        zIndex: 20, // Middle z-index
      };
    }

    if (index === 2) {
      // Third card (subtle peek behind) - matches Figma layering
      return {
        opacity: 0.6,
        scale: 0.96,
        translateY: -CARD_OFFSET * 2, // 80px behind (40px + 40px)
        zIndex: 10, // Lowest visible z-index
      };
    }

    // Cards beyond visible stack
    return {
      opacity: 0,
      scale: 0.8,
      translateY: -CARD_OFFSET * 3,
      zIndex: 0, // Hidden cards
    };
  };

  return (
    <div 
      className={`relative w-full ${className}`}
      style={{ 
        height: '180px',
        userSelect: 'none',
      }}
    >
      {visibleCards.length === 0 ? (
        <div 
          className="flex items-center justify-center h-full"
          style={{ color: 'var(--text-secondary)' }}
        >
          No more actions
        </div>
      ) : (
        visibleCards.map((card, index) => {
          const style = getCardStyle(index);
          const isTopCard = index === 0;
          const isRemoving = removingCardId === index;

          return (
            <SwipeableCard
              key={`${index}-${card.title}`}
              card={card}
              style={style}
              isTopCard={isTopCard}
              isRemoving={isRemoving}
              onRemove={() => removeCard(index)}
            />
          );
        })
      )}

      {/* Card indicators */}
      {visibleCards.length > 0 && (
        <div 
          className="absolute left-0 right-0 flex items-center justify-center"
          style={{ 
            bottom: 'var(--spacing-2)', // 8px from bottom
            gap: 'var(--spacing-2)', // 8px between dots
            pointerEvents: 'none',
          }}
        >
          {visibleCards.map((_, index) => (
            <div
              key={`indicator-${index}`}
              className="rounded-full transition-all duration-200"
              style={{
                width: index === 0 ? '8px' : '6px',
                height: index === 0 ? '8px' : '6px',
                backgroundColor: index === 0 
                  ? 'rgb(59, 130, 246)' // blue-500
                  : 'rgba(156, 163, 175, 0.5)', // gray-400 with opacity
              }}
            />
          ))}
        </div>
      )}

      {/* Accessibility status */}
      <div className="sr-only" role="status" aria-live="polite">
        {visibleCards.length > 0 
          ? `Card 1 of ${visibleCards.length}: ${visibleCards[0]?.title}`
          : 'No more cards'}
      </div>
    </div>
  );
}

interface SwipeableCardProps {
  card: Omit<QuickActionCardProps, 'size'>;
  style: {
    opacity: number;
    scale: number;
    translateY: number;
    zIndex: number;
  };
  isTopCard: boolean;
  isRemoving: boolean;
  onRemove: () => void;
}

function SwipeableCard({ card, style, isTopCard, isRemoving, onRemove }: SwipeableCardProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnd = (_event: any, info: any) => {
    setIsDragging(false);
    
    // If dragged beyond threshold horizontally, remove the card
    if (Math.abs(info.offset.x) > SWIPE_THRESHOLD) {
      onRemove();
    }
  };

  return (
    <motion.div
      drag={isTopCard && !isRemoving ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      initial={{
        opacity: style.opacity,
        scale: style.scale,
        y: style.translateY,
        x: 0,
      }}
      animate={
        isRemoving
          ? {
              x: 500, // Slide out to the right
              opacity: 0,
              rotate: 15,
            }
          : {
              opacity: style.opacity,
              scale: style.scale,
              y: style.translateY,
              x: 0,
              rotate: 0,
            }
      }
      whileDrag={{
        scale: 1.05,
        rotate: 0,
      }}
      transition={{
        duration: 0.3,
        ease: 'easeOut',
      }}
      style={{
        position: 'absolute',
        width: '100%',
        zIndex: style.zIndex,
        touchAction: isTopCard ? 'pan-y' : 'none',
        cursor: isTopCard ? 'grab' : 'default',
      }}
    >
      <QuickActionCard
        title={card.title}
        subtitle={card.subtitle}
        icon={card.icon}
        onPress={isTopCard && !isDragging ? card.onPress : undefined}
        size="lg"
        variant="glass"
        disabled={!isTopCard}
        focused={isTopCard} // Add blue outline to front card
        className="w-full mx-0" // Full width, remove horizontal margins
      />
    </motion.div>
  );
}

export default StackedCardCarousel;
