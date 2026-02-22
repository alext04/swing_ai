# SwingAI 🏏

**AI-Powered Cricket Performance Analysis Platform**

SwingAI is a comprehensive cricket analytics platform that uses AI-powered video analysis to provide detailed insights into batting and bowling performance. Built with React, TypeScript, and modern web technologies, it offers real-time feedback, progress tracking, and team management capabilities.

---

## 🚀 Features

### For Players

#### 🏏 Batting Analysis
- **Video Upload & AI Analysis**: Upload batting videos for automated swing analysis
- **Performance Metrics**: 
  - Bat speed measurement (km/h)
  - Backlift angle analysis
  - Elbow position tracking
  - Weight transfer assessment
  - Follow-through quality
  - Timing and balance metrics
  - Head position monitoring
- **Shot Type Detection**: Automatic classification of shots (cover drive, pull shot, square cut, etc.)
- **Progress Tracking**: Visual charts showing improvement over time
- **Personalized Feedback**: AI-generated strengths and areas for improvement

#### 🎳 Bowling Analysis
- **Bowling Action Analysis**: Complete biomechanical assessment
- **Performance Metrics**:
  - Ball release speed (km/h)
  - Arm angle consistency
  - Elbow extension monitoring (no-ball detection)
  - Release point accuracy
  - Follow-through completion
  - Run-up speed analysis
  - Balance and landing position
- **Delivery Type Recognition**: Yorker, bouncer, good length, slower ball, etc.
- **Line & Length Tracking**: Accuracy percentage and distribution
- **Bowling Action Classification**: Side-on, front-on, or mixed action detection

#### 📊 Progress Dashboard
- **Unified View**: Toggle between batting, bowling, or all-stats view
- **Performance Trends**: Interactive charts showing improvement over time
- **Achievement System**: Unlock milestones and track accomplishments
- **Goal Setting**: Set and monitor performance targets
- **Practice Tracking**: Log training sessions and monitor workload

### For Coaches

#### 👥 Team Management
- **Player Roster**: Complete team database with detailed profiles
- **Role-Based Display**: Batsmen, bowlers, all-rounders, wicket-keepers
- **Player Search & Filters**: Find players by name, role, or injury status
- **Add/Remove Players**: Dynamic team roster management
- **Individual Player Profiles**: Detailed stats and performance history

#### 📈 Team Analytics
- **Team Performance Overview**: Aggregate statistics across all players
- **Comparative Analysis**: Compare player performances side-by-side
- **Performance Trends**: Team-wide improvement tracking
- **Delivery Type Breakdown**: Analyze team's bowling variety
- **Shot Type Analysis**: Understand batting strengths across the team

#### 🏥 Medical Reports
- **Injury Tracking**: Comprehensive injury database with severity levels
- **Recovery Monitoring**: Track rehabilitation progress
- **Return-to-Play Dates**: Expected recovery timelines
- **Medical Notes**: Detailed treatment plans and doctor assignments
- **Workload Management**: Monitor bowling loads and rest periods
- **Injury Prevention**: Identify patterns and risk factors

#### 📋 Report Generation
- **PDF Reports**: Generate professional performance reports
- **Team Summaries**: Aggregate team statistics and insights
- **Player Profiles**: Individual performance documentation
- **Medical Summaries**: Injury status reports for medical staff
- **Export Options**: Download or print reports for offline review

---

## 🛠️ Technology Stack

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type-safe development
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **React Bootstrap** - Responsive layout components
- **Framer Motion** - Animations and transitions
- **Recharts** - Data visualization and charts
- **MDI Icons** - Material Design icon library

### Styling & Theming
- **CSS Custom Properties** - Dynamic theming system
- **JSON Theme Configuration** - Centralized color management
- **Responsive Design** - Mobile-first approach
- **Dark Theme** - Eye-friendly dark mode interface

### Development Tools
- **ESLint** - Code quality and consistency
- **TypeScript Compiler** - Static type checking
- **Rollup** - Production bundling (via Vite)

---

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/swingai.git
cd swingai

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
swingai/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   └── Sidebar.tsx    # Navigation sidebar
│   ├── pages/             # Page components
│   │   ├── Dashboard.tsx          # Main dashboard
│   │   ├── SwingAnalysis.tsx      # Batting analysis
│   │   ├── BowlingAnalysis.tsx    # Bowling analysis
│   │   ├── ProgressTracking.tsx   # Batting progress
│   │   ├── BowlingProgress.tsx    # Bowling progress
│   │   ├── TeamManagement.tsx     # Team roster
│   │   ├── PlayerProfile.tsx      # Individual player stats
│   │   ├── MedicalReports.tsx     # Injury tracking
│   │   └── Settings.tsx           # User preferences
│   ├── theme.ts           # Theme injection and helpers
│   ├── theme.json         # Color configuration
│   ├── index.css          # Global styles
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Application entry point
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── README.md              # This file
```

---

## 🎨 Theming System

SwingAI uses a centralized theming system for easy customization:

### Theme Configuration (`src/theme.json`)

```json
{
  "background": {
    "dark": "#050505",
    "card": "rgba(28, 28, 30, 0.4)"
  },
  "primary": {
    "green": "#48A111",
    "greenLight": "#58B81E"
  },
  "bowling": {
    "main": "#48A111",
    "light": "#58B81E"
  },
  "semantic": {
    "success": "#48A111",
    "warning": "#F2B50B",
    "danger": "#954130"
  }
}
```

### Using Theme Colors

```typescript
import { colors } from '../theme';

