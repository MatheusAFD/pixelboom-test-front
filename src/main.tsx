import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { NuqsAdapter } from 'nuqs/adapters/react'

import App from './App.tsx'
import { SidebarProvider } from './components/ui/sidebar.tsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/tanstack-query.ts'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
        <SidebarProvider
          style={
            {
              '--sidebar-width': '15rem',
            } as React.CSSProperties
          }
        >
          <App />
          <Toaster />
        </SidebarProvider>
      </QueryClientProvider>
    </NuqsAdapter>
  </StrictMode>
)
