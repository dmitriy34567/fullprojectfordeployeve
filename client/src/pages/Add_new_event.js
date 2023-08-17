import React, { useState, useEffect  } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import GetUserInfoFromToken from '../store/GetUserInfoFromToken';
import { useHistory } from 'react-router-dom';
import {ALL_EVENTS_ROUTE} from "../utils/consts";


const NewEvent = () => {
  const userid = GetUserInfoFromToken();


  const [data, setData] = useState('');
  const [time, setTime] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [contactsdetails, setContactsdetails] = useState(null);
  const token = localStorage.getItem('token');
  const history = useHistory();

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setAuthorName(storedName);
    }
  }, []); 



  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const eventData = { userid, authorName, data, time, title, description, country, city, contactsdetails };
    console.log(token);
    console.log(eventData);
    try {
      const response = await fetch('http://localhost:5000/api/event/create', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });
      console.log(response);
      if (response.ok) {
        history.push(ALL_EVENTS_ROUTE);
        console.log('Подію успішно створено!');
      } else {
        console.error('Помилка при створенні події:', response.status);
      }
    } catch (error) {
      console.error('Помилка при створенні події:', error);
    }
  };

  return (
    <Container style={{ marginTop: '20px', marginBottom: '20px' }}>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

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

        <Form.Group controlId="data">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="data">
          <Form.Label>Time</Form.Label>
          <Form.Control
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </Form.Group>

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

        <Button type="submit">Create Event</Button>
      </Form>
    </Container>
  );
};

export default NewEvent;
