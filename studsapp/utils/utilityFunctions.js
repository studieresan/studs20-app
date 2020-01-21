export const getDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const monthString = month < 10 ? '0' + month : month;
    const day = date.getDate();
    const dayString = day < 10 ? '0' + day : day;
    const hour = date.getHours();
    const hourString = hour < 10 ? '0' + hour : hour;
    const minute = date.getMinutes();
    return year + '-' + monthString + '-' + dayString + " " + hourString + ":" + minute;
}

export const minuteDifference = (firstDate, secondDate) => {
    const difference = firstDate - secondDate;
    const minutes = Math.floor(difference / 1000 / 60);
    return minutes;
}