import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "../util/hooks";
import { FETCH_POSTS_QUERY } from "../util/graphql";
//import gql from "graphql-tag";
import { gql, useMutation } from "@apollo/client";
import { Redirect, useHistory } from "react-router";
import UploadForm from "./UploadForm";




function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    job: "",
    firstname: "",
    lastname: "",
    phone: "",
    address: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
        const data = proxy.readQuery({
            query: FETCH_POSTS_QUERY,
          });
          data.getPosts = [result.data.createPost, ...data.getPosts];
          proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      values.job = "";
      values.firstname ="";
      values.lastname = "";
      values.phone = "";
      values.address = "";
    },
  });

  const history = useHistory();
  function createPostCallback() {
    createPost();
    let path = `/`; 
    history.push(path);
    window.location.reload(false);
  }

  return (
      <>
    <Form onSubmit={onSubmit}>
      <h2>Create a post:</h2>
      <Form.Field>
        
        <Form.Input
          placeholder="Job"
          name="job"
          onChange={onChange}
          value={values.job}
          error={error ? true : false}
        />
        <Form.Input
          placeholder="First Name"
          name="firstname"
          onChange={onChange}
          value={values.firstname}
          error={error ? true : false}
        />
        <Form.Input
          placeholder="Last Name"
          name="lastname"
          onChange={onChange}
          value={values.lastname}
          error={error ? true : false}
        />
        <Form.Input
          placeholder="Phone Number"
          name="phone"
          onChange={onChange}
          value={values.phone}
          error={error ? true : false}
        />
        <Form.Input
          placeholder="Address"
          name="address"
          onChange={onChange}
          value={values.address}
          error={error ? true : false}
        />
        <Button type="submit" color="teal">
            Submit
        </Button>
      </Form.Field>
    </Form>
    {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
      </>
    
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($job: String!
  $firstname: String!
  $lastname: String!
  $phone: String!
  $address: String!
  ) {
    createPost(job: $job
      firstname: $firstname
      lastname: $lastname
      phone: $phone
      address: $address
    ) {
      id
      job
      firstname
    }
    }
  
`;

export default PostForm;
