import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {socket} from "../service/socket"; 
import {server} from '../serverVar.js'



const formStyle = {
  display: 'flex',
  alignItems: 'center'
};


const listStyle = {display:'flex', flexDirection:'column',height: '20em', width:'auto', overflowY: 'scroll'};


const innerStyle = {display:'flex', flexDirection:'column-reverse'};


const itemStyle = { };




const diceOptions = Array.from(Array(11).keys()).slice(1).map((x) => ({label: String(x),value:String(x)}));


const sideOptions = [
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '6', label: '6' },
    { value: '8', label: '8' },
    { value: '10', label: '10' },
    { value: '12', label: '12' },
    { value: '20', label: '20' },
    { value: '100', label: '100' },    
];


class Post extends Component{  

    constructor(props){
        super(props);
        
        
        this.state = {username:''}
        
        
     }
     
    componentDidMount(){
        
        
        
        axios.get(server+'/users/username/'+this.props.post.userID)
        .then(response=>{
            
            console.log(response.data);
            
            this.setState({username:response.data});
            
        });
        
        
        
    }
    
    
    componentDidUpdate(){
        
        
        
    }


  
    
    render(){
        
        if(this.props.post.userID===localStorage.getItem("userID")){
            return (
              <tr style={itemStyle}>
                <td>{this.state.username}</td>
                <td>{this.props.post.postText}</td>
                <td><small>{ (new Date(this.props.post.createdAt)).toLocaleString("en-US","short") }</small></td>

                <td>
                <Link to={"/edit-post/"+this.props.post._id} className="btn btn-primary">Edit</Link> | <a href="#" className="btn btn-primary" onClick={() => { this.props.deletePost(this.props.post._id) }}>Delete</a>
                </td>
              </tr>
            )
        }
        else{
             return (
              <tr style={itemStyle}>
                <td>{this.state.username}</td>
                <td>{this.props.post.postText}</td>
                <td><small>{ (new Date(this.props.post.createdAt)).toLocaleString("en-US","short") }</small></td>

                <td>
                
                </td>
              </tr>
            )

            
        }
    
    }
}



export default class PostList extends Component{
    
    constructor(props){
        super(props);
        console.log("PostList Called");
        
        this.deletePost = this.deletePost.bind(this);
        
        this.onChangeNewPost = this.onChangeNewPost.bind(this);
        
        this.updatePostList = this.updatePostList.bind(this);
        
        
        this.onSubmit = this.onSubmit.bind(this);
        
        this.die = this.die.bind(this);
        
        this.roll = this.roll.bind(this);
        
        this.rollDice = this.rollDice.bind(this);
        
        this.handleDieChange = this.handleDieChange.bind(this);
        
        this.handleSideChange = this.handleSideChange.bind(this);
        
        this.onChangeBonus = this.onChangeBonus.bind(this);
        
        //console.log("path when constructed is",window.location.pathname);      
        

        
        
        
        this.state = {posts:[],
                        newpost:'',
                        id: window.location.pathname.split("/").slice(-1)[0],
                        selectedDie:'1',
                        selectedSide:'20',
                        bonus:0};
                        
                        
               
                        
        
    }
    
    
    updatePostList(){
        
        console.log(server+'/posts/getroom/'+this.state.id)
        axios.get(server+'/posts/getroom/'+this.state.id)//+localStorage.getItem("roomID"))
        .then(response=>{
            this.setState({posts: response.data})
        })
        .catch((error)=>{ console.log(error); })
        
    }
    
    componentDidMount(){
        
        

        //setInterval(this.updatePostList, 100);
        this.updatePostList();
        
        socket.on('server sent message', message => {


            console.log(message);
            this.updatePostList();
            
        }); 

        var objDiv = document.getElementById("list");
        objDiv.scrollTop = objDiv.scrollHeight;
        
        
        
        
          
    }
    
    
    componentDidUpdate(){
        
        var objDiv = document.getElementById("list");
        objDiv.scrollTop = objDiv.scrollHeight;
        
        
    }
    
    deletePost(id){
        
        axios.delete(server+'/posts/'+id)
        .then(res=>console.log(res.data));    
        
        this.setState({
            posts: this.state.posts.filter(el=>el._id !== id )
        })
        
    }
    /**/
    
    postList(){
        return this.state.posts.map(currentPost => {
          return <Post post={currentPost} deletePost={this.deletePost} key={currentPost._id}/> ; 
        })
        
        
    }
    
    onChangeNewPost(e){
        this.setState({
            newpost: e.target.value            
        });        
    }
    
    
    
