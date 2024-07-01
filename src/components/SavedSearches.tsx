import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";


interface ButtonComponentProps {
    content: string;
    clickStay: boolean;
    textSize: string;
    buttonClicked?: boolean;
    onRemove: () => void;
}

const SavedSearchBtn: React.FC<ButtonComponentProps> = ({ content, clickStay, textSize, onRemove }) => {

    return (
        <button className={`rounded-full border border-teal px-3 py-1 flex items-center gap-1 ${textSize} ${
            clickStay ? "bg-teal text-white" : ""}`}>
            <span>{content}</span>
            <RxCross1 onClick={onRemove} className="h-4 w-3 text-gray-200 ml-1 mr-0.5" />
        </button>
    )

}

export {SavedSearchBtn};