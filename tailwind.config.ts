import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: 'var(--primary)',
          50: 'var(--primary-50)',
          100: 'var(--primary-100)',
          200: 'var(--primary-200)',
          300: 'var(--primary-300)',
          400: 'var(--primary-400)',
          500: 'var(--primary-500)',
          600: 'var(--primary-600)',
          700: 'var(--primary-700)',
          800: 'var(--primary-800)',
          900: 'var(--primary-900)',
          950: 'var(--primary-950)',
          hover: 'var(--primary-hover)',
          focus: 'var(--primary-focus)'
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          50: 'var(--secondary-50)',
          100: 'var(--secondary-100)',
          200: 'var(--secondary-200)',
          300: 'var(--secondary-300)',
          400: 'var(--secondary-400)',
          500: 'var(--secondary-500)',
          600: 'var(--secondary-600)',
          700: 'var(--secondary-700)',
          800: 'var(--secondary-800)',
          900: 'var(--secondary-900)',
          950: 'var(--secondary-950)',
          hover: 'var(--secondary-hover)',
          focus: 'var(--secondary-focus)'
        },
        dark: {
          DEFAULT: 'var(--dark)',
          50: 'var(--dark-50)',
          100: 'var(--dark-100)',
          200: 'var(--dark-200)',
          300: 'var(--dark-300)',
          400: 'var(--dark-400)',
          500: 'var(--dark-500)',
          600: 'var(--dark-600)',
          700: 'var(--dark-700)',
          800: 'var(--dark-800)',
          900: 'var(--dark-900)',
          950: 'var(--dark-950)',
          hover: 'var(--dark-hover)',
          focus: 'var(--dark-focus)'
        },
        light: {
          DEFAULT: 'var(--light)',
          50: 'var(--light-50)',
          100: 'var(--light-100)',
          200: 'var(--light-200)',
          300: 'var(--light-300)',
          400: 'var(--light-400)',
          500: 'var(--light-500)',
          600: 'var(--light-600)',
          700: 'var(--light-700)',
          800: 'var(--light-800)',
          900: 'var(--light-900)',
          950: 'var(--light-950)',
          hover: 'var(--light-hover)',
          focus: 'var(--light-focus)'
        },
        // Category colors
        menschen: {
          DEFAULT: 'var(--menschen)',
          50: 'var(--menschen-50)',
          100: 'var(--menschen-100)',
          200: 'var(--menschen-200)',
          300: 'var(--menschen-300)',
          400: 'var(--menschen-400)',
          500: 'var(--menschen-500)',
          600: 'var(--menschen-600)',
          700: 'var(--menschen-700)',
          800: 'var(--menschen-800)',
          900: 'var(--menschen-900)',
          950: 'var(--menschen-950)',
          soft: 'var(--menschen-soft)',
          hover: 'var(--menschen-hover)',
          focus: 'var(--menschen-focus)'
        },
        frieden: {
          DEFAULT: 'var(--frieden)',
          50: 'var(--frieden-50)',
          100: 'var(--frieden-100)',
          200: 'var(--frieden-200)',
          300: 'var(--frieden-300)',
          400: 'var(--frieden-400)',
          500: 'var(--frieden-500)',
          600: 'var(--frieden-600)',
          700: 'var(--frieden-700)',
          800: 'var(--frieden-800)',
          900: 'var(--frieden-900)',
          950: 'var(--frieden-950)',
          soft: 'var(--frieden-soft)',
          hover: 'var(--frieden-hover)',
          focus: 'var(--frieden-focus)'
        },
        umwelt: {
          DEFAULT: 'var(--umwelt)',
          50: 'var(--umwelt-50)',
          100: 'var(--umwelt-100)',
          200: 'var(--umwelt-200)',
          300: 'var(--umwelt-300)',
          400: 'var(--umwelt-400)',
          500: 'var(--umwelt-500)',
          600: 'var(--umwelt-600)',
          700: 'var(--umwelt-700)',
          800: 'var(--umwelt-800)',
          900: 'var(--umwelt-900)',
          950: 'var(--umwelt-950)',
          soft: 'var(--umwelt-soft)',
          hover: 'var(--umwelt-hover)',
          focus: 'var(--umwelt-focus)'
        },
        zusammenarbeit: {
          DEFAULT: 'var(--zusammenarbeit)',
          50: 'var(--zusammenarbeit-50)',
          100: 'var(--zusammenarbeit-100)',
          200: 'var(--zusammenarbeit-200)',
          300: 'var(--zusammenarbeit-300)',
          400: 'var(--zusammenarbeit-400)',
          500: 'var(--zusammenarbeit-500)',
          600: 'var(--zusammenarbeit-600)',
          700: 'var(--zusammenarbeit-700)',
          800: 'var(--zusammenarbeit-800)',
          900: 'var(--zusammenarbeit-900)',
          950: 'var(--zusammenarbeit-950)',
          soft: 'var(--zusammenarbeit-soft)',
          hover: 'var(--zusammenarbeit-hover)',
          focus: 'var(--zusammenarbeit-focus)'
        },
        zukunft: {
          DEFAULT: 'var(--zukunft)',
          50: 'var(--zukunft-50)',
          100: 'var(--zukunft-100)',
          200: 'var(--zukunft-200)',
          300: 'var(--zukunft-300)',
          400: 'var(--zukunft-400)',
          500: 'var(--zukunft-500)',
          600: 'var(--zukunft-600)',
          700: 'var(--zukunft-700)',
          800: 'var(--zukunft-800)',
          900: 'var(--zukunft-900)',
          950: 'var(--zukunft-950)',
          soft: 'var(--zukunft-soft)',
          hover: 'var(--zukunft-hover)',
          focus: 'var(--zukunft-focus)'
        },
        // Semantic color variables
        surface: 'var(--color-surface)',
        'surface-secondary': 'var(--color-surface-secondary)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',
        border: 'var(--color-border)',
        'border-hover': 'var(--color-border-hover)'
      },
      fontSize: {
        // HTML tag-based font sizes with responsive design
        // Mobile first (base), then lg+ (desktop) - using utility classes for responsive
        'h1': ['3rem', { lineHeight: '1.2' }], // Mobile: 48px, Desktop: 64px (via lg:text-[4rem])
        'h2': ['2.25rem', { lineHeight: '1.25' }], // Mobile: 36px, Desktop: 48px (via lg:text-[3rem])
        'h3': ['1.75rem', { lineHeight: '1.3' }], // Mobile: 28px, Desktop: 36px (via lg:text-[2.25rem])
        'h4': ['1.375rem', { lineHeight: '1.35' }], // Mobile: 22px, Desktop: 28px (via lg:text-[1.75rem])
        'h5': ['1.125rem', { lineHeight: '1.4' }], // Mobile: 18px, Desktop: 22px (via lg:text-[1.375rem])
        'h6': ['1rem', { lineHeight: '1.4' }], // Mobile: 16px, Desktop: 18px (via lg:text-[1.125rem])
        'p': ['1rem', { lineHeight: '1.5' }], // Both: 16px
        'small': ['0.875rem', { lineHeight: '1.5' }], // Mobile: 14px, Desktop: 16px (via lg:text-[1rem])
        'caption': ['0.75rem', { lineHeight: '1.6' }], // Mobile: 12px, Desktop: 14px (via lg:text-[0.875rem])
        
        // Desktop variants for responsive usage
        'h1-lg': ['4rem', { lineHeight: '1.2' }], // 64px
        'h2-lg': ['3rem', { lineHeight: '1.25' }], // 48px
        'h3-lg': ['2.25rem', { lineHeight: '1.3' }], // 36px
        'h4-lg': ['1.75rem', { lineHeight: '1.35' }], // 28px
        'h5-lg': ['1.375rem', { lineHeight: '1.4' }], // 22px
        'h6-lg': ['1.125rem', { lineHeight: '1.4' }], // 18px
        'small-lg': ['1rem', { lineHeight: '1.5' }], // 16px
        'caption-lg': ['0.875rem', { lineHeight: '1.6' }] // 14px
      } as any,
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
};
export default config;
