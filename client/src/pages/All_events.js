import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { useHistory } from 'react-router-dom';

const Shop = observer(() => {
  const { event } = useContext(Context);
  const [events, setEvents] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/event/get');
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
      {reversedEvents.map((event) => (
        <div
          key={event.id}
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            marginBottom: '10px',
            marginTop: '10px',
            cursor: 'pointer',
          }}
          onClick={() => redirectToEvent(event.id)} // Додаємо обробник події для перенаправлення
        >
          <h3>{event.title}</h3>
          <p>{event.description}</p>
        </div>
      ))}
    </Container>
  );
});

export default Shop;