import React, { Component } from "react";
import T from "prop-types";

import Breadcrumbs from "../../common/Breadcrumbs";
import Paginator from "../../common/Paginator";
import UsersTable from "./components/UsersTable";

import getQuery from "../../services/getQuery";
import usersStatsApi from "../../services/usersStatsApi";
import routes from "../../routes";

export default class UsersStatsPage extends Component {
  static propTypes = {
    history: T.shape().isRequired,
    location: T.shape().isRequired
  };

  state = {
    page: 1,
    limit: 50,
    users: [],
    pageCount: 0,
    error: null,
    loading: true
  };

  componentDidMount() {
    const { history, location } = this.props;
    const { page: statePage, limit: stateLimit } = this.state;

    const page = Number.parseInt(getQuery(location.search, "page"), 10);
    const limit = Number.parseInt(getQuery(location.search, "limit"), 10);

    if (page && limit) {
      return this.setState({ page, limit }, this.fetchUsersByQuery);
    }

    if (page) {
      return this.setState({ page }, this.fetchUsersByQuery);
    }

    if (limit) {
      return this.setState({ limit }, this.fetchUsersByQuery);
    }

    history.replace({
      ...location.pathname,
      search: `limit=${stateLimit}&page=${statePage}`
    });

    this.fetchUsersByQuery();
  }

  fetchUsersByQuery = async () => {
    const { page, limit } = this.state;

    try {
      const data = await usersStatsApi.getAllUsers(page, limit);
      const users = data.users;
      const usersTotalCount = data.usersTotalCount;

      this.setState({
        users,
        pageCount: Math.ceil(usersTotalCount / limit),
        loading: false
      });
    } catch (error) {
      this.setState({ error, loading: false });
    }
  };

  handleTableRowClick = id => {
    const { history, location } = this.props;

    history.push({
      state: { from: location },
      pathname: `${routes.USERS}/${id}`
    });
  };

  handlePageClick = data => {
    let page = data.selected + 1;

    this.setState({ page }, () => {
      this.fetchUsersByQuery();
    });
  };

  render() {
    const { users, pageCount, error, loading } = this.state;
    const { location } = this.props;

    return (
      <div className="container">
        {error && <p>{error.message}</p>}

        <Breadcrumbs />

        {loading && <p>Loading...</p>}

        {users.length > 0 && (
          <div>
            <h2>Users statistic</h2>
            <UsersTable
              users={users}
              location={location}
              onRowClick={this.handleTableRowClick}
            />

            <Paginator
              pageCount={pageCount}
              handlePageClick={this.handlePageClick}
            />
          </div>
        )}
      </div>
    );
  }
}
