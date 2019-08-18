import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'

import { ApplicationState, ConnectedReduxProps } from '../../store'
import { Hero } from '../../store/heroes/types'
import { fetchRequest } from '../../store/heroes/actions'

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean
  data: Hero[]
  errors?: string
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  fetchRequest: typeof fetchRequest
}

interface RouteParams {
  name: string
}

interface State {
  selected?: Hero
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState &
  PropsFromDispatch &
  RouteComponentProps<RouteParams> &
  ConnectedReduxProps

class ShowHeroesPage extends React.Component<AllProps, State> {
  constructor(props: AllProps) {
    super(props)

    this.state = {
      selected: undefined,
    }
  }

  public componentDidMount() {
    const { data } = this.props

    if (!data || data.length === 0) {
      this.props.fetchRequest()
    }
  }

  public render() {
    const { data, loading, match } = this.props
    const selected = data.find(hero => hero.name === match.params.name)

    return (
      <div>
        <section>
          <div>
            {loading && <div>LOADING...</div>}
            {selected && <div>HEAFDING...</div>}
          </div>
        </section>
      </div>
    )
  }
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ heroes }: ApplicationState) => ({
  loading: heroes.loading,
  errors: heroes.errors,
  data: heroes.data,
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
)(ShowHeroesPage)
