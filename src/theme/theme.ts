const Theme = {
  color: {
    primary: "#007AFF",
    secondary: "#FF9500",
    tertiary: "#34C759",

    textPrimary: "#1C1C1E",
    textSecondary: "#8E8E93",
    textInverse: "#FFFFFF",

    background: "#FFFFFF",
    backgroundAlt: "#F2F2F7",

    success: "#34C759",
    warning: "#FFCC00",
    error: "#FF3B30",

    white: "#FFFFFF",
  },
  size: {
    xxs: 12,
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
  },
  space: {
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radius: {
    small: 4,
    medium: 8,
    large: 16,
    full: 100,
  },
  font: {
    family: {
      regular: "System",
      medium: "System",
      bold: "System",
    },
    size: {
      caption: 12,
      body: 14,
      subtitle: 16,
      title: 20,
      headline: 24,
    },
  },
  shadow: {
    light: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 3,
    },
    strong: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 6,
    },
  },
} as const;

export default Theme;
