import React, {Component} from 'react';
import axios from 'axios';
import {server} from '../serverVar.js'
var hash = require('object-hash');

export default class EditUser extends Component{
        
    constructor(props){
        super(props);
        
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
        this.onChangeNewRepeatedPassword = this.onChangeNewRepeatedPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.errorRef = React.createRef();
        
        this.state = {
            username: '',
            email:'',
            originalEmail:'',
            password:'',
            newPassword:'',
            newRepeatedPassword:'',
            rooms:[]
            
        } 
    }
    
    
    componentDidMount(){
        axios.post(server+'/users/'+localStorage.getItem("userID"))
        .then(response=>{
            this.setState({
                username: response.data.username,
                email: response.data.email,
                originalEmail: response.data.email,
                rooms: response.data.rooms
                
            })
        })
        .catch(error=>{ console.log(error); })         
    }
    /**/
    
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

    onChangeNewPassword(e){
        this.setState({
            newPassword: e.target.value            
        });        
    }   

    onChangeNewRepeatedPassword(e){
        this.setState({
            newRepeatedPassword: e.target.value            
        });        
    }

    
    onSubmit(e){

        e.preventDefault();
        
        axios.post(server+'/users/'+this.state.originalEmail+'/'+hash(this.state.password))
        .then(response=>{
            
            
            if(response.data==="None"){
            
                console.log("user/password combo not found");            
                this.errorRef.current.innerText ="user/password combo not found"
            }
            
            else{
            
                    if(this.state.newPassword!==''){

                        if( this.state.newPassword===this.state.newRepeatedPassword){
                            const user = {
                                            username: this.state.username,
                                            email: this.state.email,
                                            password: hash(this.state.newPassword),
                                            rooms:[]
                                        }
                                  
                                  console.log(user);
                                  
                                    axios.post(server+'/users/update/'+localStorage.getItem("userID"),user)
                                    .then(res=>console.log(res.data));
                                    localStorage.setItem('username', this.state.username)
                                    window.location = '/';
                                  
                        }
                        else{
                            
                            console.log('Passwords don\'t match!');
                            
                            this.errorRef.current.innerText ="passwords don\'t match!";
                        }
                        
                    }
                    
                    else{
                        
                        const user = {
                                        username: this.state.username,
                                        email: this.state.email,
                                        password: hash(this.state.password),
                                        rooms:[]
                        }
                        console.log('enters here');
                        console.log(user);
                        
                        axios.post(server+'/users/update/'+localStorage.getItem("userID"),user)
                        .then(res=>console.log(res.data));
                        localStorage.setItem('username', this.state.username)
                        window.location = '/';
                    }

                 
                    
                    
                    /*
                    axios.post(server+'/users/update/'+localStorage.getItem("userID"),user)
                        .then(res=>console.log(res.data));
                    /**/
                
                
               
                
                //window.location = '/';
            
            
            
            }
            
        })
        .catch((error)=>{ console.log(error); })
        
        
        
        
        
    }
    
    
    render() {
        return(
        <div>
          <h3>Change Details</h3>
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
                
                 <br/>
              <h3>Change Password</h3>    
              <label>New Password: </label>
              <input  type="password"
                  
                  className="form-control"
                  value={this.state.newPassword}
                  onChange={this.onChangeNewPassword}
                  />  
                  
             <label>Confirm Password: </label>
              <input  type="password"
                  
                  className="form-control"
                  value={this.state.newRepeatedPassword}
                  onChange={this.onChangeNewRepeatedPassword}
                  />
              
              <br/>
              <h3>Current Password For Verification</h3>  
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
              <input type="submit" value="Change Details" className="btn btn-primary" />
            </div>
          </form>
        </div>
        );
    }
}