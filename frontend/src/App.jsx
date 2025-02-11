import NavBar from './components/NavBar'
import { Routes, Route } from "react-router-dom"

import LoginPage from './pages/LoginPage'
import Homepage from './pages/Homepage'
import SignupPage from "./pages/SignupPage"
import SettingsPage from "./pages/SettingsPage"
import ProfilePage from "./pages/ProfilePage"
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
function App() {
  const {authUser, checkAuth} = useAuthStore();
  useEffect(()=>{
    checkAuth();
  },[checkAuth])
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>

    </div>
  )
}

export default App
