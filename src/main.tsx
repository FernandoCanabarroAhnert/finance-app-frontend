import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import { KeycloakProvider } from './contexts/keycloak.context'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <KeycloakProvider>
      <RouterProvider router={routes} />
    </KeycloakProvider>
  </StrictMode>,
)
