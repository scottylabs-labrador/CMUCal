import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  IoHomeOutline,
  IoGlobeOutline,
  IoCloudUploadOutline,
} from "react-icons/io5";
import { CiCircleQuestion } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";

interface NavbarItemProps {
  locationTo: string;
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  title: string;
  image: React.ReactNode;
}

const NavbarItem: React.FC<NavbarItemProps> = ({
  locationTo,
  onClick,
  title,
  image,
}) => {
  const isProfileLink = locationTo === "/profile";

  return (
    <Link
      to={locationTo}
      onClick={onClick}
      className="text-white no-underline h-full flex items-center p-1 flex flex-col justify-center items-center gap-1 group"
    >
      <div className="group-hover:text-teal transition-colors">{image}</div>
      {!isProfileLink && (
        <p className="text-white font-open-sans text-base font-normal group-hover:text-teal">
          {title}
        </p>
      )}
    </Link>
  );
};

const Navbar: React.FC = () => {
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

  useEffect(() => {
    window.addEventListener("resize", showButton);

    return () => {
      window.removeEventListener("resize", showButton);
    };
  }, []);

  return (
    <nav className="bg-red h-20 text-white text-lg sticky top-0 z-50 px-4">
      <div className="text-white flex justify-between items-center pr-4 h-20 w-full">
        <Link
          to="/"
          className="text-white flex items-start gap-2.5 text-xl no-underline ml-4"
        >
          CMUCal <i className="fa-regular fa-calendar"></i>
        </Link>
        <ul className="p-0 m-0 list-none flex">
          <div className="flex justify-center align-center gap-8 mr-10">
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
  );
};

export default Navbar;
