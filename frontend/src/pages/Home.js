import React, { useContext } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Grid, Image } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import PostCard from "../components/PostCard";


//import { FETCH_POSTS_QUERY } from "../util/graphql";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { CONFIRM_EMAIL } from "../util/graphql";

function Home(props) {
  const token = props.match.params.postId;
    //const token = "123asd"
    const [confirmEmail] = useMutation(CONFIRM_EMAIL,
        {variables: {
            token
        }}
        )
  const { user } = useContext(AuthContext);
  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);

  function registerUser() {
    confirmEmail();
  }

  if (data) {
    console.log(data.getPosts);
  }
  if (loading) return <p>Loading...</p>;
  if (error) return `Error! ${error.message}`;
  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading posts..</h1>
        ) : (
          data.getPosts &&
          data.getPosts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}

const FETCH_POSTS_QUERY = gql`
  query getPosts {
    getPosts {
      id
      userid
      firstname
      lastname
      job
      createdAt
      file
    }
  }
`;
export default Home;