// In components
<div style={{ color: colors.bowling }}>Bowling Stats</div>
```

---

## 🚦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `tsc -b` | Type-check the project |

---

## 📊 Key Metrics Tracked

### Batting Metrics
- **Bat Speed**: Average and peak speed (km/h)
- **Consistency Score**: Shot-to-shot reliability (0-100)
- **Backlift Angle**: Optimal angle for power generation
- **Elbow Position**: Technical correctness
- **Weight Transfer**: Efficiency of momentum usage
- **Follow Through**: Completion quality
- **Timing**: Ball contact precision
- **Balance**: Stability throughout the shot
- **Head Position**: Visual focus maintenance

### Bowling Metrics
- **Ball Speed**: Release velocity (km/h)
- **Accuracy**: Line and length precision (%)
- **Arm Angle**: Consistency of delivery arm
- **Elbow Extension**: Compliance monitoring (degrees)
- **Release Point**: Consistency of release
- **Follow Through**: Completion quality
- **Run-up Speed**: Approach velocity
- **Landing Position**: Crease proximity
- **Economy Rate**: Runs per over
- **Variation Detection**: Slower balls, cutters, etc.

---

## 👥 Player Roles

SwingAI supports comprehensive player role management:

| Role | Description | Stats Shown |
|------|-------------|-------------|
| **Batsman** | Primary batting role | Batting stats only |
| **Bowler** | Primary bowling role | Bowling stats only |
| **All-Rounder** | Both batting and bowling | Both stat sets |
| **Wicket-Keeper** | Keeper-batsman role | Batting + keeping stats |

---

## 🏥 Medical & Injury Tracking

### Injury Severity Levels
- **Low**: Minor issues, monitoring required
- **Moderate**: Requires rest and treatment
- **High**: Significant injury, extended rest
- **Critical**: Severe injury, medical intervention

### Injury Status Tracking
- **Fit**: Ready to play
- **Monitoring**: Under observation
- **Rest Required**: Needs recovery time
- **Recovering**: Rehabilitation in progress
- **Cleared**: Medically fit to return
- **Under Assessment**: Being evaluated

### Common Cricket Injuries Tracked
- Shoulder strains (batting/bowling)
- Lower back stress (fast bowlers)
- Knee patellar tendinitis
- Ankle sprains (landing impact)
- Hamstring strains (running)
- Wrist fatigue (batting)
- Finger contusions (keeping)
- Elbow extension issues (bowling)

---

## 🔒 Privacy & Data Security

- **Local Processing**: Video analysis runs client-side
- **No External APIs**: All data stays on device
- **No User Authentication**: Demo/prototype mode
- **Medical Data Sensitivity**: Injury reports are local only
- **Export Control**: Users control data sharing

---

## 🌐 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 90+ | ✅ Full |
| Firefox | 88+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | 90+ | ✅ Full |

---

## 📱 Responsive Design

SwingAI is fully responsive and works on:
- **Desktop** (1920x1080 and above)
- **Laptop** (1366x768 and above)
- **Tablet** (768x1024)
- **Mobile** (375x667 and above)

### Breakpoints
- Desktop: > 1200px
- Tablet: 768px - 1199px
- Mobile: < 768px

---

## 🤝 Contributing

### For Developers
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run type-check and lint
5. Test locally
6. Submit a pull request

### Code Quality Requirements
- ✅ TypeScript strict mode compliance
- ✅ No ESLint errors
- ✅ Responsive design maintained
- ✅ Theme colors used (no hard-coded hex)
- ✅ Accessible UI components

---

## 📝 License

This project is proprietary software. All rights reserved.

---

## 🙏 Acknowledgments

- Cricket analytics inspiration from professional coaching methodologies
- UI/UX design based on modern sports analytics platforms
- Icon library: Material Design Icons (@mdi/js)
- Chart library: Recharts
- Animation library: Framer Motion

---

## 📞 Support

For questions, issues, or feature requests, please contact the development team.

---

**Built with ❤️ for cricket enthusiasts worldwide**

*SwingAI - Elevating cricket performance through AI-powered insights*
