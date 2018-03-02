import moment from "moment";

export const convertDateToString = (strDate, format) => {
    return moment(strDate).format(format);
}