import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import React from 'react'
import Nav from '../components/Nav'
import UploadCat from '../features/cats/upload/UploadCat'

const UploadPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Upload a kitty cat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container">
        <Nav buttonText="Go back" linkTo="/"/>
        <UploadCat />
      </main>
    </div>
  )
}

export default UploadPage
