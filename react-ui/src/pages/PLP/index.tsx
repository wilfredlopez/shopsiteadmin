import * as React from 'react'
import { connect } from 'react-redux'
// import moment from 'moment'

// import DataTable from '../../components/layout/DataTable'

import { ApplicationState } from '../../store'
// import { product } from '../../store/products/types'
import { fetchRequest } from '../../store/products/actions'
import { Product } from '../../api_types/ShopAppTypes'
import './plp.scss'
import { Container } from '@material-ui/core'
import { renderData } from './renderProductList'
// import { Dispatch } from 'redux'

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean
  data: Product[]
  errors?: string
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  fetchRequest: typeof fetchRequest
}

interface IProps {
  cat: string
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch & IProps

class ProductIndexPage extends React.Component<AllProps> {
  public componentDidMount() {
    const { data } = this.props

    if (data.length === 0) {
      this.props.fetchRequest(this.props.cat)
    }
  }

  public render() {
    const { loading } = this.props

    return (
      <div>
        <div>
          <div className="products">
            {loading && <div>Loading...</div>}
            <Container maxWidth="md">
              <div className="my-2">
                <h1>{this.props.cat.toUpperCase()}</h1>
              </div>
              <div className="product_grid">{this.callRenderData()}</div>
            </Container>
          </div>
        </div>
      </div>
    )
  }

  private callRenderData() {
    const { data, loading } = this.props
    return <React.Fragment>{!loading && renderData(data)}</React.Fragment>
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
  fetchRequest,
}

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductIndexPage)
