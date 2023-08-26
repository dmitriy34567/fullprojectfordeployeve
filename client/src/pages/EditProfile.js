import React, { useState, useEffect, useContext } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import   GetUserInfoFromToken  from '../store/GetUserInfoFromToken';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import { useHistory } from 'react-router-dom';
import {PROFILE_ROUTE} from "../utils/consts";

const EditProfile = observer(() => {

  const {user} = useContext(Context)
  const token = localStorage.getItem('token');
  const [profile, setProfile] = useState(null);
  const history = useHistory();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [hobbys, setHobbies] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [age, setAge] = useState(null);

  

  const [img, setImg] = useState(null); // Для загрузки изображения

  const MyId = GetUserInfoFromToken()
  console.log(MyId)

  const EditProfile = async () => {

    try {
      const formData = new FormData();
      
     

      if (name !== null && name !== '') {
        formData.append('name', name);
      }
      if (description !== null && description !== '') {
        formData.append('description', description);
      }
      if (hobbys !== null && hobbys !== '') {
        formData.append('hobbys', hobbys);
      }
      if (country !== null && country !== '') {
        formData.append('country', country);
      }
      if (city !== null && city !== '') {
        formData.append('city', city);
      }
      if (age !== null && age !== '') {
        formData.append('age', age);
      }
      if (img !== null) {
        formData.append('img', img);
      }

      
      const response = await fetch(`${process.env.REACT_APP_API_URL}api/profile/${MyId}`, {
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
        

        history.push(PROFILE_ROUTE);
      }
      
      // Обработка успешного ответа, если необходимо
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  }


  useEffect(() => {
    // Функция для получения данных профиля с сервера
    const fetchProfileData = async () => {
      try {
        // Получаем токен из localStorage
        

        if (!token) {
          console.error('Token not found');
          return;
        }

        // Декодируем токен для получения ID клиента
        

        // Отправляем GET-запрос на сервер
        const response = await fetch(`${process.env.REACT_APP_API_URL}api/profile/${MyId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            
          },
          
        }, console.log(MyId));

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setProfile(data); // Записываем полученные данные в состояние
        
        
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData(); // Вызываем функцию при монтировании компонента
  }, []);

  

  return (
    <Container className="d-flex flex-column">
      {profile ? (
        profile.map((profiles) => (
          <div key={profiles._id} style={{ display: 'flex', alignItems: 'flex-start', marginTop: '20px' }}>
            {profiles.img ? ( // Перевірка, чи є фото
              <img
                src={`${process.env.REACT_APP_API_URL}${profiles.img}`}
                alt="Profile Image"
                style={{
                  width: '400px',
                  height: '400px',
                  marginRight: '20px',
                  marginBottom: '20px',
                }}
              />
              
            ) : (
              <img
                src={`${process.env.REACT_APP_API_URL}1.jpg`}
                alt="Profile Image"
                style={{
                  width: '400px',
                  height: '400px',
                  marginRight: '20px',
                  marginBottom: '20px',
                }}
              />
            )}
            <div>
            <Form>

                <Form.Group>
              <Form.Label>new Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImg(e.target.files[0])}
              />
              </Form.Group>

              <h3>Name: {profiles.name}</h3>

              <Form.Group controlId="name">
              <Form.Label>new Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
                />
              </Form.Group>

              <p>Description: {profiles.description}</p>

              
              <Form.Group controlId="description">
                <Form.Label>new Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>

              <p>Hobbies: {profiles.hobbys}</p>

                
                 <Form.Group controlId="hobbys">
                <Form.Label>new Hobbies</Form.Label>
                <Form.Control
                  type="text"
                  value={hobbys}
                  onChange={(e) => setHobbies(e.target.value)}
                />
              </Form.Group>


              <p>Country: {profiles.country}</p>

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

              <p>City: {profiles.city}</p>

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

              <p>Age: {profiles.age}</p>

              <Form.Group controlId="age">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value))}
                required 
              />
            </Form.Group>


            </Form>
            <Button onClick={EditProfile} style={{
        marginBottom: '20px'
        
      }}>Save Changes</Button>
            </div>
           
          </div>
          
        ))
      ) : (
        <p>Loading...</p>
      )}
      
    </Container>
       
  );
});

export default EditProfile;
