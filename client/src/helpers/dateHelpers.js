import { addHours, parseISO } from "date-fns";

export const getEndDate = (sessionData, duration, cb) => {
    const newData = { ...sessionData };
    const endDate = addHours(new Date(newData.startDate), duration);
    try {
        newData.endDate = endDate.toISOString();
    } catch(e) {

    }
    cb(newData);
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



export const getDateData = (date, time, duration) => {
    const startDate = new Date(date + " " + time).toISOString()
    const endDate = addHours(parseISO(startDate), duration).toISOString()
    return { startDate, endDate }
}
