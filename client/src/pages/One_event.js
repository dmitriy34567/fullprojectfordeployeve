import React, { useState, useEffect } from 'react';
import { useParams, Redirect  } from 'react-router-dom';
import { Button, Container, Modal, Form } from 'react-bootstrap';
import { sendPostRequestForJoin } from '../http/requestsAPI';
import   GetUserInfoFromToken  from '../store/GetUserInfoFromToken';
import { NavLink, useHistory } from 'react-router-dom';

const OneEvent = () => {
  // Перевірка наявності даних перед використанням
  
  
  const { idEvent } = useParams();
  const [eventData, setEventData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [reciverId, setReciverId] = useState(null); // Додайте стан для reciverId
  const [description, setDescription] = useState(null); // Додайте стан для eventId
  const [contactDetails, setContactInfo] = useState(null);
  const [name, setName] = useState(null);
  const [eventTittle, setEventTittle] = useState(null);
 

  useEffect(() => {
    const Storagename = localStorage.getItem('name');
    setName(Storagename);
    
  }, []); 


  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.REACT_APP_API_URL}api/event/${idEvent}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const eventData = await response.json();
        setEventData(eventData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching event data:', error);
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [idEvent]);


  useEffect(() => {
    // Проверяем, был ли запрос на добавление уже отправлен
    const joinRequested = localStorage.getItem(`joinRequested_${idEvent}`);
    if (joinRequested) {
      setIsRequestSent(true);
    }
  }, [idEvent]);

  const handleShowModal = (userid, tittle, info) => {
    setReciverId(userid)
    setEventTittle(tittle)
    setContactInfo(info)
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSend = () => {
    
    const authorId = GetUserInfoFromToken()
    sendPostRequestForJoin(authorId, reciverId, idEvent, description, name, eventTittle, contactDetails);
    setIsRequestSent(true);
    localStorage.setItem(`joinRequested_${idEvent}`, 'true');
    handleCloseModal()
  };

  if (!eventData) {
    return <div>Loading...</div>;
  }

  if (eventData.length === 0) {
    
    return <Redirect to="/not_found" />;
  }

  return (
    <Container className="d-flex flex-column">
    {eventData.map((event) => (
      <div key={event.id} style={{
        marginBottom: '20px',
        marginTop: '20px'
        
      }}> {/* Add a unique key for each mapped element */}
        <NavLink to={`/user_profile/${event.userid}`}>
        <h3>Author {event.authorName}</h3>
        </NavLink>
        <h3>Title {event.title}</h3>
        <p>Description {event.description}</p>
        <p>Country: {event.country}</p>
        <p>City: {event.city}</p>
        <p>Date: {event.data}</p>
        <p>Time: {event.time}</p>
      </div>
    ))}
    {isRequestSent ? (
        <Button disabled variant="success">
          Запит відправлено
        </Button>
      ) : (
        <Button onClick={() => handleShowModal(eventData[0].userid, eventData[0].title, eventData[0].contactsdetails)}>I want to join</Button>
      )}
    
    
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Join Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        <Form>
          <Form.Group controlId="formText">
            <Form.Label>Supplementary Text</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter text"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSend}>
          Send
        </Button>
      </Modal.Footer>
    </Modal>

  </Container>
);
};


export default OneEvent;
