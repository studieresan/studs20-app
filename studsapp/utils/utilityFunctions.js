export const getDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const monthString = month < 10 ? '0' + month : month;
    const day = date.getDate();
    const dayString = day < 10 ? '0' + day : day;
    return year + '-' + monthString + '-' + dayString;
}