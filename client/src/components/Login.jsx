import React, {useContext} from 'react';
import { useNavigate } from "react-router-dom";
import {UserContext} from "../context";
import {Button, Form} from "react-bootstrap";

const Login = (props) => {
    const {user, setUser, url, setIsAuth, setIsLoading} = useContext(UserContext)
    const navigate  = useNavigate();
    const logIn =  (e) => {
        e.preventDefault()
        let json = JSON.stringify({'name':user.name})
        fetch(url+'/login',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: json
        })
            .then(response => response.json())
            .then(data => {
                if(data === "FORBIDDEN"){
                    alert("User " + user.name + " already exist!")
                }
                else {
                    setIsAuth(true)
                    setIsLoading(true)
                    navigate("/queue");
                }
            })
    }
    return (
        <Form className="login-form position-absolute top-50 start-50 translate-middle">
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Your name:</Form.Label>
                <Form.Control type="text" placeholder="Enter your name"
                              value={user.name}
                              onChange={e=> setUser({name:e.target.value, number:user.number})}/>
            </Form.Group>
            <Button className="w-100" variant="primary" onClick={logIn}>Login</Button>
        </Form>
    );
};

export default Login;