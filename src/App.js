import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Redirect} from "react-router-dom";
import { withRouter } from 'react-router-dom';
//import { Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
//import './App2.css';


import NavbarLogin from "./components/navbar-login.component"
import NavbarLogged from "./components/navbar-logged.component";

//import EditPost from "./components/edit-post.component";
//import CreatePost from "./components/create-post.component";

import UserLogin from "./components/user-login.component";
import UserRegister from "./components/user-register.component";
import UserEdit from "./components/user-edit.component";


import RoomsList from "./components/room-list.component";
import RoomCreate from "./components/room-create.component";
import RoomEdit from "./components/room-edit.component";

import PostList from "./components/post-list.component";
import PostEdit from "./components/post-edit.component";
    

import {socket} from "./service/socket"; 
    
class App extends React.Component {
    
    constructor(props){
        super(props);
        
        console.log("userID is", localStorage.getItem("userID"));  
        console.log("username is", localStorage.getItem("username"));
        console.log("roomname is", localStorage.getItem("roomname"));
        console.log("roomID is", localStorage.getItem("roomID"));
 
        this.state = {inverted:false}  

        this.lightSwitch = this.lightSwitch.bind(this);
        
        this.socketFunction = this.socketFunction.bind(this);
        
        
    }


    lightSwitch(){
        
        console.log("Inverted enters",this.state.inverted)
        
        if(!this.state.inverted){
            console.log("Inverting");
            document.body.style.setProperty("color", "white", "important");//color = "white"
            document.body.style.backgroundColor = "black";
            
            
            
            //document.getElementsByTagName("td")[0].style.setProperty("color", "white", "important");;
            //import('./AppInverted.css').then( );
        }
        else{
            console.log("Deverting");
            document.body.style.setProperty ("color", "black", "important");//.color = "black"
            document.body.style.backgroundColor = "white";
            //import('./App.css').then( );            
        }
        
        //this.state.inverted=!this.state.inverted;
        
        this.setState({inverted:!this.state.inverted});
        
        console.log("Inverted leaves",this.state.inverted)
        
    }

    socketFunction () {
        
        socket.on('user connected', function(msg){
          //$('#messages').append($('<li>').text(msg));
          console.log('socket has opened')
          
        });
        
        socket.on('user disconnected', function(msg){
          //$('#messages').append($('<li>').text(msg));
          console.log('socket has closed')
          
        });
        
        
        /*
        $('form').submit(function(e) {
          e.preventDefault(); // prevents page reloading
          socket.emit('chat message', $('#m').val());
          $('#m').val('');
          return false;
        });
        
        socket.on('chat message', function(msg){
          $('#messages').append($('<li>').text(msg));
        });
        /**/
        
      };


    
   render() {  
   

          this.socketFunction();
          
    
          if(localStorage.getItem("userID")==null){
              
             return (   
                <Router >
                    <div className="container">
                       <NavbarLogin lightSwitch={this.lightSwitch}/>
                       <br/>
                      <Route path="/" exact render={()=> <UserLogin /*props here*/ />} />
                      <Route path="/register" component={UserRegister} />
                      <Route path="/rooms" component={PostList}/>
                      <Redirect from="*" to="/" />                      
                    </div>
                </Router>
              );
              
              
          }
          
          else{
              
          
              return ( 
              
                  <Router>
                        <div className="container">
                          
                           
                           <NavbarLogged lightSwitch={this.lightSwitch}/>
                           <br/>
                           <Route exact path="/"  render={()=> <RoomsList  inverted={this.state.inverted}/>} />
                           <Route exact path="/account" render={()=> <UserEdit  />} />
                           <Route exact path="/create-room" render={()=> <RoomCreate  />} />
                           <Route exact path="/room/:id" render={()=> <PostList inverted={this.state.inverted}/>} />
                           <Route exact path="/edit-room/:id" component={RoomEdit} />
                           <Route exact path="/edit-post/:id" component={PostEdit} />
                           
                        </div>
                    </Router>
                  );
          }
        }

}

export default App;
