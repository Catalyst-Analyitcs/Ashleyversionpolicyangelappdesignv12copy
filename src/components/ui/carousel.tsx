/**
 * REACT NATIVE CONVERSION - Carousel Component
 * 
 * COMPLEXITY: HIGH
 * CONVERSION APPROACH: Replace with FlatList horizontal scroll or react-native-reanimated-carousel
 * 
 * WEB DEPENDENCIES TO REPLACE:
 * - embla-carousel-react → FlatList with horizontal={true} or react-native-reanimated-carousel
 * - lucide-react → react-native-vector-icons or custom SVG
 * 
 * RECOMMENDED PACKAGES:
 * - react-native-reanimated-carousel (most Embla-like experience)
 * - OR native FlatList with PanResponder for custom gestures
 * - react-native-reanimated for animations
 * - react-native-gesture-handler for swipe gestures
 * 
 * KEY CONVERSION NOTES:
 * 1. Embla provides smooth touch gestures - FlatList has similar built-in behavior
 * 2. Need to implement custom pagination indicators
 * 3. Horizontal/vertical orientation handled by FlatList props
 * 4. Keyboard navigation not available on mobile (touch-only)
 * 5. Previous/Next buttons become optional (gestures are primary)
 * 
 * REACT NATIVE IMPLEMENTATION (FlatList Approach):
 * ```tsx
 * import { FlatList, View, Pressable, Dimensions } from 'react-native';
 * import { useState, useRef } from 'react';
 * import Icon from 'react-native-vector-icons/Feather';
 * 
 * const { width: screenWidth } = Dimensions.get('window');
 * 
 * interface CarouselProps {
 *   data: any[];
 *   renderItem: ({ item, index }: { item: any; index: number }) => JSX.Element;
 *   horizontal?: boolean;
 *   itemWidth?: number;
 *   showArrows?: boolean;
 *   autoPlay?: boolean;
 *   interval?: number;
 * }
 * 
 * export function Carousel({
 *   data,
 *   renderItem,
 *   horizontal = true,
 *   itemWidth = screenWidth * 0.9,
 *   showArrows = true,
 *   autoPlay = false,
 *   interval = 3000,
 * }: CarouselProps) {
 *   const [currentIndex, setCurrentIndex] = useState(0);
 *   const flatListRef = useRef<FlatList>(null);
 * 
 *   const scrollToIndex = (index: number) => {
 *     flatListRef.current?.scrollToIndex({ index, animated: true });
 *   };
 * 
 *   const scrollPrev = () => {
 *     if (currentIndex > 0) {
 *       scrollToIndex(currentIndex - 1);
 *     }
 *   };
 * 
 *   const scrollNext = () => {
 *     if (currentIndex < data.length - 1) {
 *       scrollToIndex(currentIndex + 1);
 *     }
 *   };
 * 
 *   const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
 *     if (viewableItems.length > 0) {
 *       setCurrentIndex(viewableItems[0].index || 0);
 *     }
 *   });
 * 
 *   const viewabilityConfig = {
 *     itemVisiblePercentThreshold: 50,
 *   };
 * 
 *   // Auto-play functionality
 *   useEffect(() => {
 *     if (!autoPlay) return;
 *     const timer = setInterval(() => {
 *       const nextIndex = (currentIndex + 1) % data.length;
 *       scrollToIndex(nextIndex);
 *     }, interval);
 *     return () => clearInterval(timer);
 *   }, [autoPlay, currentIndex, interval, data.length]);
 * 
 *   return (
 *     <View style={{ position: 'relative' }}>
 *       <FlatList
 *         ref={flatListRef}
 *         data={data}
 *         renderItem={renderItem}
 *         horizontal={horizontal}
 *         pagingEnabled
 *         showsHorizontalScrollIndicator={false}
 *         showsVerticalScrollIndicator={false}
 *         snapToInterval={itemWidth}
 *         decelerationRate="fast"
 *         onViewableItemsChanged={onViewableItemsChanged.current}
 *         viewabilityConfig={viewabilityConfig}
 *         keyExtractor={(item, index) => index.toString()}
 *         getItemLayout={(data, index) => ({
 *           length: itemWidth,
 *           offset: itemWidth * index,
 *           index,
 *         })}
 *       />
 * 
 *       {showArrows && (
 *         <>
 *           <Pressable
 *             style={{
 *               position: 'absolute',
 *               left: 12,
 *               top: '50%',
 *               transform: [{ translateY: -20 }],
 *               width: 40,
 *               height: 40,
 *               borderRadius: 20,
 *               backgroundColor: 'rgba(0,0,0,0.5)',
 *               justifyContent: 'center',
 *               alignItems: 'center',
 *             }}
 *             onPress={scrollPrev}
 *             disabled={currentIndex === 0}
 *           >
 *             <Icon name="chevron-left" size={24} color="#fff" />
 *           </Pressable>
 * 
 *           <Pressable
 *             style={{
 *               position: 'absolute',
 *               right: 12,
 *               top: '50%',
 *               transform: [{ translateY: -20 }],
 *               width: 40,
 *               height: 40,
 *               borderRadius: 20,
 *               backgroundColor: 'rgba(0,0,0,0.5)',
 *               justifyContent: 'center',
 *               alignItems: 'center',
 *             }}
 *             onPress={scrollNext}
 *             disabled={currentIndex === data.length - 1}
 *           >
 *             <Icon name="chevron-right" size={24} color="#fff" />
 *           </Pressable>
 *         </>
 *       )}
 * 
 *       {/* Pagination Dots *}
 *       <View
 *         style={{
 *           flexDirection: 'row',
 *           justifyContent: 'center',
 *           marginTop: 16,
 *           gap: 8,
 *         }}
 *       >
 *         {data.map((_, index) => (
 *           <Pressable
 *             key={index}
 *             onPress={() => scrollToIndex(index)}
 *             style={{
 *               width: currentIndex === index ? 24 : 8,
 *               height: 8,
 *               borderRadius: 4,
 *               backgroundColor:
 *                 currentIndex === index
 *                   ? 'var(--color-primary)'
 *                   : 'rgba(255,255,255,0.3)',
 *             }}
 *           />
 *         ))}
 *       </View>
 *     </View>
 *   );
 * }
 * ```
 * 
 * REACT NATIVE IMPLEMENTATION (Reanimated Carousel - Recommended):
 * ```tsx
 * import Carousel from 'react-native-reanimated-carousel';
 * import { View, Dimensions } from 'react-native';
 * 
 * const { width: screenWidth } = Dimensions.get('window');
 * 
 * export function CarouselReanimated({
 *   data,
 *   renderItem,
 *   ...props
 * }) {
 *   return (
 *     <Carousel
 *       width={screenWidth}
 *       height={250}
 *       data={data}
 *       renderItem={renderItem}
 *       mode="parallax"
 *       modeConfig={{
 *         parallaxScrollingScale: 0.9,
 *         parallaxScrollingOffset: 50,
 *       }}
 *       panGestureHandlerProps={{
 *         activeOffsetX: [-10, 10],
 *       }}
 *       {...props}
 *     />
 *   );
 * }
 * ```
 * 
 * ACCESSIBILITY:
 * - Use accessibilityRole="slider" for carousel container
 * - Add accessibilityLabel describing current position
 * - accessibilityValue={{ now: currentIndex + 1, min: 1, max: data.length }}
 * - Arrow buttons: accessibilityRole="button" with labels
 * - Announce page changes with accessibilityLiveRegion="polite"
 * 
 * GESTURES & INTERACTIONS:
 * - Swipe/pan gestures are primary navigation (no keyboard)
 * - Arrow buttons optional on mobile (mostly for tablets)
 * - Pagination dots are common on mobile
 * - Snap to page with pagingEnabled or custom snap points
 * - Support momentum scrolling with decelerationRate
 * 
 * POLICYANGEL-SPECIFIC NOTES:
 * - Property photos carousel: 16:9 images with parallax
 * - Featured properties: Card-based carousel with peek preview
 * - Inspection timeline: Vertical carousel for chronological view
 * - Weather forecast: Horizontal hourly/daily forecast cards
 * - Document viewer: Full-width pages with page indicator
 * - Tutorial onboarding: Full-screen slides with progress dots
 * 
 * PERFORMANCE OPTIMIZATION:
 * - Use getItemLayout for instant scrollToIndex
 * - Implement windowSize prop to limit rendered items
 * - Use removeClippedSubviews for long lists
 * - Optimize images with FastImage
 * - Lazy load carousel items outside viewport
 * 
 * STYLING NOTES:
 * - snapToInterval for custom card widths
 * - contentContainerStyle for padding/spacing
 * - Use Animated.Value for custom scroll indicators
 * - Apply card shadows to items, not FlatList
 */

