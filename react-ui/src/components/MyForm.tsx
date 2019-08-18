import * as React from 'react'
import { Form, Field, FormikErrors, withFormik, FormikProps } from 'formik'
import TextFormField from './TextFormField'
import { Button, Container } from '@material-ui/core'

import * as Yup from 'yup'
import { UserProfile } from '../api_types/ShopAppTypes'
import { withRouter, RouteComponentProps } from 'react-router-dom'

interface Iprops extends RouteComponentProps {
  submit: (values: UserProfile) => Promise<FormikErrors<UserProfile> | null>
}

export class MyForm extends React.PureComponent<FormikProps<UserProfile> & Iprops> {
  state = {
    inicialValues: { firstName: '', lastName: '', email: '', password: '', phoneNumber: '' },
  }

  render() {
    // const { submit } = this.props
    const { errors, touched } = this.props
    return (
      <Container maxWidth="md">
        <Form>
          <Field
            errorMessage={touched.firstName ? errors.firstName : ''}
            error={touched.firstName && errors.firstName && true}
            name="firstName"
            placeholder="First Name"
            component={TextFormField}
          />
          <Field
            errorMessage={touched.lastName ? errors.lastName : ''}
            error={touched.lastName && errors.lastName && true}
            name="lastName"
            placeholder="Last Name"
            component={TextFormField}
          />
          <Field
            errorMessage={touched.email ? errors.email : ''}
            error={touched.email && errors.email && true}
            name="email"
            placeholder="Email"
            type="email"
            component={TextFormField}
          />
          <Field
            errorMessage={touched.password ? errors.password : ''}
            error={touched.password && errors.password && true}
            name="password"
            type="password"
            placeholder="Password"
            component={TextFormField}
          />
          <Field
            errorMessage={touched.phoneNumber ? errors.phoneNumber : ''}
            error={touched.phoneNumber && errors.phoneNumber && true}
            name="phoneNumber"
            placeholder="Phone Number *Optional"
            component={TextFormField}
          />

          <div style={{ marginTop: 10 }}>
            <Button
              type="submit"
              color="secondary"
              style={{ color: '#fff' }}
              fullWidth
              variant="contained"
            >
              Submit
            </Button>
          </div>
        </Form>
      </Container>
    )
  }
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Name is too short! min 2 characters')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Lastname is too short! min 2 characters')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email, Please verify and try again')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Password is required. min 6 charcters')
    .required('Required'),
})

//FormikProps<Values>

const RegisterView = withFormik<any, any>({
  validationSchema: validationSchema,
  mapPropsToValues: () => ({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    orders: [],
  }),
  handleSubmit: async (values: UserProfile, { props, setErrors, setSubmitting }) => {
    const errors = await props.submit(values)
    if (errors) {
      setErrors(errors)
    }
  },
})(MyForm)

export default withRouter(RegisterView)
