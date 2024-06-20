import React, { useState } from "react";

import { IoSearch } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { SearchCard } from "./SearchCard";
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
// for action menu
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import { IoMdMore } from "react-icons/io";


import "react-dropdown/style.css";
import "./Search.css";


// https://plainenglish.io/blog/how-to-implement-a-search-bar-in-react-js

const categoryListAcademics = [
  "Office Hours",
  "Supplemental Instructions",
  "Drop-in Tutoring",
  "Peer Tutoring"
];

const categoryListClubs = [
  "Student Government Recognized Organizations",
  "Fraternity & Sorority Chapters",
  "Tepper Graduate Organizations",
  "Department Sponsored Organizations",
  "Student Governance",
  "Tepper Offices",
  "Offices"
]

const categoryListCareer = [
  "Career Fair",
  "Networking",
  "Hiring",
  "Employer Info",
  "Guidance",
  "Academic",
  "Conference",
  "General"
]

const actionOptions = [
  'Actions',
  'Save Search',
  // 'Reset',
  'Reset CMUCal Events',
  'Manage Saved Search',
];

const actionOptionsShort = [
  'Actions',
  'Save',
  'Reset',
  'Manage',
];

interface SearchComponentProps {
  page: string;
}

const Search: React.FC<SearchComponentProps> = ({ page }) => {
  // Chang name to search bar
  const [searchInput, setSearchInput] = useState("");
  const [categoryName, setCategoryName] = useState<string[]>([]);
  // date picker
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
  const showDatePicker = true;
  // actionsMenu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  // search
  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  // actionsMenu
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number,
  ) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const actionsMenuComp = (
    <div className="h-10 w-3/12 float-right">
      <List
        component="nav"
        aria-label="Search Actions"
        className="h-10 flex flex-row justify-around"
        sx={{ bgcolor: 'background.paper'}}
      >
        <ListItemText
          className="text-center"
          id="actionsBtn"
          primary={actionOptionsShort[selectedIndex]}
            // secondary="placeholder"
        />
        {/* <ListItemButton
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}
        > */}
        <IconButton
          // className="inline-block"
          aria-label="more"
          id="long-button"
          // id="lock-button"
          // aria-haspopup="listbox"
          // aria-controls="lock-menu"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClickListItem}
        >
          <IoMdMore />
        </IconButton>
          
        {/* </ListItemButton> */}
      </List>

      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        {actionOptions.map((option, index) => (
          <MenuItem
            key={option}
            disabled={index === 0}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {index===0 && (<em>{option}</em>)}
            {index != 0 && option}
          </MenuItem>
        ))}
      </Menu>
      
    </div>
  )

  

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
  

  const startDateFn = (date: Dayjs | null) => {
    setStartDate(date);
    console.log(`start: ${date}`);
  };

  const endDateFn = (date: Dayjs | null) => {
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
    <div className="bg-gray-200 relative -top-2 w-full min-h-screen pl-8 pt-7 text-sans">
      <div className="flex flex-col w-11/12">
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
        <div className="w-full mt-2">{actionsMenuComp}</div>
        


        <SearchCard
          eventName={eventName1}
          orgName={orgName1}
          startDate={startDate1}
          startTime={startTime1}
          endDate={endDate1}
          endTime={endTime1}
          location={location1}
          // eventCategory={eventCategory1}
          // eventSubcategory={eventSubcategory1}
        />
        <SearchCard
          eventName={eventName1}
          orgName={orgName1}
          startDate={startDate1}
          startTime={startTime1}
          endDate={endDate1}
          endTime={endTime1}
          location={location1}
          // eventCategory={eventCategory1}
          // eventSubcategory={eventSubcategory1}
        />
      </div>
    </div>
  );
}

export {Search};
