import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { Raleway } from '@next/font/google'

const queryClient = new QueryClient()

const raleway = Raleway({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-raleway'
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient} >
      <main className={`${raleway.variable} font-sans`}>
        <Component {...pageProps} />
      </main>
    </QueryClientProvider>

  )
}
