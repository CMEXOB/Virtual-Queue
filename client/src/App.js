import React, {useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './styles/App.css'
import {UserContext} from "./context";
import AppRouter from "./components/AppRouter";
function App() {
  const [user, setUser] = useState({name:'', number:0})
    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const url = "http://localhost:8080"
    const socketEndpoint = '/virtual-queue-websocket'

    useEffect(() => {
        const name = localStorage.getItem('name')
        const number = localStorage.getItem('number')
        const isAuth_ = localStorage.getItem('isAuth')
        if (name) {
            setUser({name:name, number:parseInt(number)})
        }
        else {
            setUser({name:'', number:0})
        }
        setIsAuth(isAuth_ === 'true')
    }, [])

    useEffect(() => {
        localStorage.setItem('name', user.name);
        localStorage.setItem('number', user.number);
    }, [user]);

    useEffect(() => {
        localStorage.setItem('isAuth', isAuth.toString());
    }, [isAuth]);

  return (
      <UserContext.Provider value={
          {
              user, setUser,
              url,
              socketEndpoint,
              isAuth, setIsAuth,
              isLoading, setIsLoading
          }
      }>
          <div className="App">
              <BrowserRouter>
                  <AppRouter/>
              </BrowserRouter>
          </div>
      </UserContext.Provider>
  );
}

export default App;
