import React, { Component } from 'react';
import SideBar from '../components/SideBar';
import TopBar from '../components/TopBar';
import PatientsTable from '../components/PatientsTable';
class PatientsPage extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render() { 
        return (
        <div id="wrapper">
            <SideBar/>
            <div id="content-wrapper" class="d-flex flex-column">
                <div id="content">
                    <TopBar {...this.props}/>
                    <div class="container-fluid">
                        Pacientes
                        <PatientsTable {...this.props}/>
                    </div>
                </div>
            </div>
        </div>
         );
    }
}
 
export default PatientsPage;