import React, { Component } from 'react';
const SideBar = () => {
    return (
        <>
            {/* Sidebar */}
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                {/* <!-- Sidebar - Brand --> */}
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
                </a>
                {/* <!-- Divider --> */}
                <hr className="sidebar-divider my-0"></hr>
                {/* <!-- Nav Item - Dashboard --> */}
                <li className="nav-item active">
                    <a className="nav-link" href="/">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span></a>
                </li>
                <hr className="sidebar-divider" />
                <li className="nav-item active">
                    <a className="nav-link" href="/pacientes">
                        <i className="fas fa-fw fa-user-alt"></i>
                        <span>Pacientes</span></a>
                </li>
                <hr className="sidebar-divider" />
                <li className="nav-item active">
                    <a className="nav-link" href="/pacientenuevo">
                        <i className="fas fa-fw fa-user-plus"></i>
                        <span>Añadir Paciente</span></a>
                </li>
                <hr className="sidebar-divider" />
                {/* CLEAR SideBar */}
            </ul>
            {/* <!-- End of Sidebar --> */}
        </>
    )
}

export default SideBar