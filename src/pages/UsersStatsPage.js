import React, { Component } from "react";
// import T from 'prop-types';

import UsersTable from "../components/UsersTable";

import usersStatsApi from "../services/usersStatsApi";
import routes from "../routes";

export default class UsersStatsPage extends Component {
  // static propTypes = {
  //   history: T.shape().isRequired,
  //   location: T.shape().isRequired,
  // };

  state = {
    page: 1,
    limit: 50,
    users: [],
    error: null,
    loading: true
  };

  componentDidMount() {
    const { location } = this.props;

    const page = new URLSearchParams(location.search).get("page");
    const limit = new URLSearchParams(location.search).get("limit");

    if (!page && !limit) {
      return this.fetchUsersByQuery();
    }

    this.setState({ page, limit }, this.fetchUsersByQuery);
  }

  fetchUsersByQuery = async () => {
    const { page, limit } = this.state;

    try {
      const users = await usersStatsApi.getAllUsers(page, limit);

      this.setState({ users, loading: false });
    } catch (error) {
      this.setState({ error, loading: false });
    }
  };

  handleTableRawClick = id => {
    const { history, location } = this.props;

    console.log(location);

    history.push({
      state: { from: location },
      pathname: `${routes.USERS}/${id}`
    });
    // history.push(`${routes.USERS}/${id}`);
  };

  render() {
    const { users, error, loading } = this.state;
    const { location } = this.props;

    return (
      <div>
        {error && <p>{error.message}</p>}

        {loading && <p>Loading...</p>}

        {users.length > 0 && (
          <UsersTable
            users={users}
            location={location}
            onRawClick={this.handleTableRawClick}
          />
        )}
      </div>
    );
  }
}
