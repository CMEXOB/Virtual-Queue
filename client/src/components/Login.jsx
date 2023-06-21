import React, {useContext, useState} from 'react';
import { useNavigate } from "react-router-dom";
import {UserContext} from "../context";
import {Alert, Button, Form} from "react-bootstrap";

const Login = (props) => {
    const {user, setUser, url, setIsAuth, setIsLoading} = useContext(UserContext)
    const [isAlert, setIsAlert] = useState(false)
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
                    setIsAlert(true)
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
            {isAlert ?
                <Alert key={"danger"} variant={"danger"}>
                    This name is already taken!
                </Alert>
                : null
            }
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