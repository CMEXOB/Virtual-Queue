import React, {useEffect, useState} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import Queue from "./components/Queue";
import './styles/App.css'
import {UserContext} from "./context";
function App() {
  const [user, setUser] = useState({name:'', number:0})
    const [isAuth, setIsAuth] = useState(false)
    const url = "http://localhost:8080"
    const socketEndpoint = '/virtual-queue-websocket'

    useEffect(() => {
        const name = localStorage.getItem('name')
        const number = localStorage.getItem('number')
        if (name) {
            setUser({name:name, number:parseInt(number)})
        }
        else {
            setUser({name:'', number:0})
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('name', user.name);
        localStorage.setItem('number', user.number);
    }, [user]);

  return (
      <UserContext.Provider value={
          {
              user,
              setUser,
              url,
              socketEndpoint
          }
      }>
          <div className="App">
              <BrowserRouter>
                  <Routes>
                      <Route path="/login" element={<Login/>}/>
                      <Route path="/queue" element={<Queue/>}/>
                      <Route
                          path="*"
                          element={<Navigate to="/login" replace />}
                      />
                  </Routes>
              </BrowserRouter>
          </div>
      </UserContext.Provider>
  );
}

export default App;
