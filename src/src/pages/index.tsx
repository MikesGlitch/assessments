import type { NextPage } from 'next'
import Head from 'next/head'
import FloatingButton from '../components/FloatingButton'
import CatsGallery from '../features/cats/gallery/CatsGallery'

const IndexPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Kitty cats</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container">
        <CatsGallery />
        <FloatingButton buttonText="Upload!" linkTo="/upload" />
      </main>
    </div>
  )
}

export default IndexPage
