import { addHours } from "date-fns";

export const getEndDate = (sessionData, duration, cb) => {
    const newData = { ...sessionData };
    const endDate = addHours(new Date(newData.startDate), duration);
    try {
        newData.endDate = endDate.toISOString();
    } catch(e) {

    }
    cb(newData);
    console.log(newData)
}



// Converts the date and time inputs into a date object;
export const getDateObject = (sessionData, date, time, cb) => {
    const startDate = new Date(date + " " + time);
    const newData = { ...sessionData };
    try {
        newData.startDate = startDate.toISOString();
    } catch(e) {

    }
    cb(newData);
}
