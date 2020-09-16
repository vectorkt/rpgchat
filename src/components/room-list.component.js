import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {server} from '../serverVar.js'


class Room extends Component{
    
    constructor(props){
        super(props);
        
        this.setRoom = this.setRoom.bind(this);
        
        this.state ={owner:''}
        
    }
    
    setRoom(){
        
        localStorage.setItem('roomname',this.props.room.roomname);
        //localStorage.setItem('roomID',this.props.room._id)
        
    }
    
    
    componentDidMount(){
        
        console.log("owner is",this.props.room.owner);
        
        axios.get(server+'/users/username/'+this.props.room.owner)
        .then(response=>{
            
            console.log(response.data);
            
            this.setState({owner:response.data});
            
        });
        
    }
    
    

    
    
    
    render(){
        
        
        
        if(this.props.room.owner===localStorage.getItem("userID")){
            
            
            console.log(this.props.room.roomname)
            
            
            return(
              <tr>
                <td>{this.props.room.roomname}</td>
                <td>{this.state.owner}</td>
                <td>{this.props.room.description}</td>
                

                <td>
                  <Link to={"/room/"+this.props.room._id} onClick={this.setRoom} className="btn btn-primary">Join</Link> | <Link to={"/edit-room/"+this.props.room._id} className="btn btn-primary">Edit</Link> | <a href="#" className="btn btn-primary" onClick={() => { this.props.deleteRoom(this.props.room._id) }}>Delete</a>
                </td>
              </tr>
            
            
            
            )
            
        }
        else{
        
            console.log(this.props.room.roomname)
            return(
              <tr>
                <td>{this.props.room.roomname}</td>
                <td>{this.state.owner}</td>
                <td>{this.props.room.description}</td>
                

                <td>
                  <Link to={"/room/"+this.props.room._id} onClick={this.setRoom} className="btn btn-primary">Join</Link> 
                </td>
              </tr>
            
            
            
            )
        
        }
        
    }
    
    
}


export default class RoomList extends Component{
    
    constructor(props){
        super(props);
        console.log(localStorage.getItem('roomname'));
        this.deleteRoom = this.deleteRoom.bind(this);
        
        
        this.state = {users:[],rooms:[]};
        
        
        
         
        //console.log("path is",this.props.location);
        
    }
    
    

    
    
    componentDidMount(){
        
        
        axios.get(server+'/rooms')
        .then(response=>{
            this.setState({rooms: response.data})
            console.log(response.data);
            
        })
        .catch((error)=>{ console.log(error); })  
              
        
        
        //console.log("path is",this.props.location);
        
    }
    
    
    deleteRoom(id){
        
        console.log("id to delete is",id);
        
        axios.get(server+'/posts/getroom/'+String(id)) //localStorage.getItem("roomID")
        .then(response=>{
            //this.setState({posts: response.data})
            console.log(response.data);
            
            for(var r in response.data){
                
                console.log(response.data[r]._id);
                
                 axios.delete(server+'/posts/'+response.data[r]._id)
                .then(res=>console.log(res.data));
                
            }
            
            axios.delete(server+'/rooms/'+id)
               .then(res=>console.log(res.data));
               
            this.setState({
            rooms: this.state.rooms.filter(el=>el._id !== id )
            })   
            
        })
        .catch((error)=>{ console.log(error); })
        
        
        
        /*
        axios.delete(server+'/rooms/'+id)
        .then(res=>console.log(res.data));    
        
        this.setState({
            rooms: this.state.rooms.filter(el=>el._id !== id )
        })
        /**/
    }
        
    
    
    
    
    
    
    
    
    
    
    

    
    roomList(){     
        
        
        return this.state.rooms.map(currentRoom => {
          return <Room room={currentRoom} deleteRoom = {this.deleteRoom}key={currentRoom._id}/> ; 
        })
        
        
    }
    
    render() {
        return(
            <div>
              <h3>Available Rooms</h3>
              <table className="table" style={ this.props.inverted ? {color: "white"} : {color: "black"} }>
                <thead className="thead-light">
                  <tr>
                    <th>Name</th>
                    <th>Owner</th>
                    <th>Decription</th>
                    
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  { this.roomList() }
                </tbody>
              </table>
                <form action="/create-room">
                        <input type="submit" value="Create Room!" className="btn btn-primary" />
                </form>
              
            </div>
        );
    }
}