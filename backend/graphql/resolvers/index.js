const resumeResolvers = require('./resume');
const usersResolvers = require('./users');
const usersEducation = require('./educations');
const miscResolvers = require('./misc');
const uploadResolvers = require('./fileUpload');

module.exports = {
    Query : {
        ...resumeResolvers.Query,
        ...uploadResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...resumeResolvers.Mutation,
        ...usersEducation.Mutation,
        ...miscResolvers.Mutation,
        ...uploadResolvers.Mutation
    }
}