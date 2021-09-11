import React, { useEffect } from 'react'

import InfiniteScroll from 'react-infinite-scroll-component';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks'
import { selectUserId } from '../../upload/catsUploadSlice';
import {
  getCatsAsync,
  getFavoriteCatsAsync,
  getVotesAsync,
  selectCats,
  selectCurrentPage,
  selectHasMoreData,
} from './../catsGallerySlice'
import { ICat } from "./../interfaces/ICat";
import CatCard from './CatCard';

function CatsGallery() {
  const dispatch = useAppDispatch()
  const status = useAppSelector(state => state.catsGallery.status)
  const userId = useAppSelector(selectUserId)

  useEffect(() => {
    if (status === 'idle') {
      fetchData()
      dispatch(getFavoriteCatsAsync(userId))
      dispatch(getVotesAsync())
    }
  }, [status, dispatch])

  const cats = useAppSelector(selectCats)
  const hasMoreData = useAppSelector(selectHasMoreData)
  const currentPage = useAppSelector(selectCurrentPage)

  const fetchData = () => {
    dispatch(getCatsAsync({ page: currentPage }))
  }

  return (
    <>
      <div>
          <InfiniteScroll
            style={{ overflow: 'hidden' }}
            dataLength={cats.length} //This is important field to render the next data
            next={fetchData}
            hasMore={hasMoreData}
            loader={<h4>Loading...</h4>}
          >
            <div className="columns is-mobile is-multiline">
              {cats.map((cat: ICat, index) => {
                return (
                  <div key={index} className="column is-one-quarter-desktop is-half-tablet is-full-mobile">
                    <CatCard cat={cat} />
                  </div>
                )
              })}
            </div>
          </InfiniteScroll>
      </div>
      </>
  )
}

export default CatsGallery
