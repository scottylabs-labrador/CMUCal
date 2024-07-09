import React, { useEffect, useState } from "react";
import { SearchCard } from "./SearchCard";
import Fuse from 'fuse.js';
import dayjs, { Dayjs } from 'dayjs';

import DITData from "../../backend/scraper/drop_in.json";
import PTData from "../../backend/scraper/peer_tutoring.json";
import SIData from "../../backend/scraper/si.json";
import ClubsData from "../../backend/scraper/tartanconnect.json";
import CareerData from "../../backend/scraper/handshake.json";
import { getArrayFromLocalStorage, saveArrayToLocalStorage } from "../utils/localStorageUtil";


type ButtonClickHandler = () => void;

interface SearchContentProps {
    searchInput: string;
    page: string;
    categoryName: string[] | string;
    startDate: Dayjs | null;
    endDate: Dayjs | null;
    addToSavedItems: ButtonClickHandler;

}

const SearchContent: React.FC<SearchContentProps> = ({ searchInput, page, categoryName, startDate, endDate, addToSavedItems }) => {
    const props  = { searchInput, page, categoryName, startDate, endDate, addToSavedItems };

    const getCategoryData = (currPage:string) => {
        // console.log("running category data");
        switch(currPage) {
          case "academics":
            const optionsAcademics = { keys: ['resource_type', 'course_id', 'course_name'] }
            let combinedData = [...DITData, ...SIData, ...PTData];
            const fuseAcademics = new Fuse(combinedData, optionsAcademics);
            // const fuse = new Fuse(SIData, options);
            if (categoryName.length == 0 || categoryName.length==4) {
              return fuseAcademics.search(searchInput);
            } else {
              if (!categoryName.includes("Supplemental Instructions")) {
                fuseAcademics.remove((doc) => {
                  return doc.resource_type === 'SI';
                })
              }
              if (!categoryName.includes("Drop-in Tutoring")) {
                fuseAcademics.remove((doc) => {
                  return doc.resource_type === 'DIT';
                })
              }
              if (!categoryName.includes("Peer Tutoring")) {
                fuseAcademics.remove((doc) => {
                  return doc.resource_type === 'PT'
                })
              }
              return fuseAcademics.search(searchInput);
            }
            break;
          case "clubs":
            const optionsClubs = { keys: ['resource_type', 'event_name', 'event_host', 'categories'] }
            const fuseClubs = new Fuse(ClubsData, optionsClubs);
            return fuseClubs.search(searchInput);
            break;
          case "career":
            const optionsCareer = { keys: ['resource_type', 'event_name', 'event_host', 'categories'] }
            const fuseCareer = new Fuse(CareerData, optionsCareer);
            return fuseCareer.search(searchInput);
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
                                eventName={`${result.item.resource_type} for ${result.item.course_name}`}
                                orgName={`${result.item.course_id} Staff`}
                                startDate={getWeekday(result.item.events[i].weekday) || `null`}
                                startTime={result.item.events[i].start_time}
                                endDate={getWeekday(result.item.events[i].weekday) || `null`}
                                endTime={result.item.events[i].end_time}
                                location={result.item.events[i].location}
                                addToSavedItems={addToSavedItems}
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