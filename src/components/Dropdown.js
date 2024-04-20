import React from "react";
import "./Dropdown.css";
// https://www.robinwieruch.de/react-dropdown/

const Dropdown = ({ trigger, menu }) => {
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(!open);
	};

	return (
		<div className="dropdown">
			{React.cloneElement(trigger, {
				onClick: handleOpen,
			})}
			{open ? (
				<ul className="menu">
					{menu.map((menuItem, index) => (
						<li key={index} className="menu-item">
							{React.cloneElement(menuItem, {
								onClick: () => {
									menuItem.props.onClick();
									setOpen(false);
								},
							})}
						</li>
					))}
				</ul>
			) : null}
		</div>
	);
};

export default Dropdown;
