import React from 'react';
import { UploadNavBar, UploadButton } from "./index";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Footer } from "../components";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

interface InputProps {
    title: string;
    requiredBool: boolean;
}

const Input: React.FC<InputProps> = ({ title, requiredBool }) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700">
                {title}
                {requiredBool && <span className="text-red">*</span>}
            </label>
            <input
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required={requiredBool}
            />
        </div>
    )
}

const Category: React.FC = () => {
    return (
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
    )
}

const Time: React.FC = () => {
    return (
        <div className="mb-4">
            <div className="flex gap-4">
                <div className="w-1/2">
                    <label className="block text-gray-700">From<span className="text-red">*</span></label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker className="w-full" />
                    </LocalizationProvider>
                </div>
                <div className="w-1/2">
                    <label className="block text-gray-700">To<span className="text-red">*</span></label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker className="w-full" />
                    </LocalizationProvider>
                </div>
            </div>

        </div>
    )
}

const Note: React.FC = () => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700">Notes</label>
            <textarea
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                rows={2}
            ></textarea>

        </div>
    )
}
const UploadManual: React.FC = () => {
    return (
        <div>
            <div className="h-lvh">
                <div className="flex flex-col justify-center items-center w-4/6 mx-auto relative">
                    <UploadNavBar />
                    <div className="bg-[#F1F1F1] w-full h-[680px] px-20 pt-8 pb-20">
                        <form>
                            <Input title="Course Number" requiredBool={true} />
                            <Category />
                            <Time />
                            <Input title="Location/Meeting Link" requiredBool={true} />
                            <Input title="Instructor/TA" requiredBool={false} />
                            <Input title="Location/Meeting Link" requiredBool={true} />
                            <Note />
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
