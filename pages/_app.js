import Layout from '@components/Layout'
import { useRouter } from 'next/router'
import '../styles/global.css'

export default function App({ Component, pageProps }) {
  const router = useRouter()

  return (
    <Layout home={router.pathname === '/'}>
      <Component {...pageProps} pathname={router.pathname} />
    </Layout>
  )
}
