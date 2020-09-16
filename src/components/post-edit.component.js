import React, {Component} from 'react';
import axios from 'axios';
import {server} from '../serverVar.js'

export default class EditPost extends Component{
        
    constructor(props){
        super(props);
        
        this.onChangePostText = this.onChangePostText.bind(this);
        //this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            roomID: '',
            userID: '',
            postText:''           
        } 
    }
    
    
    componentDidMount(){
        
        axios.get(server+'/posts/'+this.props.match.params.id)
        .then(response=>{
            this.setState({
                roomID: response.data.roomID,
                userID: response.data.userID,
                postText: response.data.postText
                
            })
        })
        .catch(error=>{ console.log(error); })       
    }
    /**/
    
    onChangePostText(e){
        this.setState({
            postText: e.target.value            
        });        
    }    
   
    onSubmit(e){

        e.preventDefault();
        /*
        axios.post(server+'/users/'+this.props.owner)
            .then(res=>console.log(res.data));
        */
        console.log(this.state)

        const new_post = {
            roomID: this.state.roomID,
            userID: this.state.userID,
            postText: this.state.postText
        }
        
        console.log(new_post);
        
        axios.post(server+'/posts/update/'+this.props.match.params.id,new_post)
            .then(res=>console.log(res.data));
        
        
        console.log("")
       
        
        window.location = "/room/"+this.state.roomID;
        
    }
    
    
    render() {
        return(
        <div>
          <h3>Edit Post</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
            
              <label>Text: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.postText}
                  onChange={this.onChangePostText}
                  />
              
              

                  
            </div>
            <div className="form-group">
              <input type="submit" value="Edit Post" className="btn btn-primary" />
            </div>
          </form>
          
          
        </div>
        );
    }
}