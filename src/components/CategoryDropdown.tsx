import React, { useEffect, useState } from "react";

import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

import { categoryListAcademics, categoryListClubs, categoryListCareer } from "../types";

type ButtonClickHandler = (event: SelectChangeEvent<string[]>) => void;

interface CategoryDropdownProps {
    page: string;
    categoryName: string[];
    handleChangeCategory: ButtonClickHandler;
  }

const CategoryDropdown:React.FC<CategoryDropdownProps> = ({page, categoryName, handleChangeCategory}) => {
    // style for dropdown filter
	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {
	  PaperProps: {
		style: {
		  maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
		  // width: 300,
      // overflow: scroll,
		},
	  },
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

    return (

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
            autoWidth
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
 
}

export default CategoryDropdown;