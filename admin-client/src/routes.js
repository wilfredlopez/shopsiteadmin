import React from "react"
import { Route, Switch } from "react-router-dom"

import IndexPage from "./pages/home/Home"
import AddProduct from "./pages/AddProduct/AddProduct"

const Routes = () => (
  <Switch>
    <Route exact path="/" component={IndexPage} />
    <Route exact path="/add-product" component={AddProduct} />
    <Route component={() => <div>Not Found</div>} />
  </Switch>
)

export default Routes
