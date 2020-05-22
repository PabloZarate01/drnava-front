import React, { Component } from 'react';
import SideBar from "../components/SideBar";
import TopBar from '../components/TopBar';
import { cmsAPI } from '../utils/http-client';
import NotificationAlert from "react-notification-alert";
class CreateRecord extends Component {
  notificationAlert = React.createRef();
  notify(type,message) {
    var options = {};
    options = {
      place: "tr",
      message,
      type: type,
      icon: "fas fa-fw fa-bell",
      autoDismiss: 7
    };
    this.notificationAlert.current.notificationAlert(options);
  }
    constructor(props){
        super(props);
        this.state = {
            name:"",
            notes:"",
            entryDate:"",
            patId:""
        }
    }
    componentWillMount(){
        let {match: {params}} = this.props;
        this.setState({
            patId:params.patId
        })
    }
    formDataHandler = (e) =>{
      e.preventDefault();
      console.log(e.target.name);
      console.log(e.target.value);
      this.setState({
          [e.target.name] : e.target.value
      });
    }
    createPatient = (ev) =>{
        ev.preventDefault()
        const {
          name,
          notes,
          entryDate
        } = this.state;

        let newRecord = JSON.stringify({
          name,
          notes,
          entryDate
        })
        this.setState({
          sending :true
        })
        cmsAPI.post(`api/expedient/${this.state.patId}`, newRecord, {headers : {"Content-Type": "application/json"}})
        .then(response => {
          console.log("Exito al crear POST",response);
          this.notify("success","EL REGISTRO HA SIDO CREADO EXITOSAMENTE")
          this.setState({
            sending :false
          })
        })
        .catch(err => {
          this.notify("danger","OCURRIÓ UN ERROR AL INTENTAR GUARDAR EL REGISTRO. INTENTE DE NUEVO")
          console.log("Error Al POST:",err)
          this.setState({
            sending :false
          })
        })
        
      }

    render() { 
        return (
        <div id="wrapper">
            <NotificationAlert ref={this.notificationAlert} />
            <SideBar/>
            <div id="content-wrapper" class="d-flex flex-column">
                <div id="content">
                    <TopBar {...this.props}/>
                    <div class="container-fluid">
                        Crear registro
                        <div className="p-sm-5">
                            <div className="text-center">
                                <h1 className="h4 text-gray-900 mb-4">Registrar paciente nuevo</h1>
                            </div>
                            <form onSubmit={this.createPatient} className="user text-center">
                                <div className="form-group d-flex justify-content-center row">
                                    <div className="col-sm-8 mb-3 mb-sm-0">
                                        <label for="name">Nombre</label>
                                        <input                            
                                          required
                                          name="name"
                                          placeholder="Nombre"
                                          type="text"
                                          onChange={this.formDataHandler} value={this.state.name}
                                          className="form-control form-control-user"
                                        />
                                    </div>
                                    <div className="col-sm-3 mb-sm-4">
                                        <label for="entryDate">Fecha de registro</label>
                                        <input
                                          onChange={this.formDataHandler} 
                                          value={this.state.entryDate}
                                          type="date"
                                          name="entryDate"
                                          id="entryDate"
                                          className="form-control form-control-user"/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-12">
                                      <label for="street">Notas</label>
                                      <input 
                                        className="form-control form-control-user" 
                                        name="notes"
                                        type="textarea"
                                        placeholder="Ingrese notas extra en este espacio en blanco (Opcional)"
                                        onChange={this.formDataHandler} value={this.state.notes}
                                      />
                                    </div>
                                </div>
                                <button
                                  className="btn btn-primary btn-user btn-block"
                                  color="primary"
                                  type="submit"
                                >
                                  {this.state.sending ? <div className="d-flex justify-content-center">
                                                    <div className="spinner-border text-dark" role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                    </div> : "Crear Paciente"}
                                </button>
                                <hr />
                            </form>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        </div>
         );
    }
}
 
export default CreateRecord;