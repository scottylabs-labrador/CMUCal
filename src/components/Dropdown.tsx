import React, { useState } from "react";
import List from '@mui/material/List';
// import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import { IoMdMore } from "react-icons/io";
// https://mui.com/material-ui/react-select/ 

const Dropdown: React.FC = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  	const [selectedIndex, setSelectedIndex] = useState(1);
	

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

	return (
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
}

export {Dropdown};
