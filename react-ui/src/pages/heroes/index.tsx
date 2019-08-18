import * as React from 'react'

import { connect } from 'react-redux'

import { ApplicationState, ConnectedReduxProps } from '../../store'
import { Hero } from '../../store/heroes/types'
import { fetchRequest } from '../../store/heroes/actions'

import config from '../../config'

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

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps

// const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'https://api.opendota.com'
const API_ENDPOINT = config.API_ENDPOINT

class HeroesIndexPage extends React.Component<AllProps> {
  public componentDidMount() {
    this.props.fetchRequest()
  }

  public render() {
    const { loading } = this.props

    return (
      <div>
        <section>
          <div>
            {loading && <div>Loading...</div>}
            <p>
              <small>*in last 30 days</small>
            </p>
            {this.renderData()}
          </div>
        </section>
      </div>
    )
  }

  private renderData() {
    const { loading, data } = this.props

    return (
      <div>
        {loading && data.length === 0 && (
          <div>
            <td colSpan={3}>Loading...</td>
          </div>
        )}
        {data.map(hero => (
          <tr key={hero.id}>
            <div>
              <img src={API_ENDPOINT + hero.icon} alt={hero.name} />
            </div>
            <td>
              {hero.pro_pick || 0} / {hero.pro_ban || 0}
            </td>
            <td>{hero.pro_win || 0}</td>
          </tr>
        ))}
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
)(HeroesIndexPage)
