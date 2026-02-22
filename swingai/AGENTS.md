# Agents Guide for SwingAI 🤖

**Comprehensive AI Agent Documentation for Code Generation and Maintenance**

This document provides AI agents with complete guidance for generating code that matches SwingAI's conventions, architecture, and quality standards. Follow these rules rigorously to minimize hallucinations and ensure production-ready code.

---

## 📋 Quick Reference

### Project Essentials
```
Stack: React 19 + TypeScript + Vite
Key Libraries: react-router-dom, react-bootstrap, framer-motion, @mdi/react, recharts
Build: tsc -b && vite build
Dev: npm run dev
Lint: npm run lint
Entry: src/main.tsx, src/App.tsx
Theme: src/theme.json → src/theme.ts → CSS custom properties
```

### Critical Rules (MUST FOLLOW)
1. ✅ **TypeScript Strict Mode**: No `any` types without explicit justification
2. ✅ **Theme Colors Only**: Import from `src/theme.ts`, never hard-code hex values
3. ✅ **Default Exports**: All components use `export default`
4. ✅ **Type-Check First**: Run `tsc -b` before any commit
5. ✅ **No New Dependencies**: Propose before adding any npm package

---

## 🏗️ Architecture Overview

### Directory Structure
```
src/
├── components/          # Reusable UI components
│   └── Sidebar.tsx     # Main navigation
├── pages/              # Page-level components
│   ├── Dashboard.tsx
│   ├── SwingAnalysis.tsx      # Batting
│   ├── BowlingAnalysis.tsx    # Bowling
│   ├── ProgressTracking.tsx   # Batting
│   ├── BowlingProgress.tsx    # Bowling
│   ├── TeamManagement.tsx
│   ├── PlayerProfile.tsx
│   ├── MedicalReports.tsx
│   └── Settings.tsx
├── theme.ts            # Theme injection & color exports
├── theme.json          # Color configuration (SOURCE OF TRUTH)
├── index.css           # Global styles & CSS variables
├── App.tsx             # Route definitions
└── main.tsx            # App entry point
```

### Data Flow
```
theme.json (colors) 
    ↓
theme.ts (exports + CSS injection)
    ↓
main.tsx (injectTheme() call)
    ↓
index.css (uses CSS variables)
    ↓
Components (import colors from theme.ts)
```

---

## 🎯 Code Generation Rules

### 1. TypeScript Requirements

#### ✅ DO: Use proper type definitions
```typescript
// Define interfaces for data structures
interface Player {
  id: number;
  name: string;
  role: 'batsman' | 'bowler' | 'all-rounder' | 'wicket-keeper';
  battingStyle?: 'right-handed' | 'left-handed';
  bowlingStyle?: 'fast' | 'medium' | 'spin';
  avgBowlSpeed?: number;
  // ... other fields
}

// Type component props
interface PlayerCardProps {
  player: Player;
  onRemove: (id: number) => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, onRemove }) => {
  // Component logic
};
```

#### ❌ DON'T: Use `any` or skip types
```typescript
// BAD - Avoid this
const PlayerCard = ({ player, onRemove }) => { ... }

// BAD - Avoid any
const data: any = fetchData();
```

### 2. Theme System Usage

#### ✅ DO: Import colors from theme
```typescript
import { colors } from '../theme';

// In component
<div style={{ color: colors.bowling }}>
  <Icon path={mdiCricket} color={colors.success} />
</div>
```

#### ❌ DON'T: Hard-code colors
```typescript
// BAD - Never do this
<div style={{ color: '#48A111' }}>  // Hard-coded hex
<div style={{ color: 'green' }}>    // Named color
```

### 3. Component Structure

