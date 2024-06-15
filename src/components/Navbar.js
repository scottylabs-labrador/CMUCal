import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import iconHome from "./icons/home.svg";
import iconUpload from "./icons/upload.svg";
import iconInstruction from "./icons/instruction.svg";
import iconSettings from "./icons/settings.svg";
import iconWelcome from "./icons/welcome.svg";

// Not able to change stroke color of svg image when hover
function NavbarItem({ locationTo, onClick, title, image }) {
	const isProfileLink = locationTo === '/profile';
  
	return (
	  <Link
		to={locationTo}
		onClick={onClick}
		className="text-white no-underline h-full flex items-center p-1 flex flex-col justify-center items-center gap-1 group"
	  >
		<img
		  src={image}
		  alt={title} // Ensure alt text for accessibility
		  className={`group-hover:stroke-teal ${isProfileLink ? 'w-8 h-8' : 'w-6 h-6'}`}
		  viewBox="0 0 25 24"
		  fill="none"
		/>
		{!isProfileLink && <p className="text-white font-sans text-sm font-normal group-hover:text-teal">{title}</p>}
	  </Link>
	);
  }
  
function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  window.addEventListener("resize", showButton);
  // calls the showButton function whenevern window resizes

  return (
    <>
      <nav class="bg-red h-20 text-white text-lg sticky top-0 z-50 px-4">
        <div class="text-white flex justify-between items-center pr-4 h-20 w-full">
          <Link to="/" className="navbar-logo">
            CMUCal <i class="fa-regular fa-calendar"></i>
          </Link>
          <ul class="p-0 m-0 list-none flex">
            <div class="flex justify-center align-center gap-8 mr-10">
              <li>
                <NavbarItem
                  locationTo="/welcome"
                  onClick={closeMobileMenu}
                  title="Welcome"
                  image={iconWelcome}
                />
              </li>
              <li>
                <NavbarItem
                  locationTo="/"
                  onClick={closeMobileMenu}
                  title="Home"
                  image={iconHome}
                />
              </li>
              <li>
                <NavbarItem
                  locationTo="/upload"
                  onClick={closeMobileMenu}
                  title="Upload"
                  image={iconUpload}
                />
              </li>
              <li>
                <NavbarItem
                  locationTo="/instructions"
                  onClick={closeMobileMenu}
                  title="Instructions"
                  image={iconInstruction}
                />
              </li>
            </div>
            <li>
              <NavbarItem
                locationTo="/profile"
                onClick={closeMobileMenu}
                title=""
                image={iconSettings}
              />
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
