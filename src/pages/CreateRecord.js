import React, { Component, useRef, createRef } from 'react';
import SideBar from "../components/SideBar";
import TopBar from '../components/TopBar';
import { cmsAPI } from '../utils/http-client';
import NotificationAlert from "react-notification-alert";
import CanvasDraw from 'react-canvas-draw'
import OdontogramaImg from '../img/odontograma.jpg'

class CreateRecord extends Component {
  notificationAlert = createRef();
  odontCanvas = createRef();
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
            patId:"",
            canvasDrawData:"",
            patientData:{},
            bshColor:"black"
        }
    }
    
    componentWillMount(){
        let {match: {params}} = this.props;
        this.setState({
            patId:params.patId
        })
        this.getPatientData(params.patId)
    }
    formDataHandler = (e) =>{
      e.preventDefault();
      console.log(e.target.name);
      console.log(e.target.value);
      this.setState({
          [e.target.name] : e.target.value
      });
    }
     createPatientRecord = (ev) =>{
        ev.preventDefault()
        //SAVE CANVAS
        const data = this.odontCanvas.current.getSaveData();
        //SAVE CANVAS
        const {
          name,
          notes,
          entryDate
        } = this.state;
        let newRecord = JSON.stringify({
          name,
          notes,
          entryDate,
          canvasDrawData:data
        })
        console.log("SENDED",newRecord)
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
      OdontCanvasAction = (action) =>{
        switch(action){
          case "SAVE":
              console.log("SAVE CLICK!")
              const data = this.odontCanvas.current.getSaveData();
              console.log(data)
              this.setState({
                canvasDrawData:data
              })
              console.log("CanvasState",this.state.canvasDrawData)
            break;

          case "CLEAR":
            console.log("CLEAR CLICK!")
            this.odontCanvas.current.clear();
            break;

          case "UNDO":
            console.log("UNDO CLICK!")
            this.odontCanvas.current.undo();
            break;

          default:
            console.log('Lo lamentamos, por el momento no disponemos de ' + action + '.');
        }
        
      }
      brushColorSelector(color){
        switch(color){
          case "RED":
            console.log("Red");
            this.setState({
              bshColor:"RED"
            })
          break;
          case "BLUE":
            console.log("Blue");
            this.setState({
              bshColor:"BLUE"
            })
          break;
          case "GREEN":
            console.log("Green");
            this.setState({
              bshColor:"GREEN"
            })
          break;
          default:
            this.setState({
              bshColor:"BLACK"
            })
        }
      }
      
      getPatientData(patId){
        cmsAPI.get(`api/patient/${patId}`)
        .then(patient=>{
          console.log("Get Patient",patient)
          this.setState({
            patientData:patient.data
          })
          console.log("PatState",this.state.patientData)
        }).catch(err=>{
          console.log("Error to get patient",err)
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
                              <h1 className="h4 text-gray-900 mb-4">Agregar al expediente de {this.state.patientData.name||""} {this.state.patientData.lastName||""}</h1>
                            </div>
                            <form onSubmit={this.createPatientRecord} className="user text-center">
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
                                <div className="d-flex justify-content-center p-5">
                                  <div className="row">
                                    <div className="col">
                                      {/* <a onClick={() => this.OdontCanvasAction("SAVE")} className="btn btn-primary btn-user btn-block text-white" >GUARDAR</a> */}
                                      <a onClick={() => this.OdontCanvasAction("UNDO")} className="btn btn-primary btn-user btn-block text-white" >DESHACER</a>
                                      <a onClick={() => this.OdontCanvasAction("CLEAR")} className="btn btn-primary btn-user btn-block text-white" >LIMPIAR</a>
                                      {/* COLOR PALLETTE */}
                                      <span className="mt-4">COLOR</span>
                                      <a onClick={() => this.brushColorSelector("BLACK")} className=" btn btn-secondary btn-user btn-block text-white"/>
                                      <a onClick={() => this.brushColorSelector("RED")} className="btn btn-danger btn-user btn-block text-white"/>
                                      <a onClick={() => this.brushColorSelector("BLUE")} className="btn btn-primary btn-user btn-block text-white"/>
                                      <a onClick={() => this.brushColorSelector("GREEN")} className="btn btn-success btn-user btn-block text-white"/>
                                    </div>
                                    <div className="col">
                                    <CanvasDraw
                                      ref={this.odontCanvas}
                                      brushRadius={1}
                                      brushColor={this.state.bshColor}
                                      imgSrc={OdontogramaImg}
                                      canvasWidth={600}
                                    />
                                    </div>
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
                                                    </div> : "Crear registro"}
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