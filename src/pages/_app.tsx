import { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'

import '../styles.css'

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute='class'>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
