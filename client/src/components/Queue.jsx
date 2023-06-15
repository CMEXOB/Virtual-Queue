import React, {useContext, useEffect, useState} from 'react';
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import Item from "./Item";
import {UserContext} from "../context";
import {useNavigate} from "react-router-dom";

const Queue = (props) => {
    let sock = new SockJS(props.url + props.socketEndpoint)
    let stompClient = over(sock)
    const [queue, setQueue] = useState([])
    const {user, setUser} = useContext(UserContext)
    const navigate  = useNavigate()
    useEffect(() =>{
        stompClient.connect({}, onConnect)

        fetch(props.url + '/queue')
            .then(response => response.json())
            .then(data => {
                setQueue(data)
            })
    },[])
    const onConnect = ()=>{
        stompClient.subscribe('/client/take', take)
        stompClient.subscribe('/client/leave', leave)
    }

    const take = (message) => {
        let newInQueue = JSON.parse(message.body)
        setQueue(oldQueue => {
            return [...oldQueue, newInQueue]
        })
        setUser(oldUser => {
            if(oldUser.name === newInQueue.name){
               return newInQueue
            }
            else {
                return oldUser
            }
        })
    }

    const leave = (message) => {
        let leaveFromQueue = JSON.parse(message.body)
        let newQueue = []

        setQueue(oldQueue => {
            oldQueue.forEach((oldInQueue) => {
                if(leaveFromQueue.name !== oldInQueue.name){
                    if(leaveFromQueue.number > oldInQueue.number){
                        newQueue = [...newQueue, oldInQueue]
                    }
                    else {
                        newQueue = [...newQueue, {
                            name: oldInQueue.name,
                            number: (oldInQueue.number - 1)
                        }]
                    }
                }
            })
            return newQueue
        })

        setUser(oldUser => {
            return {name:oldUser.name, number:0}
        })
    }
    const takeQueue =  () => {
        stompClient.send("/server/take", {}, JSON.stringify({'name': user.name}))
    }
    const leaveQueue = () => {
        stompClient.send("/server/leave", {}, JSON.stringify({'name': user.name, 'number': user.number}))
    }
    const logOut =  async () => {
        sock.close()
            fetch(props.url + '/logout', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'name': user.name, 'number': user.number})
        })
            .then(response => response.json())
            .then(data => {
                setUser({name:'', number:0})
                navigate("/login")
            })
    }

    return (
        <div>
            <div>User: {user.name}</div>
            <div>
                <button disabled={!(user.number === 0)} onClick={takeQueue}>Take the queue</button>
                <button disabled={(user.number === 0)} onClick={leaveQueue}>Leave the queue</button>
                <button onClick={logOut}>Logout</button>
            </div>
            <div>
                {queue.map((item) =>
                    <Item item={item}/>
                )}
            </div>
        </div>
    );
};

export default Queue;