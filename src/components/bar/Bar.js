import React, { Component } from "react";

import "./Bar.css";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import {apic,apiu,apiv,apit} from "../../configapp";

import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

// IMPORTAR DESDE ARCHIVO

const data = [];
const data2 = [];

const dtoday = new Date();   // Obtengo la fecha de hoy


function formatDate(date1) {
    var d = new Date(date1),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}





class Bar extends Component {    


    

    

    state={
        fecha: new Date(),
        data: data,
        data2: data2,
        abierto: false,
      }

    abrirModal=()=>{
        this.setState({abierto: !this.state.abierto});
    }

    onChange=dato=>{
            this.setState({fecha: dato});
    }
  
    mostrarFecha =dato=>{

        let cCadena = "https://integrator.magneto365.com/api/v2/vacants?dateRange=['"+formatDate(dato)+"','2021-12-14']";
        alert( cCadena ) ;
    }
    
    mostrarCandidatos =idCandidatos=>{


       

        console.log(idCandidatos);   
        let cCadena = apic+idCandidatos;
        //alert( cCadena ) ;
        console.log(cCadena);
        axios
          .get(cCadena, { auth: { username: apiu, password: apit } })
          .then((response) => {
            if (response.status) {
              this.setState({ data2: response.data.candidates });   
              this.setState({abierto: !this.state.abierto});               
              console.log(response.data.candidates);
            }
          });        
           


   
        //alert( "Mostrar candidatos ".idCandidatos ) ;
    }    

  
    consultarFecha =dato=>{

        //let cCadena = "https://integrator.magneto365.com/api/v2/vacants?dateRange=['"+formatDate(dato)+"','2021-12-17']";
        let cCadena = apiv+"['"+formatDate(dato)+"','"+formatDate(dtoday) +"']";
        console.log(cCadena);
        axios
          .get(cCadena, { auth: { username: apiu, password: apit } })
          .then((response) => {
            if (response.status) {
              this.setState({ data: response.data.vacants });   
              console.log(cCadena);
            }
          });        

    }    


    render(){
        const modalStyles={
            position: "absolute",
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }
    
        return (
            <>
                <div className="contenedor">
                    <div className="center">
                        <DatePicker selected={this.state.fecha} onChange={this.onChange} />
                        <br></br>
                        <br></br>
                            
 
                        <input type="button" value="Send"  className="btn btn-primary" onClick={()=>this.consultarFecha(this.state.fecha)}/>                        
                    </div>

                </div>




                <div className="contenedor">

                    <br /><br />
                    <table className="table ">
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Status</th>
                        <th>Created at</th>                        
 
                        </tr>
                    </thead>
                    <tbody>


                    {this.state.data.map(vacantes=>{
                    return(
                        <tr>
                    <td>{vacantes.id}</td>
                    <td>{vacantes.title}</td>
                    <td>{vacantes.status}</td>
                    <td>{formatDate(vacantes.createdAt)}</td>
                    <td>
                        <Button color="success" onClick={()=>{this.mostrarCandidatos(vacantes.id)}}>Candidates</Button>

                         
                    </td>                    

                    </tr>
                    )
                    })}





                    </tbody>
                    </table>


                </div>                

                <Modal size="lg" isOpen={this.state.abierto} style={modalStyles}>
                    <ModalHeader>
                    Candidates
                    </ModalHeader>
                    <ModalBody>


                    <div className="contenedor">

                            <br /><br />
                            <table className="table ">
                            <thead>
                                <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Phone</th>
                                <th>email</th>


                                </tr>
                            </thead>
                            <tbody>

                            {this.state.data2.map(candidates=>{
                            return(
                                <tr>
                            <td>{candidates.id}</td>
                            <td>{candidates.firstName}</td>
                            <td>{candidates.lastName}</td>
                            <td>{candidates.phone}</td>
                            <td>{candidates.email}</td>
                                        

                            </tr>
                            )
                            })}


                            </tbody>
                            </table>


                    </div>       












                    </ModalBody>

                    <ModalFooter>
                         
                        <Button color="primary" onClick={this.abrirModal}>Ok</Button>
                    </ModalFooter>
                </Modal>










         












            </>





        )
    }
 
}

             
export default Bar














