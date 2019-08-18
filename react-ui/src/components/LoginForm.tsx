import * as React from 'react'
import { Form, Field, FormikErrors, withFormik, FormikProps } from 'formik'
import TextFormField from './TextFormField'
import { Button, Container } from '@material-ui/core'
import * as Yup from 'yup'
// import { RouteComponentProps } from 'react-router'
import { RouteComponentProps, withRouter } from 'react-router-dom'

interface Iprops extends RouteComponentProps {
  submit: (values: Values) => Promise<FormikErrors<Values> | null>
}

export interface Values {
  email: string
  password: string
}

export class MyForm extends React.PureComponent<FormikProps<Values> & Iprops> {
  state = {
    inicialValues: { password: '', email: '' },
  }

  private fist = React.createRef<HTMLDivElement>()

  focusError(error: any) {
    if (error.firstname) {
      const node = this.fist.current
      if (node) {
        node.focus()
      }
    }
  }

  render() {
    // const { submit } = this.props
    const { errors, touched } = this.props
    return (
      <Container maxWidth="md">
        <Form>
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

          <div style={{ marginTop: 10 }}>
            <Button
              type="submit"
              color="primary"
              style={{ color: '#fff' }}
              fullWidth
              variant="contained"
            >
              Submit
            </Button>
            {errors && this.focusError(errors)}

            <p style={{ textAlign: 'center', margin: ' 2rem 0' }}>
              <strong>Or</strong>
            </p>
            <Button
              type="submit"
              color="secondary"
              style={{ color: '#fff' }}
              fullWidth
              onClick={() => {
                this.props.history.push('/register')
              }}
              variant="contained"
            >
              Register
            </Button>
          </div>
        </Form>
      </Container>
    )
  }
}

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, 'Name is too short! min 2 characters')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email, Please verify and try again')
    .required('Required'),
})

//FormikProps<Values>

const loginView = withFormik<Iprops, Values>({
  validationSchema: validationSchema,
  mapPropsToValues: () => ({
    email: '',
    password: '',
  }),
  handleSubmit: async (values: Values, { props, setErrors, setSubmitting }) => {
    const errors = await props.submit(values)
    if (errors) {
      setErrors(errors)
    }
  },
})(MyForm)

export default withRouter(loginView)
