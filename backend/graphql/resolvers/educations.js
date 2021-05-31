const {  UserInputError } = require('apollo-server');
const Post = require('../../models/Post');
const checkAuth = require('../../Util/CheckAuth');
const { AuthenticationError } = require('apollo-server');

const removeComponenet = async(id, compId, compN) =>{
              const post = await Post.findById(id);
              if(post){
                  if(compN===1){
                  const eduIndex = post.education.findIndex(e => e.id === compId);
                  console.log(eduIndex);

                  if(post.education[eduIndex].userId === id){
                      post.education.splice(eduIndex,1);
                      await post.save();
                      return post;
                  }else{
                      throw new AuthenticationError('Action not allowed');
                  }
                } else if(compN===2)
                {
                    const workIndex = post.workExperience.findIndex(e => e.id === compId);

                  if(post.workExperience[workIndex].userId === id){
                      post.workExperience.splice(workIndex,1);
                      await post.save();
                      return post;
                  }else{
                      throw new AuthenticationError('Action not allowed');
                  }
                }
              } else {
                throw new  UserInputError('Post not found');
              }
}

module.exports = {
    Mutation: {
        addEducation: async(_,{postId, body}, context) => {
            const user = checkAuth(context);
            if(body.trim()=== ''){
                throw new UserInputError('Empty value ', {
                    errors: {
                        body: 'Education must not be empty'
                    }
                })
            }

            const post = await Post.findById(postId);
            if (post) {
                post.education.unshift({
                  body,
                  beginDate: new Date().getFullYear(),
                  endDate: new Date().getFullYear(),
                  userId: user.id
                });
                await post.save();
                return post;
              } else throw new UserInputError('Post not found');

         },
         
         addWorkExp: async(_,{postId, body}, context) => {
            const user = checkAuth(context);
            if(body.trim()=== ''){
                throw new UserInputError('Empty value ', {
                    errors: {
                        body: 'Field must not be empty'
                    }
                })
            }

            const post = await Post.findById(postId);
            if (post) {
                post.workExperience.unshift({
                  body,
                  beginDate: new Date().getFullYear(),
                  endDate: new Date().getFullYear(),
                  userId: user.id
                });
                await post.save();
                return post;
              } else throw new UserInputError('Post not found');

         },
         async removeEducation(_,{postId, educationID}, context){

              const user = checkAuth(context);
              const post = await Post.findById(postId);

              const eduIndex = post.education.findIndex((c) => c.id === educationID);

              if (post.education[eduIndex].userId === post.userid) {
                post.education.splice(eduIndex, 1);
                await post.save();
                return post;
              } else {
                throw new AuthenticationError('Action not allowed');
              }

         },
         async removeWorkExp(_,{postId, workExpID}, context){
          const user = checkAuth(context);
              const post = await Post.findById(postId);

              const eduIndex = post.workExperience.findIndex((c) => c.id === workExpID);

              if (post.workExperience[eduIndex].userId === post.userid) {
                post.workExperience.splice(eduIndex, 1);
                await post.save();
                return post;
              } else {
                throw new AuthenticationError('Action not allowed');
              }
         }
    }
}