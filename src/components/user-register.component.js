import React, {Component} from 'react';
import axios from 'axios';
import {server} from '../serverVar.js'
var hash = require('object-hash');

export default class CreateUser extends Component{
        
    constructor(props){
        super(props);
        
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        //ConfirmPassword
        this.onSubmit = this.onSubmit.bind(this);
        
        this.errorRef = React.createRef();
        
        console.log('HASHED',hash('hashed'))
        
        this.state = {
            username: '',
            email:'',
            password:'',
            confirmPassword:''
            
        } 
    }
    
    /*
    componentDidMount(){
        this.setState({
            users: ['test user'],
            username: 'test user'
            
        });        
    }
    */
    
    onChangeUsername(e){
        this.setState({
            username: e.target.value            
        });        
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
    
    
    onChangeConfirmPassword(e){
        this.setState({
            confirmPassword: e.target.value            
        });        
    }
    
    onSubmit(e){

        e.preventDefault();
        
        if(this.state.password === this.state.confirmPassword){
        
            const user = {
                username: this.state.username,
                email: this.state.email,
                password: hash(this.state.password),
                rooms:[]
            }
        
            console.log(user);
            
            axios.post(server+'/users/add',user)
                .then(res=>console.log(res.data));         
            
            
           
            
            window.location = '/';
            
            
        }
        
        else{
            
            this.errorRef.current.innerText="Passwords don't match!";
            
        }
        

        
    }
    
    
    render() {
        return(
        <div>
          <h3>Register</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
              <label>Username: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                  />
                  
              <label>Email: </label>
              <input  type="email"
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
              
              
              <label>Confirm Password: </label>
              <input  type="password"
                  
                  className="form-control"
                  value={this.state.confirmPassword}
                  onChange={this.onChangeConfirmPassword}
                  />

                  
                  
            </div>
            <div className="form-group">
                <p ref={this.errorRef} style={{'color':'red'}}></p>
              <input type="submit" value="Create User" className="btn btn-primary" />
            </div>
          </form>
        </div>
        );
    }
}