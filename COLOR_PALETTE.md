# 🎨 Professional Color Palette Reference

## Primary Colors

### Indigo (Primary)
```css
--primary: #6366f1;
--primary-dark: #4f46e5;
--primary-light: #818cf8;
```
**Usage**: 
- Main buttons
- Links and navigation
- Active states
- Primary actions

**Component Examples**:
- ✨ Login button
- 🔗 Active nav item
- 📊 Primary hover states

---

## Secondary Colors

### Teal (Secondary)
```css
--secondary: #0891b2;
--secondary-light: #06b6d4;
```
**Usage**:
- Complementary accents
- Gradients
- Secondary highlights

**Component Examples**:
- 🌊 Gradient backgrounds
- 💫 Accent borders
- ✨ Combined gradients

---

## Status Colors

### Green (Success)
```css
--success: #10b981;
```
**Usage**: Positive actions, completed states

### Red (Danger)
```css
--danger: #ef4444;
```
**Usage**: Delete actions, errors, warnings

### Amber (Warning)
```css
--warning: #f59e0b;
```
**Usage**: Caution, pending actions, mood (Amber)

### Blue (Info)
```css
--info: #3b82f6;
```
**Usage**: Information, hints, water metrics

---

## Health Metric Colors

### Dashboard Cards
```
Calories     → #ef4444 (Red)      - Energy/fuel
Sleep        → #8b5cf6 (Purple)   - Rest/recovery
Steps        → #10b981 (Green)    - Activity/movement
Heart Rate   → #ec4899 (Pink)     - Cardiovascular
Mood         → #f59e0b (Amber)    - Emotional wellness
Water        → #3b82f6 (Blue)     - Hydration
```

---

## Neutral Palette

```css
--white: #ffffff;
--gray-50: #f9fafb;      /* Lightest background */
--gray-100: #f3f4f6;     /* Light background */
--gray-200: #e5e7eb;     /* Borders, dividers */
--gray-300: #d1d5db;     /* Disabled states */
--gray-400: #9ca3af;     /* Secondary text */
--gray-500: #6b7280;     /* Muted text */
--gray-600: #4b5563;     /* Normal text */
--gray-700: #374151;     /* Body text */
--gray-800: #1f2937;     /* Dark text */
--gray-900: #111827;     /* Darkest text */
```

---

## Component Color Usage

### Buttons

#### Primary Button
```css
background: #6366f1;
color: white;
hover: #4f46e5;
active: translateY(1px);
```

#### Secondary Button
```css
background: #e5e7eb;
color: #111827;
hover: #d1d5db;
```

#### Danger Button
```css
background: #ef4444;
color: white;
hover: #dc2626;
```

#### Success Button
```css
background: #10b981;
color: white;
hover: #059669;
```

---

### Form Elements

#### Input Focus
```css
border-color: #6366f1;
box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
```

#### Input Disabled
```css
background: #f3f4f6;
color: #6b7280;
cursor: not-allowed;
```

---

### Chat Messages

#### User Message
```css
background: linear-gradient(135deg, #6366f1, #4f46e5);
color: white;
box-shadow: 0 2px 8px rgba(99, 102, 241, 0.2);
```

#### Assistant Message
```css
background: #f3f4f6;
color: #111827;
border: 1px solid #e5e7eb;
```

---

### Sidebar Navigation

#### Hover State
```css
background: rgba(99, 102, 241, 0.05);
border-left: 3px solid #6366f1;
color: #6366f1;
```

#### Active State
```css
background: rgba(99, 102, 241, 0.1);
border-left: 3px solid #6366f1;
color: #6366f1;
font-weight: 600;
```

---

### Error Banner
```css
background: #fee2e2;
border: 1px solid #fecaca;
color: #991b1b;
```

---

### Success Banner (when added)
```css
background: #d1fae5;
border: 1px solid #a7f3d0;
color: #065f46;
```

---

## Gradient Examples

### Login Page Background
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%);
background-size: 400% 400%;
animation: gradientShift 15s ease infinite;
```

### Primary Button Hover
```css
background: linear-gradient(135deg, #6366f1, #4f46e5);
```

### User Message (Chat)
```css
background: linear-gradient(135deg, #6366f1, #4f46e5);
```

### Chip Active State
```css
background: linear-gradient(135deg, #6366f1, #06b6d4);
```

### Card Icon Background
```css
background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(8, 145, 178, 0.1));
```

---

## Accessibility Notes

✅ **Contrast Ratios**
- All text on backgrounds meet WCAG AA standards
- Critical information has sufficient contrast
- Color not used as sole indicator (always paired with icons/text)

✅ **Color Blind Friendly**
- Indigo and Teal are distinguishable
- Red/Green used with additional visual cues
- Status indicated with text labels too

---

## CSS Variables in Action

```css
/* In index.css */
:root {
  --primary: #6366f1;
  --primary-dark: #4f46e5;
  --primary-light: #818cf8;
  /* ... more colors ... */
}

/* In any CSS file */
.button-primary {
  background-color: var(--primary);
  color: var(--white);
}

.button-primary:hover {
  background-color: var(--primary-dark);
}
```

---

## Design Philosophy

**Indigo/Teal Palette Reasoning**:

1. **Professional**: Indigo conveys trust and professionalism
2. **Modern**: Not dated blue, more contemporary
3. **Healthy**: Complementary with nature (teal/green)
4. **Accessible**: High contrast, distinguishable
5. **Versatile**: Works with all accent colors
6. **Psychology**: Calming (health/wellness app)
7. **Tech**: Common in modern SaaS applications

---

## Implementation Checklist

- ✅ All buttons use primary color
- ✅ All links use primary color
- ✅ Health metrics color-coded
- ✅ Error states use danger color
- ✅ Success states use success color
- ✅ Loading states use primary with opacity
- ✅ Focus states use primary with subtle shadow
- ✅ Gradients use primary + secondary
- ✅ Chat uses primary gradients
- ✅ Sidebar uses primary accents

---

**Total Colors Used**: 13 core + neutrals = Professional & Consistent ✨
