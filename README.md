# 🧬 Soundverse DNA - Music Style Explorer

A pixel-perfect recreation of the Soundverse DNA interface featuring advanced audio playback, beautiful micro-interactions, and an immersive music exploration experience built with Next.js, TypeScript, and Howler.js.

![Next.js](https://img.shields.io/badge/Next.js-16.0.4-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwind-css)

---

## 🚀 Setup & Run Instructions

### Prerequisites
- **Node.js** 18.0 or higher
- **npm**, **yarn**, or **pnpm** package manager

### Installation

1. **Navigate to the frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - The page will auto-reload when you make changes

### Production Build

```bash
# Build for production
npm run build

# Run production build locally
npm start
```

### Other Commands

```bash
# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

---

## 🛠️ Tech Stack

### Framework & Core
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.0.4 | React framework with App Router, server components, and API routes |
| **React** | 19.2.0 | UI library for building interactive interfaces |
| **TypeScript** | 5.0 | Type safety and enhanced developer experience |

### Styling & Animation
| Technology | Version | Purpose |
|------------|---------|---------|
| **Tailwind CSS** | 4.0 | Utility-first CSS framework for rapid UI development |
| **Framer Motion** | 12.0 | Advanced animations, transitions, and micro-interactions |
| **Custom CSS** | - | Fine-tuned styles for range inputs, gradients, and special effects |

### Audio & State Management
| Technology | Version | Purpose |
|------------|---------|---------|
| **Howler.js** | 2.2.4 | Professional web audio library for robust playback |
| **Zustand** | 5.0 | Lightweight global state management |
| **React Context** | - | Audio player context provider |
| **LocalStorage API** | - | Persistent state across browser sessions |

### Development Tools
| Technology | Version | Purpose |
|------------|---------|---------|
| **ESLint** | 9.0 | Code linting and quality enforcement |
| **TypeScript Types** | - | @types/react, @types/node, @types/howler |

### Fonts & Assets
- **PowerGrotesk** - Custom font for headings (DNA branding)
- **Inter** - System font for body text
- **Next.js Image** - Optimized image loading and rendering

---

## ✨ Features

### 🎵 Advanced Audio System
- **Howler.js Integration**: Professional-grade web audio with seamless playback
- **Global Player Bar**: Fixed bottom player that persists across all interactions
- **Queue Management**: Automatic playlist with next/previous track navigation
- **Real-time Progress**: Smooth progress bar with dot synchronized to music timeline
- **Volume Control**: Interactive volume slider with mute functionality (desktop)
- **Persistent State**: Remembers last track, volume, mute, and playback position

### ⌨️ Keyboard Shortcuts
Complete keyboard control for power users:
- `Space` or `K` - Play/Pause
- `←` / `→` - Seek backward/forward (5 seconds)
- `↑` / `↓` - Volume up/down
- `M` - Mute/Unmute
- `N` - Next track
- `P` - Previous track
- `Ctrl/⌘ + ?` - Show keyboard shortcuts help

### 🎨 Beautiful UI/UX
- **Micro-Interactions**: Smooth animations on every element
  - Hover effects with dynamic shadows and lifts
  - Play button appears with fade/scale animation
  - Gradient accent highlighting per style
  - Animated waveform badge on cards
- **Panel System**: Collapsible left DNA panel with smooth animations
- **Tab Navigation**: Animated tab switching with visual indicators
- **Loading States**: Skeleton loaders with shimmer effects
- **Error Handling**: Graceful error boundaries with toast notifications

### 🎭 Music Style Library
**8 Curated Styles**:
- **Core Styles (6)**: Dubstep, Big Room, Piano House, Progressive House, Folktronica, EDM
- **Signature Sounds (2)**: Ambient Chop, Hyperpop

Each style includes:
- Custom artwork and accent color
- Detailed description and mood tags
- High-quality audio preview
- Hover interactions with play functionality

### 📱 Fully Responsive Design
- **Mobile-First**: Optimized for all screen sizes (320px - 4K)
- **Breakpoints**: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- **Touch-Optimized**: Large touch targets (44px+), gesture-friendly
- **Adaptive Layout**: 
  - Mobile: Hamburger menu, overlay panels, 1-column grid
  - Tablet: 2-column grid, collapsible panels
  - Desktop: 3-column grid, inline panels, full controls

### ♿ Accessibility
- **Keyboard Navigation**: Full keyboard support for all features
- **ARIA Labels**: Comprehensive screen reader support
- **Focus Indicators**: Clear visual focus states
- **Touch Targets**: Minimum 44×44px for all interactive elements
- **Semantic HTML**: Proper heading hierarchy and landmarks

### 💾 Data Persistence
LocalStorage saves user preferences:
- Last played track and position
- Volume level and mute state
- Panel open/close states
- DNA panel selections (tab, output, lyrics)

---

## 📁 Project Structure

```
frontend/
├── app/
│   ├── api/
│   │   └── styles/
│   │       └── route.ts          # API endpoint for style presets
│   ├── fonts/                     # Custom fonts (PowerGrotesk, Inter)
│   ├── globals.css                # Global styles, animations, utilities
│   ├── layout.tsx                 # Root layout with audio provider
│   └── page.tsx                   # Main page with panel state management
├── components/
│   ├── AudioPlayer.tsx            # Audio context provider (Howler.js)
│   ├── GlobalPlayer.tsx           # Bottom playback bar with controls
│   ├── KeyboardShortcuts.tsx      # Shortcuts help modal
│   ├── largeSidebar.tsx           # Left DNA control panel
│   ├── mainContent.tsx            # Right content area with style cards
│   ├── sidebar.tsx                # Left icon navigation
│   ├── ErrorBoundary.tsx          # Error catching component
│   ├── LoadingSplash.tsx          # Initial loading screen
│   └── Toast.tsx                  # Notification system
├── data/
│   └── styles.ts                  # Style preset data with metadata
├── public/
│   ├── audio/                     # MP3 audio files
│   ├── music/                     # Cover art images
│   └── *.svg                      # Icon assets
└── README.md
```

---

## 🎯 Key Components

### AudioPlayer
- **Purpose**: Global audio context provider
- **Technology**: Howler.js with React Context
- **Features**: Queue system, auto-play next, time tracking (requestAnimationFrame), localStorage persistence
- **Key Methods**: `playTrack()`, `togglePlay()`, `seek()`, `setVolume()`, `nextTrack()`, `prevTrack()`

### GlobalPlayer
- **Purpose**: Fixed bottom playback UI
- **Features**: Album art, track info, play/pause/next/prev buttons, seek bar, volume slider
- **Responsive**: Adapts controls and spacing for mobile (volume hidden < 640px)
- **Synchronization**: Progress dot moves in real-time with music (0.1s linear transition)

### MainContent
- **Purpose**: Main content area with style cards grid
- **Features**: Tab switching, responsive grid (1-3 columns), loading skeletons, error states
- **API**: Fetches styles from `/api/styles`
- **Interactions**: Hover effects, play on click, waveform animations

### LeftSidebar (DNA Panel)
- **Purpose**: Music creation DNA controls
- **Features**: Collapsible with animation, tab selection, output type, lyrics textarea, "Attach Model" area
- **Responsive**: Fixed on mobile with overlay, inline on desktop
- **Persistence**: Saves all selections to localStorage

---

## 🔧 API Endpoints

### `GET /api/styles`
Returns all music style presets with metadata.

**Response:**
```json
{
  "data": [
    {
      "id": "dubstep",
      "title": "Dubstep",
      "description": "Wobbly, Punchy, Dark, Heavy, Aggressive",
      "mood": "Heaving low-end with razor-sharp drops.",
      "tags": ["Bass", "Syncopated", "Night"],
      "imageUrl": "/music/dubstep.png",
      "audioUrl": "/audio/dubstep.mp3",
      "category": "core",
      "accent": "#6949FF"
    }
    // ... more styles
  ]
}
```

---

## 🌐 Browser Compatibility

### Fully Supported
- ✅ Chrome/Edge 120+ (Desktop + Mobile)
- ✅ Safari 17+ (macOS + iOS)
- ✅ Firefox 121+ (Desktop + Mobile)

### CSS Features Used
- CSS Grid & Flexbox (IE11+ support)
- CSS Custom Properties (no IE support)
- Backdrop blur (Safari 9+, Chrome 76+, Firefox 103+)
- `touch-none` for gesture control

### JavaScript Features
- ES6+ (transpiled by Next.js)
- Async/await, LocalStorage, IntersectionObserver
- Web Audio API via Howler.js

---

## 📝 Assumptions & Known Limitations

### Audio Assets
- **Current**: Some style cards share placeholder audio files
- **Production**: Replace with unique audio stems per style
- **Format**: MP3 files (consider WebM/OGG for better compression)
- **Streaming**: Local files only; no CDN or streaming service integration

### Design & Layout
- **Primary Target**: Desktop screens ≥1024px (optimized for this viewing experience)
- **Mobile**: Fully functional but optimized as secondary experience
- **Landscape**: Small phones in landscape may have limited vertical space
- **Very Large Screens**: Content may need max-width constraints on 4K+ displays

### Backend & Data
- **Static API**: `/api/styles` serves JSON from filesystem
- **No Database**: No persistent storage beyond localStorage
- **No Authentication**: No user accounts or authentication system
- **No Server State**: All state is client-side

### Performance
- **Animations**: Relies on `prefers-reduced-motion: no-preference`; no custom reduced-motion fallbacks
- **Loading**: Initial load includes all fonts and essential assets
- **Audio Loading**: Audio files loaded on-demand when tracks play
- **Code Splitting**: Automatic via Next.js; consider lazy loading for modals

### Features Not Implemented
- User authentication and profiles
- Playlist creation and management
- Social sharing functionality
- Real-time waveform visualization
- Export to DAW (Digital Audio Workstation)
- AI-powered music recommendations
- Collaborative features
- Cloud storage for user data

### Browser Limitations
- **Internet Explorer**: Not supported (uses modern CSS/JS features)
- **Older Browsers**: May require polyfills for full functionality
- **Mobile Volume**: Volume slider hidden on mobile (space constraint; use device buttons)

---

## 🎨 Design System

### Color Palette
```css
Background:     #050505 (Deep black)
Panels:         #0b0b0b (Card backgrounds)
Borders:        rgba(255, 255, 255, 0.05-0.15)
Gradient:       #6a5bff → #a855f7 → #ff8bd5
Text Primary:   #ffffff
Text Secondary: rgba(255, 255, 255, 0.6-0.8)
```

### Typography
- **Headings**: PowerGrotesk (DNA branding)
- **Body**: Inter (high readability)
- **Letter Spacing**: Wide tracking (0.3-0.5em) for uppercase labels

### Animation Principles
- **Duration**: 150-300ms for micro-interactions, 250ms for panel transitions
- **Easing**: `easeOut` for entrances, `easeInOut` for state changes
- **Hover**: Subtle Y-axis lift (-6 to -8px) with shadow increase
- **Active**: Scale down (0.95-0.98) for tactile feedback
- **Progress**: Linear transitions (0.1s) for smooth music sync

---

## 👨‍💻 Development Notes

### Code Quality Standards
- **TypeScript Strict Mode**: Full type safety throughout
- **ESLint**: Enforced code style and best practices
- **Component Structure**: Modular, reusable components
- **Performance**: Optimized rendering with useMemo, useCallback
- **Accessibility**: WCAG 2.1 AA compliance

### Best Practices Followed
- React 19 conventions (hooks, context, composition)
- Next.js App Router patterns (server components, API routes)
- Tailwind CSS utility-first approach
- Framer Motion for performance-optimized animations
- LocalStorage for simple persistence (no complex state management needed)


