
import { format, getHours } from "date-fns"

export const convertDateToUI = (date) => {
    const dateObject = new Date(date);
    return format(dateObject, 'yyyy-MM-dd');
}

export const convertTimeToUI = (date) => {
    const dateObject = new Date(date);
    return format(dateObject, 'HH:mm')
}

export const getDuration = (startDate, endDate) => {
    const end = getHours(new Date(endDate));
    const start = getHours(new Date(startDate));
    return end - start;
}

export const formatTime = (date) => {
    const dateObject = new Date(date);
    return format(dateObject, 'cccc, MM/dd @ h:mm a')
}
