import React, {useEffect, useState} from "react";
import { Homeform } from "components/schedule";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Schedule = () => {    
    const navigate = useNavigate();
    const [cookies, , removeCookies] = useCookies(['loginkey']);

    const [ scheduleDatas, setScheduleDatas ] = useState([
        {
        _id: '',
        Title: '',
        StartDate: '',
        EndDate: '',
        Details: '',
        State: ''
        }
    ]);

    useEffect(() => {
        const loadscheduleData = async() => {
            await axios.get(`/api/schedule/${cookies.loginkey}`).then((Response) => {
                setScheduleDatas(Response.data);
            }).catch((Error) => {
                console.log(Error);
            })
        }
        loadscheduleData();
    }, []); 
    
    const handleClickLogOut = () => {
        removeCookies('loginkey');
        navigate('/');
    }

    return(<Homeform scheduleDatas={scheduleDatas} handleClickLogOut={handleClickLogOut}/>);
};

export default Schedule;