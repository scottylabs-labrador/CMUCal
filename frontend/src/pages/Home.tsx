import React, { useRef, useState } from "react";
import { SecondNav, Search, Footer } from "../components";
import Calendar from "../components/calendar/Calendar";
import { AddFCEventProps, RemoveFCEventProps } from "../types";
import FullCalendar from "@fullcalendar/react";
import { saveArrayToLocalStorage } from "../utils/localStorageUtil";



const Home: React.FC = () => {
    const [showSearchBar, setShowSearchBar] = useState(true);
    const [page, setPage] = useState("academics");
    //   calendar events
    const [events, setEvents] = useState<any[]>([]);
    const [eventIdCount, setEventIdCount] = useState(0);

    const calendarRef = useRef<FullCalendar>(null);

    const handleSearchBarClick = () => {
        setShowSearchBar(prev => !prev);
    }

    const handleAddFCEvent = ({id, searchCardId, title, start, end, allDay}: AddFCEventProps) => {
        const newEvents = [...events, {
            id: id,
            title: title,
            start: start,
            end: end,
            allDay: allDay,
            searchCardId: searchCardId
        }];
        setEvents(newEvents);
    }

    // removes a single event from the events list and updates local storage
    const removeFromEvents = (eventId:string) => {
        const index:number = events.findIndex(obj => obj.id == eventId);
        const newEvents = events.slice(0,index).concat(events.slice(index+1,));
        setEvents(newEvents);
    };
      
    const handleRemoveFCEvent = ({calendarRef,eventId}: RemoveFCEventProps) => {
        if (calendarRef.current) {
          const calendarApi = calendarRef.current.getApi();
          const event = calendarApi.getEventById(eventId);
          if (event) {
            removeFromEvents(eventId);
            event.remove(); // removes event from FC
          }
        }
    }

    const removeAllEvents = () => {
        setEvents([]);        
    }

    return (
        <div>
        <div className="relative">
            <div className="justify-between z-0">
                <SecondNav page={page} setPage={setPage}/>
            </div>
            <div className="flex justify-between z-10 mt-2">
            <div className={`${showSearchBar? 'w-2/5': 'w-1/12'}`}>
                <Search page={page} showSearchBar={showSearchBar} handleAddFCEvent={handleAddFCEvent} 
                handleSearchBarClick={handleSearchBarClick} eventId={eventIdCount} 
                setEventId={setEventIdCount} calendarRef={calendarRef} events={events} setEvents={setEvents}
                handleRemoveFCEvent={handleRemoveFCEvent} removeAllEvents={removeAllEvents}/>
            </div>

            <div className={`${showSearchBar? 'Calendar': 'CalendarFull'}`}>
                <Calendar showSearchBar={showSearchBar} events={events} calendarRef={calendarRef} handleRemoveFCEvent={handleRemoveFCEvent}/>
            </div>
            </div>
        </div>
        <Footer/>
        </div>
    );
};

export { Home };
