import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { AuthContextProvider } from '../contexts/AuthContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <SessionProvider
        session={pageProps.session}
      >
        <Component {...pageProps} />
      </SessionProvider>
    </AuthContextProvider>
  )
}
