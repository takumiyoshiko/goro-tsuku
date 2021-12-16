import Main from './components/Main'
import Header from './components/Header'
import Footer from './components/Footer'
import theme from './theme'
import CssBaseline from '@mui/material/CssBaseline'
import React from 'react'
import { ThemeProvider } from '@mui/material'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Main />
      <Footer />
    </ThemeProvider>
  )
}

export default App
