import moment from "moment";

const formatUserStats = (user, dateFrom, dateTo) => {
  const daysCountFrom = getDaysCount(dateFrom);
  const daysCountTo = getDaysCount(dateTo);

  const getFormattedData = getFormatSetter(daysCountFrom, daysCountTo);

  const clicks = getFormattedData(user.clicks);
  const page_views = getFormattedData(user.page_views);

  return {
    name: user.name,
    clicks,
    page_views
  };
};

const getDaysCount = date => {
  const unixDate = moment(date).valueOf();

  return moment.duration(unixDate).asDays();
};

const getFormatSetter = (daysCountFrom, daysCountTo) => arr => {
  const resArr = [];
  const dates = arr.map(el => el.date);

  for (let i = 0; i <= daysCountTo - daysCountFrom; i += 1) {
    const date = getDateFromDays(daysCountFrom + i);
    const dateIdx = dates.indexOf(date);

    if (dateIdx >= 0) {
      resArr[i] = { date, number: arr[dateIdx].number };
    } else {
      resArr[i] = { date, number: 0 };
    }
  }

  return resArr;
};

const getDateFromDays = daysCount => {
  const unixDate = moment.duration(daysCount, "days").as("milliseconds");

  return moment(unixDate).format("YYYY-MM-DD");
};

export default formatUserStats;
