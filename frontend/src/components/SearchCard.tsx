import React, { useEffect, useState, useContext } from "react";
import { IoLocationSharp, IoAdd } from "react-icons/io5";
import { FaRegClock, FaCheck } from "react-icons/fa";
import { AddFCEventType, RemoveFCEventType } from "../types";
import { getFormattedDateStr } from "../utils/DateManipulations";
import FullCalendar from "@fullcalendar/react";
import { getArrayFromLocalStorage } from "../utils/localStorageUtil";


type ButtonClickHandler = () => void;

interface SearchCardProps {
  cardId: number;
  eventName: string;
  orgName: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  location: string;
  addToSavedItems: ButtonClickHandler;
  handleAddFCEvent: AddFCEventType;
  handleRemoveFCEvent: RemoveFCEventType;
  calendarRef: React.RefObject<FullCalendar>;
  events: any[];
  setEvents: React.Dispatch<React.SetStateAction<any[]>>;
  isSelected: boolean;
}

const SearchCard: React.FC<SearchCardProps> = ({
  cardId,
  eventName,
  orgName,
  startDate,
  startTime,
  endDate,
  endTime,
  location,
  addToSavedItems,
  handleAddFCEvent,
  handleRemoveFCEvent,
  calendarRef,
  events,
  setEvents,
  isSelected
}) => {
  const [cardClicked, setCardClicked] = useState(false);


  const handleBtnClick = () => {

    let index:number = events.findIndex(obj => (obj.id == `${cardId}`));
    if (index != -1) {
      // included in the events list, so need to remove
      handleRemoveFCEvent({calendarRef: calendarRef, eventId: `${cardId}`});
    } else {
      // add event
      addToSavedItems();
      const startDateTime = getFormattedDateStr(startDate, startTime);
      if (endDate) {
        const endDateTime = getFormattedDateStr(endDate, endTime);
        handleAddFCEvent({id:`${cardId}`, searchCardId: cardId, title:eventName, start:startDateTime, end: endDateTime, allDay: !endTime });
      } else {
        const endDateTime = getFormattedDateStr(startDate, endTime);
        handleAddFCEvent({id:`${cardId}`, searchCardId: cardId, title:eventName, start:startDateTime, end: endDateTime, allDay: !endTime });
      }
    }
    
  };

  

  const handleCardClicked = () => {
    setCardClicked(!cardClicked);
  }

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
            isSelected ? "bg-teal text-white" : ""
          }`}
          style={{ minWidth: "7rem" }}
          onClick={handleBtnClick}
        >
          {isSelected ? (
            <FaCheck className="h-4 w-4 text-white mr-2" />
          ) : (
            <IoAdd className="h-6 w-6 text-white mr-2 stroke-teal" />
          )}
          {isSelected ? "Added" : "Add"}
        </button>
      </div>
    </div>
  );
};

export { SearchCard };
