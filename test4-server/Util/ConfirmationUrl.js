const {v4} = require('uuid');
/*const {redis} = require('./Redis');
const Redis = require("ioredis");
const redis = new Redis();*/




module.exports.ConfirmationUrl =(token)=>{

    ///const id = v4();

    //await redis.set(id, userid, "ex", 60*60*24);

    return `http://localhost:3000/confirm/${token}`
    
}