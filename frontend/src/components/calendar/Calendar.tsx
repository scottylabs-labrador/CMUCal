import React, { RefObject, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { DateSelectArg, EventApi, EventClickArg, EventContentArg } from "fullcalendar";

// for dropdown
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { RemoveFCEventType } from "../../types";

// https://codesandbox.io/s/react-fullcalendar-custom-buttons-and-header-toolbar-rmvtl?file=/src/App.js

function renderEventContent(eventContent: EventContentArg) {
    return (
      <div className={`w-full ${eventContent.event.allDay ? 'bg-green': 'bg-green'}`}>
        
        <p className="w-full truncate ..."><b>{eventContent.timeText}</b> {eventContent.event.title}</p>
      </div>
    )
  }



interface CalendarProps {
  showSearchBar: boolean;
  events: any[];
  calendarRef: RefObject<FullCalendar>;
  handleRemoveFCEvent: RemoveFCEventType;
}

export default function Calendar({showSearchBar, events, calendarRef, handleRemoveFCEvent}:CalendarProps) {
    
    const [weekendsVisible, setWeekendsVisible] = useState<boolean>(true);
    const [currentEvents, setCurrentEvents] = useState<EventApi[]>();
    const [currView, setCurrView] = useState<string>('dayGridMonth');
    const [showGCal, setShowGCal] = useState<boolean>(false);

    // console.log(events);

    const handleDropdown = (event: SelectChangeEvent<string>) => {
        const {target: { value }} = event;
        setCurrView(value);
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            if (value === 'today') {
                calendarApi.today();
            } else {
                calendarApi.changeView(value!);
            }
        }
      };


    const handleDateSelect = (selectInfo: DateSelectArg) => {
        let title = prompt('Please enter a new title for your event')
        let calendarApi = selectInfo.view.calendar
      
        calendarApi.unselect() // clear date selection
      
        if (title) {
          calendarApi.addEvent({
            id: createEventId(),
            title,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: selectInfo.allDay
          })
        }
      }
      
      const handleEventClick = (clickInfo: EventClickArg) => {
          if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
            handleRemoveFCEvent({calendarRef: calendarRef, eventId: clickInfo.event.id});

            clickInfo.event.remove();
          }
        }
      
      const handleEvents = (events: EventApi[]) => {
          setCurrentEvents(events);
      }

      // console.log(events);
    
    
    return (
        <div className="relative">
            <div className="absolute top-0 z-10 left-44 bg-blue rounded-md">
                {/* className="absolute top-0 z-10 left-28" */}
              <FormControl fullWidth>
                <Select
                id="simple-select"
                value={currView}
                onChange={handleDropdown}
                style={{color: 'white', height: 42, width: 100, textAlign: 'center'}}
                >
                    <MenuItem value={"dayGridMonth"}>month</MenuItem>
                    <MenuItem value={"timeGridWeek"}>week</MenuItem>
                    <MenuItem value={"timeGridDay"}>day</MenuItem>
                </Select>
              </FormControl>
            </div>
            <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
                left: "prev,next today customDropdown",
                center: "title",
                right: "GCalBtn"
            }}
            height={showSearchBar? 600: 580}
            // dayGridMonth,timeGridWeek,timeGridDay
            // today 
            events={events}
            customButtons={{
              customDropdown: {
                  text: 'month',
                  click: () => {}
              },
              GCalBtn: {
                text: `${showGCal? 'Hide GCal events': 'Show GCal events'}`,
                click: () => {setShowGCal((prev)=> !prev)}
              }
            }}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={weekendsVisible}
            //initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
            eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
            />
            
            
        </div>
    );
    }
