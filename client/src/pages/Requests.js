import React, { useState, useEffect } from 'react';
import { Button, Container, Tabs, Tab  } from 'react-bootstrap';
import GetUserInfoFromToken from '../store/GetUserInfoFromToken';
import { NavLink } from 'react-router-dom';

const Requests = () => {
  const [requests, setRequests] = useState(null);
  const [detailsreq, setDetailsReq] = useState(null);
  const [activeTab, setActiveTab] = useState('joinRequests');

  // get all join req 
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          console.error('Token not found');
          return;
        }

        const recieverId = GetUserInfoFromToken();
        const response = await fetch(`${process.env.REACT_APP_API_URL}api/reqevent/${recieverId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setRequests(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  //get all ansver reqests with contact info
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          console.error('Token not found');
          return;
        }

        const recieverId = GetUserInfoFromToken();
        const responseAnsvers = await fetch(`${process.env.REACT_APP_API_URL}api/ansverreq/reciever/${recieverId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!responseAnsvers.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await responseAnsvers.json();
        setDetailsReq(data);
        if (responseAnsvers.ok) {
          console.log(data)
        }
        
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchDetails();
  }, []);

  // edit when click on approve deny
  const AnsverOnReq = async (ansver, reqId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}api/reqevent/${reqId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          aprooved: ansver,
          active: false,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedRequests = requests.map((request) =>
        request.id === reqId ? { ...request, aprooved: ansver, active: false } : request
      );
      setRequests(updatedRequests);
    } catch (error) {
      console.error('Error processing request:', error);
    }
  };

  if (requests === null) {
    return <div>Loading...</div>;
  }


  
  

  const sortedRequests = [...requests].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  //const sortedAnsvers = [...detailsreq].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <Container className="d-flex flex-column">
      

      <Tabs activeKey={activeTab} onSelect={(key) => setActiveTab(key)} style={{ marginTop: '10px' }}>
      <Tab eventKey="joinRequests" title="Запити">
  {sortedRequests && sortedRequests.length > 0 ? (
    sortedRequests.map((request) => (
      <div
        key={request.id}
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          marginBottom: '10px',
          marginTop: '10px',
          backgroundColor: !request.active && request.aprooved ? 'green' : !request.active && !request.aprooved ? 'red' : 'transparent',
        }}
      >
        <NavLink to={`/user_profile/${request.authorId}`}>
          <h3>who want join: {request.name}</h3>
        </NavLink>
        <NavLink to={`/event/${request.eventId}`}>
          <h3>event: {request.eventTittle}</h3>
        </NavLink>
        <h3>aprooved: {request.aprooved ? 'true' : 'false'}</h3>
        <h3>is active: {request.active ? 'true' : 'false'}</h3>
        <p>message: {request.description}</p>
        {request.active && (
          <div style={{ display: 'flex', gap: '10px' }}>
            <Button variant="success" onClick={() => AnsverOnReq(true, request.id)}>
              Aprove
            </Button>
            <Button variant="danger" onClick={() => AnsverOnReq(false, request.id)}>
              Deny
            </Button>
          </div>
        )}
      </div>
    ))
  ) : (
    <p>No join requests available</p>
  )}
</Tab>
        <Tab eventKey="answerRequests" title="Відповіді">
  {detailsreq && detailsreq.length > 0 ? (
    detailsreq.map((request) => (
      <div
        key={request.id}
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          marginBottom: '10px',
          marginTop: '10px',
         
        }}
      >
        <h3>Привіт! Можеш приєднатися якщо маєш настрій</h3>
        <NavLink to={`/user_profile/${request.authorId}`}>
          <h3>Автор: {request.authorId}</h3>
        </NavLink>

        <NavLink to={`/event/${request.eventId}`}>
          <h3>event: {request.tittleOfEvent}</h3>
        </NavLink>

        <p>З вами поділилися контактами: {request.contactDetails}</p>
      </div>
    ))
  ) : (
    <p>No answer requests available</p>
  )}
</Tab>
      </Tabs>
    </Container>
  );
};

export default Requests;
