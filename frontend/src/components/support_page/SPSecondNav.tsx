import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

interface SecondNavItemProps {
  page: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  path: string;
  currPage: string;
  title: string;
}

const SecondNavItem = ({ page, setPage, path, currPage, title }: SecondNavItemProps) => {
  const isActive = page === currPage;
  const handleClick = () => {
    setPage(_=> currPage);
    navigate(path);
  }
  let navigate = useNavigate();

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

const SPSecondNav = ({page, setPage}: SecondNavProps) => {
  return (
    <nav>
      <div className="shadow-md py-0">
        <ul className="p-2 mx-auto list-none flex items-center justify-around w-3/5 h-full">
          <li>
            <SecondNavItem page={page} setPage={setPage} path="/support" currPage="new user guide" title="New user guide" />
          </li>
          <li>
            <SecondNavItem page={page} setPage={setPage} path="/support/tips" currPage="tips" title="Tips" />
          </li>
          <li>
            <SecondNavItem page={page} setPage={setPage} path="/support/featureideas" currPage="feature ideas hub" title="Feature ideas hub" />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export {SPSecondNav};
