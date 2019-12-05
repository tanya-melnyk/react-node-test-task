import React from "react";
import T from "prop-types";

const UrersTable = ({ users, onRowClick }) => (
  <div className="table-wrapper">
    <table className="usersTable">
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
          <tr
            className="urersTableRow"
            key={user.id}
            onClick={() => onRowClick(user.id)}
          >
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
  </div>
);

UrersTable.propTypes = {
  users: T.arrayOf(T.shape()).isRequired,
  onRowClick: T.func.isRequired
};

export default UrersTable;
