# 🎨 Visual Design Guide

## Color Palette Overview

### Primary Colors
```
INDIGO (#6366f1)     TEAL (#0891b2)
████████████         ████████████
Professional         Complementary
Trustworthy          Accents
Used for:            Used for:
- Main buttons       - Gradients
- Links              - Secondary
- Focus states       - Highlights
```

### Health Metrics
```
RED (#ef4444)       PURPLE (#8b5cf6)    GREEN (#10b981)
████████████        ████████████        ████████████
Calories            Sleep               Steps
Energy/Fuel         Rest/Recovery       Activity

PINK (#ec4899)      AMBER (#f59e0b)     BLUE (#3b82f6)
████████████        ████████████        ████████████
Heart Rate          Mood                Water
Cardiovascular      Wellness            Hydration
```

### Status Colors
```
EMERALD (#10b981)   RED (#ef4444)       AMBER (#f59e0b)    BLUE (#3b82f6)
████████████        ████████████        ████████████       ████████████
Success             Danger              Warning            Info
Completed actions   Delete/Error        Pending actions    Hints/Info
```

---

## Component Styling Examples

### Button Variations

#### Primary Button
```
████████████████████████████
█  Login  █  Sign Up  █
████████████████████████████
Background: Indigo (#6366f1)
Text: White
Hover: Darker Indigo (#4f46e5)
Focus: Blue outline
```

#### Danger Button
```
████████████████████████████
█  Delete Entry  █
████████████████████████████
Background: Red (#ef4444)
Text: White
Hover: Darker Red (#dc2626)
```

#### Secondary Button
```
████████████████████████████
█  Cancel  █
████████████████████████████
Background: Gray (#e5e7eb)
Text: Dark Gray (#111827)
Hover: Darker Gray (#d1d5db)
```

---

### Form Inputs

#### Default State
```
┌─────────────────────────┐
│ Enter email...          │
└─────────────────────────┘
Border: #d1d5db (gray)
```

#### Focus State
```
┌─────────────────────────┐
│ test@example.com        │
└─────────────────────────┘
Border: #6366f1 (indigo)
Shadow: rgba(99, 102, 241, 0.1)
```

#### Disabled State
```
┌─────────────────────────┐
│ Disabled input...       │
└─────────────────────────┘
Background: #f3f4f6
Color: #6b7280
Opacity: 50%
```

---

### Dashboard Cards

#### Single Card Layout
```
┌──────────────────────┐
│  🍽️                  │
│                      │
│  Calories            │
│  2,150 kcal          │
└──────────────────────┘
Top Border: Red gradient
Icon: 48px with gradient background
Hover: Lift up 4px
Shadow: Expands on hover
```

#### Grid Layout (3 columns)
```
┌──────────────┬──────────────┬──────────────┐
│ 🍽️ Calories  │ 😴 Sleep     │ 👟 Steps     │
│    2,150     │    7.5       │    8,432     │
│     kcal     │     hrs      │    steps     │
├──────────────┼──────────────┼──────────────┤
│ ❤️ Heart     │ 😊 Mood      │ 💧 Water     │
│      72      │    Good      │      6       │
│     bpm      │              │    cups      │
└──────────────┴──────────────┴──────────────┘
```

---

### Sidebar Navigation

#### Structure
```
┌─────────────────────────┐
│  HealthTrack            │
│  user@example.com       │
├─────────────────────────┤
│ 📊 Dashboard            │
│ ✏️ Add Entry            │
│ 📋 History              │
│ 📈 Weekly Report        │
│ 🤖 AI Chat              │
├─────────────────────────┤
│  [🚪 Logout Button]     │
└─────────────────────────┘
```

#### Hover State
```
───────────────────────────
│ 📊 Dashboard            │  ← Gray background
│                         │     Indigo left border
│                         │     Indigo text
───────────────────────────
```

#### Active State
```
───────────────────────────
│ 📊 Dashboard            │  ← Blue-tinted background
│                         │     Indigo left border (3px)
│                         │     Indigo text (bold)
───────────────────────────
```

---

### Chat Messages

#### User Message (Right Side)
```
                    ┌─────────────────────┐
                    │ Can I improve my     │
                    │ sleep schedule?      │
                    └─────────────────────┘
                    Gradient: Indigo to Dark
                    Color: White text
                    Shadow: Subtle
```

