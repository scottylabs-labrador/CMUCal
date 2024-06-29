import React from "react";
import { UploadNavBar, UploadButton } from "./index"

const UploadManual: React.FC = () => {
    return (
        <div className="flex flex-col justify-center items-center w-4/6 mx-auto">
            <UploadNavBar />
            <div className="bg-[#F1F1F1] w-full h-[250px] relative flex justify-center items-center">
                <form className="text-xl ">
                    <label className="absolute left-28 bottom-[110px]">Enter Manual here: </label>
                    <input type="text" className="outline-none ml-4 w-[530px] h-[40px] bottom-[105px]"></input>
                    <div className="absolute right-20 bottom-[105px]"><UploadButton/></div>
                </form>
            </div>
        </div>
    )
}

export { UploadManual };