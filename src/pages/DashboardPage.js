import React, { Component } from 'react';
import SideBar from '../components/SideBar';
import TopBar from '../components/TopBar';
class DashboardPage extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render() { 
        return (
        <div id="wrapper">
            <SideBar/>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <TopBar {...this.props}/>
                    <div className="container-fluid">
                        DashboardPage
                        <div className="row">

                    {/* <!-- Earnings (Monthly) Card Example --> */}
                    <div className="col-xl-6 col-md-12 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Registrar nuevo paciente</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                            <a href="/pacientenuevo" className="btn btn-primary btn-icon-split">
                                <span className="icon text-white-50">
                                <i className="fas fa-plus"></i>
                                </span>
                                <span className="text">Registrar Paciente</span>
                            </a>
                            </div>
                            </div>
                            <div className="col-auto">
                            <i className="fas fa-user fa-2x text-gray-300"></i>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>

                    {/* <!-- Earnings (Monthly) Card Example --> */}
                    <div className="col-xl-6 col-md-12 mb-4">
                    <div className="card border-left-success shadow h-100 py-2">
                        <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Ver Pacientes</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                            <a href="/pacientes" className="btn btn-success btn-icon-split">
                                <span className="icon text-white-50">
                                <i className="fas fa-plus"></i>
                                </span>
                                <span className="text">Ver Pacientes</span>
                            </a>
                            </div>
                            </div>
                            <div className="col-auto">
                            <i className="fas fa-users fa-2x text-gray-300"></i>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>

                    {/* <!-- Earnings (Monthly) Card Example --> */}
                    {/* <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-info shadow h-100 py-2">
                        <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Tasks</div>
                            <div className="row no-gutters align-items-center">
                                <div className="col-auto">
                                <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%</div>
                                </div>
                                <div className="col">
                                <div className="progress progress-sm mr-2">
                                    <div className="progress-bar bg-info" role="progressbar" style={{width: '50%'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="col-auto">
                            <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div> */}

                    {/* <!-- Pending Requests Card Example --> */}
                    {/* <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-warning shadow h-100 py-2">
                        <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">Pending Requests</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">18</div>
                            </div>
                            <div className="col-auto">
                            <i className="fas fa-comments fa-2x text-gray-300"></i>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div> */}
                </div>
                    </div>
                </div>
            </div>
        </div>
         );
    }
}
 
export default DashboardPage;