/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        langFadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        titleSlideIn: {
          '0%': { opacity: '0', left: '-300%' },
          '60%': { opacity: '1', left: '-5%' },
          '100%': { opacity: '1', left: '0%' },
        },
        subTitleSlideIn: {
          '0%': { opacity: '0', left: '-200%' },
          '80%': { opacity: '1', left: '5%' },
          '100%': { opacity: '1', left: '0%' },
        },
        jobSlideIn: {
          '0%': { opacity: '0', right: '-200%' },
          '55%': { opacity: '1', right: '5%' },
          '100%': { opacity: '1', right: '0%' },
        },
        subJobSlideIn: {
          '0%': { opacity: '0', right: '-200%' },
          '80%': { opacity: '1', right: '5%' },
          '100%': { opacity: '1', right: '0%' },
        },
        line1Desk: {
          '0%': { opacity: '0', top: '-1500px' },
          '80%': { opacity: '1', top: '80px' },
          '100%': { opacity: '1', top: '100px' },
        },
        line1Mobile: {
          '0%': { opacity: '0', top: '-1500px' },
          '80%': { opacity: '1', top: '55px' },
          '100%': { opacity: '1', top: '65px' },
        },
        line2Desk: {
          '0%': { opacity: '0', top: '-1500px' },
          '80%': { opacity: '1', top: '-110px' },
          '100%': { opacity: '1', top: '-100px' },
        },
        line2Mobile: {
          '0%': { opacity: '0', top: '-1500px' },
          '80%': { opacity: '1', top: '-73px' },
          '100%': { opacity: '1', top: '-63px' },
        },
      },
      animation: {
        'lang-fade': 'langFadeIn 0.5s ease-out 1.5s forwards',
        'title-slide': 'titleSlideIn 0.5s ease-out 0.5s forwards',
        'subtitle-slide': 'subTitleSlideIn 0.3s ease-out 0.8s forwards',
        'job-slide': 'jobSlideIn 0.7s ease-out 0.8s forwards',
        'subjob-slide': 'subJobSlideIn 0.6s ease-out 0.9s forwards',
        'line1-desk': 'line1Desk 0.4s ease-out 0.8s forwards',
        'line1-mobile': 'line1Mobile 0.4s ease-out 0.8s forwards',
        'line2-desk': 'line2Desk 0.4s ease-out 1.1s forwards',
        'line2-mobile': 'line2Mobile 0.4s ease-out 1.1s forwards',
      },
    },
  },
  plugins: [],
};
