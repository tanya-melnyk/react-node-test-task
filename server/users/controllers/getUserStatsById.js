const fs = require("fs");

const usersPath = "server/data/users.json";
const usersStatsPath = "server/data/users_statistic.json";

const getUserStats = (stats, userId, dateFrom, dateTo) =>
  stats.reduce(
    (acc, stat) => {
      if (stat.user_id !== userId) {
        return acc;
      }

      const unixDateFrom = new Date(dateFrom).getTime();
      const unixDateTo = new Date(dateTo).getTime();
      const unixStatsDate = new Date(stat.date).getTime();

      if (unixStatsDate < unixDateFrom || unixStatsDate > unixDateTo) {
        return acc;
      }

      const statsByDay = type => ({
        date: stat.date,
        number: stat[type]
      });

      return {
        clicks: [...acc.clicks, statsByDay("clicks")],
        page_views: [...acc.page_views, statsByDay("page_views")]
      };
    },
    {
      clicks: [],
      page_views: []
    }
  );

const createUserWithStats = (user, stats, dateFrom, dateTo) => {
  const userStats = getUserStats(stats, user.id, dateFrom, dateTo);

  return {
    user_name: `${user.first_name} ${user.last_name}`,
    clicks: userStats.clicks,
    page_views: userStats.page_views
  };
};

const getUserStatsById = (req, res) => {
  const userId = Number(req.params.id);
  const dateFrom = req.query.from;
  const dateTo = req.query.to;

  const usersData = fs.readFileSync(usersPath);
  const users = JSON.parse(usersData.toString());

  const userById = users.find(user => user.id === userId);

  if (!userById) {
    return res.status(200).json({ status: "User Not Found" });
  }

  const usersStatsData = fs.readFileSync(usersStatsPath);
  const usersStats = JSON.parse(usersStatsData.toString());

  const userWithStats = createUserWithStats(
    userById,
    usersStats,
    dateFrom,
    dateTo
  );

  const response = {
    status: "OK",
    users: userWithStats
  };

  res.status(200).json(response);
};

module.exports = getUserStatsById;
