const apiUri = "/api/users";
const errMsg = "An error occured while loading";

const getAllUsers = (page, limit) =>
  fetch(`${apiUri}?page=${page}&limit=${limit}`)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(errMsg);
    })
    .then(data => data.users)
    .catch(err => {
      throw err;
    });

export default { getAllUsers };
