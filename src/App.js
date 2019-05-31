import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./css/main.css";
import Schedule from "./components/Schedule";
import Show from "./components/Show";
import Episodes from "./components/Episodes";
import Seasons from "./components/Seasons";
import Header from "./components/Header";
import CastAndCrew from "./components/CastAndCrew";
import Person from "./components/Person";
import SearchResult from "./components/SearchResult";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            {/* <Schedule /> */}
            {/* <Show /> */}
            <Switch>
              <Route exact path="/tvshowinfo" component={Schedule} />
              <Route exact path="/tvshowinfo/show/:id" component={Show} />
              <Route
                exact
                path="/tvshowinfo/show/:id/seasons/:seasonNumber"
                component={Seasons}
              />
              <Route
                exact
                path="/tvshowinfo/show/:id/cast&crew"
                component={CastAndCrew}
              />
              <Route exact path="/tvshowinfo/name/:id" component={Person} />
              <Route
                exact
                path="/tvshowinfo/search/:type&:query"
                component={SearchResult}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
