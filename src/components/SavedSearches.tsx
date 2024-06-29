import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";


interface ButtonComponentProps {
    content: string;
    clickStay: boolean;
    textSize: string;
    buttonClicked?: boolean;
}

const SavedSearchBtn: React.FC<ButtonComponentProps> = ({ content, clickStay, textSize, buttonClicked }) => {

    return (
        <button className={`rounded-full border border-teal px-4 py-1 flex items-center gap-1 ${textSize} ${
            clickStay ? "bg-teal text-white" : ""}`}>
            <span>{content}</span>
            <RxCross1 className="h-4 w-3 text-gray-200 ml-3 mr-0.5" />
        </button>
    )

}

export {SavedSearchBtn};