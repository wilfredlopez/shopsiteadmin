import { Product } from '../../api_types/ShopAppTypes'
import React from 'react'
import { Card } from '@material-ui/core'
import { Link } from 'react-router-dom'

export const renderData = (data: Product[]) => {
  return (
    data.length > 0 &&
    data.map((product, index) => {
      return (
        <div key={product.productId} className="product_grid_item">
          <Card>
            <div className="pdp_product_img_container">
              <Link to={`/products/${product.productId}`} className="">
                <img src={product.imgUrl} className="pdp_product_img" alt={product.name} />
              </Link>
            </div>
            <Link to={`/products/${product.productId}`} className="products_link">
              <span className="product_product_brandName">{product.brand}</span>
              <span className="product_product_name">{product.name}</span>
            </Link>
          </Card>
        </div>
      )
    })
  )
}
