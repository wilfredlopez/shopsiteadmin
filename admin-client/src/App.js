import React from "react"
import { BrowserRouter as Router } from "react-router-dom"

import { ThemeProvider } from "@material-ui/styles"
import { CssBaseline } from "@material-ui/core"

import theme from "./styles/theme"
import Header from "./components/Header/Header"
import Routes from "./routes"

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline>
      <Router>
        <div className="app-root">
          <Header />
          <Routes />
        </div>
      </Router>
    </CssBaseline>
  </ThemeProvider>
)

export default App
