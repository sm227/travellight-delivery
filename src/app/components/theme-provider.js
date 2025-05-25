'use client'

import { ThemeProvider } from 'next-themes'

export function Providers({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      disableTransitionOnChange={false}
      storageKey="theme"
      themes={['light', 'dark', 'system']}
    >
      {children}
    </ThemeProvider>
  )
} 