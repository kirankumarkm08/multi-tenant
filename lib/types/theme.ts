// Theme and Component Customization Types
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
  border: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}

export interface Typography {
  fontFamily: {
    primary: string;
    secondary: string;
    mono: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
    '6xl': string;
  };
  fontWeight: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
}

export interface Spacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
}

export interface BorderRadius {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

export interface ComponentStyles {
  navbar: {
    height: string;
    backgroundColor: string;
    textColor: string;
    borderColor: string;
    logoHeight: string;
    menuItemSpacing: string;
    mobileBreakpoint: string;
    sticky: boolean;
    shadow: string;
    blur: boolean;
  };
  button: {
    primary: {
      backgroundColor: string;
      textColor: string;
      borderColor: string;
      borderRadius: string;
      padding: string;
      fontSize: string;
      fontWeight: number;
      hoverBackgroundColor: string;
      hoverTextColor: string;
      shadow: string;
      transition: string;
    };
    secondary: {
      backgroundColor: string;
      textColor: string;
      borderColor: string;
      borderRadius: string;
      padding: string;
      fontSize: string;
      fontWeight: number;
      hoverBackgroundColor: string;
      hoverTextColor: string;
      shadow: string;
      transition: string;
    };
    outline: {
      backgroundColor: string;
      textColor: string;
      borderColor: string;
      borderWidth: string;
      borderRadius: string;
      padding: string;
      fontSize: string;
      fontWeight: number;
      hoverBackgroundColor: string;
      hoverTextColor: string;
      transition: string;
    };
  };
  card: {
    backgroundColor: string;
    borderColor: string;
    borderRadius: string;
    shadow: string;
    padding: string;
    hoverShadow: string;
    transition: string;
  };
  form: {
    input: {
      backgroundColor: string;
      borderColor: string;
      borderRadius: string;
      padding: string;
      fontSize: string;
      textColor: string;
      placeholderColor: string;
      focusBorderColor: string;
      focusRingColor: string;
      transition: string;
    };
    label: {
      fontSize: string;
      fontWeight: number;
      textColor: string;
      marginBottom: string;
    };
    select: {
      backgroundColor: string;
      borderColor: string;
      borderRadius: string;
      padding: string;
      fontSize: string;
      textColor: string;
      focusBorderColor: string;
      transition: string;
    };
    textarea: {
      backgroundColor: string;
      borderColor: string;
      borderRadius: string;
      padding: string;
      fontSize: string;
      textColor: string;
      placeholderColor: string;
      focusBorderColor: string;
      minHeight: string;
      resize: string;
    };
  };
  footer: {
    backgroundColor: string;
    textColor: string;
    linkColor: string;
    linkHoverColor: string;
    borderColor: string;
    padding: string;
  };
  hero: {
    backgroundColor: string;
    textColor: string;
    titleFontSize: string;
    subtitleFontSize: string;
    padding: string;
    backgroundImage: string;
    overlay: string;
    alignment: 'left' | 'center' | 'right';
  };
  section: {
    padding: string;
    backgroundColor: string;
    textColor: string;
    titleFontSize: string;
    titleColor: string;
    subtitleColor: string;
  };
}

export interface GlobalTheme {
  colors: ThemeColors;
  typography: Typography;
  spacing: Spacing;
  borderRadius: BorderRadius;
  components: ComponentStyles;
  animations: {
    duration: {
      fast: string;
      normal: string;
      slow: string;
    };
    easing: {
      linear: string;
      easeIn: string;
      easeOut: string;
      easeInOut: string;
    };
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
}

export interface ComponentCustomization {
  id: string;
  type: string;
  styles: Record<string, any>;
  content: Record<string, any>;
  layout: {
    width: 'full' | 'container' | 'narrow' | 'wide';
    padding: string;
    margin: string;
    alignment: 'left' | 'center' | 'right';
    backgroundColor: string;
    backgroundImage?: string;
    minHeight?: string;
  };
  responsive: {
    mobile: Record<string, any>;
    tablet: Record<string, any>;
    desktop: Record<string, any>;
  };
  animation: {
    type: 'none' | 'fade-in' | 'slide-up' | 'slide-left' | 'zoom-in';
    duration: string;
    delay: string;
    easing: string;
  };
  seo: {
    alt?: string;
    title?: string;
    description?: string;
  };
}