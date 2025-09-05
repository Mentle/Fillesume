# MaskedLiquidChrome Component Guide

A reusable React component that creates stunning masked liquid chrome effects with automatic shadow generation.

## Quick Start

```jsx
import MaskedLiquidChrome from './components/MaskedLiquidChrome';

// Basic usage - just provide a mask image
<MaskedLiquidChrome maskImage="images/your-mask.png" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `maskImage` | string | **required** | Path to PNG mask (relative to public folder) |
| `baseColor` | string | `"#FFFCF1"` | Base color for liquid chrome |
| `highlightColor` | string | `"#F6B2B2"` | Highlight color for liquid chrome |
| `overlayColor` | string | `"var(--orchid-white)"` | Color covering non-cutout areas |
| `speed` | number | `0.5` | Animation speed (0-2) |
| `amplitude` | number | `0.4` | Wave intensity (0-1) |
| `shadowIntensity` | number | `0.4` | Shadow opacity (0-1) |
| `shadowStart` | number | `50` | Shadow gradient start % |
| `shadowEnd` | number | `90` | Shadow gradient end % |
| `shadowColor` | string | `"rgba(31, 15, 20, 1)"` | Shadow color |
| `interactive` | boolean | `false` | Mouse interaction for chrome |
| `className` | string | `""` | Additional CSS classes |
| `children` | ReactNode | - | Content rendered on top |

## Examples

### Hero Section Background
```jsx
<div className="hero-section">
  <MaskedLiquidChrome 
    maskImage="images/hero-cutouts.png"
    baseColor="#FFE5B4"
    highlightColor="#FF6B6B"
    shadowIntensity={0.6}
  >
    <h1>Your Hero Content</h1>
  </MaskedLiquidChrome>
</div>
```

### Interactive Card
```jsx
<MaskedLiquidChrome 
  maskImage="images/card-mask.png"
  interactive={true}
  speed={0.8}
  amplitude={0.6}
  className="product-card"
>
  <div className="card-content">
    <h3>Product Name</h3>
    <p>Description</p>
  </div>
</MaskedLiquidChrome>
```

### Subtle Background Effect
```jsx
<MaskedLiquidChrome 
  maskImage="images/subtle-pattern.png"
  shadowIntensity={0.2}
  speed={0.3}
  overlayColor="#FAFAFA"
/>
```

### Custom Shadow Styling
```jsx
<MaskedLiquidChrome 
  maskImage="images/dramatic-cutouts.png"
  shadowColor="rgba(0, 0, 0, 1)"
  shadowIntensity={0.8}
  shadowStart={30}
  shadowEnd={100}
/>
```

## Mask Image Requirements

- **Format**: PNG with transparency
- **Colors**: White areas = cutouts (liquid chrome visible), Black/transparent = covered areas
- **Resolution**: Match your container size for best quality
- **Location**: Place in `public/images/` folder

## CSS Customization

The component uses these CSS classes for additional styling:

```css
.masked-liquid-chrome {
  /* Container styles */
}

.masked-liquid-chrome__content {
  /* Styles for children content */
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

## Tips

1. **Performance**: Use `interactive={false}` for background effects
2. **Shadows**: Start with `shadowIntensity={0.3-0.5}` and adjust
3. **Colors**: Match `overlayColor` to your page background
4. **Masks**: High contrast masks work best (pure white cutouts)
5. **Responsive**: Component inherits container dimensions

## Layer Structure

1. **Liquid Chrome** (bottom) - Animated background
2. **Shadow Layer** - Radial gradient in cutouts only  
3. **Mask Overlay** - Solid color covering non-cutouts
4. **Content** (top) - Your React children

Perfect for hero sections, product showcases, decorative backgrounds, and any area where you want that premium liquid chrome effect with elegant shadows!
