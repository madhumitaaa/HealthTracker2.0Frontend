# Quick Feature Guide

## 🔐 Testing Login/Register

**Test Account (Auto Works in Demo Mode)**
```
Email: test@example.com
Password: anything
```

Or use your own email - it will auto-login in demo mode!

---

## 📊 Dashboard Features

**View Today's Health Summary**
- 6 Color-coded metric cards
- Real-time data (or demo data if backend unavailable)
- Professional gradients and icons
- Responsive grid layout

---

## ➕ Add New Entry

**Track Your Health**
1. Select date
2. Fill in 6 metrics: Calories, Sleep, Steps, Heart Rate, Water
3. Select mood (Poor/Neutral/Good/Excellent)
4. Add symptoms (Headache, Fatigue, etc.)
5. Add optional notes
6. Submit

**Demo Mode**: Entry saves locally even without backend

---

## 📜 History Page

**View Past Entries**
1. See all your health entries
2. Click to expand details
3. Edit or Delete entries
4. Demo data available

---

## 📈 Weekly Report

**Generate AI Report**
1. Click "Generate Weekly Report"
2. AI analyzes your weekly patterns
3. Professional formatted report
4. Demo mode: Shows sample report

---

## 🤖 AI Chat

**Chat with Health Assistant**
1. Type your health question
2. Get instant advice
3. Messages with typing animation
4. Demo mode: Sample responses

---

## 🎨 Color Scheme

| Color | Use | Hex |
|-------|-----|-----|
| Indigo | Primary buttons, hover states | #6366f1 |
| Teal | Secondary accents | #0891b2 |
| Red | Calories, danger actions | #ef4444 |
| Purple | Sleep metrics | #8b5cf6 |
| Green | Steps, success states | #10b981 |
| Pink | Heart rate | #ec4899 |
| Amber | Mood, warnings | #f59e0b |
| Blue | Water, info | #3b82f6 |

---

## 💻 Frontend Structure

```
src/
├── api/               # API calls (auth, entries, AI)
├── components/        # Reusable components
│   ├── common/       # Buttons, Loaders, ErrorBanner
│   └── layout/       # Sidebar, AppLayout
├── pages/            # Full page components
│   ├── auth/         # Login, Register
│   ├── Dashboard     # Health summary
│   ├── AddEntry      # Form to add entry
│   ├── History       # View past entries
│   ├── WeeklyReport  # AI report
│   └── AIChat        # Chat interface
├── context/          # AuthContext for state
├── routes/           # PrivateRoute, PublicRoute
├── styles/           # CSS files (organized by feature)
└── App.jsx           # Main routing
```

---

## 🚀 Running the App

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Server runs on http://localhost:5174
```

---

## ✨ Professional Touches

✅ Gradient backgrounds and animations
✅ Smooth transitions on all interactions
✅ Color-coded health metrics
✅ Professional error messages
✅ Loading states with animations
✅ Responsive design (mobile, tablet, desktop)
✅ Keyboard navigation support
✅ Accessibility features (labels, ARIA)
✅ Demo mode fallback
✅ Auto-dismiss error banners

---

## 🔒 Security Notes

- ✅ Token stored in localStorage
- ✅ Token included in all API requests
- ✅ 401 errors redirect to login
- ✅ Private routes protected
- ✅ Public routes prevent authenticated users

---

## 📝 Demo Mode

All features automatically fallback to demo mode when backend is unavailable:
- ✅ Login/Register accepts any email/password
- ✅ Dashboard shows sample data
- ✅ History has sample entries
- ✅ Weekly report generates sample text
- ✅ AI chat provides sample responses

No backend needed to test the UI!

---

**Ready to impress! 🎉**
