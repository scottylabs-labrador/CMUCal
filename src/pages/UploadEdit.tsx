import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// this should show up on top of the UploadEdit page
const MessageModal: React.FC = () => {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/home/academics`;
        navigate(path);
    };
    return (
        <div>
            <p>Your Event has been added successfully!</p>
            <button className='bg-green' onClick={routeChange}>OK</button>
        </div>
    )
}

const UploadEdit: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    return(
        <div className="text-center">
            <h1>Review Information</h1>
            {/* on click of the button, the MessageModal should open */}
            <button onClick={()=>setShowModal(true)} className='bg-green'>Confirm</button>
            {showModal && <MessageModal/>}
        </div>
    )
}

export {UploadEdit};
