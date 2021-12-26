import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Auth from "../utils/auth";
import { QUERY_MY_VIDEOS } from "../utils/queries";
// Profile page for user to see only their videos
const Profile = () => {
  // Queries user who is logged in videos
  const { loading, data } = useQuery(QUERY_MY_VIDEOS, {
    variables: { videoAuthor: Auth.getProfile().data.name },
  });

  const videos = data?.myVideos || [];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {videos.map((video) => (
        <Container>
          <Card className="text-center my-3">
            <div>
              <Link to={`/videos/${video._id}`}>
                <video style={{ width: "100%", height: "auto" }}>
                  <source src={video.cloudURL} type="video/mp4" />
                </video>
              </Link>
              <div>{video.title} | {video.publishDate} | {video.views} views | {video.likes} like | {video.dislikes} dislike</div>
              <div>
                <Link className="delete-trash" to={`/videosCrud/${video._id}`}><button className="btn btn-outline-danger btn-sm">Delete <i className="fas fa-trash" /></button></Link><p/>
              </div>
            </div>
          </Card>
        </Container>
      ))}
    </div>
  );
};

export default Profile;
