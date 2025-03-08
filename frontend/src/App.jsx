import NavBar from './components/NavBar'
import { Routes, Route, Navigate } from "react-router-dom"

import LoginPage from './pages/LoginPage'
import Homepage from './pages/HomePage'
import SignupPage from "./pages/SignupPage"
import SettingsPage from "./pages/SettingsPage"
import ProfilePage from "./pages/ProfilePage"
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import {Loader} from 'lucide-react'
import { useThemeStore } from './store/usethemeStore'
import { Toaster } from 'react-hot-toast'
function App() {
  const {authUser, checkAuth, isCheckingAuth, onlineUsers} = useAuthStore();
  const {theme} = useThemeStore();
  useEffect(()=>{
    checkAuth();
  },[checkAuth]);

  console.log({onlineUsers});
  
  if(isCheckingAuth && !authUser){
    return(
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin'/>
      </div>
    )
  }
  return (
    <div data-theme = {theme}>
      <Toaster position="top-center" reverseOrder={false} />
      <NavBar />
      <Routes>
        <Route path='/' element={authUser ? <Homepage />: <Navigate to={'/login'}/>} />
        <Route path='/signup' element={!authUser ? <SignupPage />: <Homepage />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Homepage />} />
        <Route path='/settings' element={<SettingsPage />}/>
        <Route path='/profile' element={authUser ? <ProfilePage />: <Navigate to={'/login'}/>}/>
      </Routes>

    </div>
  )
}

export default App
