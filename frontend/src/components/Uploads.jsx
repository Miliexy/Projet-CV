import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import {FileQuery} from '../util/graphql'
import { Image } from 'semantic-ui-react';


function Uploads() {
  const { loading, data } = useQuery(FileQuery);

  if (loading) {
    return <h1>Loading...</h1>;
  } else if (!data) {
    return <h1>No images to show</h1>;
  } else {
    return (
      <>
        <h1 className='text-center'>Recent uploads</h1>
        {data.files.map((file) => {
          console.log(file);
          return (
            file.mimetype.split('/')[0].includes('image') && (
              <div
                style={{
                  padding: 16,
                  border: '1px solid gray',
                  borderRadius: 5,
                  margin: '16px 0',
                }}
                key={file.filename}
              >
                <Image
          size=""
          src={"http://localhost:5000/"+file.path}
        />
                <p>{file.filename}</p>
              </div>
            )
          );
        })}
      </>
    );
  }
}

export default Uploads;