import React, { useState } from "react";
import iconClock from "./icons/clock.svg";
import iconLocation from "./icons/location.svg";
import iconAdd from "./icons/add.svg";
import { FaCheck } from "react-icons/fa";

interface SearchCardProps {
  eventName: string;
  orgName: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  location: string;
  eventCategory: string;
  eventSubcategory: string;
}

const SearchCard: React.FC<SearchCardProps> = ({
  eventName,
  orgName,
  startDate,
  startTime,
  endDate,
  endTime,
  location,
  eventCategory,
  eventSubcategory,
}) => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [numClicked, setNumClicked] = useState(0);

  const handleAddToCalendar = () => {
    // Toggle the buttonClicked state
    setButtonClicked(true);
    setNumClicked(1);

    if (numClicked == 1) {
      setNumClicked(0);
      setButtonClicked(false);
    }

    // Logic for calling GCal API
  };

  return (
    <div className="bg-white w-full my-3.5 px-6 py-4 rounded-lg flex items-center align-stretch">
      <div className="flex-1">
        <p className="text-xl">{eventName}</p>
        <p className="text-base">By {orgName}</p>
        <div className="flex items-center gap-2">
          <img
            src={iconClock}
            className="h-4 w-4 text-gray-600 mr-2"
            alt="Clock Icon"
          />
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
        <div className="flex items-center gap-2">
          <img
            src={iconLocation}
            className="h-4 w-4 text-gray-600 mr-2"
            alt="Location Icon"
          />
          <p>{location}</p>
        </div>
      </div>
      <div className="flex-shrink-0">
        <button
          className={`rounded-full border border-teal bg-transparent px-4 py-2 flex items-center gap-1 ${
            buttonClicked ? "bg-teal text-white" : ""
          }`}
          style={{ minWidth: "7rem" }} 
          onClick={handleAddToCalendar}
        >
          {buttonClicked ? (
            <FaCheck className="h-4 w-4 text-white mr-2" />
          ) : (
            <img
              src={iconAdd}
              className="h-4 w-4 text-gray-600 mr-2"
              alt="Add Icon"
            />
          )}
          {buttonClicked ? "Added" : "Add"}
        </button>
      </div>
    </div>
  );
};

export default SearchCard;
