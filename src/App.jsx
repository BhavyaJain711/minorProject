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

import Signup from './components/Auth/Signup'
function App() {

  return (
    <>
      <ThemeContextProvider>
        <BrowserRouter>
          <NavbarDemo />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<RequireAuth allowedRoles={["null"]} />}>
                <Route path='test' element={<Signup />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeContextProvider>
    </>
  )
}

export default App

{/* <Container>
      <Typography variant="h1">Hello Vite + React!</Typography>
      <ToggleTheme />
    </Container> */}