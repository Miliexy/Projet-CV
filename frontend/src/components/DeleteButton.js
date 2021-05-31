import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { Button, Confirm, Icon, Popup } from 'semantic-ui-react';

import { FETCH_POSTS_QUERY } from '../util/graphql';

function MyPopup({ content, children }) {
  return <Popup inverted content={content} trigger={children} />;
}

function DeleteButton({ postId, commentId, dif, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? dif == 2 ? DELETE_COMMENT_MUTATION:  DELETE_WORK_MUTATION : DELETE_POST_MUTATION;
  
  const [deletePost] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      });
      //const posts = data;
      //console.log("post id is"+ postId);
      //posts = posts.filter((p) => p.id !== postId);
      //proxy.writeQuery({ query: FETCH_POSTS_QUERY, posts });
      if (callback) callback();
      commentId ? console.log("test"): window.location.reload(false) ;
    },
    variables: {
      postId,
      commentId
    }
  });
  return (
    <>
    <MyPopup content={commentId ? 'Delete' : 'Delete Post'}>

      <Button
        size="tiny"
        color="red"
        onClick={() => setConfirmOpen(true)}
        >
        <Icon  name="trash" style={{ margin: 0 }} />
      </Button>
        </MyPopup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePost}
      />
    </>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation removeEducation($postId: ID!, $commentId: ID!) {
    removeEducation(postId: $postId, educationID: $commentId) {
      id
    education{
      id
      body
    }
  }
  }
`;

const DELETE_WORK_MUTATION = gql`
  mutation removeWorkExp($postId: ID!, $commentId: ID!) {
    removeWorkExp(postId: $postId, workExpID: $commentId) {
      id
    workExperience{
      id
      body
    }
  }
  }
`;

export default DeleteButton;