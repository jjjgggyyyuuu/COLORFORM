module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6',
          dark: '#1E40AF',
          light: '#93C5FD',
        },
        secondary: {
          DEFAULT: '#6B7280',
          dark: '#374151',
          light: '#9CA3AF',
        },
        highlight: '#F59E0B',
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
        background: {
          dark: '#111827',
          light: '#F9FAFB',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
} 