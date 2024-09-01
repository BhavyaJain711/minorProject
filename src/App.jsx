import { useState } from 'react'
import { ThemeContextProvider } from './ThemeContext'
import './App.css'
import { Button, Typography, Container } from '@mui/material'
import ToggleTheme from './ThemeContext/ToggleTheme'
import { NavbarDemo } from './components/navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RequireAuth from './components/Auth/RequireAuth'
import Unauthorized from './components/Auth/Unauthorized'
import Layout from './components/Auth/Layout'

import Signup from './components/Auth/Signup2'
import LoginFormDemo from './components/Auth/Login'
import Logout from './components/Auth/Logout'
import Home from './pages/Home'
import PublicHome from './pages/PublicHome'
function App() {

  return (
    <div className="flex flex-col relative min-h-screen w-full bg-light-background text-light-text  dark:bg-dark-background dark:text-dark-text">
      <ThemeContextProvider>
        <BrowserRouter>
          <NavbarDemo />
          <Routes>

          {/* Public Routes */}
            <Route path="/" element={<Layout />}>
                <Route path="/" exact element={<PublicHome />} />
            </Route>
          {/* Student Routes */}
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<RequireAuth allowedRoles={["student"]} />}>
                <Route path="/home" element={<Home />} />
              </Route>
            </Route>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<RequireAuth allowedRoles={['null',null]} />}>
                <Route path='signup' element={<Signup />} />
                <Route path='login' element={<LoginFormDemo />} />
              </Route>
            </Route>
            {/* Logged in User Routes */}
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<RequireAuth allowedRoles={["student"]} />}>
                <Route path="/logout" element={<Logout />} />
              </Route>
            </Route>

          </Routes>
        </BrowserRouter>
      </ThemeContextProvider>
    </div>
  )
}

export default App

{/* <Container>
      <Typography variant="h1">Hello Vite + React!</Typography>
      <ToggleTheme />
    </Container> */}