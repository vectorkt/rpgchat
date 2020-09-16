import React, {Component} from 'react';
import axios from 'axios';
import {server} from '../serverVar.js'

export default class EditRoom extends Component{
        
    constructor(props){
        super(props);
        
        this.onChangeRoomname = this.onChangeRoomname.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        //this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            roomname: '',
            description:'',
            owner: ''            
        } 
    }
    
    
    componentDidMount(){
        
        axios.get(server+'/rooms/'+this.props.match.params.id)
        .then(response=>{
            this.setState({
                roomname: response.data.roomname,
                description: response.data.description,
                owner: response.data.owner
                
            })
        })
        .catch(error=>{ console.log(error); })       
    }
    /**/
    
    onChangeRoomname(e){
        this.setState({
            roomname: e.target.value            
        });        
    }
    
    
    onChangeDescription(e){
        this.setState({
            description: e.target.value            
        });        
    }
    
    /*
    onChangePassword(e){
        this.setState({
            password: e.target.value            
        });        
    }
    /**/
    
    onSubmit(e){

        e.preventDefault();
        
        /*
        axios.post(server+'/users/'+this.props.owner)
            .then(res=>console.log(res.data));
        /**/
        
        const room = {
            roomname: this.state.roomname,
            description: this.state.description,
            owner: localStorage.getItem("userID")
        }
        
        console.log(room);
        
        axios.post(server+'/rooms/update/'+this.props.match.params.id,room)
            .then(res=>console.log(res.data));
        
        
        
       
        
        window.location = '/';
        
    }
    
    
    render() {
        return(
        <div>
          <h3>Edit Room</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
            
              <label>Room name: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.roomname}
                  onChange={this.onChangeRoomname}
                  />
              
              
              <label>Description: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  />
                  
            </div>
            <div className="form-group">
              <input type="submit" value="Edit Room" className="btn btn-primary" />
            </div>
          </form>
          
          
        </div>
        );
    }
}