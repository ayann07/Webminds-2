import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './store/auth.jsx'

export const BASE_URL='http://localhost:4000/api' 
ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
      <App />
  </AuthProvider>
)
