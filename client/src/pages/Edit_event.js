import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, Modal, Form } from 'react-bootstrap';
import { sendPostRequestForJoin } from '../http/requestsAPI';
import   GetUserInfoFromToken  from '../store/GetUserInfoFromToken';
import { NavLink, useHistory } from 'react-router-dom';
import {MY_EVENRS_ROUTE} from "../utils/consts";

const Edit_event = () => {
  // Перевірка наявності даних перед використанням
  

  const { idEvent } = useParams();
  const [eventData, setEventData] = useState(null);
  const [name, setName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isRequestSent, setIsRequestSent] = useState(false);

  const [data, setData] = useState('');
  const [time, setTime] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  
  const [contactsdetails, setContactsdetails] = useState('');
  const token = localStorage.getItem('token');
  const history = useHistory();

  const [active, setActive] = useState('');

  useEffect(() => {
    const Storagename = localStorage.getItem('name');
    setName(Storagename);
    
  }, []); // Передайте пустий масив залежностей, щоб useEffect виконався тільки під час монтажу компоненту

  // ...


  useEffect(() => {
    const fetchEvent = async () => {
      try {
        
        const response = await fetch(`http://localhost:5000/api/event/${idEvent}`, {
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

  
  const EditEvent = async () => {

    try {
      const formData = new FormData();
  
      if (active !== null && active !== '') {
        formData.append('active', active);
      }
      if (data !== null && data !== '') {
        formData.append('data', data);
      }
      if (time !== null && time !== '') {
        formData.append('time', time);
      }
      if (title !== null && title !== '') {
        formData.append('title', title);
      }
      if (description !== null && description !== '') {
        formData.append('description', description);
      }
      if (country !== null && country !== '') {
        formData.append('country', country);
      }
      if (city !== null && city !== '') {
        formData.append('city', city);
      }
      if (contactsdetails !== null && contactsdetails !== '') {
        formData.append('contactsdetails', contactsdetails);
      }
      
      

      
      const response = await fetch(`http://localhost:5000/api/event/${idEvent}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      if (response.ok) {
        

        history.push(MY_EVENRS_ROUTE);
      }
      
      // Обработка успешного ответа, если необходимо
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  }
  const Cancel = () => {
       
    history.push(`/my_events`);
         
};

  if (!eventData) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="d-flex flex-column">
    {eventData.map((event) => (
      <Form >
      <div key={event.id} style={{
        marginBottom: '20px',
        marginTop: '20px'
        
      }}> {/* Add a unique key for each mapped element */}
        <NavLink to={`/user_profile/${event.userid}`}>

        <h3>Author {event.authorName}</h3>

        </NavLink>
        
        <h3>Title {event.title}</h3>

        <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              />
         </Form.Group>

        <p>Description {event.description}</p>

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                />
              </Form.Group>

        <p>Country: {event.country}</p>

              <Form.Group controlId="country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    as="select"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  >
                    <option value="">Select a country</option>
                    <option value="Ukraine">Ukraine</option>
                  </Form.Control>
               </Form.Group>

        <p>City: {event.city}</p>

            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                as="select"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              >
                <option value="">Select a city</option>
                <option value="Kyiv">Kyiv</option>
                <option value="Lviv">Lviv</option>
              </Form.Control>
        </Form.Group>

        <p>Date: {event.data}</p>

        <Form.Group controlId="data">
       <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
                required
              />
            </Form.Group>

        <p>Time: {event.time}</p>

        <Form.Group controlId="data">
       <Form.Label>Time</Form.Label>
       <Form.Control
         type="time"
         value={time}
         onChange={(e) => setTime(e.target.value)}
         required
       />
     </Form.Group>
     <p>Contact information now {event.contactsdetails}</p>
     <Form.Group controlId="contactsdetails">
          <Form.Label>Contact information (only for approved users)</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={contactsdetails}
            onChange={(e) => setContactsdetails(e.target.value)}
            required
          />
        </Form.Group>
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
        <Form.Group controlId="active">
              <Form.Label></Form.Label>
              <Form.Control
                as="select"
                value={active}
                onChange={(e) => setActive(e.target.value)}
                required
              >
                <option value="">Status of event</option>
                <option value="true">active</option>
                <option value="false">not active</option>
              </Form.Control>
        </Form.Group>
      </div>
      </Form>
    ))}
    
    <Button onClick={EditEvent} style={{
        marginBottom: '20px',
        
        
      }}>Save</Button>

      <Button onClick={Cancel} style={{
        marginBottom: '20px',
        
        
      }}>Cancel </Button>

  </Container>
  

   
);
};


export default Edit_event;
