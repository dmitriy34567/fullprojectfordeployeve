
    import React, { useContext, useEffect, useState } from 'react';
    import { Container,Button } from 'react-bootstrap';
    import { observer } from 'mobx-react-lite';
    import { Context } from '../index';
    import { useHistory } from 'react-router-dom';
    import   GetUserInfoFromToken  from '../store/GetUserInfoFromToken';
    import {EDIT_EVENT} from "../utils/consts";
    
    const MyEvents = observer(() => {
      const { event } = useContext(Context);
      const [events, setEvents] = useState([]);
      const [click, setClick] = useState(false);
      const history = useHistory();
        
      const MyId = GetUserInfoFromToken()

      useEffect(() => {
        const fetchAllEvents = async () => {
          try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}api/event/author/${MyId}`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setEvents(data);
          } catch (error) {
            console.error('Error fetching events:', error);
          }
        };
    
        fetchAllEvents();
      }, []);
    
      const redirectToEvent = (eventId) => {
        history.push(`/event/${eventId}`);
        setClick(true) 
      };

      const redirectToEdit = (eventId) => {
       
          history.push(`/edit_event/${eventId}`);
               
      };

      const reversedEvents = [...events].reverse();
      return (
        <Container>
    <h3 style={{
      marginBottom: '20px',
      marginTop: '20px',
      textAlign: 'center'
    }}>My Events</h3>
    {reversedEvents.length > 0 ? (
      reversedEvents.map((event) => (
        <div 
        key={event.id}
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          marginBottom: '10px',
          marginTop: '10px',
          cursor: 'pointer', 
          display: 'flex',
          alignItems: 'center'
        }}>
         <div onClick={() => redirectToEvent(event.id)} style={{ width: '90%' }}>
  <h3>{event.title}</h3>
  <p>{event.description}</p>
  
  <p>Contact information now {event.contactsdetails} (доступна тільки для доданих вами користувачів)</p>
<div
    style={{
      background: event.active ? 'green' : 'red',
      color: 'white',
      padding: '5px',
      borderRadius: '5px',
      display: 'inline-block',
    }}
  >
    {event.active ? 'Active' : 'Not active'}
  </div>



</div>

        
        <div style={{
          
          padding: '10px',
          marginBottom: '10px',
          marginTop: '10px',
          
      
        }}>
        <Button onClick={() => redirectToEdit(event.id)}>Edit</Button>
      </div>
      </div>
      ))
    ) : (
      <h3 style={{
        marginBottom: '20px',
        marginTop: '20px',
        textAlign: 'center'
      }}>Ви ще не створили жодного івенту</h3>
    )}
  </Container>
      );
    });
    
    export default MyEvents;