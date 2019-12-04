const fs = require("fs");
var moment = require("moment");

const usersPath = "server/data/users.json";
const usersStatsPath = "server/data/users_statistic.json";

const getUserStats = (stats, userId, startDate, endDate) =>
  stats.reduce(
    (acc, stat) => {
      if (stat.user_id !== userId) {
        return acc;
      }

      const startTime = moment(startDate).startOf("day");
      const endTime = moment(endDate).endOf("day");

      if (!moment(stat.date).isBetween(startTime, endTime, null, "[]")) {
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

const createUserWithStats = (user, stats, startDate, endDate) => {
  const userStats = getUserStats(stats, user.id, startDate, endDate);

  return {
    name: `${user.first_name} ${user.last_name}`,
    clicks: userStats.clicks,
    page_views: userStats.page_views
  };
};

const getUserStatsById = (req, res) => {
  const userId = Number(req.params.id);

  if (!userId || userId < 1) {
    return res.status(404).json({ status: "User ID not valid" });
  }

  const startDate = req.query.from;
  const endDate = req.query.to;

  const usersData = fs.readFileSync(usersPath);
  const users = JSON.parse(usersData.toString());

  const userById = users.find(user => user.id === userId);

  if (!userById) {
    return res.status(404).json({ status: "User Not Found" });
  }

  const usersStatsData = fs.readFileSync(usersStatsPath);
  const usersStats = JSON.parse(usersStatsData.toString());

  const userWithStats = createUserWithStats(
    userById,
    usersStats,
    startDate,
    endDate
  );

  const response = {
    status: "OK",
    user: userWithStats
  };

  res.status(200).json(response);
};

module.exports = getUserStatsById;
