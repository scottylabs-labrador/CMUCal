import React from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { UploadNavBar, UploadButton } from "./index"

const UploadFile: React.FC = () => {
    return (
        <div className="flex flex-col justify-center items-center w-4/6 mx-auto">
            <UploadNavBar />
            <div className="bg-[#F1F1F1] w-full h-[550px] relative">
                <div className="bg-light-green h-96 w-5/6 mx-auto mt-14 rounded-xl outline-dashed outline-green outline-[2.5px] text-center flex flex-col justify-center items-center gap-10">
                    <IoCloudUploadOutline className="text-[100px] text-green" />
                    <h2 className="text-xl">Choose a file and drag it here</h2>
                </div>
                <div className="absolute bottom-10 right-10">
                    <UploadButton />
                </div>
            </div>
        </div>
    )
}

export { UploadFile };