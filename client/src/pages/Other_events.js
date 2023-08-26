
    import React, { useContext, useEffect, useState } from 'react';
    import { Container } from 'react-bootstrap';
    import { observer } from 'mobx-react-lite';
    import { Context } from '../index';
    import { useHistory } from 'react-router-dom';
    import { useParams } from 'react-router-dom';


    const MyEvents = observer(() => {
      const { event } = useContext(Context);
      const { idUser } = useParams();
      const [events, setEvents] = useState([]);
      const history = useHistory();
        
      

      useEffect(() => {
        const fetchAllEvents = async () => {
          try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}api/event/author/${idUser}`);
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
      };
      const reversedEvents = [...events].reverse();
      return (
        <Container>
    <h3 style={{
      marginBottom: '20px',
      marginTop: '20px',
      textAlign: 'center'
    }}>Events by this author</h3>
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
          }}
          onClick={() => redirectToEvent(event.id)}
        >
          <h3>{event.title}</h3>
          <p>{event.description}</p>
        </div>
      ))
    ) : (
      <p>У вас ще немає івентів</p>
    )}
  </Container>
      );
    });
    
    export default MyEvents;