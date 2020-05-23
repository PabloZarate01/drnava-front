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
            <div id="content-wrapper" class="d-flex flex-column">
                <div id="content">
                    <TopBar {...this.props}/>
                    <div class="container-fluid">
                        DashboardPage
                        <div class="row">

                    {/* <!-- Earnings (Monthly) Card Example --> */}
                    <div class="col-xl-6 col-md-12 mb-4">
                    <div class="card border-left-primary shadow h-100 py-2">
                        <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Registrar nuevo paciente</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">
                            <a href="/pacientenuevo" class="btn btn-primary btn-icon-split">
                                <span class="icon text-white-50">
                                <i class="fas fa-plus"></i>
                                </span>
                                <span class="text">Registrar Paciente</span>
                            </a>
                            </div>
                            </div>
                            <div class="col-auto">
                            <i class="fas fa-user fa-2x text-gray-300"></i>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>

                    {/* <!-- Earnings (Monthly) Card Example --> */}
                    <div class="col-xl-6 col-md-12 mb-4">
                    <div class="card border-left-success shadow h-100 py-2">
                        <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Ver Pacientes</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">
                            <a href="/pacientes" class="btn btn-success btn-icon-split">
                                <span class="icon text-white-50">
                                <i class="fas fa-plus"></i>
                                </span>
                                <span class="text">Ver Pacientes</span>
                            </a>
                            </div>
                            </div>
                            <div class="col-auto">
                            <i class="fas fa-users fa-2x text-gray-300"></i>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>

                    {/* <!-- Earnings (Monthly) Card Example --> */}
                    {/* <div class="col-xl-3 col-md-6 mb-4">
                    <div class="card border-left-info shadow h-100 py-2">
                        <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Tasks</div>
                            <div class="row no-gutters align-items-center">
                                <div class="col-auto">
                                <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%</div>
                                </div>
                                <div class="col">
                                <div class="progress progress-sm mr-2">
                                    <div class="progress-bar bg-info" role="progressbar" style={{width: '50%'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div class="col-auto">
                            <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div> */}

                    {/* <!-- Pending Requests Card Example --> */}
                    {/* <div class="col-xl-3 col-md-6 mb-4">
                    <div class="card border-left-warning shadow h-100 py-2">
                        <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">Pending Requests</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">18</div>
                            </div>
                            <div class="col-auto">
                            <i class="fas fa-comments fa-2x text-gray-300"></i>
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