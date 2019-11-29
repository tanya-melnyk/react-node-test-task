import React, { Component } from "react";
import T from "prop-types";

import Paginator from "../components/Paginator";
import UsersTable from "../components/UsersTable";

import getQuery from "../services/getQuery";
import usersStatsApi from "../services/usersStatsApi";
import routes from "../routes";

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

  handleGoBack = () => {
    const { history, location } = this.props;
    const { state } = location;

    if (state) {
      history.push(state.from);
      return;
    }

    history.push(routes.HOME);
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
      <div>
        {error && <p>{error.message}</p>}

        <button type="button" onClick={this.handleGoBack}>
          <span role="img" aria-label="Left Arrow">
            &#x2B05;
          </span>
          <span> Go back</span>
        </button>

        {loading && <p>Loading...</p>}

        {users.length > 0 && (
          <div>
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
