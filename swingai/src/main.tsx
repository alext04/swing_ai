import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { injectTheme } from './theme.ts'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

// Inject theme CSS variables
injectTheme()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
