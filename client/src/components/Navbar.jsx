import React, {useContext} from 'react';
import {UserContext} from "../context";
import {useNavigate} from "react-router-dom";

const Navbar = ({stompClient}) => {

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
            .then(response => response.json())
            .then(data => {
                setUser({name:'', number:0})
                setIsAuth(false)
                navigate("/login")
            })
    }

    return (
        <div>
            <button disabled={!(user.number === 0)} onClick={takeQueue}>Take the queue</button>
            <button disabled={(user.number === 0)} onClick={leaveQueue}>Leave the queue</button>
            <button onClick={logOut}>Logout</button>
        </div>
    );
};

export default Navbar;