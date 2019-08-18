import * as React from 'react'
import FormRegister from '../../components/FormRegister'

interface Iprops {}
// Promise<FormikErrors<Values>>

export class Register extends React.Component<Iprops> {
  render() {
    return (
      <div className="container-fluid flex-center">
        <div style={{ width: 700 }}>
          <h1 className="text-center">Register</h1>

          <FormRegister />
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

export default Register
