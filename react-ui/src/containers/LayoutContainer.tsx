import * as React from 'react'
import { ReactReduxContext } from 'react-redux'

// import { ApplicationState } from '../store'

// Redux-specific props.
interface LayoutContainerProps {}

// Wrapper props for render/children callback.
interface LayoutContainerRenderProps {
  render?: (props: LayoutContainerProps) => React.ReactNode
  children?: (props: LayoutContainerProps) => React.ReactNode
}

const LayoutContainer: React.FC<LayoutContainerRenderProps> = ({ render, children }) => {
  return (
    <ReactReduxContext.Consumer>
      {({ store }) => {
        if (render) {
          return render({})
        }

        if (children) {
          return children({})
        }

        return null
      }}
    </ReactReduxContext.Consumer>
  )
}

export default LayoutContainer
