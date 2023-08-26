import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import   GetUserInfoFromToken  from '../store/GetUserInfoFromToken';
import { useHistory } from 'react-router-dom';
import {ALL_EVENTS_ROUTE} from "../utils/consts";

const NewProfile = () => {
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [hobbies, setHobbies] = useState(null);
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [age, setAge] = useState(null);
  const [img, setImg] = useState(null); // Для загрузки изображения
  const userid = GetUserInfoFromToken()
  const history = useHistory();
  const token = localStorage.getItem('token');
  const [valid, setValid] = useState(true);

  const handleCreateProfile = async () => {
    
    try {
      const formData = new FormData();
      if (!img) {
        formData.append('userid', userid);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('hobbies', hobbies);
        formData.append('country', country);
        formData.append('city', city);
        formData.append('age', age);
      }else{
        formData.append('userid', userid);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('hobbies', hobbies);
        formData.append('country', country);
        formData.append('city', city);
        formData.append('age', age);
        formData.append('img', img); 
      }
      

      // Отправляем POST-запрос на сервер
      const response = await fetch(`${process.env.REACT_APP_API_URL}api/profile/create`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData,
      });

      if (!response.ok) {
        setValid(false);
        throw new Error('Network response was not ok');
        
      }
      if (response.ok) {

        localStorage.setItem('name', name);

        history.push(ALL_EVENTS_ROUTE);
      }
      
      // Обработка успешного ответа, если необходимо
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  return (
    <Container className="d-flex flex-column"  style={{
      
      marginTop: '20px',
      marginBottom: '20px',
    }}>
      <Form>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          />
        </Form.Group>

        <Form.Group controlId="hobbies">
          <Form.Label>Hobbies</Form.Label>
          <Form.Control
            type="text"
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
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

        <Form.Group controlId="age">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required 
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </Form.Group>
      </Form>

      <Button onClick={handleCreateProfile}>Create Profile</Button>
      <div>
      {valid ? false : <p style={{ color: 'red' }}>Заповніть усі поля</p>}
      </div>
    </Container>
  );
};

export default NewProfile;



