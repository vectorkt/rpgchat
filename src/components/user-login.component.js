import React, {Component} from 'react';
import axios from 'axios';
import {server} from '../serverVar.js'
var hash = require('object-hash');


export default class CreateUser extends Component{
        
    constructor(props){
        super(props);
        
        
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.errorRef = React.createRef();
        
        this.state = {
            username: '',
            email:'',
            password:'',
            users:''
            
        } 
    }
    
   
   
    
    onChangeEmail(e){
        this.setState({
            email: e.target.value            
        });        
    }
    
    onChangePassword(e){
        this.setState({
            password: e.target.value            
        });        
    }
    
    onSubmit(e){

        e.preventDefault();
        
        axios.post(server+'/users/'+this.state.email+'/'+hash(this.state.password))
        .then(response=>{
            
            console.log(this.state.users);
            
            
            if(response.data==="None"){
            
                console.log("user/password combo not found");            
                
                this.errorRef.current.innerText = "user/password combo not found";
            }
            else{
                console.log("user/password combo found");  
                this.setState({users: response.data});
                //this.props.changeID(response.data);
                
                
                
                localStorage.setItem('userID', response.data);
                
                axios.post(server+'/users/'+localStorage.getItem("userID"))
                .then(response=>{
                
                    localStorage.setItem('username', response.data.username);
                    window.location = '/'; 
                
                })
                
            }
            
            
        })
        .catch((error)=>{ console.log(error); })
        
       
        
        
        
        
        /*
        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }
        
        console.log(user);
        
        axios.post(server+'/users/add',user)
            .then(res=>console.log(res.data));
        
        
        this.setState({
            username:''
        });
        
        */
    }
    
    
    render() {
        return(
        <div>
          <h3>Login</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
            
              <label>Email: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  />
                  
              <label>Password: </label>
              <input  type="password"
                  required
                  className="form-control"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  />    
                  
                  
            </div>
            <div className="form-group">
              <p ref={this.errorRef} style={{'color':'red'}}></p>
              <input type="submit" value="Login" className="btn btn-primary" />
            </div>
          </form>
        </div>
        );
    }
}