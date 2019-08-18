import * as React from 'react'
import FormLogin from '../../components/FormLogin'

interface Iprops {}
// Promise<FormikErrors<Values>>

export class Login extends React.PureComponent<Iprops> {
  render() {
    return (
      <div className="container-fluid flex-center">
        <div style={{ width: 700 }}>
          <h1 className="text-center">Login</h1>

          <FormLogin />
        </div>
      </div>
    )
  }
}
// export const Contact: React.FC<React.ReactElement> = (props: Iprops) => {
//   const handleFormSubmit = (e: any) => {
//     console.log(e)
//   }

//   return (
//     <div className="container">
//       <h1>Contact</h1>
//       <MyForm onSubmit={handleFormSubmit} />
//     </div>
//   )
// }

export default Login
