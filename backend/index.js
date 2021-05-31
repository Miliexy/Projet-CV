const { ApolloServer } = require("apollo-server-express");
const { GraphQLUpload, // The GraphQL "Upload" Scalar
graphqlUploadExpress, // The Express middleware.
} = require("graphql-upload");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { MONGODB } = require("./config.js");
const app = express();


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => ({req}),
  //uploads: false,
});
const PORT = process.env.port || 5000

const dir = path.join(process.cwd(), "images");
app.use("/images", express.static(dir)); // serve all files in the /images directory
//app.use(express.static('public'))
//app.use(graphqlUploadExpress());
app.use(cors());

server.applyMiddleware({ app });
mongoose.connect(MONGODB, { useNewUrlParser: true }).then(() => {
  console.log("MongoDB Connected");
  return app.listen({ port: PORT }, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
  });
});
