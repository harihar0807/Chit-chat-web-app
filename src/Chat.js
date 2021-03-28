import React,{useState ,useEffect} from 'react'
import {Avatar, IconButton} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import Piker from 'emoji-picker-react';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import db from './firebase';
import firebase from "firebase";
import {useStateValue} from './StateProvider';


import './Chat.css';





function Chat() {

   const [input , setInput ] = useState("");
   const { roomId } = useParams();
   const [roomName , setRoomName]=useState("");
   const [seed, setSeed] = useState("");
   const [messages, setMessages] = useState([]);
   const [{user}, dispatch] = useStateValue();
   const [choseEmoji, setChosenEmoji] =useState(null);



  useEffect(() => {
      if(roomId) {
          db.collection('rooms').doc(roomId)
          .onSnapshot(snapshot => {
              setRoomName(snapshot.data().name)
          });

          db.collection('rooms').doc(roomId).collection("messages").orderBy("timestamp" , "asc").onSnapshot( snapshot => {
                 setMessages(snapshot.docs.map(doc => doc.data()))
          });
      }

  },[roomId]);


useEffect(() => {
    setSeed(Math.floor(Math.random()*5000));
},[roomId]);

const sendMessage = (e) =>{
    e.preventDefault();

    db.collection('rooms').doc(roomId).collection("messages").add({
        message: input,
        name: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })

    setInput("");
    
}

    return (
        <div className="Chat">
              <div className="Chat-header">
                   <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                    <div className="Chat-headerinfo">
                         <h3 className="chat-room-name">{roomName}</h3>
                         <p className="chat-room-last-seen">
                             Last seen {" "}
                             {
                                 new Date(
                                     messages[messages.length-1]?.timestamp?.toDate()
                                 ).toUTCString()
                                 }
                             
                        </p>
                    </div>
                    <div className="Chat-headerright">

                         <IconButton>
                            < SearchOutlinedIcon/> 
                          </IconButton>
                          <IconButton>
                            < AttachFileIcon/> 
                          </IconButton>
                          
                          <IconButton>
                              <MoreVertIcon/>
                          </IconButton>
                          


                    </div>


              </div>
              <div className="Chat-body">
                     { messages.map(message => (

                     <div className="chat-template"> 
                        <p className={ `chat-message ${message.name==user.displayName && 'chat-receiver'}`} >
                          <span className="chat-name">{message.name}</span>
                           {message.message}
                            <span className="chat-timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                        </p>
                     </div>
                      ))}
            
                        
              </div>
        <div className="Chat-footer">
              <IconButton>
                  <InsertEmoticonIcon    />
                </IconButton>
                 <form >
                     <input  value= {input} onChange = { (e) => setInput(e.target.value)}   type="text" placeholder="type a message" />
                      <button onClick = {sendMessage} type="submit">Send a message</button>
                 </form>
                 <IconButton>
                     <MicIcon />
                 </IconButton>
               </div>
            
        </div>
    )
}

export default Chat
