import React, {useContext} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import {MY_EVENRS_ROUTE, ADD_EVENT, PROFILE_ROUTE, LOGIN_ROUTE, ALL_EVENTS_ROUTE, REQUESTS_ROUTE} from "../utils/consts";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {useHistory} from 'react-router-dom'



const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color:'white'}} to={ALL_EVENTS_ROUTE}>Eve - Find a company for yourself </NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: 'white'}}>

                           

                            <Button
                            variant="outline-light"
                            onClick={() => history.push(REQUESTS_ROUTE)}
                            className="ml-2"
                            >
                                
                            <img
                            src="http://localhost:5000/message.png"
                           
                            style={{ width: '50px', height: '50px' }} // Укажите нужные размеры картинки
                            
                            />
                        </Button>

                        <Button
                                variant={"outline-light"}
                                onClick={() => history.push(ADD_EVENT)}
                                className="ml-2"
                            >
                                Add Event
                            </Button>

                        <Button
                            variant={"outline-light"}
                            onClick={() => history.push(ALL_EVENTS_ROUTE)}
                            className="ml-2"
                        >
                            All events
                        </Button>
                        
                        <Button
                            variant={"outline-light"}
                            onClick={() => history.push(MY_EVENRS_ROUTE)}
                            className="ml-2"
                        >
                            My events
                        </Button>
                        
                        <Button
                            variant={"outline-light"}
                            onClick={() => history.push(PROFILE_ROUTE)}
                            className="ml-2"
                        >
                            My profile
                        </Button>

                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>

    );
});

export default NavBar;


