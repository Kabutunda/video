import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
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
  const [videoMetrics, { error }] = useMutation(VIDEO_METRICS);
  const [updateLikes, { err }] = useMutation(UPDATE_LIKES);
  const [updateDislikes, { erro }] = useMutation(UPDATE_DISLIKES);
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
    if (level >= 0) {
      viewsTag = `${video.views} views`
    } else { viewsTag = "" };
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
            <Card.Header as="h2" className="video-title">{video.title}</Card.Header>
            <Card.Body className="video-body">
              <Card.Title className="roboto-font">{video.publishDate}</Card.Title>
              <video style={{ width: 660, height: "auto" }} controls>
                <source src={video.cloudURL} type="video/mp4" />
              </video>
              <br />

              {level >= 0 
              ? (<p>
                  {viewsTag}
                  <span className="roboto-font"> {video.likes} like </span>
                  <button className='btn btn-outline-success btn-sm' disabled={disable} onClick={clickLike}>
                    <i className="fas fa-thumbs-up" />
                  </button>
                  <span className="roboto-font"> {video.dislikes} dislike </span>
                  <button className='btn btn-outline-warning btn-sm' disabled={disable} onClick={clickDislike}>
                    <i className="fas fa-thumbs-down" />
                  </button>
                </p>)
              : ("")}

            </Card.Body >
          </Card >
        </Container >
      </div >
    );
  }
};

export default SingleVideo;
