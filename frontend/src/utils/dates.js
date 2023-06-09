export const weekDayData = {
    0: {short: 'Sun', long: 'Sunday'},
    1: {short: 'Mon', long: 'Monday'},
    2: {short: 'Tue', long: 'Tuesday'},
    3: {short: 'Wed', long: 'Wednesday'},
    4: {short: 'Thu', long: 'Thursday'},
    5: {short: 'Fri', long: 'Friday'},
    6: {short: 'Sat', long: 'Saturday'},
}

export const monthData = {
    0: {short: 'Jan', long: 'January'},
    1: {short: 'Feb', long: 'February'},
    2: {short: 'Mar', long: 'March'},
    3: {short: 'Apr', long: 'April'},
    4: {short: 'May', long: 'May'},
    5: {short: 'Jun', long: 'June'},
    6: {short: 'Jul', long: 'July'},
    7: {short: 'Aug', long: 'August'},
    8: {short: 'Sep', long: 'September'},
    9: {short: 'Oct', long: 'October'},
    10: {short: 'Nov', long: 'November'},
    11: {short: 'Dec', long: 'December'}
}

export const sameDay = (date1, date2) => {
    return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
}

export const startOfMonth = (year, month) => {
    return new Date(year, month, 1)
}

export const endOfMonth = (year, month) => {
    return new Date(year, month + 1, 0)
}

export const addDays = (date, numOfDays) => {
    let result = new Date(date);
    result.setDate(date.getDate() + numOfDays);
    return result
}

export const addMonths = (date, numOfMonths) => {
    let day = date.getDate();
    date.setMonth(date.getMonth() + numOfMonths);
    if (date.getDate() !== day) date.setDate(0)
    return date
}

export const startOfWeek = (date) => {
    let start = date.getDate() - date.getDay();
    return new Date(date.setDate(start))
}

export const endOfWeek = (date) => {
    let start = date.getDate() - date.getDay();
    let end = start + 6;
    return new Date(date.setDate(end))
}
