import themeData from './theme.json';

export const theme = themeData;

// Color constants for direct use in components
export const colors = {
  // Background
  darkBg: theme.background.dark,
  cardBg: theme.background.card,
  cardHover: theme.background.cardHover,
  darkNeutral: theme.background.darkNeutral,
  
  // Primary
  primary: theme.primary.main,
  primaryLight: theme.primary.light,
  primaryDark: theme.primary.dark,
  
  // Accent
  accent: theme.accent.main,
  accentHover: theme.accent.hover,
  accentLight: theme.accent.light,
  gold: theme.accent.gold,
  goldEnd: theme.accent.goldEnd,
  
  // Text
  textPrimary: theme.text.primary,
  textSecondary: theme.text.secondary,
  textMuted: theme.text.muted,
  
  // Border
  border: theme.border.main,
  borderLight: theme.border.light,
  
  // Semantic
  success: theme.semantic.success,
  warning: theme.semantic.warning,
  danger: theme.semantic.danger,
  info: theme.semantic.info,
  
  // Chart
  chartGrid: theme.chart.grid,
  chartGridDark: theme.chart.gridDark,
  chartAxis: theme.chart.axis,
  chartAxisLight: theme.chart.axisLight,
  chartSeries1: theme.chart.series1,
  chartSeries2: theme.chart.series2,
  chartSeries3: theme.chart.series3,
  legacyBlue: theme.chart.legacyBlue,
  legacyTeal: theme.chart.legacyTeal,
  
  // Injury Status
  injuryFit: theme.injuryStatus.fit,
  injuryMinor: theme.injuryStatus.minor,
  injuryMajor: theme.injuryStatus.major,
  injuryDefault: theme.injuryStatus.default,
  
  // Color Picker Options
  colorPickerOptions: theme.colorPickerOptions,
  
  // Shadows
  shadowAccent: theme.shadows.accent,
  shadowLg: theme.shadows.lg,
  shadowMd: theme.shadows.md,
  shadowSm: theme.shadows.sm,
  shadowCardGlow: theme.shadows.cardGlow
};

// Generate CSS custom properties
export const generateCssVariables = (): string => {
  return `
    :root {
      --primary-color: ${colors.primary};
      --primary-light: ${colors.primaryLight};
      --primary-dark: ${colors.primaryDark};
      --accent-color: ${colors.accent};
      --accent-hover: ${colors.accentHover};
      --accent-light: ${colors.accentLight};
      --gold: ${colors.gold};
      --gold-end: ${colors.goldEnd};
      --success-color: ${colors.success};
      --warning-color: ${colors.warning};
      --danger-color: ${colors.danger};
      --info-color: ${colors.info};
      --dark-bg: ${colors.darkBg};
      --card-bg: ${colors.cardBg};
      --card-hover: ${colors.cardHover};
      --dark-neutral: ${colors.darkNeutral};
      --text-primary: ${colors.textPrimary};
      --text-secondary: ${colors.textSecondary};
      --text-muted: ${colors.textMuted};
      --border-color: ${colors.border};
      --border-light: ${colors.borderLight};
      --chart-grid: ${colors.chartGrid};
      --chart-grid-dark: ${colors.chartGridDark};
      --chart-axis: ${colors.chartAxis};
      --chart-axis-light: ${colors.chartAxisLight};
      --chart-series-1: ${colors.chartSeries1};
      --chart-series-2: ${colors.chartSeries2};
      --chart-series-3: ${colors.chartSeries3};
      --legacy-blue: ${colors.legacyBlue};
      --legacy-teal: ${colors.legacyTeal};
      --injury-fit: ${colors.injuryFit};
      --injury-minor: ${colors.injuryMinor};
      --injury-major: ${colors.injuryMajor};
      --injury-default: ${colors.injuryDefault};
      --shadow-accent: 0 8px 25px ${colors.shadowAccent};
      --shadow-lg: 0 10px 40px ${colors.shadowLg};
      --shadow-md: 0 4px 20px ${colors.shadowMd};
      --shadow-sm: 0 2px 10px ${colors.shadowSm};
      --shadow-card-glow: 0 0 30px ${colors.shadowCardGlow};
      --gradient-primary: linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%);
      --gradient-accent: linear-gradient(135deg, ${colors.accent} 0%, ${colors.goldEnd} 100%);
      --gradient-gold: linear-gradient(135deg, ${colors.gold} 0%, ${colors.goldEnd} 50%, ${colors.gold} 100%);
    }
  `;
};

// Inject CSS variables into document
export const injectTheme = () => {
  if (typeof document !== 'undefined') {
    let styleEl = document.getElementById('theme-variables');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'theme-variables';
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = generateCssVariables();
  }
};

export default theme;
