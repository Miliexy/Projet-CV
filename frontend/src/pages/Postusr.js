import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import { Button, Grid } from "semantic-ui-react";
import PostForm from "../components/PostForm";
import { AuthContext } from "../context/auth";
import { FETCH_USER } from "../util/graphql";


function Postusr(props) {
  const { user } = useContext(AuthContext);
  const { loading, error, data } = useQuery(FETCH_USER, {
    variables: {
      userid: user.id,
    },
  });

  function createPostCallback() {
    let path = `/`; 
    props.history.push(path);
    window.location.reload(false);
  }
  if (loading) return <div>Loading data</div>;
  if (data.getUser.confirmed == true) {
    console.log(data.getUser.confirmed);
    return (
      <Grid columns={3}>
        <Grid.Row className="page-title">
          <h1>Create New Post</h1>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return (
    <div>
      <div onload="createPostCallback()" >user not confirmed</div>
      <Button onClick={createPostCallback}>Leave</Button>
    </div>
  );
}

export default Postusr;
