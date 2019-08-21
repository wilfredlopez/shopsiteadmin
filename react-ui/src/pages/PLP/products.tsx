import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'

import LoadingSpinner from '../../components/data/LoadingSpinner'

import { ApplicationState, ConnectedReduxProps } from '../../store'

import { selectSubCategory, clearSelected } from '../../store/products/actions'
import { Product } from '../../api_types/ShopAppTypes'
import { renderData } from './renderProductList'
import { Container } from '@material-ui/core'

// import { Dispatch } from 'redux'

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean
  data?: Product[]
  errors?: string
}

interface PropsFromDispatch {
  selectSubCategory: typeof selectSubCategory
  clearSelected: typeof clearSelected
}

interface RouteParams {
  id: string
  cat: string
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState &
  PropsFromDispatch &
  RouteComponentProps<RouteParams> &
  ConnectedReduxProps

class ProductListingPage extends React.Component<AllProps> {
  public componentDidMount() {
    const { match } = this.props

    this.props.selectSubCategory(`${match.params.cat}/${match.params.id}`)
  }

  public componentWillUnmount() {
    // clear selected team state before leaving the page
    this.props.clearSelected()
  }

  private callRenderData() {
    const { data, loading } = this.props
    return <React.Fragment>{!loading && data && renderData(data)}</React.Fragment>
  }

  public render() {
    const { data, loading } = this.props

    return (
      <div>
        <div>
          <div>
            {loading && (
              <div>
                <LoadingSpinner />
              </div>
            )}
            <Container maxWidth="md">
              <div className="my-2">
                <h1>
                  <span>{this.props.match.params.cat.toUpperCase()} / </span>
                  <span> {this.props.match.params.id.toUpperCase()}</span>
                </h1>
              </div>
              {data && (
                <div className="product_grid">
                  <React.Fragment>{this.callRenderData()}</React.Fragment>
                </div>
              )}
            </Container>
          </div>
        </div>
      </div>
    )
  }
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ products }: ApplicationState) => ({
  loading: products.loading,
  errors: products.errors,
  data: products.data,
})

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = {
  selectSubCategory,
  clearSelected,
}

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductListingPage)
