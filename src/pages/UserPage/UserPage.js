import React, { Component } from "react";
import T from "prop-types";

import Breadcrumbs from "../../common/Breadcrumbs";
import StatsChart from "./components/StatsChart";

import formatUserStats from "../../services/formatUserStats";
import getQuery from "../../services/getQuery";
import usersStatsApi from "../../services/usersStatsApi";

export default class UserPage extends Component {
  static propTypes = {
    history: T.shape().isRequired,
    location: T.shape().isRequired,
    match: T.shape().isRequired
  };

  state = {
    user: null,
    dateFrom: "2019-10-21",
    dateTo: "2019-10-27",
    error: null,
    loading: true
  };

  componentDidMount() {
    const { history, location } = this.props;
    const { dateFrom: stateFrom, dateTo: stateTo } = this.state;

    const dateFrom = getQuery(location.search, "from");
    const dateTo = getQuery(location.search, "to");

    if (dateFrom && dateTo) {
      return this.setState({ dateFrom, dateTo }, this.fetchUserStats);
    }

    if (dateFrom) {
      return this.setState({ dateFrom }, this.fetchUserStats);
    }

    if (dateTo) {
      return this.setState({ dateTo }, this.fetchUserStats);
    }

    history.replace({
      ...location.pathname,
      search: `from=${stateFrom}&to=${stateTo}`
    });

    this.fetchUserStats();
  }

  fetchUserStats = async () => {
    const { match } = this.props;
    const { dateFrom, dateTo } = this.state;
    const { userId } = match.params;

    try {
      const user = await usersStatsApi.getUserStats(userId, dateFrom, dateTo);
      const formattedUser = formatUserStats(user, dateFrom, dateTo);

      this.setState({ user: formattedUser, loading: false });
    } catch (error) {
      this.setState({ error, loading: false });
    }
  };

  render() {
    const { user, error, loading } = this.state;

    return (
      <div className="container">
        {error && <p>{error.message}</p>}

        {loading && <p>Loading...</p>}

        {user && (
          <>
            <Breadcrumbs userName={user.name} />

            <article>
              <h2>{user.name}</h2>

              <StatsChart name="Clicks" data={user.clicks} />
              <StatsChart name="Views" data={user.page_views} />
            </article>
          </>
        )}
      </div>
    );
  }
}
