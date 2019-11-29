// this file needs refactoring

const formatUserStats = (user, dateFrom, dateTo) => {
  const unixDateFrom = new Date(dateFrom).getTime();
  const unixDateTo = new Date(dateTo).getTime();

  const daysFrom = countDays(unixDateFrom);
  const daysTo = countDays(unixDateTo);

  let clicks = [];
  const clicksDates = user.clicks.map(click => click.date);

  let page_views = [];
  const pageViewsDates = user.page_views.map(view => view.date);

  for (let dayCount = daysFrom; dayCount <= daysTo; dayCount += 1) {
    const dateIdx = clicksDates.indexOf(getDateFromDays(dayCount));

    if (dateIdx >= 0) {
      clicks[dayCount - daysFrom] = {
        date: user.clicks[dateIdx].date,
        number: user.clicks[dateIdx].number
      };
    } else {
      clicks[dayCount - daysFrom] = {
        date: getDateFromDays(dayCount),
        number: 0
      };
    }
  }

  for (let dayCount = daysFrom; dayCount <= daysTo; dayCount += 1) {
    const dateIdx = pageViewsDates.indexOf(getDateFromDays(dayCount));

    if (dateIdx >= 0) {
      page_views[dayCount - daysFrom] = {
        date: user.page_views[dateIdx].date,
        number: user.page_views[dateIdx].number
      };
    } else {
      page_views[dayCount - daysFrom] = {
        date: getDateFromDays(dayCount),
        number: 0
      };
    }
  }

  return {
    name: user.name,
    clicks,
    page_views
  };
};

const countDays = unixDate => unixDate / 1000 / 60 / 60 / 24;

const getDateFromDays = daysCount => {
  const unixDate = daysCount * 24 * 60 * 60 * 1000;
  const date = new Date(unixDate);

  let result = date.getFullYear() + "-";
  result += date.getMonth() + 1 + "-";
  result += date.getDate() > 10 ? date.getDate() : "0" + date.getDate();

  return result;
};

export default formatUserStats;
