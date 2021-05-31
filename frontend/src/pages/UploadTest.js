import React, { useCallback } from 'react'
import FileUpload from '../components/Upload';
import WithPreviews from '../components/uploadPreview';
import Uploads from '../components/Uploads';
import UploadForm from '../components/UploadForm'


function UploadTest() {
    
    return (
        <div>
        <WithPreviews />
        <Uploads />
        </div>
    )
}


export default UploadTest