#### Assistant Message (Left Side)
```
┌─────────────────────────────────────┐
│ Absolutely! Here are some tips...    │
│ 1. Set consistent sleep schedule     │
│ 2. Avoid screens before bed          │
└─────────────────────────────────────┘
Background: Light gray (#f3f4f6)
Border: 1px gray
Color: Dark text
```

---

### Error Banner

```
┌──────────────────────────────────────┐
│ ⚠️ Invalid email format          ×   │
└──────────────────────────────────────┘
Background: Light red (#fee2e2)
Border: 1px light red (#fecaca)
Text: Dark red (#991b1b)
Auto-dismiss: 5 seconds
```

---

### Loading Spinner

```
     ┌─────┐
    ╱       ╲
   │         │  Rotating
    ╲       ╱
     └─────┘
     
Size: 40px
Color: Indigo (#6366f1)
Speed: 1s rotation
```

---

## Typography Scale

```
H1 - 28px, 700 weight
This is your health dashboard

H2 - 24px, 700 weight
Today's Summary

H3 - 18px, 600 weight
Basic Stats

Body - 14px, 400 weight
This is regular body text for content

Small - 12px, 500 weight
This is small text for labels
```

---

## Spacing System

```
XS:  4px   (━━)
SM:  8px   (━━━━)
MD: 16px   (━━━━━━━━)
LG: 24px   (━━━━━━━━━━━━)
XL: 32px   (━━━━━━━━━━━━━━━━)
2XL:48px   (━━━━━━━━━━━━━━━━━━━━━━━━)
3XL:64px   (━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━)
```

---

## Shadow Hierarchy

### Small Shadow (Cards)
```
┌─────────────┐
│  Card       │   ╰╮ Subtle elevation
│             │    │
└─────────────┘ ╭╯
Box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
```

### Medium Shadow (Hover States)
```
┌─────────────┐
│  Card       │   ╰╮╮ More prominent
│             │    ││
└─────────────┘ ╭╯╭╯
Box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
```

### Large Shadow (Modals)
```
┌─────────────┐
│  Card       │   ╰╮╮╮ Strong elevation
│             │    │││
└─────────────┘ ╭╯╭╯╭╯
Box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
```

---

## Animation Timings

```
Fast:  150ms (quick feedback)
       Button clicks, hover effects

Normal: 200ms (standard)
        Page transitions, menu slides

Slow:  300ms (important animations)
       Modal appearances, complex transitions
```

---

## Responsive Layout

### Desktop (> 1024px)
```
┌──────────┬─────────────────────────┐
│          │                         │
│ Sidebar  │                         │
│  280px   │   Main Content          │
│          │   (flex: 1)             │
│          │                         │
└──────────┴─────────────────────────┘
```

### Tablet (768px - 1024px)
```
┌──────────┬─────────────────────────┐
│ Sidebar  │                         │
│  260px   │   Main Content          │
│          │                         │
└──────────┴─────────────────────────┘
(Adjusted spacing)
```

### Mobile (< 768px)
```
┌─────────────────────────┐
│ Sidebar (Horizontal)    │
├─────────────────────────┤
│                         │
│   Main Content          │
│   (Full Width)          │
│                         │
└─────────────────────────┘
```

---

## Color Palette Quick Reference

| Color | Hex | RGB | Use |
|-------|-----|-----|-----|
| Indigo | #6366f1 | 99, 102, 241 | Primary buttons, links |
| Indigo Dark | #4f46e5 | 79, 70, 229 | Hover states |
| Indigo Light | #818cf8 | 129, 140, 248 | Backgrounds |
| Teal | #0891b2 | 8, 145, 178 | Secondary, gradients |
| Teal Light | #06b6d4 | 6, 182, 212 | Accents |
| Red | #ef4444 | 239, 68, 68 | Calories, danger |
| Purple | #8b5cf6 | 139, 92, 246 | Sleep |
| Green | #10b981 | 16, 185, 129 | Steps, success |
| Pink | #ec4899 | 236, 72, 153 | Heart rate |
| Amber | #f59e0b | 245, 158, 11 | Mood, warning |
| Blue | #3b82f6 | 59, 130, 246 | Water, info |

---

## Brand Identity

```
🏥 Health Focus
Colors: Green, blue, calm tones

💼 Professional
Colors: Indigo, structured, organized

✨ Modern
Colors: Gradients, smooth transitions

🎯 Clear Purpose
Colors: Semantic, meaningful usage
```

---

**Design System Complete!** ✨

All colors, spacings, and components follow this guide for consistency throughout the app.
