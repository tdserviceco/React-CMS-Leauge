import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import NoMatch from './pages/NoMatch';
import CreateList from './pages/CreateList';
import ListContent from './pages/ListContent';


function App() {
  return (
    <main>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/list/:id/:title" component={ListContent} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/dashboard/create/list" component={CreateList} />
          <Route exact path="/dashboard/create/list/step2" component={CreateList} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </main>
  )
}

export default App;