import { Button, Card, Form, Grid, TextArea } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import React, { useContext, useRef, useState } from "react";
import { ADD_EDUCATION, ADD_Work, FETCH_POST_QUERY } from "../util/graphql";
import { useMutation, useQuery } from "@apollo/client";
import DeleteButton from "./DeleteButton";





function AddExtra({ data:{id,workExperience,userid} }) {
  const { user } = useContext(AuthContext);
  
  const commentInputRef = useRef(null);
  const [comment, setComment] = useState("");
  
  const postId = id;
  const [submitWork] = useMutation(ADD_Work, {
    update() {
      setComment("");
      commentInputRef.current.blur();
      window.location.reload(false) ;
    },
    variables: {
      postId,
      body: comment,
    },
  });


  return (
    <div>
      {user && user.id === userid && (
    <div>
      <p>
        <input
          type="text"
          placeholder="Add work.."
          name="comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          ref={commentInputRef}
        />
      </p>

      <Button
        type="submit"
        icon="plus"
        className="ui button teal"
        disabled={comment.trim() === ""}
        onClick={submitWork}
      />
            </div>
      )}
    </div>
  );
}

export default AddExtra;
