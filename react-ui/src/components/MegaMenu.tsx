import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import MegaMenuItem, { ItemsProp } from './MegaMenuItem'

export interface IMegaMenuProps extends RouteComponentProps {}

function MegaMenu(props: IMegaMenuProps) {
  const menu: { selfLink: string; name: string; items: ItemsProp[] }[] = [
    {
      name: 'Home',
      selfLink: '/',
      items: [{ name: 'Shop All', link: '/home' }, { name: 'Luggage', link: '/home/luggage' }],
    },
    {
      name: 'Men',
      selfLink: '/Men',
      items: [{ name: 'Shop All', link: '/men' }, { name: 'Shirts', link: '/men/shirts' }],
    },
  ]

  const MenuItemsMap = menu.map(item => {
    return (
      <MegaMenuItem
        name={item.name}
        selfLink={item.selfLink}
        items={item.items}
        {...props}
        key={item.name}
      />
    )
  })

  return (
    <div>
      <nav className="nav" style={{ display: 'flex', background: '#e5e5e5' }}>
        <ul className="d-flex" style={{ margin: '0', padding: '0' }}>
          {MenuItemsMap}
        </ul>
      </nav>
    </div>
  )
}
export default withRouter(MegaMenu)
