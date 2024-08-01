import React, { useEffect, useState } from "react";
import { SearchCard } from "./SearchCard";
import Fuse from 'fuse.js';
import dayjs, { Dayjs } from 'dayjs';

import DITData from "../../backend_scraper/scraper/drop_in.json";
import PTData from "../../backend_scraper/scraper/peer_tutoring.json";
import SIData from "../../backend_scraper/scraper/si.json";
import ClubsData from "../../backend_scraper/scraper/tartanconnect.json";
import CareerData from "../../backend_scraper/scraper/handshake.json";
import { categoryListAcademics, categoryShorthandAcademics, categoryListClubs, categoryListCareer, Clubs_type, Career_type, AddFCEventProps, AddFCEventType } from "../types";
import FullCalendar from "@fullcalendar/react";


type ButtonClickHandler = () => void;

interface SearchContentProps {
    searchInput: string;
    page: string;
    categoryName: string[] | string;
    startDate: Dayjs | null;
    endDate: Dayjs | null;
    addToSavedItems: ButtonClickHandler;
    handleAddFCEvent: AddFCEventType;
    eventId: number;
    setEventId: React.Dispatch<React.SetStateAction<number>>;
    calendarRef: React.RefObject<FullCalendar>;
    setEvents: React.Dispatch<React.SetStateAction<any[]>>;

}

const SearchContent: React.FC<SearchContentProps> = ({ searchInput, page, categoryName, startDate, endDate, addToSavedItems, handleAddFCEvent, eventId, setEventId, calendarRef, setEvents }) => {
    const props  = { searchInput, page, categoryName, startDate, endDate, addToSavedItems, handleAddFCEvent, eventId, setEventId, calendarRef, setEvents };

    const getCategoryData = (currPage:string) => {
        // this is where we apply the category filters
        switch(currPage) {
          case "academics":
            const optionsAcademics = { keys: ['resource_type', 'course_id', 'course_name'] }
            let combinedData = [...DITData, ...SIData, ...PTData];
            const fuseAcademics = new Fuse(combinedData, optionsAcademics);
            // const fuse = new Fuse(SIData, options);
            if (categoryName.length == 0) {
              return fuseAcademics.search(searchInput);
            } else {
              // need to add OH later --> change to let i = 0
              for (let i = 1; i<categoryListAcademics.length; i++) {
                if (!categoryName.includes(categoryListAcademics[i])) {
                  fuseAcademics.remove((doc) => {
                    return doc.resource_type === categoryShorthandAcademics[i];
                  })
                }
              }
              return fuseAcademics.search(searchInput);
            }
            break;
          case "clubs":
            const optionsClubs = { keys: ['resource_type', 'event_name', 'event_host', 'categories'] }
            
            if (categoryName.length == 0) {
              const fuseClubs = new Fuse(ClubsData, optionsClubs);
              return fuseClubs.search(searchInput);
            } else {
              const len = categoryName.length;
              const checkMembershipClubs = (item: Clubs_type) => {
                let values = [];
                for (let i = 0; i<len; i++) {
                  values.push(item.categories.includes(categoryName[i]))
                };
                return values.includes(true);
              }

              let filteredData = ClubsData.filter(checkMembershipClubs);
              const fuseClubs = new Fuse(filteredData, optionsClubs)
              return fuseClubs.search(searchInput);
            }
            break;
          case "career":
            const optionsCareer = { keys: ['resource_type', 'event_name', 'event_host', 'categories'] }
            
            if (categoryName.length == 0) {
              const fuseCareer = new Fuse(CareerData, optionsCareer);
              return fuseCareer.search(searchInput);
            } else {
              const len = categoryName.length;
              const checkMembershipCareer = (item: Career_type) => {
                let values = [];
                for (let i = 0; i<len; i++) {
                  values.push(item.categories.includes(categoryName[i]))
                };
                return values.includes(true);
              }

              let filteredData = CareerData.filter(checkMembershipCareer);
              const fuseCareer = new Fuse(filteredData, optionsCareer)
              return fuseCareer.search(searchInput);
            }

            break;
        }
    }

    const inDateRange = (date: string) => {
        const startDateObj = startDate!.toDate(); 
        const endDateObj = endDate!.toDate();
        const eventDate = new Date(date);
        return eventDate >= startDateObj && eventDate <= endDateObj;
    }

    const getWeekday = (weekday: number) => {
        const today = new Date();
        const dayOfWeekToday = today.getDay(); // 0 (Sunday) to 6 (Saturday)
        const offSet = dayOfWeekToday - weekday;
        if (offSet === 0 || offSet === 7) {
          return today.toDateString();
        } else {
          const targetDay = new Date(today);
          targetDay.setDate(today.getDate() - offSet);
          return targetDay.toDateString();
        }    
    }

    const renderEvents = () => {
        if (props.page=="academics") {
            return getCategoryData(props.page)?.map( (result, index) => {
                for (let i = 0; i < result.item.events.length; i++) {
                    if (endDate == null || inDateRange(getWeekday(result.item.events[i].weekday))) {
                        return ( 
                            <SearchCard
                                key={index}
                                eventName={`${result.item.resource_type} for ${result.item.course_id} ${result.item.course_name}`}
                                orgName={`Staff`}
                                startDate={getWeekday(result.item.events[i].weekday) || `null`}
                                startTime={result.item.events[i].start_time}
                                endDate={getWeekday(result.item.events[i].weekday) || `null`}
                                endTime={result.item.events[i].end_time}
                                location={result.item.events[i].location}
                                addToSavedItems={addToSavedItems}
                                handleAddFCEvent={handleAddFCEvent}
                                eventId={eventId}
                                setEventId={setEventId}
                                calendarRef={calendarRef}
                                setEvents={setEvents}
                            />
                        )
                    }
                    return null;
                }
            })
        }
        else if (props.page==="clubs" || props.page==="career") {
            return getCategoryData(props.page)?.map( (result, index) => {
                for (let i = 0; i<result.item.events.length; i++) {
                    if (endDate == null || inDateRange(getWeekday(result.item.events[i].weekday))) {
                        return ( 
                            <SearchCard
                                key={index}
                                eventName={`${result.item.event_name}`}
                                orgName={`${result.item.event_host}`}
                                startDate={getWeekday(result.item.events[i].weekday) || `null`}
                                startTime={result.item.events[i].start_time}
                                endDate={getWeekday(result.item.events[i].weekday) || `null`}
                                endTime={result.item.events[i].end_time}
                                location={result.item.events[i].location}
                                addToSavedItems={addToSavedItems}
                                handleAddFCEvent={handleAddFCEvent}
                                eventId={eventId}
                                setEventId={setEventId}
                                calendarRef={calendarRef}
                                setEvents={setEvents}
                            />
                        )
                    }  
                }
            })
        }
        return null;
    }
        
    
    // else page==="clubs" || page==="career"
    
    return (
        <div>
        {renderEvents()}
        </div>
    )
}
    
export default SearchContent;