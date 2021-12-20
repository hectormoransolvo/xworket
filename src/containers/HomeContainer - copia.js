import React, { Component } from 'react';
import axios from "axios";

const apiv ="https://integrator.magneto365.com/api/v2/vacants?dateRange=['2021-11-25', '2021-12-02']"
const apit ="n3UFDV45SZxA3JuYzu3okVGjSxJo2MEGfWZctpmAY7fW5mqtvz"
const apiu ="api.solvoglobal@magneto365.com"


class HomeContainer extends Component {

    componentDidMount() {
        axios
          .get(apiv, { auth: { username: apiu, password: apit } })
          .then((res) => {
            if (res.status) {
              this.setState({ candidates: res.data.candidates });
              console.log(res.data);
            }
          });
      }


    render(){
        return (
            <h1> VACANTES !!!
                
            </h1>
        )

    }
  
   
}

export default HomeContainer
