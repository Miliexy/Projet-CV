import { gql, useMutation } from '@apollo/client'
import React from 'react'

const UPLOAD_FILE=gql `
    mutation uploadFile($file: Upload!){
        uploadFile(file: $file){
            filename
            
        }
    }

`

export default function UploadForm() {

    const [uploadFile] = useMutation(UPLOAD_FILE,
        {
            onCompleted: data=> console.log(data)
        })

        const handleFileChange = e => {
            const file = e.target.files[0];
            if(!file) return;
            uploadFile({variables: {file}})
        }
    return (
        <div>
            <h1>Upload File</h1>
            <input type="file" onChange={handleFileChange}/>

        </div>
    )
}
