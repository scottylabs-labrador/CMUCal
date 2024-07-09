import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";

type ButtonClickHandler = (value:string) => void;
type clearType = () => void;

interface ButtonComponentProps {
    content: string;
    clickStay: boolean;
    textSize: string;
    clearSingleSavedItems: ButtonClickHandler;
    enterSearchInput: ButtonClickHandler;
    clearSearchInput: clearType;
}

const SavedSearchBtn: React.FC<ButtonComponentProps> = ({ content, clickStay, textSize, clearSingleSavedItems, enterSearchInput, clearSearchInput }) => {
    const [displayx, setDisplayx] = useState(true);
    const [greenBg, setGreenBg] = useState(true);
    const [buttonClicked, setButtonClicked] = useState(false);

    const handleXClick = () => {
        // setDisplayx(false);
        // setGreenBg(false);
        clearSingleSavedItems(content);
    }

    const handleMainClick = () => {
        setDisplayx(true);
        setGreenBg(!greenBg);
        setButtonClicked(!buttonClicked);
        buttonClicked? enterSearchInput(content):clearSearchInput();
    }

    return (
        <button className={`rounded-full border border-teal px-4 py-1 flex items-center gap-1 ${textSize} ${
            (clickStay && greenBg) ? "bg-teal text-white" : ""} `}>
            <span onClick={handleMainClick}>{content}</span>
            {displayx && <RxCross1 onClick={handleXClick} className={`h-4 w-3 ${greenBg? "text-gray-200" : ""} ml-3 mr-0.5`} />}
        </button>
    )

}

export {SavedSearchBtn};