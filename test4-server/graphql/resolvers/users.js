const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {SECRET_KEY} =  require('../../config');
const { UserInputError } = require('apollo-server');
const {validateRegisterInput, validateLoginInput} = require('../../Util/Validators');
const {sendEmail} = require('../../Util/SendEmailConfirm');
const {ConfirmationUrl} = require('../../Util/ConfirmationUrl');
const checkAuth = require('../../Util/CheckAuth');



function generateTokent(user){
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username,
    }, SECRET_KEY, { expiresIn:'2 days'});
}

module.exports = {
  Mutation: {
    
      async login(_, { username, password }){
          const {errors, valid} = validateLoginInput(username, password);

          if(!valid){
            throw new UserInputError('Errors', { errors });
        }
          const user = await User.findOne({username});
          if(!user){
              errors.general = 'Wrong credentials';
              throw new UserInputError('Wrong credentials', {errors});
          }

          const match = await bcrypt.compare(password,user.password);
          if(!match){
            errors.general = 'Wrong credentials';
            throw new UserInputError('Wrong credentials', {errors});
          }

          const token = generateTokent(user)

          return {
            ...user._doc,
            id: user._id,
            token
        };     
      },
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
    ) {

      const {valid,errors} = validateRegisterInput( username, email, password, confirmPassword );

      if(!valid){
          throw new UserInputError('Errors', { errors });
      }

      // TODO: Make sure user/email doesn't already exits

      const user = await User.findOne({username});
      const emailusr = await User.findOne({email});
      if(user){
          throw new UserInputError('Username is taken',{
              errors: {
                  username: 'This username is taken'
              }
          })
      }
      if(emailusr){
        throw new UserInputError('Email is taken',{
            errors: {
                email: 'This email is taken'
            }
        })
    }

      password = await bcrypt.hash(password, 12);

      const newUser = new User({
          email,
          username,
          password,
          createdAt: new Date().toISOString(),
          confirmed: false
      });

      const res = await newUser.save();
      
      const token = generateTokent(res)
      const trimmedtk = token.slice(4,10);
      const trim2 = trimmedtk.concat(token.slice(12,30));
      await sendEmail(email, ConfirmationUrl(token));
      
      return {
          ...res._doc,
          id: res._id,
          token
      }
    },
  },
};
