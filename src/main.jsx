import React from 'react'
import ReactDOM from 'react-dom/client'
import('preline')
import './index.css'
import { Helmet } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Helmet>
    <title>Real Estate</title>
  </Helmet>
  <Toaster position="top-right"/>
  </React.StrictMode>,
)
