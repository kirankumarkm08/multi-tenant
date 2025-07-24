'use client';

import { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { GlobalTheme } from '@/lib/types/theme';
import { useTenant } from '@/lib/contexts/tenant-context';

interface ThemeContextType {
  theme: GlobalTheme;
  updateTheme: (theme: Partial<GlobalTheme>) => void;
  applyTheme: () => void;
  resetTheme: () => void;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { tenant } = useTenant();
  const [theme, setTheme] = useState<GlobalTheme | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (tenant) {
      loadTheme();
    }
  }, [tenant]);

  const loadTheme = async () => {
    try {
      setIsLoading(true);
      // Load theme from API or use tenant's default theme
      // const response = await themeService.getTheme(tenant.id);
      // setTheme(response.data);
      
      // For now, use a default theme
      const defaultTheme: GlobalTheme = {
        colors: {
          primary: tenant?.primary_color || '#3B82F6',
          secondary: tenant?.secondary_color || '#10B981',
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
            primary: tenant?.font_family || 'Inter, sans-serif',
            secondary: tenant?.font_family || 'Inter, sans-serif',
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
              backgroundColor: tenant?.primary_color || '#3B82F6',
              textColor: '#FFFFFF',
              borderColor: tenant?.primary_color || '#3B82F6',
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
              textColor: tenant?.primary_color || '#3B82F6',
              borderColor: tenant?.primary_color || '#3B82F6',
              borderWidth: '1px',
              borderRadius: '0.375rem',
              padding: '0.5rem 1rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              hoverBackgroundColor: tenant?.primary_color || '#3B82F6',
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
              focusBorderColor: tenant?.primary_color || '#3B82F6',
              focusRingColor: tenant?.primary_color || '#3B82F6',
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
              focusBorderColor: tenant?.primary_color || '#3B82F6',
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
              focusBorderColor: tenant?.primary_color || '#3B82F6',
              minHeight: '6rem',
              resize: 'vertical'
            }
          },
          footer: {
            backgroundColor: '#111827',
            textColor: '#D1D5DB',
            linkColor: tenant?.primary_color || '#3B82F6',
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
      
      setTheme(defaultTheme);
    } catch (error) {
      console.error('Failed to load theme:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTheme = (updates: Partial<GlobalTheme>) => {
    if (!theme) return;
    
    const newTheme = { ...theme, ...updates };
    setTheme(newTheme);
    applyThemeToDOM(newTheme);
  };

  const applyTheme = () => {
    if (theme) {
      applyThemeToDOM(theme);
    }
  };

  const applyThemeToDOM = (themeToApply: GlobalTheme) => {
    const root = document.documentElement;
    
    // Apply CSS custom properties
    root.style.setProperty('--color-primary', themeToApply.colors.primary);
    root.style.setProperty('--color-secondary', themeToApply.colors.secondary);
    root.style.setProperty('--color-accent', themeToApply.colors.accent);
    root.style.setProperty('--color-background', themeToApply.colors.background);
    root.style.setProperty('--color-surface', themeToApply.colors.surface);
    root.style.setProperty('--color-text-primary', themeToApply.colors.text.primary);
    root.style.setProperty('--color-text-secondary', themeToApply.colors.text.secondary);
    root.style.setProperty('--color-text-muted', themeToApply.colors.text.muted);
    root.style.setProperty('--color-border', themeToApply.colors.border);
    
    // Apply typography
    root.style.setProperty('--font-family-primary', themeToApply.typography.fontFamily.primary);
    root.style.setProperty('--font-family-secondary', themeToApply.typography.fontFamily.secondary);
    root.style.setProperty('--font-family-mono', themeToApply.typography.fontFamily.mono);
    
    // Apply spacing
    Object.entries(themeToApply.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--spacing-${key}`, value);
    });
    
    // Apply border radius
    Object.entries(themeToApply.borderRadius).forEach(([key, value]) => {
      root.style.setProperty(`--border-radius-${key}`, value);
    });
  };

  const resetTheme = () => {
    loadTheme();
  };

  useEffect(() => {
    if (theme) {
      applyTheme();
    }
  }, [theme]);

  if (!theme) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{
      theme,
      updateTheme,
      applyTheme,
      resetTheme,
      isLoading
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}