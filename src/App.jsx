import { useState } from 'react'
import {ThemeContextProvider} from './ThemeContext'
import './App.css'
import { Button, Typography, Container } from '@mui/material'
import ToggleTheme from './ThemeContext/ToggleTheme'
import { NavbarDemo } from './components/navbar'
import { BrowserRouter } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <ThemeContextProvider>
    <Container>
    <NavbarDemo />
      <Button className="my-8" variant="contained" color="primary" onClick={() => setCount((count) => count + 1)}>
        {count}
      </Button>
      <Typography variant="h1">Hello Vite + React!</Typography>
      <ToggleTheme />
    </Container>
    </ThemeContextProvider>
    </BrowserRouter>
    </>
  )
}

export default App
