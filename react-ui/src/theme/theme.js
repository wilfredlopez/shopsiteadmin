import { lightBlue, red, blue } from '@material-ui/core/colors'

import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

let theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: { main: blue[900] }, // Purple and green play nicely together.
    secondary: lightBlue, // This is just green.A700 as hex.
    error: { main: red[300] },
    action: blue,
  },
})

theme = responsiveFontSizes(theme)

export default theme
