import React, {Component} from 'react';
import {Link} from 'react-router-dom';




export default class Navbar extends Component{
    
    logout(){
        localStorage.removeItem('userID');
        localStorage.removeItem('username');
        localStorage.removeItem('roomname');
        localStorage.removeItem('roomID');
        console.log("called");
        window.location = '/';        
        
    }
    
    toImplement(){
    
        //alert("To Implement User Edit");
    }
    
    render() {
        return(
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand"  onClick={this.logout} >Logout</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/account" /*onClick={this.toImplement}*/ className="nav-link">{String(localStorage.getItem("username"))}</Link>
          </li>
          <li className="navbar-item">
           <Link to="/" className="nav-link">Rooms</Link>
          </li>
        </ul>
        <a href="#" className="btn btn-primary" onClick={() => { this.props.lightSwitch(); }}>Invert</a>
        </div>
      </nav>      
        );
    }
}