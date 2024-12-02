import React, { useState } from "react";

// use the ? after variable to make a function parameter optional
interface ButtonComponentProps {
    content: string;
    clickStay: boolean;
    textSize: string;
    bgColor?: boolean;
    buttonClicked?: boolean;
    onClick?: () => void;
}

const Button: React.FC<ButtonComponentProps> = ({ content, clickStay, textSize, bgColor, buttonClicked, onClick }) => {

    return (
        <>
        <button onClick={onClick} className={`rounded-full border border-teal px-4 py-2 flex items-center gap-1 hover:bg-teal hover:text-white ${textSize} ${
            clickStay ? "bg-teal text-white" : ""} ${bgColor ? "bg-green text-white" : ""}`}>
            {content}
        </button>
        </>
    )
}

export {Button};