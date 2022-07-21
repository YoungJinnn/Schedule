import React, { useState, useEffect } from "react";
import axios from 'axios';

import { Login } from "domain/login";

const MainPresenter = () => {
    const [ tests, setTests ] = useState([
        {
        _id: 'Error',
        Name: '',
        Phone: ''
        }

    ]);

    useEffect(() => {
        const loadTest = async() => {
            await axios.get('/api/tests').then((Response) => {
                setTests(Response.data);
                console.log(Response)
            }).catch((Error) => {
                console.log('Error');
                console.log(Error);
            })
        }
        loadTest();
    }, []);

    return(
        <>
            <Login data={tests}/>
        </>
    );
};

export default MainPresenter;