/* const mongoose = require('mongoose')

const MONGO_CONNECTION = "mongodb+srv://mili:jihazi@cluster0.vcx9o.mongodb.net/myFirstDatabase?retryWrites=true";
module.exports.connected= async()=> {
  try {

    await mongoose.connect(MONGO_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    return 
  } catch (err) {
    console.error(err);
  }
}
 */