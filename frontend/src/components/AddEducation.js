import { Button, Card } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import React, { useContext, useRef, useState } from "react";
import { ADD_EDUCATION } from "../util/graphql";
import { useMutation } from "@apollo/client";
import DeleteButton from "./DeleteButton";



function AddEducation({ data:{id,education,userid} }) {
  const { user } = useContext(AuthContext);
  
  const commentInputRef = useRef(null);
  const [comment, setComment] = useState("");
  
  const postId = id;
  const [submitWork] = useMutation(ADD_EDUCATION, {
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
      {education.map((work) => (
        <Card fluid key={work.id}>
          <Card.Content>
            <Card.Header>
              From {work.beginDate} To {work.endDate}{" "}
            </Card.Header>
            <Card.Description>{work.body}</Card.Description>
          </Card.Content>
          {user && user.id === userid && (
            <DeleteButton postId={id} commentId={work.id} dif={2} />
          )}
        </Card>
      ))}
    </div>
  );
}

export default AddEducation;