    onSubmit(e){

        e.preventDefault();
        console.log("Post Submit was called")
        const new_Post = {
            roomID: this.state.id,//localStorage.getItem("roomID"),
            userID: localStorage.getItem("userID"),
            postText: this.state.newpost
            
        }
        
        axios.post(server+'/posts/add',new_Post)
            .then(res=>{
                
                
                console.log(res.data);
            
                console.log("redirecting to ",'/room/'+this.state.id);
                
                
                socket.emit('recieve message', 'user '+localStorage.getItem("username")+' has sent a message');
            
                window.location = '/room/'+this.state.id;//localStorage.getItem("roomID");
            
            });
        
        /*
        axios.post(server+'/users/'+this.props.owner)
            .then(res=>console.log(res.data));

        const room = {
            roomname: this.state.roomname,
            description: this.state.description,
            owner: localStorage.getItem("username")
        }
        
        console.log(room);
        
        axios.post(server+'/rooms/add',room)
            .then(res=>console.log(res.data));
        */
        
        
       
        
        
        
    }
    
    
    die(sides){
	
      return Math.floor(Math.random() * sides) + 1;


    }


    roll(dice,sides,bonus){

        var sum=0;
      
        var individuals=[]

        for(var d=0;d<dice;d++){
        
        var result = this.die(sides);
        
        sum+=result;
        
        individuals.push(String(result))
        
      }
        
      sum+=bonus

        //console.log( sum, individuals ); 
      
      //return [individuals,bonus,"=",sum];
      
      //console.log(individuals.join("+"))
      
      
      
      if(bonus>-1){
          
        var stringedBonus="+"+String(bonus);
      }
      else{
          
       var stringedBonus=String(bonus); 
      }
      
      
      return "rolled "+String(individuals.join("+"))+stringedBonus+" = "+String(sum);

    }



    
    

    
    
    handleDieChange(e){
        
        this.setState({
            selectedDie: e.target.value            
        });  
        
    }
    
    handleSideChange(e){
        
        this.setState({
            selectedSide: e.target.value            
        }); 
        
    }
    
    
    
    onChangeBonus(e){
        
        this.setState({
            bonus: e.target.value            
        }); 
        
    }
    
    rollDice(e){
        
        
        e.preventDefault();
        
        
        console.log("Roll Dice was called")
        
        

        
        
        
        if(isNaN(parseInt(this.state.bonus))){
            
            var rolltext = this.roll(parseInt(this.state.selectedDie),parseInt(this.state.selectedSide),0);
            
        }
        
        else{
            
            var rolltext = this.roll(parseInt(this.state.selectedDie),parseInt(this.state.selectedSide),parseInt(this.state.bonus));
            
        }
        
        //alert(rolltext);
        
        
        const new_Post = {
            roomID: this.state.id,//localStorage.getItem("roomID"),
            userID: localStorage.getItem("userID"),
            postText: rolltext
            
        }
        
        axios.post(server+'/posts/add',new_Post)
            .then(res=>{
                
                
                console.log(res.data);
            
                console.log("redirecting to ",'/room/'+this.state.id);
                
                socket.emit('recieve message', 'user '+localStorage.getItem("username")+' has sent a message');
            
                window.location = '/room/'+this.state.id;//localStorage.getItem("roomID");
            
            });
                
        
        
        
    }    
    

    
    
    render() {
        return(
            <div >
              <h3>Available Posts</h3>
              <div id="list" className="container" style={listStyle}>
              
                    <div id="inner" className="container" style={innerStyle}>
                      <table className="table" style={ this.props.inverted ? {color: "white"} : {color: "black"} } >
                        
                            <thead className="thead-light" >
                              <tr>
                                <th>User</th>
                                <th>Text</th>
                                <th>Dated</th>
                                <th>Actions</th>
                              </tr>
                            </thead>  
                            
                                <tbody >
                                  { this.postList() }
                                </tbody>
                        
                      </table>
                    </div>
                  
              </div >
              
                <form onSubmit={this.rollDice} style={formStyle}>                    
                    <select
                        value={this.state.selectedDie}
                        onChange={this.handleDieChange}
                    >
                    {diceOptions.map(({ value, label }, index) => <option value={value} >{label}</option>)}
                    </select>
                    
                    <span>d</span>
                    <select
                        value={this.state.selectedSide}
                        onChange={this.handleSideChange}
                    >
                    {sideOptions.map(({ value, label }, index) => <option value={value} >{label}</option>)}
                    </select>
                    
                    <span>+</span>
                    <input  type="text"
                    required
                    className="form-control-sm"
                    value={this.state.bonus}
                    onChange={this.onChangeBonus}
                    />
                          
                  <input type="submit" value="Roll Dice!" className="btn btn-primary" />
                </form>              
              
              
                <form onSubmit={this.onSubmit} style={formStyle}>
                  <input  type="text"
                    required
                    className="form-control"
                    value={this.state.newpost}
                    onChange={this.onChangeNewPost}
                    />
                    <br/>                    
                  <input type="submit" value="Post!" className="btn btn-primary" />
                </form>
              
            </div>
        );
    }
}