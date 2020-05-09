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
import PatientsPage from './pages/PacientesPage';
import A404Page from './pages/A404Page';
import CreatePatient from './pages/CreatePatient';
// import PrivateRoute from './components/PrivateRoute';
// import PatientsListPage from './pages/PatientsListPage';


function App() {
  return (
    <Router>
        <Switch>
          <Route path="/login" component={LoginPage}/>
          
          {/* <PrivateRoute path="/pacientes/:patId" component={PatientsPage}/> */}
          <PrivateRoute exact path="/pacientenuevo" component={CreatePatient}/>
          <PrivateRoute exact path="/pacientes" component={PatientsPage}/>
          <PrivateRoute exact path="/" component={DashboardPage}/>
          <PrivateRoute path="*" component={A404Page}/>
        </Switch>
    </Router>
  );
}

export default App;