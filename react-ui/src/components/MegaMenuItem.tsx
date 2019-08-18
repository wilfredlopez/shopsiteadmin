import React from 'react'
import Button from '@material-ui/core/Button'

import MenuItem from '@material-ui/core/MenuItem'
import { Link } from 'react-router-dom'
import { RouteComponentProps } from 'react-router-dom'

import '../css/megamenuitems.scss'

export interface ItemsProp {
  name: string
  link: string
}

export interface IMegaMenuProps extends RouteComponentProps {
  name: string
  selfLink: string
  items: ItemsProp[]
}
function MegaMenuItem(props: IMegaMenuProps) {
  const { name, items, selfLink } = props

  const [over, setOver] = React.useState(false)

  const handleMouseOver: (e: any) => void = e => {
    setOver(true)
  }

  const handleMouseLeave: (e: any) => void = e => {
    setOver(false)
  }

  return (
    <div className="megamenu_item" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
      <div style={{ width: '100px' }}>
        <Button href={selfLink} style={{ textTransform: 'uppercase' }} color="secondary">
          <u> {name}</u>
          <span className="sr-only">(current)</span>
        </Button>
        <div className="items_dropdown_div">
          {over && (
            <div className="list-unstyled" style={{ padding: '0' }}>
              {items.map(item => {
                return (
                  <MenuItem className="" key={item.link}>
                    <Link to={`/categories${item.link}`}>{item.name}</Link>
                  </MenuItem>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MegaMenuItem
