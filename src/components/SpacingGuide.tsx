import { Ruler } from "lucide-react";
import React from "react";

interface SpacingIndicatorProps {
  label: string;
  value: string;
  top: number;
  height: number;
}

function SpacingIndicator({ label, value, top, height }: SpacingIndicatorProps) {
  return (
    <div
      className="absolute left-0 right-0 pointer-events-none z-50"
      style={{ top: `${top}px` }}
    >
      {/* Left measurement line */}
      <div
        className="absolute left-2 bg-blue-500"
        style={{
          width: '2px',
          height: `${height}px`,
        }}
      >
        {/* Top cap */}
        <div className="absolute -left-[5px] top-0 bg-blue-500 w-3 h-[2px]" />
        {/* Bottom cap */}
        <div className="absolute -left-[5px] bottom-0 bg-blue-500 w-3 h-[2px]" />
      </div>

      {/* Right measurement line */}
      <div
        className="absolute right-2 bg-blue-500"
        style={{
          width: '2px',
          height: `${height}px`,
        }}
      >
        {/* Top cap */}
        <div className="absolute -right-[5px] top-0 bg-blue-500 w-3 h-[2px]" />
        {/* Bottom cap */}
        <div className="absolute -right-[5px] bottom-0 bg-blue-500 w-3 h-[2px]" />
      </div>

      {/* Label in center */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bg-blue-500 text-white px-2 py-1 rounded shadow-lg text-[11px] font-semibold whitespace-nowrap"
        style={{
          top: `${height / 2}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="text-center">
          <div>{label}</div>
          <div className="text-[10px] opacity-90">{value}</div>
        </div>
      </div>
    </div>
  );
}

interface HorizontalPaddingProps {
  label: string;
  value: string;
  top: number;
  side: 'left' | 'right';
}

function HorizontalPadding({ label, value, top, side }: HorizontalPaddingProps) {
  return (
    <div
      className="absolute pointer-events-none z-50"
      style={{
        top: `${top}px`,
        [side]: 0,
      }}
    >
      {/* Horizontal line */}
      <div
        className="absolute bg-green-500 h-[2px]"
        style={{
          width: '24px', // px-6 = 24px
          [side]: 0,
        }}
      >
        {/* End cap */}
        <div
          className="absolute bg-green-500 w-[2px] h-3 -top-[5px]"
          style={{ [side]: 0 }}
        />
      </div>

      {/* Label */}
      <div
        className="absolute bg-green-500 text-white px-2 py-1 rounded shadow-lg text-[10px] font-semibold whitespace-nowrap -translate-y-5"
        style={{
          [side]: '12px', // Half of 24px
          transform: 'translateX(-50%) translateY(-20px)',
        }}
      >
        {label}: {value}
      </div>
    </div>
  );
}

export function SpacingGuide() {
  const [isVisible, setIsVisible] = React.useState(true);

  // Toggle with keyboard shortcut (Shift + M for Measure)
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === 'M') {
        setIsVisible((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 left-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors z-50 w-12 h-12 flex items-center justify-center"
        aria-label="Show spacing guide"
      >
        <Ruler className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="pointer-events-none">
      {/* Toggle button */}
      <button
        onClick={() => setIsVisible(false)}
        className="fixed bottom-4 left-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors pointer-events-auto z-50 w-12 h-12 flex items-center justify-center"
        aria-label="Hide spacing guide"
      >
        <Ruler className="w-6 h-6" />
      </button>

      {/* Info badge */}
      <div className="fixed top-4 left-4 bg-gray-900/90 text-white px-3 py-2 rounded-lg shadow-lg z-50 text-[11px] max-w-[200px]">
        <div className="font-semibold mb-1">Spacing Guide Active</div>
        <div className="text-gray-300">
          <span className="text-blue-400">Blue</span>: Vertical gaps (20px)
        </div>
        <div className="text-gray-300">
          <span className="text-green-400">Green</span>: Edge padding (24px)
        </div>
        <div className="text-gray-300">
          <span className="text-orange-400">Orange</span>: Card gap (20px)
        </div>
        <div className="text-gray-300 mt-1">Content: pb-32 (128px clearance)</div>
        <div className="text-gray-300">Navbar: absolute bottom-0</div>
        <div className="text-gray-300">Press Shift+M to toggle</div>
      </div>

      {/* Vertical spacing measurements */}
      {/* Status Bar to Map - 20px gap (space-y-5 in flexbox) */}
      <SpacingIndicator
        label="Section Gap"
        value="20px (space-y-5)"
        top={60}
        height={20}
      />

      {/* Map is flex-1 (flexible) */}
      <div
        className="absolute right-0 pointer-events-none z-50"
        style={{ top: '140px', right: '32px' }}
      >
        <div className="bg-purple-500/80 text-white px-2 py-1 rounded shadow-lg text-[10px] font-semibold whitespace-nowrap">
          Map: flex-1 (flexible)
        </div>
      </div>

      {/* Map to Action Cards - 20px gap */}
      <SpacingIndicator
        label="Section Gap"
        value="20px (space-y-5)"
        top={310}
        height={20}
      />

      {/* Action Cards height indicator */}
      <div
        className="absolute right-0 pointer-events-none z-50"
        style={{ top: '380px', right: '32px' }}
      >
        <div className="bg-purple-500/80 text-white px-2 py-1 rounded shadow-lg text-[10px] font-semibold whitespace-nowrap">
          Cards: ~180px
        </div>
      </div>

      {/* Action Cards to Chat Widget - 20px gap */}
      <SpacingIndicator
        label="Section Gap"
        value="20px (space-y-5)"
        top={530}
        height={20}
      />

      {/* Chat Widget height indicator */}
      <div
        className="absolute right-0 pointer-events-none z-50"
        style={{ top: '600px', right: '32px' }}
      >
        <div className="bg-purple-500/80 text-white px-2 py-1 rounded shadow-lg text-[10px] font-semibold whitespace-nowrap">
          Chat: 148px (fixed)
        </div>
      </div>

      {/* Chat Widget to Bottom Nav - 16px gap */}
      <SpacingIndicator
        label="Bottom Gap"
        value="16px (before nav)"
        top={730}
        height={16}
      />

      {/* Horizontal padding indicators */}
      {/* Main content padding (px-6 = 24px) */}
      <HorizontalPadding label="Edge" value="24px (px-6)" top={100} side="left" />
      <HorizontalPadding label="Edge" value="24px (px-6)" top={100} side="right" />

      {/* Action Cards gap indicator (gap-5 = 20px) */}
      <div
        className="absolute pointer-events-none z-50"
        style={{ top: '420px', left: '50%', transform: 'translateX(-50%)' }}
      >
        <div className="relative">
          {/* Horizontal line showing gap */}
          <div className="bg-orange-500 w-5 h-[2px]">
            {/* Left cap */}
            <div className="absolute bg-orange-500 w-[2px] h-3 left-0 -top-[5px]" />
            {/* Right cap */}
            <div className="absolute bg-orange-500 w-[2px] h-3 right-0 -top-[5px]" />
          </div>
          {/* Label */}
          <div className="absolute bg-orange-500 text-white px-2 py-1 rounded shadow-lg text-[10px] font-semibold whitespace-nowrap left-1/2 -translate-x-1/2 -top-9">
            Gap: 20px (gap-5)
          </div>
        </div>
      </div>

      {/* Layout summary card */}
      <div className="fixed bottom-4 right-4 bg-gray-900/90 text-white px-3 py-2 rounded-lg shadow-lg z-50 text-[10px] max-w-[180px]">
        <div className="font-semibold mb-1">Layout System</div>
        <div className="text-gray-300">Screen: 393×852 (iPhone 16)</div>
        <div className="text-gray-300">Container: flex-col</div>
        <div className="text-gray-300">Vertical: space-y-5 (20px)</div>
        <div className="text-gray-300">Horizontal: px-6 (24px)</div>
        <div className="text-gray-300">Nav radius: 44px (pill)</div>
      </div>
    </div>
  );
}