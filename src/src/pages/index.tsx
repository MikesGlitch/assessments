import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Nav from '../components/Nav'
import CatsGallery from '../features/cats/gallery/CatsGallery'

const IndexPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Kitty cats</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container">
        <Nav buttonText="Upload!" linkTo="/upload"/>
        <CatsGallery />
      </main>
    </div>
  )
}

export default IndexPage
