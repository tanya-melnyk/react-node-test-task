import React, { Component } from "react";
import T from "prop-types";

import Breadcrumbs from "../../common/Breadcrumbs";
import Paginator from "../../common/Paginator";
import SimpleHeader from "../../common/SimpleHeader";
import UsersTable from "./components/UsersTable";
import SimpleFooter from "../../common/SimpleFooter";

import getQuery from "../../services/getQuery";
import usersStatsApi from "../../services/usersStatsApi";
import routes from "../../routes";

const usersPerPage = 50;
const initialPage = 1;

export default class UsersStatsPage extends Component {
  static propTypes = {
    history: T.shape().isRequired,
    location: T.shape().isRequired
  };

  state = {
    users: [],
    pageCount: 0,
    error: null,
    loading: true
  };

  componentDidMount() {
    const { history, location } = this.props;
    const page = getQuery(location.search, "page");

    if (!page || page <= 0) {
      history.replace({
        ...location.pathname,
        search: `page=${initialPage}`
      });
    } else {
      this.fetchUsersByQuery();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { location } = this.props;
    const page = getQuery(location.search, "page");
    const prevPage = getQuery(prevProps.location.search, "page");

    if (page !== prevPage) {
      this.fetchUsersByQuery();
    }
  }

  fetchUsersByQuery = async () => {
    const { location } = this.props;
    const page = getQuery(location.search, "page");

    try {
      const data = await usersStatsApi.getAllUsers(page, usersPerPage);
      const users = data.users;
      const usersTotalCount = data.usersTotalCount;

      this.setState({
        users,
        pageCount: Math.ceil(usersTotalCount / usersPerPage),
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
    const { location, history } = this.props;

    let page = data.selected + 1;

    history.push({
      ...location.pathname,
      search: `page=${page}`
    });

    this.fetchUsersByQuery();
  };

  render() {
    const { users, pageCount, error, loading } = this.state;
    const { location } = this.props;
    const page = getQuery(location.search, "page");

    return (
      <>
        <SimpleHeader />
        <main className="container">
          <div className="stats-page__wrapper">
            <Breadcrumbs />

            {error && <p>{error.message}</p>}

            {loading && <p>Loading...</p>}

            {users.length > 0 && (
              <div>
                <h2 className="stats-page__title">Users statistic</h2>
                <UsersTable
                  users={users}
                  location={location}
                  onRowClick={this.handleTableRowClick}
                />
                <div className="paginator">
                  <Paginator
                    pageCount={pageCount}
                    handlePageClick={this.handlePageClick}
                    initialPage={page - 1}
                  />
                </div>
              </div>
            )}
          </div>
        </main>
        <SimpleFooter />
      </>
    );
  }
}
