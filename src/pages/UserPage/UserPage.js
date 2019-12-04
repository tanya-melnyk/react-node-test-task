import React, { Component } from "react";
import moment from "moment";
import T from "prop-types";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import Breadcrumbs from "../../common/Breadcrumbs";
import SimpleHeader from "../../common/SimpleHeader";
import StatsChart from "./components/StatsChart";
import SimpleFooter from "../../common/SimpleFooter";

import formatUserStats from "../../services/formatUserStats";
import usersStatsApi from "../../services/usersStatsApi";

export default class UserPage extends Component {
  static propTypes = {
    history: T.shape().isRequired,
    location: T.shape().isRequired,
    match: T.shape().isRequired
  };

  state = {
    user: null,
    startDate: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
    endDate: moment().toDate(),
    error: null,
    loading: true
  };

  componentDidMount() {
    this.fetchUserStats();
  }

  componentDidUpdate(prevProps, prevState) {
    const { startDate, endDate } = this.state;

    if (startDate !== prevState.startDate || endDate !== prevState.endDate) {
      this.fetchUserStats();
    }
  }

  fetchUserStats = async () => {
    const { startDate, endDate } = this.state;
    const { match } = this.props;
    const { userId } = match.params;

    try {
      const user = await usersStatsApi.getUserStats(userId, startDate, endDate);

      const formattedUser = formatUserStats(user, startDate, endDate);

      this.setState({ user: formattedUser, loading: false });
    } catch (error) {
      this.setState({ error, loading: false });
    }
  };

  setStartDate = date => {
    this.setState({
      startDate: date
    });
  };

  setEndDate = date => {
    this.setState({
      endDate: date
    });
  };

  render() {
    const { user, startDate, endDate, error, loading } = this.state;

    return (
      <>
        <SimpleHeader />
        <main className="container">
          <div className="stats-page__wrapper">
            {error && <p>{error.message}</p>}

            {loading && <p>Loading...</p>}

            {user && (
              <>
                <Breadcrumbs userName={user.name} />

                <article>
                  <h2 className="stats-page__title">{user.name}</h2>

                  <div className="datepickers">
                    <div>
                      <p>From:</p>
                      <DatePicker
                        selected={startDate}
                        onChange={this.setStartDate}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="yyyy-MM-dd"
                        maxDate={new Date()}
                      />
                    </div>

                    <div>
                      <p>To:</p>
                      <DatePicker
                        selected={endDate}
                        onChange={this.setEndDate}
                        selectsEnd
                        endDate={endDate}
                        minDate={startDate}
                        dateFormat="yyyy-MM-dd"
                        maxDate={new Date()}
                      />
                    </div>
                  </div>

                  <StatsChart name="Clicks" data={user.clicks} />
                  <StatsChart name="Views" data={user.page_views} />
                </article>
              </>
            )}
          </div>
        </main>
        <SimpleFooter />
      </>
    );
  }
}
