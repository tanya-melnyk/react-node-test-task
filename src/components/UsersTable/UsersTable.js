import React from "react";
import { Link } from "react-router-dom";
// import T from "prop-types";

import routes from "../../routes";

const UrersTable = ({ users, location, onRawClick }) => (
  <table>
    <thead>
      <tr>
        <th>Id</th>
        <th>First name</th>
        <th>Last name</th>
        <th>Email</th>
        <th>Gender</th>
        <th>IP address</th>
        <th>Total clicks</th>
        <th>Total page views</th>
      </tr>
    </thead>

    <tbody>
      {users.map(user => (
        <tr key={user.id} onClick={() => onRawClick(user.id)}>
          <td>{user.id}</td>
          <td>{user.first_name}</td>
          <td>{user.last_name}</td>
          <td>{user.email}</td>
          <td>{user.gender}</td>
          <td>{user.ip_address}</td>
          <td>{user.total_clicks}</td>
          <td>{user.total_page_views}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

// UrersTable.propTypes = {
//   users: T.arrayOf(
//     T.shape({
//       id: T.string.isRequired,
//       first_name: T.string.isRequired,
//       last_name: T.string.isRequired,
//       email: T.string.isRequired
//     }).isRequired
//   ).isRequired
// };

export default UrersTable;
