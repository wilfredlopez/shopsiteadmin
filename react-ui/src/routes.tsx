import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import Root from './components/layout/Root'
import IndexPage from './pages/index'
import Register from './pages/contact/Register'
import { ThemeProvider } from '@material-ui/styles'
import { CssBaseline } from '@material-ui/core'

import PDP from './pages/pdp/PDP'

import theme from './theme/theme'
import HeaderAppBar from './components/HeaderAppBar'
import Login from './pages/login/Login'
import PLP from './pages/PLP/PLP'

// If your app is big + you have routes with a lot of components, you should consider
// code-splitting your routes! If you bundle stuff up with Webpack, I recommend `react-loadable`.
//
// $ yarn add react-loadable
// $ yarn add --dev @types/react-loadable
//
// The given `pages/` directory provides an example of a directory structure that's easily
// code-splittable.

const Routes: React.SFC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline>
      <Root>
        <HeaderAppBar />
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route exact path="/login" component={Login} />
          <Route path="/categories/:cat" component={PLP} />

          <Route exact path="/register" component={Register} />
          <Route exact path="/products/:id" component={PDP} />
          <Route component={() => <div>Not Found</div>} />
        </Switch>
      </Root>
    </CssBaseline>
  </ThemeProvider>
)

export default Routes
