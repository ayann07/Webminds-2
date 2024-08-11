import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './store/auth.jsx'

export const BASE_URL='https://easypay-backend.onrender.com/api' 
ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
      <App />
  </AuthProvider>
)
