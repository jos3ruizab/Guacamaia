/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* midnight-black with opacity */
        input: "var(--color-input)", /* white */
        ring: "var(--color-ring)", /* ocean-blue */
        background: "var(--color-background)", /* white */
        foreground: "var(--color-foreground)", /* midnight-black */
        primary: {
          DEFAULT: "var(--color-primary)", /* ocean-blue */
          foreground: "var(--color-primary-foreground)", /* white */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* sand */
          foreground: "var(--color-secondary-foreground)", /* midnight-black */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* refined-red */
          foreground: "var(--color-destructive-foreground)", /* white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* sand */
          foreground: "var(--color-muted-foreground)", /* sophisticated-gray */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* baroque-gold */
          foreground: "var(--color-accent-foreground)", /* midnight-black */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* white */
          foreground: "var(--color-popover-foreground)", /* midnight-black */
        },
        card: {
          DEFAULT: "var(--color-card)", /* warm-white */
          foreground: "var(--color-card-foreground)", /* midnight-black */
        },
        success: {
          DEFAULT: "var(--color-success)", /* travel-green */
          foreground: "var(--color-success-foreground)", /* white */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* sunset-orange */
          foreground: "var(--color-warning-foreground)", /* white */
        },
        error: {
          DEFAULT: "var(--color-error)", /* refined-red */
          foreground: "var(--color-error-foreground)", /* white */
        },
        // Brand-specific colors
        'ocean-blue': '#007dc3',
        'sand': '#f4f1ec',
        'baroque-gold': '#d4af37',
        'cloud-white': '#ffffff',
        'warm-white': '#fafaf9',
        'midnight-black': '#1e1e1e',
        'sophisticated-gray': '#6b7280',
        'travel-green': '#059669',
        'sunset-orange': '#d97706',
        'refined-red': '#dc2626',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        'heading': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
        'caption': ['Source Sans Pro', 'sans-serif'],
        'data': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'fluid-xl': 'clamp(2rem, 4vw, 3.5rem)',
        'fluid-lg': 'clamp(1.5rem, 3vw, 2.5rem)',
        'fluid-md': 'clamp(1.25rem, 2.5vw, 2rem)',
        'fluid-base': 'clamp(0.875rem, 1.5vw, 1.125rem)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      boxShadow: {
        'elevation-1': '0 2px 4px rgba(30, 30, 30, 0.1)',
        'elevation-2': '0 4px 8px rgba(30, 30, 30, 0.12)',
        'elevation-3': '0 8px 16px rgba(30, 30, 30, 0.13)',
        'elevation-4': '0 12px 24px rgba(30, 30, 30, 0.14)',
        'elevation-5': '0 20px 40px rgba(30, 30, 30, 0.15)',
      },
      animation: {
        'float': 'float 20s ease-in-out infinite',
        'baroque-shimmer': 'baroque-shimmer 2s infinite',
        'slide-in-message': 'slideInMessage 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'accordion-reveal': 'accordionReveal 0.15s ease-out',
        'typing': 'pulse 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        'baroque-shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideInMessage: {
          from: {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        accordionReveal: {
          from: {
            opacity: '0',
            maxHeight: '0',
            transform: 'translateY(-5px)',
          },
          to: {
            opacity: '1',
            maxHeight: '200px',
            transform: 'translateY(0)',
          },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}