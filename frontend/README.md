# Sky States React Frontend

## 🚀 Quick Start

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start Development Server:**
   ```bash
   npm start
   ```

3. **Open in Browser:**
   Navigate to `http://localhost:3000`

## ✨ Features

- **React Router** for seamless navigation between pages
- **Component-based architecture** for better maintainability
- **No page refresh** when switching between Home and Jobs
- **Responsive design** that works on all devices
- **Mock data** for jobs and programs (no backend required)

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.js          # Navigation header
│   ├── Footer.js          # Footer component
│   ├── Home.js            # Homepage container
│   ├── Hero.js            # Hero section
│   ├── About.js           # About section
│   ├── Features.js        # Features grid
│   ├── Programs.js        # Program cards
│   ├── Testimonials.js    # Student testimonials
│   ├── Newsletter.js      # Newsletter signup
│   └── Jobs.js            # Jobs listing page
├── App.js                 # Main app with routing
├── index.js              # App entry point
└── index.css             # Global styles
```

## 🎯 Navigation

- **Home** (`/`) - Main landing page
- **Jobs** (`/jobs`) - Job listings page

## 🔧 Fixing Page Refresh Issue

The page refresh issue has been fixed by:
1. Moving Header/Footer outside of Routes
2. Creating a proper layout structure
3. Using React Router correctly

Now when you click between Home and Jobs pages, it will be instant without any refresh!

## 🎨 Styling

All styles are in `index.css` and include:
- Responsive design
- Modern animations
- Hover effects
- Mobile-friendly navigation

## 📱 Testing

Test the navigation by:
1. Clicking "Live Job" in the navigation
2. Clicking "Home" to return
3. Both transitions should be instant without refresh
