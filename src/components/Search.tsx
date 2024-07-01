import React, { useEffect, useState } from "react";
// search input
import { IoSearch } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { SearchCard } from "./SearchCard";
import Fuse from 'fuse.js'
import DropInData from "../../backend/scraper/drop_in.json";
// for date picker
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// for categories dropdown
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { categoryListAcademics, categoryListClubs, categoryListCareer } from "../types";
// selectable dropdown
// import { Dropdown } from "./Dropdown";
import { Button } from "./Button";

import "react-dropdown/style.css";
import "./Search.css";
import { SavedSearchBtn } from "./SavedSearches";
// import useSearch from "../../utils/hooks/useSearch";
import DITData from "../../backend/scraper/drop_in.json";
import PTData from "../../backend/scraper/peer_tutoring.json";
import SIData from "../../backend/scraper/si.json";
import ClubsData from "../../backend/scraper/tartanconnect.json";
import CareerData from "../../backend/scraper/handshake.json";


// https://plainenglish.io/blog/how-to-implement-a-search-bar-in-react-js


interface SearchComponentProps {
  page: string;
}

const Search: React.FC<SearchComponentProps> = ({ page }) => {
  // Chang name to search bar
  const [searchInput, setSearchInput] = useState("");
  const [categoryName, setCategoryName] = useState<string[]>([]);
  // search results
  // const [data, setData] = useState(null)
  // date picker
  const [startDate, setStartDate] = useState<Dayjs>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs>(dayjs().add(7, 'day'));
  const showDatePicker = true;

  
  useEffect(()=> {
    // const [data, setData] = useState([]);

    // const fuse = new Fuse(SIData, {
    //   keys: ["course_id", "course_name"],
    // });

    // setData([fuse.search(searchInput)]);
    getCategoryData(page);
  },[categoryName])
  
  
  // search
  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const handleChangeCategory = (event: SelectChangeEvent<typeof categoryName>) => {
    const {
      target: { value },
    } = event;
    // target = the element that triggered the event 
    // value = the current value of the element/ the option selected
    setCategoryName(
      // e.g. "Office Hours, Peer Tutoring" --> ["OH", "PT"]
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const inDateRange = (date: string) => {
    const startDateObj = startDate.toDate(); 
    const endDateObj = endDate.toDate();
    const eventDate = new Date(date);
    return eventDate >= startDateObj && eventDate <= endDateObj;
  }

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

  const getNumCategories = () => {
    if (page==="academics") {
      return categoryListAcademics.length;
    } else if (page==="clubs") {
      return categoryListClubs.length;
    } else if (page==="career") {
      return categoryListCareer.length;
    }
  }

  // style for dropdown filter
	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {
	  PaperProps: {
		style: {
		  maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
		  width: 450,
		},
	  },
	};

  const categoryContent = (
    <FormControl className="w-full h-10">
      {/* <InputLabel id="demo-multiple-checkbox-label">Categories</InputLabel> */}
      <Select
          multiple
          displayEmpty
          value={categoryName}
          onChange={handleChangeCategory}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <span>Categories</span>;
            }
            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
          className="bg-white h-10"
        >
        
        <MenuItem disabled value="">
          <em>Categories ({getNumCategories()})</em>
        </MenuItem>
       
          
          {/* different categories dropdown depending on the page */}
        {page==="academics" && categoryListAcademics.map((category) => (
          <MenuItem key={category} value={category}>
            <Checkbox checked={categoryName.indexOf(category) > -1} />
            <ListItemText primary={category} />
          </MenuItem>
        ))}
        {page==="clubs" && categoryListClubs.map((category) => (
          <MenuItem key={category} value={category}>
            <Checkbox checked={categoryName.indexOf(category) > -1} />
            <ListItemText primary={category} />
          </MenuItem>
        ))}
        {page==="career" && categoryListCareer.map((category) => (
          <MenuItem key={category} value={category}>
            <Checkbox checked={categoryName.indexOf(category) > -1} />
            <ListItemText primary={category} />
          </MenuItem>  
        ))}
      </Select>
    </FormControl>
  );

  const startDateFn = (date: Dayjs) => {
    setStartDate(date);
    console.log(`start: ${date}`);
  };

  const endDateFn = (date: Dayjs) => {
    setEndDate(date);
    console.log(`end: ${date}`);
  };

  // for date range: start to end
  let dateContent;
  if (showDatePicker) {
    dateContent = (
      <>      
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="w-36">
          <DatePicker
            value={startDate}
            onChange={(date) => {
              startDateFn(date);
            }}
            format="MM/DD"
          />
        </div>
        <span className="w-4">to</span>
        <div className="w-36">
          <DatePicker 
            value={endDate}
            onChange={(date) => {
              endDateFn(date);
            }}
            format="MM/DD"
          />
        </div>
        </LocalizationProvider>
      </>
    );
  }

  // bogus values
  const eventName1 = "Office Hours";
  const orgName1 = "15-122 Course Staff";
  const startDate1 = "06/17"
  const startTime1 = "3PM"
  const endDate1 = "06/17"
  const endTime1 = "5PM"
  const location1 = "POS 146";
  // const eventCategory1 = "academic";
  // const eventSubcategory1 = "OfficeHour";
  return (
    <div className="bg-[#F5F5F5] relative -top-2 w-full min-h-screen pl-8 pt-7 text-sans">
      <div className="flex flex-col w-11/12 gap-y-2.5">
        <div className="no-scroll-bar flex flex-nowrap flex-row gap-x-1.5 overflow-scroll">
          <SavedSearchBtn content="15122" clickStay={true} textSize="text-xs"/>
          <SavedSearchBtn content="programming" clickStay={true} textSize="text-xs"/>
          <SavedSearchBtn content="15122" clickStay={true} textSize="text-xs"/>
          <SavedSearchBtn content="15122" clickStay={true} textSize="text-xs"/>
          <SavedSearchBtn content="15122" clickStay={true} textSize="text-xs"/>
          <SavedSearchBtn content="15122" clickStay={true} textSize="text-xs"/>
        </div>
        <div className="bg-gray-200 relative h-12 w-full rounded-md border border-black border-[1.5] flex items-center justify-center">
          <input
            type="text"
            placeholder="Search here"
            onChange={handleChangeSearch}
            value={searchInput}
            className="bg-gray-200 flex-grow px-4 focus:outline-none"
          />
          {/* Search icon. Add onClick function in the future */}
          {searchInput? 
            <RxCross1 onClick = {()=> setSearchInput("")} className="h-6 w-6 text-gray-500 mr-2" /> : 
            <IoSearch className="h-6 w-6 text-gray-500 mr-2" />
          }
          
        </div>

        <div className="mt-3 flex w-full items-baseline justify-between">
          <div className="w-3/5 items-center flex flex-row justify-between space-x-2">{dateContent}</div>
          {/* drop down filter */}
          {(page === "academics" || page === "clubs" || page==="career") ? (
            <div className="w-2/6">{categoryContent}</div>
          ) : (
            <></>
          )}
        </div>
        {/* <div className="w-full mt-2">{actionsMenuComp}</div> */}
        <div className="w-full mt-2 flex justify-between">
          {/* <Dropdown/> */}
          <Button content="Add All" clickStay={false} textSize="text-base"/>
          <Button content="Reset CMUCal Events" clickStay={false} textSize="text-base"/>
        </div>
        
        <div className="overflow-scroll" style={{height: '70vh'}}>
        {searchInput && page==="academics" && getCategoryData(page)?.map( (result) => {
          for (let i = 0; i<result.item.events.length; i++) {
            if (inDateRange(getWeekday(result.item.events[i].weekday))) {
              return ( 
                  <SearchCard
                    key={result.refIndex}
                    eventName={`${result.item.resource_type} for ${result.item.course_name}`}
                    orgName={`${result.item.course_id} Staff`}
                    startDate={getWeekday(result.item.events[i].weekday) || `null`}
                    startTime={result.item.events[i].start_time}
                    endDate={getWeekday(result.item.events[i].weekday) || `null`}
                    endTime={result.item.events[i].end_time}
                    location={result.item.events[i].location}
                  />
              )
            }  
          }
        })}
        {searchInput && (page==="clubs" || page==="career") && getCategoryData(page)?.map( (result) => {
          for (let i = 0; i<result.item.events.length; i++) {
            if (inDateRange(getWeekday(result.item.events[i].weekday))) {
              return ( 
                  <SearchCard
                    key={result.refIndex}
                    eventName={`${result.item.event_name}`}
                    orgName={`${result.item.event_host}`}
                    startDate={getWeekday(result.item.events[i].weekday) || `null`}
                    startTime={result.item.events[i].start_time}
                    endDate={getWeekday(result.item.events[i].weekday) || `null`}
                    endTime={result.item.events[i].end_time}
                    location={result.item.events[i].location}
                  />
              )
            }  
          }
        })}
        </div>


        
      </div>
    </div>
  );
}

export {Search};
