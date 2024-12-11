import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Summary from './components/Summary.jsx'

const routes = createBrowserRouter([
      {path: "/", element: <App/>, children: [
      {path: "/Summary", element: <Summary/>}
    ]}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={routes}/>
)