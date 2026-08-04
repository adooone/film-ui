// Color values here must stay in sync with src/styles/_tokens.scss — that file
// is the canonical source.
/** @type {import('tailwindcss').Config} */
export const funcPreset = {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Montserrat Alternates"', 'ui-sans-serif', 'sans-serif'],
        title: ['"KyivType Serif"', 'Georgia', 'serif'],
        serif: ['"KyivType Serif"', 'Georgia', 'serif'],
        mono: ['"Montserrat Alternates"', 'ui-sans-serif', 'sans-serif'],
      },
      colors: {
        // Signature accent — a dark green-teal.
        accent: {
          DEFAULT: '#2BA579',
          light: '#34C08D',
          dark: '#1E8460',
        },
        // Brighter accent used for the lava glow.
        glow: '#36CE91',
        // Semantic, theme-aware colours (driven by the CSS vars in globals.scss).
        bg: 'var(--fui-bg)',
        fg: 'var(--fui-text)',
        surface: 'var(--fui-surface)',
      },
      boxShadow: {
        offset: 'var(--fui-shadow-offset)',
        glow: '0 0 50px rgba(54, 206, 145, 0.25)',
        glass: '0 0 50px rgba(0, 0, 0, 0.3)',
      },
      backdropBlur: {
        glass: '50px',
      },
      keyframes: {
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, -15%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
        'lava-float': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(240px)' },
        },
        // Seamless loop for content duplicated exactly twice
        marquee: {
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        grain: 'grain 8s steps(10) infinite',
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
};

export default funcPreset;
