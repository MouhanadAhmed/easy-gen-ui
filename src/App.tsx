
import './App.css'
import { Route, Routes, BrowserRouter  } from 'react-router-dom'
import LoginPage from './app/auth/page'
import NotFound from './app/not-found'
import ApplicationPage from './app/Application/ApplicationPage'

function App() {

  return (

         <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/application" element={<ApplicationPage />} />
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
