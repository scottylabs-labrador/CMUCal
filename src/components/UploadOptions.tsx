import React from "react";
import { useNavigate } from "react-router-dom";

interface UploadOptionsProps {
    from: string;
}

const UploadFile: React.FC<UploadOptionsProps> = ({ from }) => {
    console.log(from);
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/upload/edit`;
        navigate(path);
    };
    return (
        <div>
            <p>Upload File</p>
            <button className='bg-green' onClick={routeChange}>Upload</button>
        </div> 
    )
} 

const UploadLink: React.FC<UploadOptionsProps> = ({ from }) => {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/upload/edit`;
        navigate(path);
    };
    return (
        <div>
            <p>Upload Link</p>
            <button className='bg-green' onClick={routeChange}>Upload</button>
        </div> 
    )
} 

const UploadManually: React.FC<UploadOptionsProps> = ({ from }) => {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/upload/edit`;
        navigate(path);
    };
    return (
        <div>
            <p>Upload Manually</p>
            <button className='bg-green' onClick={routeChange}>Upload</button>
        </div> 
    )
}

export {UploadFile, UploadLink, UploadManually}