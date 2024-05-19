import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from "@propelauth/react";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider authUrl={import.meta.env.VITE_AUTH_URL}>
        <App />
    </AuthProvider>
  </React.StrictMode>,
)
