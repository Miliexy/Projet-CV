import React, { useContext } from "react";
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import '../pages/post.css';

import { AuthContext } from "../context/auth";
import DeleteButton from "./DeleteButton";

function PostCard({ post: { firstname, createdAt, id, lastname, job, userid } }) {
  const { user } = useContext(AuthContext);
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="small"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
          as={Link} to={`/posts/${id}`}
        />
        <Card.Header>
          {firstname} {lastname}
        </Card.Header>
        <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description>{job}</Card.Description>
        <div className="delete">
            {user && user.id === userid && <DeleteButton postId={id} />}
        </div>
      </Card.Content>
    </Card>
  );
}

export default PostCard;
