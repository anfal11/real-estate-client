import React from 'react'
import ReactDOM from 'react-dom/client'
import('preline')
import './index.css'
import {  HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'
import Router from './routes/Router'
import AuthProvider from './Context/AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <HelmetProvider>
 <QueryClientProvider client={queryClient}>
 <AuthProvider>
 <RouterProvider router={Router}>
  </RouterProvider>
 </AuthProvider>
 </QueryClientProvider>
  <Toaster position="top-right"/>
  </HelmetProvider>
  </React.StrictMode>,
)
