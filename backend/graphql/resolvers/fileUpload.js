const { GraphQLUpload } = require('graphql-upload');
const {createWriteStream,mkdir} = require('fs')
const shortid = require('shortid')
const File = require('../../models/Files')
const checkAuth = require('../../Util/CheckAuth');

const storeUpload = async ({ stream, filename, mimetype }) => {
  const id = shortid.generate();
  const path = `images/${id}-${filename}`;

  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on('finish', () => resolve({ id, path, filename, mimetype }))
      .on('error', reject)
  );
};

const processUpload = async (upload) => {
  const { createReadStream, filename, mimetype } = await upload;
  const stream = createReadStream();
  const file = await storeUpload({ stream, filename, mimetype });
  return file;
};

module.exports =  {
  Upload: GraphQLUpload,
  Query: {
    files: async () => {
      return await File.find();
    },
  },
  Mutation: {
    uploadFile: async (_, { file }, context) => {
      const user = checkAuth(context);
      mkdir('images', { recursive: true }, (err) => {
        if (err) throw err;
      });
      const upload = await processUpload(file);
      await File.create(upload);
      return upload;
    },
  },
};