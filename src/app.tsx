import React, { FC } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Page, Header } from "./components";
import { Home, BarCharts, TimelineCharts } from "./pages";

export const App: FC = () => (
  <Router>
    <Header />
    <Page>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/barcharts" component={BarCharts} />
        <Route path="/timelinecharts" component={TimelineCharts} />
        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>
    </Page>
  </Router>
);
