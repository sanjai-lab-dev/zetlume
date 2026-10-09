/** @type {import('tailwindcss').Config} */
function withOpacity(varName) {
  return ({ opacityValue }) =>
    opacityValue !== undefined
      ? `rgb(var(${varName}) / ${opacityValue})`
      : `rgb(var(${varName}))`
}

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // All colors resolve through CSS variables (defined in index.css) so
        // the whole site can switch themes at runtime via a data-theme attribute
        // — see ThemeContext + ThemeToggle. Two presets ship: "royal-brown"
        // (default) and "royal-blue", both paired with a gold accent.
        background: withOpacity('--color-background'),
        secondary: withOpacity('--color-secondary'),
        card: withOpacity('--color-card'),
        primary: withOpacity('--color-primary'),
        accent: withOpacity('--color-accent'),
        cyan: withOpacity('--color-cyan'),
        deepBrown: withOpacity('--color-deep'),
        darkBrown: withOpacity('--color-dark'),
        lightBrown: withOpacity('--color-light'),
        beige: withOpacity('--color-beige'),
        text: withOpacity('--color-text'),
        muted: withOpacity('--color-muted'),
        success: withOpacity('--color-success'),
        warning: withOpacity('--color-warning'),
        danger: withOpacity('--color-danger'),
      },
      fontFamily: {
        display: ['"Playfair Display"', '"Space Grotesk"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'aurora-gradient': 'linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-light)) 50%, rgb(var(--color-accent)) 100%)',
        'grid-pattern': 'linear-gradient(rgb(var(--color-primary) / 0.05) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--color-primary) / 0.05) 1px, transparent 1px)',
        'gold-shimmer': 'linear-gradient(120deg, rgb(var(--color-accent)) 0%, rgb(var(--color-accent-light)) 50%, rgb(var(--color-accent)) 100%)',
      },
      boxShadow: {
        glow: '0 10px 35px rgb(var(--color-primary) / 0.18)',
        'glow-cyan': '0 10px 35px rgb(var(--color-accent) / 0.3)',
        soft: '0 4px 20px rgb(var(--color-text) / 0.06)',
        elegant: '0 20px 50px -12px rgb(var(--color-primary) / 0.28)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 0.9 },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
      },
    },
  },
  plugins: [],
}
