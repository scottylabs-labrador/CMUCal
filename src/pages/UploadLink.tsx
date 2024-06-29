import React from "react";
import { UploadNavBar, UploadButton } from "./index";
import { Footer } from "../components";

const UploadLink: React.FC = () => {
    return (
        <div>
            <div className="h-lvh">
                <div className="flex flex-col justify-center items-center w-4/6 mx-auto">
                    <UploadNavBar />
                    <div className="bg-[#F1F1F1] w-full h-[250px] relative flex justify-center items-center gap-24">
                        <form className="text-xl flex items-center">
                            <label className="">Enter link here: </label>
                            <input type="text" className="ml-4 w-[530px] h-[40px] border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 px-4"></input>
                            <div className="ml-8"><UploadButton /></div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};


export { UploadLink };
