import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { QUERY_SINGLE_VIDEO } from "../utils/queries";
import { VIDEO_METRICS, UPDATE_LIKES, UPDATE_DISLIKES } from "../utils/mutations";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Auth from "../utils/auth";
// Single video page
const SingleVideo = () => {
  const { videoId } = useParams();
  // if user is not logged in, level is -1 which restricts certain privileges 
  let level = -1;
  let userId = "";
  if (Auth.getProfile()) {
    level = Auth.getProfile().data.level;
    userId = Auth.getProfile().data._id;
  };
  const [videoMetrics] = useMutation(VIDEO_METRICS);
  const [updateLikes] = useMutation(UPDATE_LIKES);
  const [updateDislikes] = useMutation(UPDATE_DISLIKES);
  // Queries singe video based on params video id
  const { loading, data } = useQuery(QUERY_SINGLE_VIDEO, {
    variables: { videoId: videoId },
  });

  let disable = false;

  if (loading) {
    return <div>Loading...</div>;
  } else {
    const video = data?.video || {};

    if (video.likedBy.includes(userId) || video.dislikedBy.includes(userId)) {
      disable = true;
    }

    let viewsTag = "";
    viewsTag = `${video.views} views`
    // Tracks views based on page reload
    const updateMetrics = () => {
      const newView = (video.views + 1);
      try {
        videoMetrics({
          variables: {
            videoId: videoId,
            views: newView,
          }
        });
      } catch (err) {
        console.log(err);
      }
    };
    // Like button functionality 
    const isLiked = async () => {
      try {
        await updateLikes({
          variables: {
            videoId: videoId,
            user: userId,
          },
        });
      } catch (err) {
        console.error(err);
      }
    }
    // Calls to increase likes on click of like button
    const clickLike = () => {
      isLiked();
      disable = true;
    }
    // Dislike button functionality 
    const isDisliked = async () => {
      try {
        await updateDislikes({
          variables: {
            videoId: videoId,
            user: userId,
          }
        });
      } catch (err) {
        console.error(err);
      }
    }
    // Calls to increase dislikes on click of dislike button
    const clickDislike = () => {
      isDisliked()
      disable = true;
    }
    // updates views on page reload
    updateMetrics();

    return (
      <div>
        <Container>
          <Card className="text-center my-3">
            <div>
              <video style={{ width: "100%", height: "auto" }} controls>
                <source src={video.cloudURL} type="video/mp4" />
              </video>
              <br />
              {video.title} | {video.publishDate} | {viewsTag}
              {level >= 0 
              ? (<>
                  <span className="roboto-font"> | {video.likes} like </span>
                  <button className='btn btn-outline-success btn-sm' disabled={disable} onClick={clickLike}>
                    <i className="fas fa-thumbs-up" />
                  </button>
                  <span className="roboto-font"> {video.dislikes} dislike </span>
                  <button className='btn btn-outline-warning btn-sm' disabled={disable} onClick={clickDislike}>
                    <i className="fas fa-thumbs-down" />
                  </button>
                </>)
              : ("")}
            </div><p/>
          </Card >
        </Container >
      </div >
    );
  }
};

export default SingleVideo;
