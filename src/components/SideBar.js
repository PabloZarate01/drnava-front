import React from 'react';
const SideBar = () => {
    return (
        <>
            {/* Sidebar */}
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                {/* <!-- Sidebar - Brand --> */}
                <a className="sidebar-brand d-flex align-items-center justify-content-center mt-4" href="/">
                    <div className="sidebar-brand-icon">
                        <img src="../img/logo.png" width="100" height="100" className="rounded img-fluid"/>
                    </div>
                </a>
                {/* <!-- Divider --> */}
                <hr className="sidebar-divider mt-4 my-0"></hr>
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