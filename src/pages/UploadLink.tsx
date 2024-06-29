import React from "react";
import { UploadNavBar, UploadButton } from "./index";

const UploadLink: React.FC = () => {
    return (
        <div className="flex flex-col justify-center items-center w-4/6 mx-auto">
            <UploadNavBar />
            <div className="bg-[#F1F1F1] w-full h-[250px] relative flex justify-center items-center gap-24">
                <form className="text-xl flex items-center">
                    <label className="">Enter link here: </label>
                    <input type="text" className="outline-none ml-4 w-[530px] h-[40px]"></input>
                    <div className="mt-4"><UploadButton/></div>
                </form>
            </div>
        </div>
    );
};

export { UploadLink };
