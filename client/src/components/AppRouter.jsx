import React, {useContext} from 'react';
import {UserContext} from "../context";
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./Login";
import Queue from "./Queue";

const AppRouter = () => {
    const {isAuth} = useContext(UserContext)

    return (
        isAuth
            ?
            <Routes>
                <Route path="/queue" element={<Queue/>}/>
                <Route path="*" element={<Navigate to="/queue" replace />}/>
            </Routes>
            :
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="*" element={<Navigate to="/login" replace />}/>
            </Routes>
    );
};

export default AppRouter;