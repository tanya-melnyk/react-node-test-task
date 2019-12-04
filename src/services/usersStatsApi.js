const apiUri = "/api/users";
const errMsg = "Not Found";
// const errMsg = "An error occured while loading";

const getAllUsers = (page, limit) =>
  fetch(`${apiUri}?page=${page}&limit=${limit}`)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(errMsg);
    })
    .then(data => data)
    .catch(err => {
      throw err;
    });

const getUserStats = (userId, startDate, endDate) =>
  fetch(`${apiUri}/${userId}?from=${startDate}&to=${endDate}`)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(errMsg);
    })
    .then(data => data.user)
    .catch(err => {
      throw err;
    });

export default { getAllUsers, getUserStats };
