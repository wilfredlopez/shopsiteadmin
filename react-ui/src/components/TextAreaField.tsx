import * as React from 'react'
import { TextField } from '@material-ui/core'
import { FieldProps } from 'formik'
import { TextFieldProps } from '@material-ui/core/TextField'

interface Iprops extends FieldProps {
  placeholder: string
  errorMessage: string
  // value: string
  // handleBlur: (e: React.FocusEvent<any>) => void
  // handleChange: (e: React.ChangeEvent<any>) => void
}

const TextAreaField: React.FC<Iprops & TextFieldProps> = ({
  placeholder,
  field,
  errorMessage,
  error,
}) => {
  return (
    <div style={{ width: '100%', marginTop: '1rem' }}>
      <TextField
        multiline
        helperText={errorMessage}
        error={error}
        rows="6"
        {...field}
        placeholder={`${placeholder}...`}
        label={placeholder}
        fullWidth
      />
    </div>
  )
}

export default TextAreaField
