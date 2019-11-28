import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import HomePage from "../../pages/HomePage";
import UsersStatsPage from "../../pages/UsersStatsPage";
import UserPage from "../../pages/UserPage";

import routes from "../../routes";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Switch>
          <Route path={routes.USER_STATS} component={UserPage} />
          <Route path={routes.USERS} component={UsersStatsPage} />
          <Route path={routes.HOME} component={HomePage} />

          <Redirect to={routes.HOME} />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
