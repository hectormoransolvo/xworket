import logo2 from './logo2.png';
import './App.css';
import React  from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {  Navbar } from 'react-bootstrap';
import HomeContainer from './containers/HomeContainer';

import Bar from './components/bar/Bar'



function App() {




  return (
    <div className="App">
      <Navbar bg="bg-myRed" className="bg-myRed">
        <Navbar.Brand>
        <img src={logo2} alt="logo"/>
          Worket
        </Navbar.Brand>          
      

      </Navbar>
      <HomeContainer/>
      
      <Bar/>
      
    </div>
  );
}

export default App;
