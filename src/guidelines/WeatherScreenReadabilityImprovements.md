# Weather Screen Readability Improvements

## Summary
Comprehensive typography and iconography improvements to enhance readability across all sections of the WeatherScreen.

## Changes Made

### Icon Size Improvements
- **MetricCard icons**: Increased from `w-5 h-5` (20px) to `w-6 h-6` (24px) for better visibility
- **Alert Triangle icon**: Increased from 22px to 24px
- **Weather incident icons**: Increased from 20px to 22px
- **Small detail icons** (Wind, Droplets, CloudSnow, Gauge in forensic section): Increased from 12px to 14px
- **Hourly forecast detail icons**: Increased from 12px to 14px
- **Footer AlertCircle icon**: Increased from 16px to 18px

### Typography Improvements

#### MetricCard Component
- **Value text**: Changed from `fontSize: 'var(--text-sm)'` (14px) to `fontSize: 'var(--text-base)'` (16px)
- **Subtext**: Changed from `fontSize: '11px'` to `fontSize: 'var(--text-xs)'` (12px)

#### Weather Alert Section
- **Title**: Changed from `fontSize: '15px'` to `fontSize: 'var(--text-base)'` (16px)
- **Description**: Added `lineHeight: '1.5'` for better readability

#### Current Weather Section
- **Condition text**: Changed from `fontSize: '16px'` to `fontSize: 'var(--text-lg)'` (18px)
- **Feels like text**: Changed from `fontSize: 'var(--text-sm)'` (14px) to `fontSize: 'var(--text-base)'` (16px)
- **High/Low temperatures**: Changed from `fontSize: '16px'` to `fontSize: 'var(--text-lg)'` (18px)
- **Sunrise/Sunset labels**: Changed from `fontSize: '11px'` to `fontSize: 'var(--text-xs)'` (12px)
- **Sunrise/Sunset times**: Changed from `fontSize: '13px'` to `fontSize: 'var(--text-sm)'` (14px)
- **UV Index & Air Quality labels**: Changed from `fontSize: '11px'` to `fontSize: 'var(--text-xs)'` (12px)
- **Badge font sizes**: Changed from `fontSize: '11px'` to `fontSize: 'var(--text-xs)'` (12px)
- **Badge padding**: Increased from `padding: '2px 8px'` to `padding: '3px 10px'`

#### Section Headers
- **All h3 headers**: Changed from `fontSize: '16px'` to `fontSize: 'var(--text-lg)'` (18px)
  - Next Hour
  - Hourly Forecast
  - 7-Day Forecast
  - Temperature Trends
  - Annual Forensic Weather Report

#### Sub-headers and Labels
- **Hourly Forecast subheader**: Changed from `fontSize: 'var(--text-xs)'` to `fontSize: 'var(--text-sm)'` (14px)
- **Temperature Trends subheader**: Changed from `fontSize: 'var(--text-xs)'` to `fontSize: 'var(--text-sm)'` (14px)

#### Hourly Forecast Cards
- **Temperature**: Changed from `fontSize: '17px'` to `fontSize: 'var(--text-lg)'` (18px)
- **Precipitation percentage**: Changed from `fontSize: '11px'` to `fontSize: 'var(--text-xs)'` (12px)
- **Wind speed & humidity labels**: Changed from `fontSize: '11px'` to `fontSize: 'var(--text-xs)'` (12px)

#### 7-Day Forecast
- **Day names**: Changed from `fontSize: '15px'` to `fontSize: 'var(--text-base)'` (16px)
- **Dates**: Changed from `fontSize: 'var(--text-xs)'` to `fontSize: 'var(--text-sm)'` (14px)
- **High/Low temperatures**: Changed from `fontSize: '15px'` to `fontSize: 'var(--text-base)'` (16px)
- **Expanded detail labels**: Changed from `fontSize: 'var(--text-xs)'` to `fontSize: 'var(--text-sm)'` (14px)
- **Expanded detail values**: Changed from `fontSize: '14px'` to `fontSize: 'var(--text-base)'` (16px)

