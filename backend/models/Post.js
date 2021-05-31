const { model, Schema } = require("mongoose");
const File = require("./Files");


const postSchema = new Schema({
  userid: String,
  firstname: String,
  lastname: String,
  phone: String,
  address: String,
  createdAt: String,
  job: String,
  file: String,
  education: [
    {
      beginDate: String,
      endDate: String,
      body: String,
      userId: String,
    },
  ],
  workExperience: [
    {
      beginDate: String,
      endDate: String,
      body: String,
      userId: String,
    },
  ],
  hobbies: [
    {
      body: String,
    },
  ],
  languages: [
    {
      body: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});


module.exports = model("Post", postSchema);
