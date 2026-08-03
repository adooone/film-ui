/** @type {import('tailwindcss').Config} */
import { filmPreset } from './tailwind.ts';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  presets: [filmPreset],
};
