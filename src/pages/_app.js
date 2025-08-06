import { LactaTechProvider } from '../context/LactaTechContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <LactaTechProvider>
      <Component {...pageProps} />
    </LactaTechProvider>
  )
}

export default MyApp
