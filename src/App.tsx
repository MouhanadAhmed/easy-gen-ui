import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AuthCard from './components/Auth/AuthCard'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import Home from './app/page'
import LoginPage from './app/auth/page'
import NotFound from './app/not-found'

function App() {
  const routes = createHashRouter([
    // {index:true, element: <Home/> },
    {path:"login", element:<AuthCard/>},
    // {path:"*", element:<NotFound/>},
    // {path:"services", element:<Services/>},
    // {path:"servicePage", element:<ServicePage/>},
    // {path:"portfolio", element:<Portfolio/>},
    // {path:"contact", element:<ContactUs/>},
    // {path:"about", element:<AboutUs/>},
  
  ])
  return (
    <>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
       <RouterProvider  router={routes}></RouterProvider>
    </>
  )
}

export default App
