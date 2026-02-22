import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { injectTheme } from './theme.ts'
import '@fontsource/barlow-semi-condensed/400.css'
import '@fontsource/barlow-semi-condensed/500.css'
import '@fontsource/barlow-semi-condensed/600.css'
import '@fontsource/barlow-semi-condensed/700.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

// Inject theme CSS variables
injectTheme()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
