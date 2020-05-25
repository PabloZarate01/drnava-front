import React, { Component } from 'react';
import { cmsAPI } from '../utils/http-client'
import NotificationAlert from "react-notification-alert";
import Moment from 'react-moment';
class PatRecordsTable extends Component {
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
            patRecords : [],
            error : false,

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
        }
        this.getRecords = this.getRecords.bind(this);
        this.getUserData = this.getUserData.bind(this);
    }
    getRecords(patId){
        this.setState({
            fetching:true
        });
        cmsAPI.get(`/api/expedient/${patId}`)
        .then(response => {
            console.log("DATARAW:",response)
            this.setState({
                fetching:false,
                patRecords:response.data
            });
            console.log("patRecords:", this.state.patRecords)
        })
        .catch(err => {
            this.setState({fetching: false, error:true})
            console.log("Error<>:",err)
        })
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
    deletePatient(recordId){
      cmsAPI.delete('/api/expedient/delete/'+recordId)
      .then(response => {
          console.log("Deleted:",response)
          this.notify("success","EL RECORD HA SIDO BORRADO EXITOSAMENTE")
          setTimeout(()=>{
              window.location.reload(false);
          },1300)
          
      })
      .catch(err => {
          console.log("Error<>:",err)
          this.notify("danger","HA OCURRIDO UN ERROR AL REMOVER EL RECORD, INTENTA MÁS TARDE")
      })
    }
    componentWillMount(){
        let {match: {params}} = this.props;
        this.getRecords(params.patId);
        this.getUserData(params.patId)
    }
    render(){
        let { fetching, patRecords, error } = this.state;
        if(!fetching && !error && patRecords < [0] || patRecords.message ){
            return(
                <div>
                    <h2>No hay expediente por mostrar</h2>
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
            <div className="card shadow mb-4">
            <NotificationAlert ref={this.notificationAlert} />
            <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Expediente {this.state.name ||""} {this.state.lastName || ""}</h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Notes</th>
                      <th>Fecha</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>Name</th>
                      <th>Notes</th>
                      <th>Fecha</th>
                      <th>Acciones</th>
                    </tr>
                  </tfoot>
                  <tbody>
                    {

                        patRecords.map(record => {
                            return (
                                <tr key={record._id} style={{ cursor: 'pointer' }}>
                                    <td>{ record.name || "N/A"}</td>
                                    <td>{record.notes || "N/A"}</td>
                                    <td>{<Moment format="DD/MM/YYYY">{record.customDate}</Moment>|| "N/A"}</td>
                                    <td className="text-right">
                                        <button onClick={() => this.props.history.push(`/expediente/${this.state.patientId}/${record._id}`)} className="p-2 btn btn-primary btn-circle">
                                            <i className="fas fa-exclamation"></i>
                                        </button>
                                        <div className="p-2 btn ml-4 btn-danger btn-circle" 
                                        onClick={() => { 
                                            if (window.confirm(`ESTÁS APUNTO DE ELIMINAR A EL PACIENTE: ${record.name || ""} ${record.lastName|| ""}`)) this.deletePatient(record._id) } }>
                                            <i className="fas fa-trash"></i>
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
export default PatRecordsTable