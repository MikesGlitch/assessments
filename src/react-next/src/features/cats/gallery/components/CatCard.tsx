import React from "react";

import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import HeartIcon from "../../../../components/icons/HeartIcon";
import {
  addFavoriteCatAsync,
  removeFavoriteCatAsync,
  removeVoteAsync,
  voteCatAsync,
} from "../catsGallerySlice";
import { ICat } from "../interfaces/ICat";
import ThumbsDownIcon from "../../../../components/icons/ThumbsDownIcon";
import ThumbsUpIcon from "../../../../components/icons/ThumbsUpIcon";
import { selectUserId } from "../../upload/catsUploadSlice";

function CatCard(props: { cat: ICat }) {
  const cat = props.cat;
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);

  // bit inefficient but ran out of time.  would have ideally just mapped these values to the cat but then paging...
  const favorite = useAppSelector((state) => 
    state.catsGallery.favoriteCats.find((favoriteCat) => favoriteCat.image_id === props.cat.id && favoriteCat.sub_id == userId));

  const thumbsUp = useAppSelector((state) => 
    state.catsGallery.votes.find((vote) => vote.image_id === props.cat.id && vote.value === 1 && vote.sub_id == userId));
  const thumbsDown = useAppSelector((state) => 
    state.catsGallery.votes.find((vote) => vote.image_id === props.cat.id && vote.value === 0 && vote.sub_id == userId));
  const score = useAppSelector((state) => {
    const votesForCat = state.catsGallery.votes.filter((vote) => vote.image_id === props.cat.id);
    const upvotes = votesForCat.filter(vote => vote.value === 1);
    const downvotes = votesForCat.filter(vote => vote.value === 0);
    return upvotes.length - downvotes.length;
  })

  const toggleFavorite = () => {
    if (favorite) {
      dispatch(removeFavoriteCatAsync(favorite.id));
    } else {
      dispatch(addFavoriteCatAsync({ imageId: cat.id, subId: userId }));
    }
  }

  const toggleUpvote = () => {
    if (thumbsUp) {
      dispatch(removeVoteAsync(thumbsUp.id));
    } else {
      dispatch(voteCatAsync({ imageId: cat.id, subId: userId, vote: 1 }));
    }
  }

  const toggleDownvote = () => {
    if (thumbsDown) {
      dispatch(removeVoteAsync(thumbsDown.id));
    } else {
      dispatch(voteCatAsync({ imageId: cat.id, subId: userId, vote: 0 }));
    }
  }

  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={cat.url} alt={cat.original_filename} title={cat.original_filename}/>
        </figure>
      </div>
      <header className="card-header">
        <p className="card-header-title">Score: {score}</p>
        <button className="button my-auto mx-1" onClick={toggleUpvote}>
          <span className="icon is-small">
            <ThumbsUpIcon isFilledIn={thumbsUp ? true : false} />
          </span>
        </button>
        <button className="button my-auto mx-1" onClick={toggleDownvote}>
          <span className="icon is-small">
            <ThumbsDownIcon isFilledIn={thumbsDown ? true : false} />
          </span>
        </button>

        <button className="button my-auto mx-1" onClick={toggleFavorite}>
          <span className="icon is-small">
            <HeartIcon isFilledIn={favorite ? true : false} />
          </span>
        </button>
      </header>
    </div>
  );
}

export default CatCard;
