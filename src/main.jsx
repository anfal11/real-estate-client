import React from 'react'
import ReactDOM from 'react-dom/client'
import('preline')
import './index.css'
import {  HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'
import Router from './routes/Router'
import AuthProvider from './Context/AuthProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <HelmetProvider>
 <AuthProvider>
 <RouterProvider router={Router}>
  </RouterProvider>
 </AuthProvider>
  <Toaster position="top-right"/>
  </HelmetProvider>
  </React.StrictMode>,
)
