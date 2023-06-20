import React, {useContext, useEffect, useState} from 'react';
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import {UserContext} from "../context";
import ItemList from "./ItemList";
import Navbar from "./Navbar";

const Queue = (props) => {
    let sock = new SockJS(props.url + props.socketEndpoint)
    let stompClient = over(sock)
    const [queue, setQueue] = useState([])
    const {user, setUser} = useContext(UserContext)
    useEffect(() =>{
        stompClient.connect({}, onConnect)

        fetch(props.url + '/queue')
            .then(response => response.json())
            .then(data => {
                setQueue(data)
            })
        return () => {
            sock.close()
        }
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
        if(leaveFromQueue.name === user.name) {
            console.log(leaveFromQueue.name)
            console.log(user.name)
            setUser(oldUser => {
                return {name: oldUser.name, number: 0}
            })
        }
    }

    return (
        <div>
            <div>User: {user.name}</div>
            <Navbar user={user} stompClient={stompClient}/>
            <ItemList queue={queue}/>
        </div>
    );
};

export default Queue;