import React, { Component } from 'react';
import SideBar from "../components/SideBar";
import PatRecordsTable from '../components/PatRecordsTable';
import TopBar from '../components/TopBar';
class PatientRecords extends Component {
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
                    <TopBar/>
                    <div class="container-fluid">
                        PatientRecords
                        <PatRecordsTable {...this.props}/>
                    </div>
                </div>
            </div>
        </div>
         );
    }
}
 
export default PatientRecords;