import React, { Component } from 'react';
import SideBar from "../components/SideBar";
import { cmsAPI } from '../utils/http-client'
import NotificationAlert from "react-notification-alert";
class CreatePatient extends Component {
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
            visible: true,
            sending :false,
            name : "",
            lastName: "",
            type: "",
            entryDate:"",
            //address
            street: "",
            suburb: "",
            city: "",
            //address
            //phoneNumbers
            home: "",
            office: "",
            phone: "",
            //phoneNumbers
            email : "",
            notes: ""
        }
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
          lastName,
          type,
          entryDate,
          street,
          suburb,
          city,
          home,
          office,
          phone,
          email,
          notes
        } = this.state;
        let newPatient = JSON.stringify({
          name,
          lastName,
          type,
          entryDate,
          address : {
            street,
            suburb,
            city
          },
          phoneNumbers : {
            home,
            office,
            phone
          },
          email,
          notes
        })
        this.setState({
          sending :true
        })
        cmsAPI.post('api/patient/', newPatient, {headers : {"Content-Type": "application/json"}})
        .then(response => {
          console.log("Exito al crear POST",response);
          this.notify("success","EL PACIENTE HA SIDO CREADO EXITOSAMENTE")
          this.setState({
            sending :false
          })
        })
        .catch(err => {
          this.notify("danger","OCURRIÓ UN ERROR AL INTENTAR CREAR EL USUARIO. INTENTE DE NUEVO")
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
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    {/* Inserte aqui TopBar */}
                    <div className="container-fluid">
                        {/* CONTENT */}
                        <div className="p-sm-5">
                            <div className="text-center">
                                <h1 className="h4 text-gray-900 mb-4">Registrar paciente nuevo</h1>
                            </div>
                            <form onSubmit={this.createPatient} className="user text-center">
                                <div className="form-group row">
                                    <div className="col-sm-6 mb-3 mb-sm-0">
                                        <label for="name">Nombre(s)</label>
                                        <input                            required
                                          name="name"
                                          placeholder="Nombre"
                                          type="text"
                                          onChange={this.formDataHandler} value={this.state.name}
                                          className="form-control form-control-user"
                                        />
                                    </div>
                                    <div className="col-sm-6 mb-sm-4">
                                        <label for="lastName">Apellido(s)</label>
                                        <input 
                                          required
                                          name="lastName"
                                          placeholder="Apellido(s)"
                                          type="text"
                                          onChange={this.formDataHandler} value={this.state.lastName}
                                          className="form-control form-control-user"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                  <div className="col-sm-3 mb-3 mb-sm-0">
                                    <label for="type">Tipo</label>
                                    <input 
                                      name="type"
                                      placeholder="Tipo de paciente"
                                      type="text"
                                      onChange={this.formDataHandler} value={this.state.type}
                                      className="form-control form-control-user" 
                                    />
                                    </div>
                                    <div className="col-sm-6 mb-3  mb-sm-0">
                                      <label for="email">Email</label>
                                      <input
                                        className="form-control form-control-user" 
                                        name="email"
                                        placeholder="Email"
                                        type="email"
                                        onChange={this.formDataHandler} value={this.state.email}
                                      />
                                    </div>
                                    <div className="col-sm-3 mb-sm-4">
                                        <label for="entryDate">Fecha de registro</label>
                                        <input                           type="date"
                                          name="entryDate"
                                          id="entryDate"
                                          className="form-control form-control-user"/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-6 mb-3 mb-sm-0">
                                        <label for="street">Calle</label>
                                        <input 
                                          className="form-control form-control-user"
                                          name="street"
                                          placeholder="Calle"
                                          type="text"
                                          onChange={this.formDataHandler} value={this.state.street}
                                        />
                                    </div>
                                    <div className="col-sm-3">
                                      <label for="suburb">Colonia</label>
                                      <input 
                                        className="form-control form-control-user" 
                                        name="suburb"
                                        placeholder="Colonia"
                                        type="text"
                                        onChange={this.formDataHandler} value={this.state.suburb}
                                      />
                                    </div>
                                    <div className="col-sm-3 mb-sm-4">
                                      <label for="city">Ciudad</label>
                                      <input 
                                        className="form-control form-control-user" 
                                        name="city"
                                        placeholder="Ciudad"
                                        type="text" 
                                        onChange={this.formDataHandler} value={this.state.city}
                                      />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-4 mb-3 mb-sm-0">
                                        <label for="street">Telefono de Casa</label>
                                        <input 
                                          className="form-control form-control-user"
                                          name="home"
                                          placeholder="Telefono de Casa"
                                          type="number"
                                          onChange={this.formDataHandler} value={this.state.home}
                                        />
                                    </div>
                                    <div className="col-sm-4">
                                      <label for="street">Telefono de Oficina</label>
                                      <input 
                                        className="form-control form-control-user" 
                                        name="office"
                                        placeholder="Telefono de Oficina"
                                        type="number"
                                        onChange={this.formDataHandler} value={this.state.office}
                                      />
                                    </div>
                                    <div className="col-sm-4 mb-sm-4">
                                      <label for="street">Notas</label>
                                      <input 
                                        className="form-control form-control-user mb-sm-2" 
                                        placeholder="Celular" 
                                        type="number" 
                                        name="phone"
                                        onChange={this.formDataHandler} value={this.state.phone}
                                      />
                                    </div>
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
                        {/* CONTENT */}
                    </div>
                </div>
            </div>
        </div>
         );
    }
}
 
export default CreatePatient;