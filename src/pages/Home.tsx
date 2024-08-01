import React, { useRef, useState } from "react";
import { SecondNav, Search, Footer } from "../components";
import Calendar from "../components/calendar/Calendar";
import { AddFCEventProps } from "../types";
import FullCalendar from "@fullcalendar/react";



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

    
    const handleAddFCEvent = ({id, title, start, end, allDay}: AddFCEventProps) => {
        setEvents([...events, {
            id: id,
            title: title,
            start: start,
            end: end,
            allDay: allDay
        }])
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
                setEventId={setEventIdCount} calendarRef={calendarRef} setEvents={setEvents}/>
            </div>

            <div className={`${showSearchBar? 'Calendar': 'CalendarFull'}`}>
                <Calendar showSearchBar={showSearchBar} events={events} calendarRef={calendarRef}/>
            </div>
            </div>
        </div>
        <Footer/>
        </div>
    );
};

export { Home };
