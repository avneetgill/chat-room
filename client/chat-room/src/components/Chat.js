import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;

const Chat = ({location}) => {
    const[name, setName] = useState('');
    const[room, setRoom] = useState('');
    const endpoint = 'localhost:5000';
    
    useEffect(() =>{
        const {name, room}= queryString.parse(location.search);
        console.log(name,room)

        socket = io(endpoint, {transports: ['websocket']});

        setName(name);
        setRoom(room);

        socket.emit('join', {name,room});
      
    }, [endpoint,location.search]);

    return(
        <h1>Chat</h1>
    )
}

export default Chat;