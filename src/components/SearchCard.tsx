import React, { useEffect, useState } from "react";
import { IoLocationSharp, IoAdd } from "react-icons/io5";
import { FaRegClock, FaCheck } from "react-icons/fa";
import { saveArrayToLocalStorage, getArrayFromLocalStorage } from "../utils/localStorageUtil";

type ButtonClickHandler = () => void;

interface SearchCardProps {
  eventName: string;
  orgName: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  location: string;
  addToSavedItems: ButtonClickHandler;
  // eventCategory: string;
  // eventSubcategory: string;
}

const SearchCard: React.FC<SearchCardProps> = ({
  eventName,
  orgName,
  startDate,
  startTime,
  endDate,
  endTime,
  location,
  addToSavedItems,
  // eventCategory,
  // eventSubcategory,
}) => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [cardClicked, setCardClicked] = useState(false);

  // const [savedItems, setSavedItems] = useState<string[]>([]);


  const handleAddToCalendar = () => {
    setButtonClicked((prevClicked) => !prevClicked);
    // Logic for calling GCal
    addToSavedItems();
  };

  const handleCardClicked = () => {
    setCardClicked(!cardClicked);
  }
  // {eventName}
  return (
    <div className="bg-white w-full my-3.5 px-6 py-4 rounded-lg flex items-center align-stretch relative">
      <div className="flex-1" onClick={handleCardClicked}>
        <p className={`text-xl w-3/5 my-0.5 ${cardClicked? "": "ease-in-out truncate"}`}>{eventName}</p>
        <p className="text-base my-0.5">By {orgName}</p>
        <div className="flex items-center gap-2 my-0.5">
          <FaRegClock className="h-4 w-4 text-gray-600 mr-2" />
          {endDate !== startDate ? (
            <p>
              {startDate}, {startTime} - {endDate}, {endTime}
            </p>
          ) : (
            <p>
              {startDate}, {startTime} - {endTime}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 my-0.5">
          <IoLocationSharp className="h-4 w-4 text-gray-600 mr-2" />
          <p>{location}</p>
        </div>
      </div>
      <div className="flex-shrink-0 absolute right-3">
        <button
          className={`rounded-full border border-teal px-4 py-2 flex items-center gap-1 ${
            buttonClicked ? "bg-teal text-white" : ""
          }`}
          style={{ minWidth: "7rem" }}
          onClick={handleAddToCalendar}
        >
          {buttonClicked ? (
            <FaCheck className="h-4 w-4 text-white mr-2" />
          ) : (
            <IoAdd className="h-6 w-6 text-white mr-2 stroke-teal" />
          )}
          {buttonClicked ? "Added" : "Add"}
        </button>
      </div>
    </div>
  );
};

export { SearchCard };
