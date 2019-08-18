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

const TextFormField: React.FC<Iprops & TextFieldProps> = ({
  placeholder,
  field,
  error,
  errorMessage,
  type = 'text',
}) => {
  return (
    <div style={{ width: '100%', marginTop: 10 }}>
      <TextField
        {...field}
        type={type}
        helperText={errorMessage}
        error={error}
        placeholder={placeholder}
        label={placeholder}
        fullWidth
      />
    </div>
  )
}

export default TextFormField
