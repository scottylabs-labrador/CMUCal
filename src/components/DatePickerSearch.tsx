import { Dayjs } from "dayjs";
import React from "react";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface DatePickerSearchProps {
    startDate: Dayjs | null,
    endDate: Dayjs | null,
    startDateFn: (date: Dayjs|null) => void,
    endDateFn: (date: Dayjs|null) => void,
}

const DatePickerSearch = ({startDate, endDate, startDateFn, endDateFn}: DatePickerSearchProps) => {
    return (
        <>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="w-36">
            <DatePicker
                value={startDate}
                onChange={(date: Dayjs | null) => {
                startDateFn(date);
                }}
                format="MM/DD"
            />
            </div>
            <span className="w-4">to</span>
            <div className="w-36">
            <DatePicker 
                value={endDate}
                onChange={(date) => {
                endDateFn(date);
                }}
                format="MM/DD"
            />
            </div>
        </LocalizationProvider>
      </>
    )
}

export default DatePickerSearch;