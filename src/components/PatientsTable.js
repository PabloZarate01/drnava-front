import React, { Component } from 'react';
import { cmsAPI } from '../utils/http-client'
import NotificationAlert from "react-notification-alert";
import Moment from 'react-moment';
class PatientsTable extends Component {
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
            fetching : false,
            patients : [],
            error : false
        }
        this.getPatients = this.getPatients.bind(this);
        this.deletePatient = this.deletePatient.bind(this);
    }
    getPatients(){
        this.setState({
            fetching:true
        });
        cmsAPI.get('/api/patient')
        .then(response => {
            console.log("DATARAW:",response)
            this.setState({
                fetching:false,
                patients:response.data
            });
            console.log("Patients:", this.state.patients)
        })
        .catch(err => {
            this.setState({fetching: false, error:true})
            console.log("Error<>:",err)
        })
    }
    deletePatient(patId){
        const {patients} = this.state
        for(let y=0;y>=patients.length;y++){
            console.log("ENTRO",y, patId)
        }
        cmsAPI.delete('/api/patient/delete/'+patId)
        .then(response => {
            console.log("Deleted:",response)
            this.notify("success","EL PACIENTE HA SIDO BORRADO EXITOSAMENTE")
            setTimeout(()=>{
                window.location.reload(false);
            },1300)
            
        })
        .catch(err => {
            console.log("Error<>:",err)
            this.notify("danger","HA OCURRIDO UN ERROR AL REMOVER EL PACIENTE, INTENTA MÁS TARDE")
        })
    }
    componentWillMount(){
        this.getPatients();
    }
    render(){
        let { fetching, patients, error } = this.state;
        if(!fetching && !error && patients < [0] || patients.message ){
            return(
                <div>
                    <h2>No hay datos por mostrar</h2>
                </div>
            )
        }else if(fetching && !error){
            return <div>
                <h2>Cargando...</h2>
            </div>
        }else if(error){
            return <div>
                <h2>Error con el servidor.</h2>
            </div>
        }else
        return(
            <>
            {/* ALERT */}
            <div class="card shadow mb-4">
            <NotificationAlert ref={this.notificationAlert} />
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">Lista de pacientes</h6>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Apellido(s)</th>
                      <th>Tipo</th>
                      <th>Fecha</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                        <th>Name</th>
                      <th>Apellido(s)</th>
                      <th>Tipo</th>
                      <th>Fecha</th>
                      <th>Acciones</th>
                    </tr>
                  </tfoot>
                  <tbody>
                    {

                        patients.map(patient => {
                            return (
                                <tr key={patient._id} style={{ cursor: 'pointer' }}>
                                    <td>{ patient.name || "N/A"}</td>
                                    <td>{patient.lastName || "N/A"}</td>
                                    <td>{patient.type || "N/A"}</td>
                                    <td><Moment format="DD/MM/YYYY">{patient.entryDate}</Moment></td>
                                    <td className="text-right">
                                        <button onClick={() => this.props.history.push('nregistro/' + patient._id)} class="p-2 btn ml-1 btn-primary btn-circle">
                                            <i class="fas fa-archive"></i>
                                        </button>
                                        <button onClick={() => this.props.history.push('expediente/' + patient._id)} class="p-2 btn ml-1 btn-primary btn-circle">
                                            <i class="fas fa-archive"></i>
                                        </button>
                                        <button onClick={() => this.props.history.push('pacientes/' + patient._id)} class="p-2 btn ml-1 btn-secondary btn-circle">
                                            <i className="fas fa-user"></i>
                                        </button>
                                        <div className="p-2 btn ml-4 btn-danger btn-circle" 
                                        onClick={() => { 
                                            if (window.confirm(`ESTÁS APUNTO DE ELIMINAR A EL PACIENTE: ${patient.name || ""} ${patient.lastName|| ""}`)) this.deletePatient(patient._id) } }>
                                            <i class="fas fa-trash"></i>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          </>
        )
    }
}
export default PatientsTable