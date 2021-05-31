import gql from "graphql-tag";

export const FETCH_USER=gql`
    query ($userid: String!) {getUser(userid: $userid) {
        id
        username
        confirmed
    }}

`;

export const FileQuery = gql`
  {
    files {
      id
      filename
      mimetype
      path
    }
  }
`;

export const FETCH_POST_QUERY = gql`
query ($postId: String!) {
  getPost(postId: $postId) {
    id
    userid
    firstname
    lastname
    job
    phone
    address
    phone
    education {
      id
      body
      beginDate
      endDate
    }
    workExperience {
      id
      body
      beginDate
      endDate
    }
  }
}
`;


export const FETCH_POSTS_QUERY = gql`
query getPosts {
getPosts{  id
  userid
  firstname
  lastname
  job
  createdAt
  }
}
`;

export const ADD_EDUCATION = gql`
mutation addEducation($postId: String!, $body: String!){
  addEducation(postId: $postId, body: $body){
    education{
      id
      body
      beginDate
      endDate
    }
  }
}
`

export const ADD_Work = gql`
mutation addWorkExp($postId: String!, $body: String!){
  addWorkExp(postId: $postId, body: $body){
    workExperience{
      id
      body
      beginDate
      endDate
    }
  }
}
`
export const CONFIRM_EMAIL=gql `
mutation confirmEmail($token: String!){
  confirmEmail(token: $token)
  {
    username
    id
  }
}
`