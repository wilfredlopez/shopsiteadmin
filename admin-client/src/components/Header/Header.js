import React, { Component } from "react"
import { Button } from "@material-ui/core"
import { withRouter } from "react-router-dom"
import HeaderAppBar from "./Appbar"

class Header extends Component {
  navigate = url => {
    this.props.history.push(url)
  }
  render() {
    return (
      <React.Fragment>
        <div>
          <header>
            <HeaderAppBar>
              <nav>
                <Button color="inherit">Manage Orders</Button>
                <Button
                  color="inherit"
                  onClick={() => this.navigate("/add-product")}
                >
                  Add Products
                </Button>
                <Button color="inherit">Edit Products</Button>
                <Button color="inherit" onClick={() => this.navigate("/")}>
                  Login
                </Button>
              </nav>
            </HeaderAppBar>
          </header>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(Header)
