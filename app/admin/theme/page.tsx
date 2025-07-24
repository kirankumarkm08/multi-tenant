'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layouts/admin-layout';
import { ThemeEditor } from '@/components/admin/theme-editor';
import { GlobalTheme } from '@/lib/types/theme';

const defaultTheme: GlobalTheme = {
  colors: {
    primary: '#3B82F6',
    secondary: '#10B981',
    accent: '#F59E0B',
    background: '#FFFFFF',
    surface: '#F9FAFB',
    text: {
      primary: '#111827',
      secondary: '#6B7280',
      muted: '#9CA3AF'
    },
    border: '#E5E7EB',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6'
  },
  typography: {
    fontFamily: {
      primary: 'Inter, sans-serif',
      secondary: 'Inter, sans-serif',
      mono: 'Fira Code, monospace'
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem'
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem'
  },
  borderRadius: {
    none: '0',
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px'
  },
  components: {
    navbar: {
      height: '4rem',
      backgroundColor: '#FFFFFF',
      textColor: '#111827',
      borderColor: '#E5E7EB',
      logoHeight: '2rem',
      menuItemSpacing: '2rem',
      mobileBreakpoint: '768px',
      sticky: true,
      shadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
      blur: false
    },
    button: {
      primary: {
        backgroundColor: '#3B82F6',
        textColor: '#FFFFFF',
        borderColor: '#3B82F6',
        borderRadius: '0.375rem',
        padding: '0.5rem 1rem',
        fontSize: '0.875rem',
        fontWeight: 500,
        hoverBackgroundColor: '#2563EB',
        hoverTextColor: '#FFFFFF',
        shadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        transition: 'all 0.2s ease-in-out'
      },
      secondary: {
        backgroundColor: '#F3F4F6',
        textColor: '#374151',
        borderColor: '#D1D5DB',
        borderRadius: '0.375rem',
        padding: '0.5rem 1rem',
        fontSize: '0.875rem',
        fontWeight: 500,
        hoverBackgroundColor: '#E5E7EB',
        hoverTextColor: '#111827',
        shadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        transition: 'all 0.2s ease-in-out'
      },
      outline: {
        backgroundColor: 'transparent',
        textColor: '#3B82F6',
        borderColor: '#3B82F6',
        borderWidth: '1px',
        borderRadius: '0.375rem',
        padding: '0.5rem 1rem',
        fontSize: '0.875rem',
        fontWeight: 500,
        hoverBackgroundColor: '#3B82F6',
        hoverTextColor: '#FFFFFF',
        transition: 'all 0.2s ease-in-out'
      }
    },
    card: {
      backgroundColor: '#FFFFFF',
      borderColor: '#E5E7EB',
      borderRadius: '0.5rem',
      shadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
      padding: '1.5rem',
      hoverShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      transition: 'all 0.2s ease-in-out'
    },
    form: {
      input: {
        backgroundColor: '#FFFFFF',
        borderColor: '#D1D5DB',
        borderRadius: '0.375rem',
        padding: '0.5rem 0.75rem',
        fontSize: '0.875rem',
        textColor: '#111827',
        placeholderColor: '#9CA3AF',
        focusBorderColor: '#3B82F6',
        focusRingColor: '#3B82F6',
        transition: 'all 0.2s ease-in-out'
      },
      label: {
        fontSize: '0.875rem',
        fontWeight: 500,
        textColor: '#374151',
        marginBottom: '0.25rem'
      },
      select: {
        backgroundColor: '#FFFFFF',
        borderColor: '#D1D5DB',
        borderRadius: '0.375rem',
        padding: '0.5rem 0.75rem',
        fontSize: '0.875rem',
        textColor: '#111827',
        focusBorderColor: '#3B82F6',
        transition: 'all 0.2s ease-in-out'
      },
      textarea: {
        backgroundColor: '#FFFFFF',
        borderColor: '#D1D5DB',
        borderRadius: '0.375rem',
        padding: '0.5rem 0.75rem',
        fontSize: '0.875rem',
        textColor: '#111827',
        placeholderColor: '#9CA3AF',
        focusBorderColor: '#3B82F6',
        minHeight: '6rem',
        resize: 'vertical'
      }
    },
    footer: {
      backgroundColor: '#111827',
      textColor: '#D1D5DB',
      linkColor: '#3B82F6',
      linkHoverColor: '#60A5FA',
      borderColor: '#374151',
      padding: '3rem 0'
    },
    hero: {
      backgroundColor: '#F9FAFB',
      textColor: '#111827',
      titleFontSize: '3rem',
      subtitleFontSize: '1.25rem',
      padding: '6rem 0',
      backgroundImage: '',
      overlay: 'rgba(0, 0, 0, 0.4)',
      alignment: 'center'
    },
    section: {
      padding: '4rem 0',
      backgroundColor: '#FFFFFF',
      textColor: '#111827',
      titleFontSize: '2.25rem',
      titleColor: '#111827',
      subtitleColor: '#6B7280'
    }
  },
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms'
    },
    easing: {
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
};

export default function ThemeAdmin() {
  const [theme, setTheme] = useState<GlobalTheme>(defaultTheme);

  const handleThemeChange = (newTheme: GlobalTheme) => {
    setTheme(newTheme);
  };

  const handleSave = async () => {
    try {
      // Save theme to backend
      console.log('Saving theme:', theme);
      // await themeService.updateTheme(theme);
      alert('Theme saved successfully!');
    } catch (error) {
      console.error('Failed to save theme:', error);
      alert('Failed to save theme. Please try again.');
    }
  };

  const handlePreview = () => {
    // Open preview in new window
    window.open('/', '_blank');
  };

  return (
    <AdminLayout>
      <div className="h-full">
        <ThemeEditor
          theme={theme}
          onThemeChange={handleThemeChange}
          onSave={handleSave}
          onPreview={handlePreview}
        />
      </div>
    </AdminLayout>
  );
}