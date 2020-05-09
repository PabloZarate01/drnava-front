import React, { Component } from 'react';
import { cmsAPI } from '../utils/http-client'
class PatientsTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            fetching : false,
            patients : [],
            error : false,
            notifyMessage:"",
            notifyStatus:""
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
            this.setState({
                notifyStatus:"success",
                notifyMessage:"Paciente eliminado"
            })
            setTimeout(()=>{
                window.location.reload(false);
            },1500)
            
        })
        .catch(err => {
            console.log("Error<>:",err)
            this.setState({
                notifyStatus:"error",
                notifyMessage:"Error al eliminar paciente"
            })
        })
    }
    componentWillMount(){
        this.getPatients();
    }
    render(){
        let { fetching, patients, error, notifyStatus, notifyMessage } = this.state;
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
            {
                notifyStatus === "danger" ?
                <div className='alert alert-warning alert-dismissible fade show' role="alert">
                    <strong>Holy guacamole!</strong> You should check in on some of those fields below.
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div> : "",
                notifyStatus ? 
                <div className='alert alert-success alert-dismissible fade show' role="alert">
                <strong>Hecho!</strong> Se ha borrado el paciente, la tabla se refrescará, espere...
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                : ""
            }
            {/* ALERT */}
            <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">DataTables Example</h6>
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
                                    <td>{patient.name ? patient.name : "N/A"}</td>
                                    <td className="text-right">
                                        <div class="p-2 btn btn-danger btn-circle" 
                                        onClick={() => { 
                                            if (window.confirm(`ESTÁS APUNTO DE ELIMINAR A EL PACIENTE: ${patient.name || ""} ${patient.lastName|| ""}`)) this.deletePatient(patient._id) } }>
                                            <i class="fas fa-trash"></i>
                                        </div>
                                        <button onClick={() => this.props.history.push('paciente/' + patient._id)} class="p-2 btn btn-primary btn-circle">
                                            <i class="fas fa-exclamation"></i>
                                        </button>
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