import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Auth from "../utils/auth";
import { QUERY_SINGLE_VIDEO } from "../utils/queries";
import Card from "react-bootstrap/Card";

const VideoCrud = () => {
  const { videoId } = useParams();
  // Queries singe video based on params video id
  const { loading, data } = useQuery(QUERY_SINGLE_VIDEO, {
    variables: { videoId: videoId },
  });
  // Delete video mutation
  const video = data?.video || {};
  if (loading) {
    return <div>Loading...</div>;
  }
  // Function to delete video
  async function deleteFunction(videoId) {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) { // if not logged in, user can't delete video
      return false;
    }
    try { } catch (err) {
      console.log(err)
    }
    if (!token) {
      return false;
    }
  }
  // On click, video is deleted and user is taken back to the home page
  const deleteClick = () => {
    deleteFunction(videoId);
    window.location.assign('/');
  };

  return (
    <Container>
      <Card className="text-center my-3">
        <div>
          <video style={{ width: "100%", height: "auto" }} controls>
            <source src={video.cloudURL} type="video/mp4" />
          </video>
          <div>{video.title} | {video.publishDate} | {video.views} views | {video.likes} like | {video.dislikes} dislike</div>
          <h2 className="roboto-font">Are you sure you want to delete this video?</h2>
          <button className="btn btn-outline-danger btn-sm" type="submit" onClick={deleteClick}>
            Yes
          </button>
          {/* Insert white space*/} &nbsp;
          <Link to="/me">
            <button className="btn btn-outline-primary btn-sm">
              No
            </button>
          </Link><p/>
        </div>
      </Card>
    </Container>
  );
};

export default VideoCrud;
