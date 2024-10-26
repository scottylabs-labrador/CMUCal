import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  IoHomeOutline,
  IoGlobeOutline,
  IoCloudUploadOutline,
} from "react-icons/io5";
import { CiCircleQuestion } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import Logo from "./icons/Logo.png";
import { SPSecondNav } from "./support_page/SPSecondNav";

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
  // the useLocation hook detects path changes
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);
  // isSupport is set to true if the current path includes 'support'
  const [isSupport, setIsSupport] = useState(false);
  // set the default value for the SecondNav for support pages
  const [supportPageLabel, setSupportPageLabel] = useState('new user guide');

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    handleClick();
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  // useEffect for everytime that the path changes
  useEffect(() => {
    // Update the path whenever the location changes
    setPath(location.pathname);
    setIsSupport(location.pathname.includes('support'));
    
  }, [location.pathname]); // Dependency array with location.pathname

  useEffect(() => {
    window.addEventListener("resize", showButton);

    return () => {
      window.removeEventListener("resize", showButton);
    };

    
  }, []);

  

  return (
    <div>
    <nav className={`${isSupport? 'bg-green': 'bg-red'} ${isSupport? 'h-[70px]': 'h-[70px]'} text-white text-base sticky top-0 z-50 px-4 relative`}>
      <div className="text-white flex justify-between items-center pr-4 h-20 w-full">
        <Link
          to="/home"
          className="text-white"
        >
          <div className="flex items-center justify-between absolute left-8 top-5">
            <img src = {Logo} className={`object-contain ${isSupport? 'h-8': 'h-9'} mr-3`}/>
            {isSupport && ( <p className={`text-black text-xl pr-3`}> | </p> )}
            {isSupport && ( <p className={`text-black text-xl`}> Support </p> )}
          </div>
        </Link>
        {/* the rest of the nav bar won't show up on the welcome page or support pages */}
        {path==="/" || path === "/welcome" || isSupport ? "" : (
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
                locationTo="/home"
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
                locationTo="/support"
                onClick={closeMobileMenu}
                title="Support"
                image={<CiCircleQuestion />}
              />
            </li>
          </div>
          <li>
            <NavbarItem
              locationTo="/profile"
              onClick={closeMobileMenu}
              title=""
              image={
                <FaRegUserCircle size={30}/>
              }
            />
          </li>
        </ul>
        )}
      </div>
    </nav>
    {isSupport && (
      <SPSecondNav page={supportPageLabel} setPage={setSupportPageLabel}/>
    )}
    </div>
  );
};

export {Navbar};
