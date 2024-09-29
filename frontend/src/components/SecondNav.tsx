import React from "react";
import { NavLink } from "react-router-dom";

interface SecondNavItemProps {
  page: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  currPage: string;
  title: string;
}

const SecondNavItem = ({ page, setPage, currPage, title }: SecondNavItemProps) => {
  const isActive = page === currPage;
  const handleClick = () => {
    setPage(_=> currPage);
  }
  return (
    <p
      className={
        isActive
          ? "text-teal border-b-[3px] border-teal text-2xl font-serif font-source-serif-pro pb-1"
          : "text-[#757575] text-2xl font-serif font-source-serif-pro"
      }
      onClick={()=>handleClick()}
    >
      {title}
    </p>
  );
};

interface SecondNavProps {
  page: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
}

const SecondNav = ({page, setPage}: SecondNavProps) => {
  return (
    <nav>
      <div className="shadow-md py-0">
        <ul className="p-2 mx-auto list-none flex items-center justify-around w-3/5 h-full">
          <li>
            <SecondNavItem page={page} setPage={setPage} currPage="academics" title="Academics" />
          </li>
          <li>
            <SecondNavItem page={page} setPage={setPage} currPage="clubs" title="Clubs" />
          </li>
          <li>
            <SecondNavItem page={page} setPage={setPage} currPage="career" title="Career" />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export {SecondNav};
