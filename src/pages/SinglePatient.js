import React, { Component } from 'react';
import SideBar from "../components/SideBar";
import { cmsAPI } from '../utils/http-client'
import NotificationAlert from "react-notification-alert";
import Moment from 'react-moment';
class SinglePatient extends Component {
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
            patientId:"",
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
            notes: "",
            patId:"",
            disabled:true
        }
    }
    //editar formulario // edit toggle form
    toggleEditable (){
      let {editable} = this.state
      if(!editable){
        this.setState({editable:true});
        console.log("True:",editable)
      }else if(editable){
        this.setState({editable:false});
        console.log("False:",editable)
      }
    }
    componentWillMount(){
        console.log(this.props.match)
        let {match: {params}} = this.props;
        this.setState({
            patId:params.patId
        })
        
        this.getUserData(params.patId)
    }
    getUserData(patId){
        cmsAPI.get('api/patient/'+patId)
        .then(res=>{
            console.log("Patient:",res.data)
            let patInf = res.data;
            this.setState({
              patientId: patInf._id,
              name : patInf.name,
              lastName: patInf.lastName,
              type: patInf.type,
              entryDate:patInf.entryDate,
              //address
              street: patInf.address.street,
              suburb: patInf.address.suburb,
              city:patInf.address.city,
              //address
              //phoneNumbers
              home:patInf.phoneNumbers.home,
              office: patInf.phoneNumbers.office,
              phone: patInf.phoneNumbers.phone,
              //phoneNumbers
              email : patInf.email,
              notes: patInf.email,
            })
        })
        .catch(err=>{
            console.log("Error:",err)
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
          lastName,
          type,
          street,
          suburb,
          city,
          home,
          office,
          phone,
          email,
          notes
        } = this.state;
        let editedPatient = JSON.stringify({
          name,
          lastName,
          type,
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
        cmsAPI.put('api/patient/edit/'+this.state.patientId, editedPatient, {headers : {"Content-Type": "application/json"}})
        .then(response => {
          console.log("Exito al crear EDIT",response);
          this.notify("primary","EL PACIENTE HA SIDO EDITADO EXITOSAMENTE")
          this.setState({
            sending :false
          })
        })
        .catch(err => {
          this.notify("danger","OCURRIÓ UN ERROR AL INTENTAR EDITAR EL USUARIO. INTENTE DE NUEVO")
          console.log("Error Al EDIT:",err)
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
                            <h1 className="h4 text-gray-900 mb-4">Paciente: {this.state.name +" "+this.state.lastName}</h1>
                            <span>Paciente desde <Moment format="DD-MM-YYYY" date={this.state.entryDate}/></span>
                            <div class="custom-control custom-switch">
                              <input  onChange={() => this.toggleEditable()} defaultChecked={this.state.editable} type="checkbox" class="custom-control-input" id="customSwitch1"/>
                              <label class="custom-control-label" for="customSwitch1">{this.state.editable ? "EDITABLE : ENCENDIDO" : "EDITABLE : APAGADO"}</label>
                            </div>
                            <form onSubmit={this.createPatient} className="user text-center">
                                <div className="form-group row">
                                    <div className="col-sm-6 mb-3 mb-sm-0">
                                        <label for="name">Nombre(s)</label>
                                        <input
                                          disabled={!this.state.editable}
                                          required
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
                                          disabled={!this.state.editable}
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
                                      disabled={!this.state.editable} 
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
                                        disabled={!this.state.editable}
                                        className="form-control form-control-user" 
                                        name="email"
                                        placeholder="Email"
                                        type="email"
                                        onChange={this.formDataHandler} value={this.state.email}
                                      />
                                    </div>
                                    <div className="col-sm-3 mb-sm-4">
                                        <label for="entryDate">Fecha de registro: <Moment format="DD-MM-YYYY" date={this.state.entryDate}/></label>
                                        <input
                                          disabled={!this.state.editable}                           
                                          type="date"
                                          name="entryDate"
                                          id="entryDate"
                                          className="form-control form-control-user"/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-6 mb-3 mb-sm-0">
                                        <label for="street">Calle</label>
                                        <input
                                          disabled={!this.state.editable} 
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
                                        disabled={!this.state.editable} 
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
                                        disabled={!this.state.editable} 
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
                                          disabled={!this.state.editable} 
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
                                        disabled={!this.state.editable}
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
                                        disabled={!this.state.editable} 
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
                                        disabled={!this.state.editable} 
                                        className="form-control form-control-user" 
                                        name="notes"
                                        type="textarea"
                                        placeholder="Ingrese notas extra en este espacio en blanco (Opcional)"
                                        onChange={this.formDataHandler} value={this.state.notes}
                                      />
                                    </div>
                                </div>
                                <button
                                  disabled={!this.state.editable} 
                                  className="btn btn-primary btn-user btn-block"
                                  color="primary"
                                  type="submit"
                                >
                                  {this.state.sending ? <div className="d-flex justify-content-center">
                                                    <div className="spinner-border text-dark" role="status">
                                                        <span className="sr-only">Enviando...</span>
                                                    </div>
                                                    </div> : "Editar Paciente"}
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
 
export default SinglePatient;