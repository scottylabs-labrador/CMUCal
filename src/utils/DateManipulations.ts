import React from "react";

export const getDateString = (date: string) => {
    // return: 2024-08-02
    return new Date(date).toISOString().slice(0, 10);
}

export const get24Hour = (time: string) => {
    // time: 07:00PM
    const suffix = time.slice(5); //default end is the lenght of string
    if (suffix == 'PM') {
        let hour = Number(time.slice(0,2));
        hour = hour + 12;
        const newH = `${hour}`;
        return newH+time.slice(2,5);
    } 
    return time.slice(0,5);
}

export const getFormattedDateStr = (date:string, time:string) => {
    const formattedDate = getDateString(date);
    const formattedTime = get24Hour(time);
    return formattedDate + 'T' + formattedTime;
}