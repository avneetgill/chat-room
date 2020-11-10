import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Button, Form } from 'react-bootstrap';
import styled from 'styled-components';



const Join = () => {
    const [name, setName] = useState('');
    const[room, setRoom] = useState('');
   
    return(
        <div>
            <Form class="in-line">
                <Form.Group controlId="Nickname">
                <Form.Label>Nickname</Form.Label>
                <Form.Control type="name" placeholder="Enter name" onChange={(event) => setName(event.target.value)} />
                </Form.Group>
      
                <Form.Group controlId="Room">
                <Form.Label>Room</Form.Label>
                <Form.Control type="room" placeholder="Room" onChange={(event) => setRoom(event.target.value)}/>
                </Form.Group>
            </Form>
 

            <Link onClick = {event => (!name || !room) ? event.preventDefault() : null} to={`./chat?name=${name}&room=${room}`}>
                <Button variant="dark" type="submit">
                    Sign In
                </Button>
            </Link> 
        </div>

    )
}

export default Join;