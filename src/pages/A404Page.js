import React, { Component } from 'react';
import SideBar from "../components/SideBar";
import TopBar from '../components/TopBar';

class A404Page extends Component {
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
                    {/* Inserte aqui TopBar */}
                    <TopBar {...this.props}/>
                        {/* <!-- Begin Page Content --> */}
                        <div class="container-fluid">

                            {/* <!-- 404 Error Text --> */}
                            <div class="text-center">
                                <div class="error mx-auto" data-text="404">404</div>
                                <p class="lead text-gray-800 mb-5">Pagina no encontrada</p>
                                <p class="text-gray-500 mb-0">Parece no existe el elemento que buscas...</p>
                                <a href="/">&larr; Vuelve al inicio</a>
                            </div>

                        </div>
                        {/* <!-- /.container-fluid --> */}
                    </div>
            </div>
        </div>
         );
    }
}
 
export default A404Page;
