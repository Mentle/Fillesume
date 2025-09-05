import React from 'react';
import LiquidChrome from './LiquidChrome';
import './MaskedLiquidChrome.css';

/**
 * MaskedLiquidChrome - A reusable component that combines liquid chrome background
 * with PNG mask cutouts and automatic shadow effects
 * 
 * @param {string} maskImage - Path to the PNG mask image (relative to public folder)
 * @param {string} baseColor - Base color for liquid chrome (default: "#FFFCF1")
 * @param {string} highlightColor - Highlight color for liquid chrome (default: "#F6B2B2")
 * @param {string} overlayColor - Color for the mask overlay (default: "var(--orchid-white)")
 * @param {number} speed - Animation speed for liquid chrome (default: 0.5)
 * @param {number} amplitude - Wave amplitude for liquid chrome (default: 0.4)
 * @param {number} shadowIntensity - Shadow opacity (0-1, default: 0.4)
 * @param {number} shadowStart - Shadow blur start percentage - where shadow begins to fade (default: 50)
 * @param {number} shadowEnd - Shadow blur end percentage - where shadow becomes fully transparent (default: 90)
 * @param {string} shadowColor - Shadow color (default: "rgba(31, 15, 20, 1)")
 * @param {number} shadowCenterX - Shadow center X position (0-100, default: 50)
 * @param {number} shadowCenterY - Shadow center Y position (0-100, default: 50)
 * @param {number} shadowWidth - Shadow ellipse width (0-100, default: 60)
 * @param {number} shadowHeight - Shadow ellipse height (0-100, default: 80)
 * @param {number} shadowFalloff - Shadow falloff distance (0-100, default: 40)
 * @param {boolean} interactive - Whether liquid chrome responds to mouse (default: false)
 * @param {string} className - Additional CSS classes
 * @param {object} style - Additional inline styles
 * @param {React.ReactNode} children - Content to render on top of the masked chrome
 */
const MaskedLiquidChrome = ({
  maskImage,
  baseColor = "#FFFCF1",
  highlightColor = "#F6B2B2",
  overlayColor = "var(--orchid-white)",
  speed = 0.5,
  amplitude = 0.4,
  shadowIntensity = 0.4,
  shadowStart = 50,
  shadowEnd = 90,
  shadowColor = "rgba(31, 15, 20, 1)",
  shadowCenterX = 50,
  shadowCenterY = 50,
  shadowWidth = 60,
  shadowHeight = 80,
  shadowFalloff = 40,
  interactive = false,
  className = "",
  style = {},
  children,
  ...props
}) => {
  if (!maskImage) {
    console.warn('MaskedLiquidChrome: maskImage prop is required');
    return null;
  }

  const maskImageUrl = `url(${process.env.PUBLIC_URL}/${maskImage})`;
  
  // Create shadow color with specified intensity
  const shadowColorWithIntensity = shadowColor.includes('rgba') 
    ? shadowColor.replace(/[\d.]+\)$/, `${shadowIntensity})`)
    : `rgba(31, 15, 20, ${shadowIntensity})`;

  // Calculate shadow ellipse dimensions and position
  const centerX = shadowCenterX;
  const centerY = shadowCenterY;
  const ellipseWidth = shadowWidth;
  const ellipseHeight = shadowHeight;

  return (
    <div 
      className={`masked-liquid-chrome ${className}`}
      style={style}
      {...props}
    >
      {/* Liquid Chrome Background */}
      <LiquidChrome
        baseColor={baseColor}
        highlightColor={highlightColor}
        speed={speed}
        amplitude={amplitude}
        interactive={interactive}
        className="masked-liquid-chrome__background"
      />
      
      {/* Shadow Layer - Creates radial shadow from customizable ellipse center */}
      <div 
        className="masked-liquid-chrome__shadow"
        style={{
          background: `radial-gradient(ellipse ${ellipseWidth}% ${ellipseHeight}% at ${centerX}% ${centerY}%, transparent ${shadowStart}%, ${shadowColorWithIntensity} ${shadowEnd}%, ${shadowColorWithIntensity} ${shadowEnd + shadowFalloff}%)`,
          maskImage: maskImageUrl,
          WebkitMaskImage: maskImageUrl,
          maskSize: 'cover',
          WebkitMaskSize: 'cover',
          maskPosition: 'center',
          WebkitMaskPosition: 'center',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat'
        }}
      />
      
      {/* Mask Overlay - Covers everything except cutouts */}
      <div 
        className="masked-liquid-chrome__overlay"
        style={{
          backgroundColor: overlayColor,
          maskImage: maskImageUrl,
          WebkitMaskImage: maskImageUrl,
          maskSize: 'cover',
          WebkitMaskSize: 'cover',
          maskPosition: 'center',
          WebkitMaskPosition: 'center',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskMode: 'luminance',
          WebkitMaskMode: 'luminance',
          maskComposite: 'subtract',
          WebkitMaskComposite: 'subtract'
        }}
      />
      
      {/* Content Layer */}
      {children && (
        <div className="masked-liquid-chrome__content">
          {children}
        </div>
      )}
    </div>
  );
};

export default MaskedLiquidChrome;
