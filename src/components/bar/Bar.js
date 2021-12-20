import React, { Component } from "react";

import "./Bar.css";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";


const apiv ="https://integrator.magneto365.com/api/v2/vacants?dateRange="
const apit ="n3UFDV45SZxA3JuYzu3okVGjSxJo2MEGfWZctpmAY7fW5mqtvz"
const apiu ="api.solvoglobal@magneto365.com"

const apic ="https://integrator.magneto365.com/api/v2/candidates?vacant="


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
        console.log(cCadena);
        axios
          .get(cCadena, { auth: { username: apiu, password: apit } })
          .then((response2) => {
            if (response2.status) {
              this.setState({ data2: response2.data.candidates });   
              console.log(data2);
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
                        <button value="Candidates"  className="btn btn-primary" onClick={()=>{this.mostrarCandidatos(vacantes.id)}}>Candidates</button>
                    </td>                    

                    </tr>
                    )
                    })}



                    </tbody>
                    </table>


                </div>                




            </>





        )
    }
 
}

             
export default Bar













