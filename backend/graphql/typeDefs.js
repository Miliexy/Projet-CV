const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    id: ID!
    userid: String!
    firstname: String!
    lastname: String!
    job: String!
    phone: String!
    address: String!
    createdAt: String!
    file: String
    education: [Education]!
    workExperience: [WorkExp]!
    hobbies: [HobLan]!
    languages: [HobLan]!
  }
  type Education {
      id: ID!
      beginDate: String!
      endDate: String!
      body: String!
      userId: String!
  }
  type WorkExp {
      id: ID!
      beginDate: String!
      endDate: String!
      body: String!
      userId: String!
  }
  type HobLan {
      id: ID!
      body: String!
  }
  type User{
      id: ID!,
      email: String!,
      token: String!,
      username: String!,
      createdAt: String!, 
      confirmed: Boolean!, 
  }
  input RegisterInput{
      username: String!,
      password: String!,
      confirmPassword: String!,
      email: String!,
  }
  type File {
    id: ID!
    filename: String!
    mimetype: String!
    path: String!
    userid: String
  }
  type Query {
    getPosts: [Post]
    getPost(postId: String!): Post
    getUser(userid: String!): User
    hello: String
    files: [File!]
  }



  type Mutation { 
      register(registerInput: RegisterInput): User!
      login(username: String!, password: String!): User!
      createPost(job: String!, firstname: String!, lastname: String!, phone: String!, address: String!): Post!
      deletePost(postId: ID!): String!
      addEducation(postId: String!, body: String!): Post!
      removeEducation(postId: ID!, educationID: ID!): Post!
      addWorkExp(postId: String!, body: String!): Post!
      removeWorkExp(postId: ID!, workExpID: ID!): Post!
      addLanguage(postId: ID!, body: String!): Post!
      removeLanguage(postId: ID!, languageID: ID!): Post!
      addHobby(postId: ID!, body: String!): Post!
      removeHobby(postId: ID!, hobbyID: ID!): Post!
      confirmEmail(token: String!): User!
      uploadFile(file: Upload!): File!
  }
`;
