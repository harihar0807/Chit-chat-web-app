import React ,{useEffect,useState} from 'react';
import {Avatar} from '@material-ui/core';
import './SidebarChat.css';
import db from './firebase';
import { Link } from 'react-router-dom';
 function SidebarChat({id, name, addNewChat}) {

     const [seed, setSeed] = useState("");
     const [messages, setMessages]=useState("");



    useEffect(() => {
         if(id){
             db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot( snapshot => {
                 setMessages(snapshot.docs.map((docs) => docs.data()))
             })
         }
    },[id]);

    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    },[]);



    const createChat = () => {
            const roomName= prompt("please enter name for chat room");
            
            if(roomName){
                db.collection("rooms").add({
                    name: roomName,
                });
            }
    
        }



    return !addNewChat ? (
        <Link to = {`/rooms/${id}`} key={id}> 
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className="sidebarChat-info">
            <h2>
                {name}
            </h2>
            <p>
                {messages[0]?.message}
            </p>
            </div>

         </div>
        </Link>
    ) : (
        <div onClick={createChat} className="sidebarChat">
            <h2 className="add-new-chat">Add New Chat</h2>
        </div>
    );
}

export default SidebarChat
