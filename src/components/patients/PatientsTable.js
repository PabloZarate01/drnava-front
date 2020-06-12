import React, { Component, createRef } from 'react';
import { cmsAPI } from '../../utils/http-client'
import NotificationAlert from "react-notification-alert";
import { PatientRow } from './PatientsRow';
class PatientsTable extends Component {
    notificationAlert = createRef();
  notify(type,message) {
    var options = {};
    options = {
      place: "tr",
      message,
      type: type,
      icon: "fas fa-fw fa-bell",
      autoDismiss: 7,
      search:"",
    };
    this.notificationAlert.current.notificationAlert(options);
  }
    constructor(props){
        super(props);
        this.state = {
            fetching : false,
            patients : [],
            error : false,
            search:""
        }
        this.getPatients = this.getPatients.bind(this);
        this.deletePatient = this.deletePatient.bind(this);
    }
    handleSearch = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
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
        }

        return(
            <>
            {/* ALERT */}
            <div className="card shadow mb-4">
            <NotificationAlert ref={this.notificationAlert} />
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Lista de pacientes</h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
              <div class="row">
                    {/* <div class="col-sm-12 col-md-6">
                        <div class="dataTables_length" id="dataTable_length">
                            <label>Show
                                <select name="dataTable_length" aria-controls="dataTable" class="custom-select custom-select-sm form-control form-control-sm">
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select> entries
                            </label>
                        </div>
                    </div> */}
                    <div class="col-sm-12 col-md-6">
                        <div id="dataTable_filter" class="dataTables_filter">
                            <label>Buscar:
                                <input 
                                    type="search"
                                    name="search"
                                    className="form-control form-control-sm"
                                    placeholder="Buscar..."
                                    onChange={this.handleSearch}
                                    value={this.state.search}
                                    aria-controls="dataTable"
                                />
                            </label>
                        </div>
                    </div>
                </div>
                <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Apellido(s)</th>
                      <th>Tipo</th>
                      <th>Fecha</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                        <th>Nombre</th>
                      <th>Apellido(s)</th>
                      <th>Tipo</th>
                      <th>Fecha</th>
                      <th>Acciones</th>
                    </tr>
                  </tfoot>
                  <tbody>
                    {
                        patients.map(patient => {
                            if(
                                patient.name.toLowerCase().includes(this.state.search.toLowerCase()) ||
                                patient.lastName.toLowerCase().includes(this.state.search.toLowerCase()) ||
                                patient.type.toLowerCase().includes(this.state.search.toLowerCase())
                            ){ 
                                return (
                                    <PatientRow 
                                        {...patient}
                                        {...this.props} 
                                        deletePatient={()=>this.deletePatient(patient._id)}    
                                    />
                                )
                            }else{
                                return null;
                            }
                            
                            
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