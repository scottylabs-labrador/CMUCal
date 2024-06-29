import React from 'react';
import { UploadNavBar, UploadButton } from "./index";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Footer } from "../components";

const UploadManual: React.FC = () => {
    return (
        <div>
            <div className="h-lvh">

                <div className="flex flex-col justify-center items-center w-4/6 mx-auto relative">
                    <UploadNavBar />
                    <div className="bg-[#F1F1F1] w-full h-[620px] px-20 pt-10">
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-700">Course Number<span className="text-red">*</span></label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Event Type<span className="text-red">*</span></label>
                                <select
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required
                                >
                                    <option value="">Select Event Type</option>
                                    <option value="Academics">Academics</option>
                                    <option value="Club">Club</option>
                                    <option value="Career">Career</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <div className="flex gap-4">
                                    <div className="w-1/2">
                                        <label className="block text-gray-700">From<span className="text-red">*</span></label>
                                        {/* <DateTimePicker/> */}
                                        <input
                                            type="time"
                                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            required
                                        />
                                    </div>
                                    <div className="w-1/2">
                                        <label className="block text-gray-700">To<span className="text-red">*</span></label>
                                        {/* <DateTimePicker/> */}
                                        <input
                                            type="time"
                                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Location/Meeting Link<span className="text-red">*</span></label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Instructor/TA</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Notes</label>
                                <textarea
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    rows={2}
                                ></textarea>
                            </div>
                            <div className="absolute bottom-5 right-20"><UploadButton /></div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    );
};

export { UploadManual };
