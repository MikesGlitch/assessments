import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import Nav from '../components/Nav'
import CatsGallery from '../features/cats/gallery/components/CatsGallery'
import { selectUserId } from '../features/cats/upload/catsUploadSlice'
import { getOrCreateUserId } from '../features/user/userSlice'

const IndexPage: NextPage = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getOrCreateUserId())
  }, [dispatch])
  
  const userId = useAppSelector(selectUserId)
  
  return (
    <div>
      <Head>
        <title>Kitty cats</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container">
        {userId && (
          <>        
            <Nav buttonText="Upload!" linkTo="/upload"/>
            <CatsGallery />
          </>
        )}
        {!userId && (          
          <p>You have no user id.  You don't get to see this page!</p>
        )}
      </main>
    </div>
  )
}

export default IndexPage
