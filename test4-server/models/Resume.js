const { model, Schema} = require('mongoose');

const resumeSchema = new Schema({
    firstName: String,
    lastName: String,
    phone: String,
    address: String,
    Education: [
        {
            date: String,
            body: String
        }
    ],
    workExperience: [
        {
            date: String,
            body: String
        }
    ],
    hobbies: [
        {
            body: String
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

const postSchema = new Schema({
    body: String,
    username: String,
    createdAt: String,
    comments: [
      {
        body: String,
        username: String,
        createdAt: String
      }
    ],
    likes: [
      {
        username: String,
        createdAt: String
      }
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  });

module.exports = model('Posted', resumeSchema);

//module.exports = model('UserRes', resumeSchema);