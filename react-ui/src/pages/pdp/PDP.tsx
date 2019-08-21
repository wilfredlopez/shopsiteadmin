// import { Dispatch } from "redux"
import { Button, Container, Divider } from '@material-ui/core'
import * as React from 'react'
import { useEffect, useState } from 'react'
// import {useCallback} from 'react'
// import { useSelector, useDispatch } from "react-redux"
import { RouteComponentProps } from 'react-router'
import { Product } from '../../api_types/ShopAppTypes'
import config from '../../config'
import './pdp.scss'

const API_ENDPOINT = config.API_ENDPOINT

interface RouteParams {
  id: string
}

interface PDPProps extends RouteComponentProps<RouteParams> {}
const PDP = (props: PDPProps) => {
  const [product, setProduct] = useState<Product>()

  const { match } = props
  // const count = useSelector((state: AppState) => state.count)
  // const dispatch: Dispatch = useDispatch()
  // const add: () => void = useCallback(() => dispatch(increment()), [dispatch])
  // const dec: () => void = useCallback(() => dispatch(decrement()), [dispatch])
  const fetchProduct = async () => {
    const id = match.params.id
    const res = await fetch(`${API_ENDPOINT}/api/products/id/${id}`)

    const data = await res.json()

    // console.log(data)

    setProduct(data)
  }

  useEffect(() => {
    fetchProduct()

    return () => {
      //cleanup
    }
    // eslint-disable-next-line
  }, [])

  return (
    <Container>
      <div>
        {product && (
          <React.Fragment>
            <h1>{product.categories[0].name.toUpperCase()}</h1>
            <div className="pdp_main_grid">
              <div className="pdp_grid_two">
                <div className="pdp_image_container">
                  <img src={product.imgUrl} className="pdp_image" alt={product.name} />
                </div>
              </div>
              <div className="pdp_grid_one">
                <h1 style={{ margin: 0 }}>{product.brand}</h1>
                <div className="pdp_details_area">
                  <p className="text-bold">{product.name}</p>
                </div>
                <div className="pdp_details_area">
                  <p className="text-bold">Description:</p>
                  <span className="space"> </span>
                  <p>{product.description}</p>
                </div>
                <div className="pdp_details_area">
                  <p className="text-bold">Price:</p>
                  <span className="space"> </span>
                  <p>{`$${product.price.toFixed(2)}`}</p>
                </div>
                <div>
                  <Button variant="contained" color="primary">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>

            <div className="pdp_lower_section">
              <Divider />
              <h4> Details</h4>
              <div>{product.description}</div>
              <div>{product.condition}</div>
              <div>{product.size}</div>
            </div>
          </React.Fragment>
        )}
      </div>
    </Container>
  )
}

export default PDP
