import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import './megamenu.scss'
import { MenuBuilder } from './MenuBuilder'
export interface IMegaMenuProps extends RouteComponentProps {}

function MegaMenu(props: IMegaMenuProps) {
  return (
    <div>
      <nav className="nav" style={{ display: 'flex', background: 'rgb(246, 244, 244)' }}>
        {/* <ul className="d-flex" style={{ margin: '0', padding: '0' }}>
          {MenuItemsMap}
        </ul> */}
        <MenuBuilder />
      </nav>
    </div>
  )
}
export default withRouter(MegaMenu)
