import React, { Component } from "react";
import T from "prop-types";

// import StatsChart from '../components/StatsChart';

// import usersStatsApi from '../services/usersStatsApiService';

import routes from "../routes";

export default class UserPage extends Component {
  static propTypes = {
    history: T.shape().isRequired,
    location: T.shape().isRequired,
    match: T.shape().isRequired
  };

  state = {
    user: null,
    error: null,
    loading: true
  };

  componentDidMount() {
    this.fetchUserStats();
  }

  fetchUserStats = async () => {
    const { match } = this.props;
    const { userId } = match.params;

    try {
      // const user = await usersStatsApi.getUserById(userId);

      // this.setState({ user, loading: false });
    } catch (error) {
      this.setState({ error, loading: false });
    }
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

  render() {
    const { user, error, loading } = this.state;
    const { match, location } = this.props;

    return (
      <div>
        <button type="button" onClick={this.handleGoBack}>
          <span role="img" aria-label="Left Arrow">
            &#x2B05;
          </span>
          <span> Go back</span>
        </button>

        {error && <p>{error.message}</p>}

        {loading && <p>Loading...</p>}

        {user && (
          <article>
            <h2>{user.name}</h2>
            {/* <StatsChart data={user.clicks} /> */}
            {/* <StatsChart data={user.page_views} /> */}
          </article>
        )}
      </div>
    );
  }
}
