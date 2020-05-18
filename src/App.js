import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import DashboardPage from './pages/DashboardPage';
import PatientsPage from './pages/PacientesPage';
import A404Page from './pages/A404Page';
import CreatePatient from './pages/CreatePatient';
import SinglePatient from './pages/SinglePatient';
import PatientRecords from './pages/PatientRecords';
import CreateRecord from './pages/CreateRecord';
// import PrivateRoute from './components/PrivateRoute';
// import PatientsListPage from './pages/PatientsListPage';


function App() {
  return (
    <Router>
        <Switch>
          <Route path="/login" component={LoginPage}/>
          <PrivateRoute path="/nregistro/:patId" component={CreateRecord}/>
          <PrivateRoute path="/expedient/:patId" component={PatientRecords}/>
          <PrivateRoute path="/pacientes/:patId" component={SinglePatient}/>
          <PrivateRoute exact path="/pacientenuevo" component={CreatePatient}/>
          <PrivateRoute exact path="/pacientes" component={PatientsPage}/>
          <PrivateRoute exact path="/" component={DashboardPage}/>
          <PrivateRoute path="*" component={A404Page}/>
        </Switch>
    </Router>
  );
}

export default App;