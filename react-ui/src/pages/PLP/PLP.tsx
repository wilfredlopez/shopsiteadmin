import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, Route, Switch } from 'react-router-dom'

import ProductIndexPage from './index'
import ProductListingPage from './products'

import { ApplicationState } from '../../store'

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean
  errors?: string
}
interface RouteParams {
  cat: string
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & RouteComponentProps<RouteParams>

class PLP extends React.Component<AllProps> {
  public render() {
    const { match } = this.props
    const cat = match.params.cat

    return (
      <Switch>
        <Route exact path={match.path + '/'} render={props => <ProductIndexPage cat={cat} />} />
        <Route exact path={match.path + '/:id'} component={ProductListingPage} />
      </Switch>
    )
  }
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ products }: ApplicationState) => ({
  loading: products.loading,
  errors: products.errors,
})

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(mapStateToProps)(PLP)
