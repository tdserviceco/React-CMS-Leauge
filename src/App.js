import React, { useEffect } from 'react';
import Axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import NoMatch from './pages/NoMatch';
import CreateSeason from './pages/CreateSeason';
import SeasonContent from './pages/SeasonContent'


function App() {
  useEffect(() => {
    document.title = "Seasons from different tournaments"
    startMeUp().then(res => {
      if (res.data.lenght === 0) {
        return `<h1>${res.data}</h1>`
      }
    }).catch(error => {
      console.error(error)
    })
  }, []);

  const startMeUp = async () => {
    return await Axios.get('http://localhost:8080/checkup/isdbempty');
  }

  return (
    <main>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/season/:id/:title">
            <SeasonContent />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/dashboard/create/season">
            <CreateSeason />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </main>
  )
}

export default App;