#### Standard Pattern
```typescript
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '@mdi/react';
import { colors } from '../theme';
import { mdiCricket, mdiTrophy } from '@mdi/js';
import { useNavigate } from 'react-router-dom';

interface ComponentProps {
  // Define props here
  title: string;
  data?: DataType[];
}

const ComponentName: React.FC<ComponentProps> = ({ title, data = [] }) => {
  // Hooks at the top
  const navigate = useNavigate();
  const [state, setState] = useState<Type>(initialValue);

  // Handler functions
  const handleClick = () => {
    navigate('/path');
  };

  // Render
  return (
    <div className="fade-in">
      {/* Component JSX */}
    </div>
  );
};

export default ComponentName;
```

### 4. Routing Conventions

#### Adding New Routes
```typescript
// In src/App.tsx
import NewPage from './pages/NewPage';

// Inside Routes component
<Route path="/new-page" element={<NewPage />} />
<Route path="/new-page/:id" element={<NewPage />} />
```

#### Navigation in Components
```typescript
import { useNavigate } from 'react-router-dom';

const Component = () => {
  const navigate = useNavigate();
  
  const goToPage = () => {
    navigate('/target-path');
    navigate(-1); // Go back
  };
};
```

### 5. Styling Guidelines

#### CSS Custom Properties (Preferred)
```css
/* In index.css or inline styles */
.card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
}
```

#### Inline Styles (When Necessary)
```typescript
<div style={{
  padding: '24px',
  background: colors.cardBg,
  border: `1px solid ${colors.border}`,
  borderRadius: 'var(--radius-lg)'
}}>
```

#### Utility Classes (Use Existing)
```tsx
<div className="fade-in">           {/* Animation */}
<div className="grid-4">            {/* 4-column grid */}
<div className="card">              {/* Card container */}
<div className="stat-card">         {/* Stat card */}
<div className="btn-primary">       {/* Primary button */}
<div className="metric-value">      {/* Large metric display */}
```

---

## 📝 File Creation Checklist

### Creating a New Page

1. **Create file**: `src/pages/NewPage.tsx`
2. **Import theme**: `import { colors } from '../theme';`
3. **Define interface**: Props and data types
4. **Use React.FC**: Type the component
5. **Export default**: Single default export
6. **Add route**: Update `src/App.tsx`
7. **Add to sidebar**: Update navigation (if needed)
8. **Type-check**: Run `tsc -b`
9. **Lint**: Run `npm run lint`
10. **Test**: Verify in browser

### Creating a New Component

1. **Create file**: `src/components/NewComponent.tsx`
2. **Keep focused**: Single responsibility
3. **Define props interface**: Clear type definitions
4. **Use theme colors**: Import from `theme.ts`
5. **Export default**: Consistent with codebase
6. **Document**: Brief comment if non-obvious

---

## 🎨 Design Patterns

### State Management
```typescript
// Local state (preferred)
const [activeTab, setActiveTab] = useState<'batting' | 'bowling'>('batting');

// Derived state
const filteredData = useMemo(() => {
  return data.filter(item => item.status === activeTab);
}, [data, activeTab]);

// Event handlers
const handleTabChange = (tab: 'batting' | 'bowling') => {
  setActiveTab(tab);
  navigate(`/section/${tab}`);
};
```

### Data Fetching Pattern
```typescript
// Mock data (current approach)
const sampleData: DataType[] = [
  { id: 1, name: 'Sample', value: 100 },
  // ... more entries
];

// For future API integration
const useDataFetcher = (endpoint: string) => {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch logic here
  }, [endpoint]);
  
  return { data, loading };
};
```

### Animation Pattern (Framer Motion)
```typescript
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1, duration: 0.3 }}
  className="card"
>
  {/* Content */}
</motion.div>
```

### Chart Pattern (Recharts)
```typescript
import { colors } from '../theme';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

<ResponsiveContainer width="100%" height={250}>
  <LineChart data={chartData}>
    <CartesianGrid stroke={colors.chartGrid} strokeDasharray="3 3" />
    <XAxis dataKey="name" stroke={colors.chartAxis} />
    <YAxis stroke={colors.chartAxis} />
    <Tooltip
      contentStyle={{
        background: 'var(--card-bg)',
        border: '1px solid var(--border-color)'
      }}
    />
    <Line
      type="monotone"
      dataKey="value"
      stroke={colors.chartSeries1}
      strokeWidth={3}
      dot={{ fill: colors.chartSeries1 }}
    />
  </LineChart>
</ResponsiveContainer>
```

