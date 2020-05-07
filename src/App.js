import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import DashboardPage from './pages/DashboardPage';
// import PrivateRoute from './components/PrivateRoute';
// import PatientsListPage from './pages/PatientsListPage';


function App() {
  return (
    <Router>
        <Switch>
          <Route path="/login" component={LoginPage}/>
          <PrivateRoute path="/" component={DashboardPage}/>
        </Switch>
    </Router>
  );
}

export default App;