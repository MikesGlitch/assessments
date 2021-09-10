import { useEffect } from 'react'

import InfiniteScroll from 'react-infinite-scroll-component';
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import {
  getCatsAsync,
  selectCats,
  selectCurrentPage,
  selectHasMoreData
} from './catsGallerySlice'

function CatsGallery() {
  const dispatch = useAppDispatch()
  const status = useAppSelector(state => state.catsGallery.status)

  useEffect(() => {
    // don't know if this is ideal
    console.log(status)
    if (status === 'idle') {
      fetchData()
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
            <div className="columns is-multiline">
              {cats.map((cat: any, index) => {
                return (
                  <div key={index} className="column is-one-quarter">
                    <div className="card">
                      <div className="card-image">
                        <figure className="image is-4by3">
                          <img src={cat.url} alt={cat.original_filename} />
                        </figure>
                      </div>
                      <footer className="card-footer">
                        <a href="#" className="card-footer-item">Vote up</a>
                        <a href="#" className="card-footer-item">Vote down</a>
                        <a href="#" className="card-footer-item">Favorite</a>
                      </footer>
                    </div>
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
