import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";

import { IoHomeOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { IoGlobeOutline } from "react-icons/io5";
import { IoCloudUploadOutline } from "react-icons/io5";

import { CiCircleQuestion } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";

function NavbarItem({ locationTo, onClick, title, image }) {
  const isProfileLink = locationTo === "/profile";

  return (
    <Link
      to={locationTo}
      onClick={onClick}
      className="text-white no-underline h-full flex items-center p-1 flex flex-col justify-center items-center gap-1 group"
    >
      <div className="group-hover:text-teal">
        {React.cloneElement(image, {
          className: "transition-colors",
        })}
      </div>
      {!isProfileLink && (
        <p className="text-white font-open-sans text-base	 font-normal group-hover:text-teal">
          {title}
        </p>
      )}
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
                  image={<IoGlobeOutline />}
                />
              </li>
              <li>
                <NavbarItem
                  locationTo="/"
                  onClick={closeMobileMenu}
                  title="Home"
                  image={<IoHomeOutline />}
                />
              </li>
              <li>
                <NavbarItem
                  locationTo="/upload"
                  onClick={closeMobileMenu}
                  title="Upload"
                  image={<IoCloudUploadOutline />}
                />
              </li>
              <li>
                <NavbarItem
                  locationTo="/instructions"
                  onClick={closeMobileMenu}
                  title="Instructions"
                  image={<CiCircleQuestion />}
                />
              </li>
            </div>
            <li>
              <NavbarItem
                locationTo="/profile"
                onClick={closeMobileMenu}
                title=""
                image={<FaRegUserCircle />}
              />
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
