import React, { useState, useEffect } from "react";

const Footer: React.FC = () => {
    return(
        <div className="bg-blue text-white text-base flex flex-col py-10 pl-10 gap-2">
            <p>Developed by CMUCal at ScottyLabs</p>
            <p>Contact xxxxx@xxxxx.com</p>
            <p>©2024 CMUCal</p>
        </div>
    );
};

export {Footer};
