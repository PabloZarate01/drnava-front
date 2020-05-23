import React, { Component } from 'react';
import LogoED from '../img/logo.png'
class TopBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      userData:{}
    }
  }
  componentWillMount(){
    this.getUserData()
  }
  getUserData(){
    const rawUser = localStorage.getItem("user");
    console.log("Raw User",rawUser)
    const pars_user = JSON.parse(rawUser)
    console.log("User:",pars_user)
    this.setState({
      userData:pars_user
    })
    console.log(this.state.userData)
  }
  logOut(){
    console.log("logOut Click");
    localStorage.removeItem("logged");
    localStorage.removeItem("user");
    localStorage.removeItem("userJWT");
    this.props.history.push('/login')
  }
  render() {
    return (
      <>
      {/* <!-- Topbar --> */}
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        {/* <!-- Sidebar Toggle (Topbar) --> */}
        <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
          <i className="fa fa-bars"></i>
        </button>
        {/* <!-- Topbar Navbar --> */}
        <ul className="navbar-nav ml-auto">
          <div className="topbar-divider d-none d-sm-block"></div>
          {/* <!-- Nav Item - User Information --> */}
          <li className="nav-item dropdown no-arrow">
            <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">{this.state.userData.userName}</span>
              <img className="img-profile rounded-circle" src={LogoED}/>
            </a>
            {/* <!-- Dropdown - User Information --> */}
            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
              <div className="dropdown-divider"></div>
              <button className="dropdown-item" onClick={() => this.logOut()} href="#" data-toggle="modal" data-target="#logoutModal">
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Logout
              </button>
            </div>
          </li>

        </ul>
      </nav>
      {/* <!-- End of Topbar --> */}
      </>
  )
  }
}
 
export default TopBar;