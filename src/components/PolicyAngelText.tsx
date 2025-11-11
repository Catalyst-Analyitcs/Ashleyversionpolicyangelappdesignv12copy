/**
 * ==============================================================================
 * POLICYANGELTTEXT.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Branded PolicyAngel text logo with script font and glow effect.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. CUSTOM FONT:
 *    - Load script font using expo-font
 *    - Or use custom font with react-native-vector-icons
 * 
 * 2. TEXT SHADOW:
 *    - Use textShadowColor, textShadowOffset, textShadowRadius
 *    - Glow effect with multiple shadow layers
 * 
 * 3. EXAMPLE:
 *    ```tsx
 *    <Text style={{
 *      fontFamily: 'ScriptFont',
 *      textShadowColor: 'rgba(255, 255, 255, 0.5)',
 *      textShadowOffset: { width: 0, height: 0 },
 *      textShadowRadius: 20
 *    }}>
 *      PolicyAngel
 *    </Text>
 *    ```
 * 
 * ==============================================================================
 * NOTE: Simple component, minimal conversion needed
 * 
 */

import React from 'react';

interface PolicyAngelTextProps {
  className?: string;
  style?: React.CSSProperties;
}

export const PolicyAngelText: React.FC<PolicyAngelTextProps> = ({ className = '', style = {} }) => {
  return (
    <span className={`font-script ${className}`} style={{ ...style, textShadow: '0 0 20px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.3)' }}>
      <span>P</span>
      olicy
      <span>A</span>
      ngel
    </span>
  );
};
