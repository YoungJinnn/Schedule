import React, { useState } from "react";
import { ScheduleCreateform } from "components/schedule";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const ScheduleCreate = () => {
    const [cookies] = useCookies(['loginkey'])
    const navigate = useNavigate();
    const [schedule, setSchedule] = useState({
        title: '',
        // startdate: '',
        // enddate: '',
        details: '',
        // state: ''
    });
    const handleChangeSchedule = (event) => {
        let changeSchedule = {...schedule};
        changeSchedule[event.target.name] = event.target.value;
        setSchedule(changeSchedule);
    };

    const [startdate, setStartDate] = useState(new Date());
    const [enddate, setEndDate] = useState(new Date());

    

    const [state, setState] = React.useState('');
    const handleChange = (event) => {
        setState(event.target.value);
    };

    const handleClickSchedule = async() =>{
        const formData = new FormData();
        formData.append('Title', schedule.title);
        formData.append('Details', schedule.details);
        formData.append('StartDate', startdate);
        formData.append('EndDate', enddate);
        formData.append('State', state);
        formData.append('User_id', cookies.loginkey);

        const config = {
            headers: {
                "content-type": "multipart/form-data"
            }
        }
        await axios.post("/api/schedule", formData, config).then((response)=>{
            navigate('/schedule');
        }).catch((Error)=>{
            console.log(Error);
        })
    };

    return(<ScheduleCreateform 
        schedule={schedule}
        handleChangeSchedule={handleChangeSchedule}
        startdate={startdate}
        setStartDate={setStartDate}
        enddate={enddate}
        setEndDate={setEndDate}
        state={state}
        handleChange={handleChange}
        handleClickSchedule={handleClickSchedule}

    />);
};

export default ScheduleCreate;