import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import FloatingButton from '../components/FloatingButton'
import UploadCat from '../features/cats/upload/UploadCat'

const UploadPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Upload a kitty cat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container">
        <FloatingButton buttonText="Go back" linkTo='/' />
        <UploadCat />
      </main>
    </div>
  )
}

export default UploadPage
