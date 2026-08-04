/** @type {import('tailwindcss').Config} */
import { funcPreset } from './tailwind.ts';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  presets: [funcPreset],
};
