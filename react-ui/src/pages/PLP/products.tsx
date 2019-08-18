import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'

import LoadingSpinner from '../../components/data/LoadingSpinner'

import { ApplicationState, ConnectedReduxProps } from '../../store'
import { ProductSelectedPayload } from '../../store/products/types'
import { selectProduct, clearSelected } from '../../store/products/actions'

// import { Dispatch } from 'redux'

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean
  selected?: ProductSelectedPayload
  errors?: string
}

interface PropsFromDispatch {
  selectProduct: typeof selectProduct
  clearSelected: typeof clearSelected
}

interface RouteParams {
  id: string
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState &
  PropsFromDispatch &
  RouteComponentProps<RouteParams> &
  ConnectedReduxProps

class ProductListingPage extends React.Component<AllProps> {
  public componentDidMount() {
    const { match } = this.props

    this.props.selectProduct(match.params.id)
  }

  public componentWillUnmount() {
    // clear selected team state before leaving the page
    this.props.clearSelected()
  }

  public render() {
    const { selected, loading } = this.props

    return (
      <div>
        <div>
          <div>
            {loading && (
              <div>
                <LoadingSpinner />
              </div>
            )}
            {selected && (
              <React.Fragment>
                {selected.detail && (
                  <div>
                    <section>
                      {selected.detail.imgUrl && (
                        <img src={selected.detail.imgUrl} alt={selected.detail.name} />
                      )}
                      <div>
                        <p>{selected.detail.name}</p>
                      </div>
                    </section>
                  </div>
                )}
              </React.Fragment>
            )}
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
  selected: products.selected,
})

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = {
  selectProduct,
  clearSelected,
}

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductListingPage)
