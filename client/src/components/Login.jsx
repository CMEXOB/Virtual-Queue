import React, {useContext} from 'react';
import { useNavigate } from "react-router-dom";
import {UserContext} from "../context";

const Login = (props) => {
    const {user, setUser, url, setIsAuth} = useContext(UserContext)
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
                    navigate("/queue");
                }
            })
    }
    return (
        <div>
            <form  style={{margin : "100px", textAlign: "center"}}>
                <div>Your name:</div>
                <div>
                    <input
                        value={user.name}
                        onChange={e=> setUser({name:e.target.value, number:user.number})}
                        type="text"
                    />
                    <button onClick={logIn}>Login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;