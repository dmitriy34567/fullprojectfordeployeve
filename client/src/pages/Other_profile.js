import React, { useState, useEffect, useContext } from 'react';
import { Button, Container } from 'react-bootstrap';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import { useHistory } from 'react-router-dom';
import { PROFILE_EVENTS} from "../utils/consts";
import { useParams } from 'react-router-dom';

const Other_profile = observer(() => {
    const { idUser } = useParams();
  const {user} = useContext(Context)
  const token = localStorage.getItem('token');
  const [profile, setProfile] = useState(null);
  const history = useHistory();
  
 
 

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
        const response = await fetch(`http://localhost:5000/api/profile/${idUser}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            
          },
          
        },);

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

  const redirectToEvent = (idUser) => {
    history.push(`/profile_events/${idUser}`);
  };

  return (
    <Container className="d-flex flex-column">
      {profile ? (
        profile.map((profiles) => (
          <div key={profiles._id} style={{ display: 'flex', alignItems: 'flex-start', marginTop: '20px' }}>
            {profiles.img ? ( // Перевірка, чи є фото
              <img
                src={`http://localhost:5000/${profiles.img}`}
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
                src={`http://localhost:5000/1.jpg`}
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
            
              <h3>Name: {profiles.name}</h3>
              <p>Description: {profiles.description}</p>
              <p>Hobbies: {profiles.hobbies}</p>
              <p>Country: {profiles.country}</p>
              <p>City: {profiles.city}</p>
              <p>Age: {profiles.age}</p>
              <Button onClick={() => redirectToEvent(profiles.userid)  } style={{
               
               marginTop: '40px'
             }}>Events by this author</Button>
            </div>
            
          </div>
          
        ))
      ) : (
        <p>Loading...</p>
      )}
      
    </Container>
  );
});

export default Other_profile;