---

## 🔒 Domain-Specific Rules

### Medical Reports (Sensitive Data)
```typescript
// ✅ DO: Treat as sensitive
interface MedicalReport {
  id: number;
  player: string;
  injuryType: string;
  severity: 'low' | 'moderate' | 'high' | 'critical';
  // ... other fields
}

// ❌ DON'T: Send to external services
// ❌ DON'T: Store without encryption
// ❌ DON'T: Share without explicit consent
```

### Player Data (Privacy)
```typescript
// ✅ DO: Use type-safe interfaces
// ✅ DO: Validate input data
// ✅ DO: Keep data local (current implementation)
```

### Video Analysis (Performance)
```typescript
// ✅ DO: Use object URLs for local videos
const videoUrl = URL.createObjectURL(file);

// ✅ DO: Clean up URLs
useEffect(() => {
  return () => URL.revokeObjectURL(videoUrl);
}, [videoUrl]);

// ❌ DON'T: Upload without user consent
// ❌ DON'T: Process without feedback UI
```

---

## ✅ Verification Checklist

### Before Any Commit
```bash
# 1. Type-check (MUST PASS)
tsc -b

# 2. Lint (MUST PASS)
npm run lint

# 3. Build (MUST PASS)
npm run build

# 4. Dev server (MANUAL TEST)
npm run dev
# Navigate to affected pages
# Check responsive behavior
# Verify no console errors
```

### Code Review Checklist
- [ ] TypeScript types are explicit (no `any`)
- [ ] Theme colors used (no hard-coded hex)
- [ ] Component has proper interface
- [ ] Default export used
- [ ] No unused imports
- [ ] ESLint passes
- [ ] Responsive design maintained
- [ ] Accessibility considered (alt text, ARIA labels)
- [ ] Console logs removed (or justified)
- [ ] Comments added for non-obvious logic

---

## 🚫 Anti-Patterns to Avoid

### 1. Color Hard-coding
```typescript
// ❌ BAD
<div style={{ color: '#48A111' }} />

// ✅ GOOD
<div style={{ color: colors.primary }} />
```

### 2. Missing Types
```typescript
// ❌ BAD
const Component = (props) => { ... }

// ✅ GOOD
interface ComponentProps {
  title: string;
}
const Component: React.FC<ComponentProps> = ({ title }) => { ... }
```

### 3. Large Components
```typescript
// ❌ BAD: 500+ line component
// ✅ GOOD: Split into smaller components
```

### 4. Deep Nesting
```typescript
// ❌ BAD: 5+ levels of nesting
// ✅ GOOD: Extract to separate components
```

### 5. Magic Numbers
```typescript
// ❌ BAD
setTimeout(() => {}, 3847);

// ✅ GOOD
const ANALYSIS_DURATION_MS = 3000;
setTimeout(() => {}, ANALYSIS_DURATION_MS);
```

---

## 🧪 Testing Guidelines

### Manual Testing Protocol
1. **Navigate to affected route**
2. **Test on desktop** (>1200px)
3. **Test on tablet** (768px)
4. **Test on mobile** (<768px)
5. **Check all interactive elements**
6. **Verify no console errors**
7. **Test edge cases** (empty data, loading states)

### Adding Test Coverage (Future)
```typescript
// Example test structure (when testing is added)
describe('PlayerCard', () => {
  it('renders player name correctly', () => {
    // Test implementation
  });
  
  it('handles missing data gracefully', () => {
    // Test implementation
  });
});
```

---

## 📚 Reference Files