#### Temperature Trends
- **Stat labels**: Changed from `fontSize: 'var(--text-xs)'` to `fontSize: 'var(--text-sm)'` (14px)
- **Stat subtexts**: Changed from `fontSize: '11px'` to `fontSize: 'var(--text-xs)'` (12px)

#### Chart Labels
- **XAxis in Minutely Precipitation**: Changed from `fontSize: '9px'` to `fontSize: 'var(--text-xs)'` (12px)

#### Forensic Incidents Section
- **Summary stats numbers**: Changed from `fontSize: '24px'` to `fontSize: '28px'`
- **Summary stats labels**: Changed from `fontSize: 'var(--text-xs)'` to `fontSize: 'var(--text-sm)'` (14px)
- **Incident titles**: Changed from `fontSize: '15px'` to `fontSize: 'var(--text-base)'` (16px)
- **Severity badges**: Changed from `fontSize: '10px'` to `fontSize: 'var(--text-xs)'` (12px) and padding from `padding: '3px 8px'` to `padding: '4px 10px'`
- **Quick stats labels**: Changed from `fontSize: '10px'` to `fontSize: 'var(--text-xs)'` (12px)
- **Quick stats values**: Changed from `fontSize: '14px'` to `fontSize: 'var(--text-base)'` (16px)
- **Subsection headers** (Weather Metrics, Forensic Analysis): Changed from `fontSize: '13px'` to `fontSize: 'var(--text-sm)'` (14px)
- **Metric labels**: Changed from `fontSize: '11px'` to `fontSize: 'var(--text-xs)'` (12px)
- **Metric values**: Changed from `fontSize: '15px'` to `fontSize: 'var(--text-base)'` (16px)
- **Peak Intensity label**: Changed from `fontSize: '11px'` to `fontSize: 'var(--text-xs)'` (12px)
- **Peak Intensity value**: Changed from `fontSize: '13px'` to `fontSize: 'var(--text-sm)'` (14px)
- **Affected Areas badges**: Changed from `fontSize: '11px'` to `fontSize: 'var(--text-xs)'` (12px) and padding from `padding: '4px 8px'` to `padding: '4px 10px'`
- **Recommendations text**: Changed from `fontSize: '12px'` to `fontSize: 'var(--text-sm)'` (14px)
- **Action button**: Changed from `fontSize: '13px'` to `fontSize: 'var(--text-sm)'` (14px)
- **Footer note**: Changed from `fontSize: 'var(--text-xs)'` to `fontSize: 'var(--text-sm)'` (14px)

## Typography Guidelines Applied

### Minimum Font Sizes
- **Minimum readable size**: 12px (var(--text-xs)) - used for labels, captions, and supplementary information
- **Body text**: 14px (var(--text-sm)) - used for descriptions and secondary content  
- **Primary content**: 16px (var(--text-base)) - used for main values and important information
- **Subheadings**: 18px (var(--text-lg)) - used for section headers and important labels
- **Large display**: 28px+ - used for key metrics and statistics

### Icon Guidelines
- **Small detail icons**: 14-16px minimum for readability
- **Standard UI icons**: 18-20px for comfortable visibility
- **Featured/Important icons**: 22-24px for emphasis
- **Weather condition icons**: 28px+ for visual impact

## Benefits
1. **Improved Mobile Readability**: All text meets minimum size recommendations for mobile devices
2. **Better Visual Hierarchy**: Clearer distinction between headers, labels, and values
3. **Consistent Sizing**: All typography now uses CSS variables from the design system
4. **Enhanced Accessibility**: Larger fonts and icons improve readability for all users
5. **Professional Polish**: Consistent spacing and sizing creates a more refined interface

## Design System Compliance
All changes use CSS variables from `/styles/globals.css`:
- `--text-xs`: 12px
- `--text-sm`: 14px
- `--text-base`: 16px
- `--text-lg`: 18px
- Custom sizes (24px, 28px) used only for display/emphasis elements

This ensures the screen remains consistent with the PolicyAngel design system and can be easily updated globally if needed.
