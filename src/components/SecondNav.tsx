import React from "react";
import { NavLink } from "react-router-dom";

interface SecondNavItemProps {
  locationTo: string;
  title: string;
}

const SecondNavItem: React.FC<SecondNavItemProps> = ({ locationTo, title }) => {
  return (
    <NavLink
      to={locationTo}
      className={({ isActive }) =>
        isActive
          ? "text-teal border-b-[3px] border-teal text-2xl font-serif font-source-serif-pro pb-1"
          : "text-gray-600 text-2xl font-serif font-source-serif-pro"
      }
    >
      {title}
    </NavLink>
  );
};

const SecondNav: React.FC = () => {
  return (
    <nav>
      <div className="shadow-md py-0">
        <ul className="p-2 mx-auto list-none flex items-center justify-around w-3/5 h-full">
          <li>
            <SecondNavItem locationTo="/home/academics" title="Academics" />
          </li>
          <li>
            <SecondNavItem locationTo="/home/clubs" title="Clubs" />
          </li>
          <li>
            <SecondNavItem locationTo="/home/career" title="Career" />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export {SecondNav};
