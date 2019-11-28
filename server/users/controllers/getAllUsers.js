const fs = require("fs");

const usersPath = "server/data/users.json";
const usersStatsPath = "server/data/users_statistic.json";

const getUserStats = (stats, userId) =>
  stats.reduce(
    (acc, stat) => {
      if (stat.user_id === userId) {
        return {
          totalClicks: acc.totalClicks + stat.clicks,
          totalPageViews: acc.totalPageViews + stat.page_views
        };
      }
      return acc;
    },
    {
      totalClicks: 0,
      totalPageViews: 0
    }
  );

const createUsersWithStats = (users, stats) =>
  users.map(user => {
    const userStats = getUserStats(stats, user.id);

    return {
      ...user,
      total_clicks: userStats.totalClicks,
      total_page_views: userStats.totalPageViews
    };
  });

const getAllUsers = (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;

  const usersData = fs.readFileSync(usersPath);
  const users = JSON.parse(usersData.toString());

  const usersStatsData = fs.readFileSync(usersStatsPath);
  const usersStats = JSON.parse(usersStatsData.toString());

  const usersByQuery = users.slice(limit * (page - 1), limit * page);
  const usersWithStats = createUsersWithStats(usersByQuery, usersStats);

  const response = {
    status: "OK",
    users: usersWithStats
  };

  res.status(200).json(response);
};

module.exports = getAllUsers;
