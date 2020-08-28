import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import './App.css'
import Users from "./pages/Users";

export default function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/users">Go to users</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/users">
            <Users />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
