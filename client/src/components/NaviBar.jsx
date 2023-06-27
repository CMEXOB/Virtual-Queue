import React, {useContext} from 'react';
import {UserContext} from "../context";
import {useNavigate} from "react-router-dom";
import {Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";

const NaviBar = ({stompClient}) => {

    const {user, setUser, url, setIsAuth} = useContext(UserContext)
    const navigate  = useNavigate()

    const takeQueue =  () => {
        stompClient.send("/server/take", {}, JSON.stringify(user))
    }
    const leaveQueue = () => {
        stompClient.send("/server/leave", {}, JSON.stringify(user))
    }
    const logOut =  async () => {
        fetch(url + '/logout', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response =>
            {
                if(response.status === 200) {
                    setUser({name: '', number: 0})
                    setIsAuth(false)
                    navigate("/login")
                }
            })
    }

    return (
        <Navbar collapseOnSelect expand={"lg"} bg={"dark"} variant={"dark"} >
            <Container>
                <Navbar.Toggle aria-controls={"responsive-navbar-nav"}></Navbar.Toggle>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Action" id="collasible-nav-dropdown">
                            {
                                user.number === 0 ?
                                    <NavDropdown.Item>
                                    <Button variant="primary" onClick={takeQueue}>Take the queue</Button>
                                    </NavDropdown.Item>
                                :
                                    <NavDropdown.Item>
                                        <Button variant="primary" onClick={leaveQueue}>Leave the queue</Button>
                                    </NavDropdown.Item>
                            }
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <NavDropdown title={'User: ' + user.name} id="collasible-nav-dropdown">
                            <NavDropdown.Item>
                                <Button variant="primary" className={"mr-2"} onClick={logOut}>Logout</Button>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NaviBar;