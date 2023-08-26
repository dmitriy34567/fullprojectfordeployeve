import React, { useState, useEffect, useContext } from 'react';
import { Button, Container } from 'react-bootstrap';
import   GetUserInfoFromToken  from '../store/GetUserInfoFromToken';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import { useHistory } from 'react-router-dom';
import {EDIT_PROFILE, MY_EVENRS_ROUTE} from "../utils/consts";

const Profile = observer(() => {

  const {user} = useContext(Context)
  const token = localStorage.getItem('token');
  const [profile, setProfile] = useState(null);
  const history = useHistory();
  const LogOut = () => {
        
        
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token');
        

};
 
 

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
        const MyId = GetUserInfoFromToken()

        // Отправляем GET-запрос на сервер
        const response = await fetch(`${process.env.REACT_APP_API_URL}api/profile/${MyId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            
          },
          
        }, );

        if (!response.ok) {
          throw new Error('Network response was not ok');
          
        }

        const data = await response.json();
        setProfile(data); // Записываем полученные данные в состояние
        
        if (data && data.length > 0) {
          const name = data[0].name;
          localStorage.setItem('name', name);
        }
        
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
              <h3>Name: {profiles.name}</h3>
              <p>Description: {profiles.description}</p>
              <p>Hobbies: {profiles.hobbys}</p>
              <p>Country: {profiles.country}</p>
              <p>City: {profiles.city}</p>
              <p>Age: {profiles.age}</p>
              
              <Button onClick={() =>{history.push(EDIT_PROFILE)}  } style={{
               
               marginTop: '40px',
               
               marginLeft: '40px'
             }}>Edit Profile</Button>
            </div>
            
          </div>
          
        ))
      ) : (
        <p>Loading...</p>
      )}
      <Button onClick={() => LogOut()} style={{
                  
                  marginTop: '100px'
                  
                }}>Log Out</Button>
    </Container>
  );
});

export default Profile;
// {profile.img && (
  //<img src={`http://localhost:5000/${profile.img}`} alt="Profile Image" />
  //)}