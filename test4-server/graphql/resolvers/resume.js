const Post = require('../../models/Post');
const User = require('../../models/user');
const checkAuth = require('../../Util/CheckAuth');
const { AuthenticationError } = require('apollo-server');
const path = require('path')
const fs = require('fs')



const searchPost= async (pid) =>{
    const post = await Post.findOne({useriD: pid})
    console.log(post)
    return post
}

module.exports = {
    Query: {
      //hello: () => "Hello",
      async getUser(_,{userid}){
        try {
        const user = await User.findById(userid);
        if (user) {
          return user;
        } else {
          throw new Error('Post not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
        async getPosts() {
          try {
            const posts = await Post.find().sort({createdAt: -1});
            return posts;
          } catch (err) {
            throw new Error(err);
          }
        },
        async getPost(_,{postId}){
          try {
            const post = await Post.findById(postId);
            if (post) {
              return post;
            } else {
              throw new Error('Post not found');
            }
          } catch (err) {
            throw new Error(err);
          }
        }
      },
      Mutation: {
        async confirmEmail(_,{tk}, context){
          const user = checkAuth(context);
          //const trimmedtk = user.token.slice(4,10);
          //const trim2 = trimmedtk.concat(user.token.slice(12,30));
          //console.log(trim2);
          console.log(user);

            const id = user.id;
            await User.findByIdAndUpdate(id,{confirmed: true}, {useFindAndModify: false});
          /*User.findOneAndReplace({token: tk},
            {newUser})*/
          return user; 
        },
        async createPost(_,{job, firstname, lastname, phone, address}, context){

          const user = checkAuth(context);
          const post = await Post.findOne({userid: user.id})
          //const userP = await searchPost(user.id);
          console.log(user.id);
          if(post){
            return console.log("error: this user already created a post");
        } else{
        const newPost = new Post({
          userid: user.id,
          job,
          firstname,
          lastname,
          address,
          phone,
          createdAt: Date().toString()
        });
        const post = await newPost.save();
      
      
        return post;
      }

      }, 
      async deletePost(_,{postId}, context){
        const user = checkAuth(context);
        try{
          const post = await Post.findById(postId);
          console.log(post.userid);
          if(post.userid == user.id){
            await post.delete();
            return 'Deleted Successfully';
          } else {
            throw new  AuthenticationError('Action not allowed');
          }
        } catch(err){
          throw new Error(err);
        }
      }
      }
}