### Must-Read Files Before Coding
- `src/theme.ts` - Theme system implementation
- `src/theme.json` - Color source of truth
- `src/App.tsx` - Routing structure
- `src/index.css` - Global styles and utilities
- `src/pages/Dashboard.tsx` - Example page structure
- `src/components/Sidebar.tsx` - Example component

### Example Implementations
- **Data Tables**: See `src/pages/MedicalReports.tsx`
- **Charts**: See `src/pages/ProgressTracking.tsx`
- **Forms**: See `src/pages/Settings.tsx`
- **Cards**: See `src/pages/Dashboard.tsx`
- **Modals**: See `src/pages/TeamManagement.tsx`

---

## 🤖 AI-Specific Guidance

### How to Avoid Hallucinations

1. **Search First**: Always grep for similar implementations
   ```bash
   grep -r "useState" src/pages/
   grep -r "useNavigate" src/
   ```

2. **Ask for Clarification**: When domain is unclear
   - ❌ Don't guess medical data schemas
   - ❌ Don't assume API endpoints
   - ✅ Do ask for sample data or specifications

3. **Propose Before Implementing**: For major changes
   - New dependencies
   - Architecture changes
   - New external integrations

4. **Use Existing Patterns**: Copy structure from similar files
   - Match import style
   - Match component structure
   - Match naming conventions

5. **Type Everything**: If unsure about a type, ask
   - Data structure types
   - API response types
   - Event handler types

### When to Stop and Ask

| Situation | Action |
|-----------|--------|
| Adding new npm package | ❌ Stop - propose first |
| Medical data schema | ❌ Stop - request specification |
| External API integration | ❌ Stop - clarify requirements |
| Database changes | ❌ Stop - discuss schema |
| Authentication system | ❌ Stop - clarify security needs |
| UI component structure | ✅ Proceed - follow existing patterns |
| Theme color usage | ✅ Proceed - use theme.ts |
| Route addition | ✅ Proceed - follow App.tsx pattern |

---

## 📋 PR Template for Agents

```markdown
## Summary
Brief description of changes

## Files Changed
- `src/pages/NewPage.tsx` - Added new page
- `src/App.tsx` - Added route
- `src/components/Sidebar.tsx` - Added navigation link

## Motivation
Why this change was needed

## How to Verify
1. Run `tsc -b` (should pass)
2. Run `npm run lint` (should pass)
3. Run `npm run dev`
4. Navigate to `/new-page`
5. Verify [specific functionality]

## Remaining Steps
- [ ] Add unit tests (if applicable)
- [ ] Update documentation (if needed)
- [ ] Performance testing (if large change)

## Notes
Any non-obvious implementation choices explained
```

---

## 🎓 Learning Resources

### Internal Documentation
- `README.md` - Project overview and features
- `AGENTS.md` - This file
- Code comments in complex sections

### External Resources
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Recharts API](https://recharts.org/en-US/api)
- [React Router Docs](https://reactrouter.com/)

---

## 📞 Getting Help

### If You're Unsure About Something

1. **Check existing code**: Search for similar patterns
2. **Read this guide**: Most questions are answered here
3. **Check TypeScript errors**: They often indicate the issue
4. **Ask for clarification**: Better to ask than assume

### Common Questions

**Q: Can I add a new npm package?**
A: No, propose it first with justification.

**Q: Should I use inline styles or CSS classes?**
A: Prefer CSS classes, use inline for dynamic values with theme colors.

**Q: How do I add a new color?**
A: Add to `theme.json`, it will be exported automatically by `theme.ts`.

**Q: What export style should I use?**
A: Default exports for components, named exports for utilities/types.

---

## 🎯 Success Metrics

Your code generation is successful when:
- ✅ TypeScript compiles without errors
- ✅ ESLint passes with no warnings
- ✅ Theme colors used consistently
- ✅ Component structure matches existing code
- ✅ No console errors in browser
- ✅ Responsive design maintained
- ✅ Code is readable and maintainable

---

**Remember**: When in doubt, ask for clarification. It's better to request additional information than to make assumptions that require rework.

*Last updated: February 2025*
