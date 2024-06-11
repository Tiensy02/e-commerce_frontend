import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Toastify from './components/Toastify.jsx'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import themeOptions from './layout/theme/themeOptions.jsx'
import { themeColors } from './layout/theme/themeColor.jsx'
import { viVN } from '@mui/material/locale';
import { merge } from 'lodash'
import { store } from './redux/store'
import {Provider} from 'react-redux'
const theme = createTheme(merge({}, themeOptions, themeColors.sShopLight), viVN)
ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Toastify></Toastify>
      <App />
    </Provider>

  </ThemeProvider>
)
