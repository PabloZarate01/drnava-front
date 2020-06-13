import React, { Component, createRef, useRef } from 'react';
import Moment from 'react-moment';
export const  PatientRow = (props) =>{
    return (
        <tr key={props._id} style={{ cursor: 'pointer' }}>
            <td>{ props.name || "N/A"}</td>
            <td>{props.lastName || "N/A"}</td>
            <td>{props.type || "N/A"}</td>
            <td><Moment format="LL">{props.entryDate}</Moment></td>
            <td className="text-right">
                <button onClick={() => props.history.push('nregistro/' + props._id)} className="p-2 btn ml-1 btn-primary btn-circle">
                    <i className="fas fa-plus"></i>
                </button>
                <button onClick={() => props.history.push('pacientes/' + props._id)} className="p-2 btn ml-1 btn-secondary btn-circle">
                    <i className="fas fa-user"></i>
                </button>
                <div className="p-2 btn ml-4 btn-danger btn-circle" 
                onClick={() => { 
                    if (window.confirm(`ESTÁS APUNTO DE ELIMINAR A EL PACIENTE: ${props.name || ""} ${props.lastName|| ""}`)) {props.deletePatient()} } }>
                    <i className="fas fa-trash"></i>
                </div>
            </td>
        </tr>
    )
    
}