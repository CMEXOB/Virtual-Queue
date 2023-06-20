import React from 'react';
import {Spinner} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';

const Loader = () => {
    return (
        <Spinner animation="border" variant="primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    );
};

export default Loader;