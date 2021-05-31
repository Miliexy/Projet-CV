const { UserInputError } = require("apollo-server");
const Post = require("../../models/Post");
const checkAuth = require("../../Util/CheckAuth");
const { AuthenticationError } = require("apollo-server");

const removeComponenet = async (id, compId) => {
  const post = await Post.findById(id);
  if (post) {
    
      const eduIndex = post.languages.findIndex((e) => e.id === compId);
      console.log(eduIndex);

     /* if (post.languages[eduIndex].id === compId) {
        post.languages.splice(eduIndex, 1);
        await post.save();
        return post;
      } else {
        throw new AuthenticationError("Action not allowed");
      }*/
      return post;
    
  } else {
    throw new UserInputError("Post not found");
  }
};

module.exports = {
  Mutation: {
    addLanguage: async (_, { postId, body }, context) => {
      const user = checkAuth(context);
      if (body.trim() === "") {
        throw new UserInputError("Empty value ", {
          errors: {
            body: "Field must not be empty",
          },
        });
      }

      const post = await Post.findById(postId);
      if (post) {
        post.languages.unshift({
          body,
        });
        await post.save();
        return post;
      } else throw new UserInputError("Post not found");
    },
    addHobby: async (_, { postId, body }, context) => {
      const user = checkAuth(context);
      if (body.trim() === "") {
        throw new UserInputError("Empty value ", {
          errors: {
            body: "Field must not be empty",
          },
        });
      }

      const post = await Post.findById(postId);
      if (post) {
        post.hobbies.unshift({
          body,
        });
        await post.save();
        return post;
      } else throw new UserInputError("Post not found");
    },
    async removeLanguage(_,{postId, educationID}, context){
        const user = checkAuth(context);
        try{
            const post = await removeComponenet(postId, educationID);
            return post;
        } catch(err){
          throw new Error(err);
        }
     },
  },
};
