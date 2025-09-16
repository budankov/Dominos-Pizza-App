import moment from "moment";
import "moment/locale/uk";

export const getDateFromFireStoreTimeStampObject = (
  fireStoreDateObject,
  locale = "en"
) => {
  const date = new Date(fireStoreDateObject.seconds * 1000);
  return moment(date).locale(locale).format("LL, HH:mm");
};