"use client";

import * as React from "react";
// WEB: Embla Carousel for smooth touch/mouse gestures
// REACT NATIVE: Replace with FlatList or react-native-reanimated-carousel
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react@8.6.0";
// WEB: Lucide icons for arrow navigation
// REACT NATIVE: Use react-native-vector-icons or custom SVG
import { ArrowLeft, ArrowRight } from "lucide-react@0.487.0";

import { cn } from "./utils";
import { Button } from "./button";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  // WEB: API for programmatic control
  // REACT NATIVE: Use FlatList ref with scrollToIndex method
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

// WEB: Context for sharing carousel state
// REACT NATIVE: Same pattern works, or use Zustand for complex carousels
const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  // WEB: Embla carousel hook with options
  // REACT NATIVE: Use FlatList with horizontal prop:
  // const flatListRef = useRef<FlatList>(null);
  // <FlatList ref={flatListRef} horizontal={orientation === "horizontal"} />
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins,
  );
  // WEB: Track scroll boundaries for button states
  // REACT NATIVE: Use onViewableItemsChanged to track current index
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  // WEB: Programmatic scroll methods
  // REACT NATIVE: Use flatListRef.current?.scrollToIndex({ index, animated: true })
  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  // WEB: Keyboard navigation for accessibility
  // REACT NATIVE: Not needed on mobile (touch gestures only)
  // Keep for tablet support if using keyboard-connected tablets
  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      {/* WEB: div with keyboard event handling */}
      {/* REACT NATIVE: View without keyboard handling (gestures only) */}
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        // REACT NATIVE: 
        // accessibilityRole="slider"
        // accessibilityLabel="Image carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel();

  // WEB: Nested div structure for Embla container and viewport
  // REACT NATIVE: FlatList with data and renderItem props:
  // <FlatList
  //   ref={carouselRef}
  //   data={items}
  //   renderItem={({ item }) => <CarouselItem>{item}</CarouselItem>}
  //   horizontal={orientation === "horizontal"}
  //   pagingEnabled
  //   showsHorizontalScrollIndicator={false}
  // />
  return (
    <div
      ref={carouselRef}
      className="overflow-hidden"
      data-slot="carousel-content"
      // REACT NATIVE: FlatList handles overflow automatically
    >
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className,
        )}
        // REACT NATIVE: 
        // style={{ flexDirection: orientation === "horizontal" ? 'row' : 'column' }}
        // Use contentContainerStyle for padding
        {...props}
      />
    </div>
  );
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel();

  // WEB: Carousel item with flexbox sizing
  // REACT NATIVE: FlatList renderItem wrapper:
  // const renderItem = ({ item, index }) => (
  //   <View style={{ width: itemWidth }}>
  //     {item}
  //   </View>
  // );
  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className,
      )}
      // REACT NATIVE:
      // style={{
      //   width: itemWidth,
      //   paddingHorizontal: orientation === "horizontal" ? 16 : 0,
      //   paddingVertical: orientation === "vertical" ? 16 : 0,
      // }}
      {...props}
    />
  );
}

function CarouselPrevious({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  // WEB: Absolutely positioned button with arrow icon
  // REACT NATIVE: Pressable with custom positioning:
  // <Pressable
  //   style={{
  //     position: 'absolute',
  //     left: 12,
  //     top: '50%',
  //     transform: [{ translateY: -20 }],
  //     width: 40,
  //     height: 40,
  //     borderRadius: 20,
  //     backgroundColor: 'rgba(0,0,0,0.5)',
  //   }}
  //   onPress={scrollPrev}
  //   disabled={!canScrollPrev}
  //   accessibilityRole="button"
  //   accessibilityLabel="Previous slide"
  // >
  //   <Icon name="chevron-left" size={24} color="#fff" />
  // </Pressable>
  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -left-12 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft />
      <span className="sr-only">Previous slide</span>
      {/* REACT NATIVE: Use accessibilityLabel instead of sr-only span */}
    </Button>
  );
}

function CarouselNext({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  // WEB: Absolutely positioned button with arrow icon
  // REACT NATIVE: Similar to CarouselPrevious but on right side
  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -right-12 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight />
      <span className="sr-only">Next slide</span>
      {/* REACT NATIVE: Use accessibilityLabel="Next slide" */}
    </Button>
  );
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
