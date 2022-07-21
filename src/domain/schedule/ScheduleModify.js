import React, { useEffect, useState } from "react";
import { ScheduleModifyform } from "components/schedule";
import { useCookies } from "react-cookie";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ScheduleModify = () => {
    const { scheduleId } = useParams();
    const navigate = useNavigate();
    const [cookies] = useCookies(['loginkey']);
    const [ scheduleDatas, setScheduleDatas ] = useState([
        {
        _id: '',
        Title: '',
        // StartDate: '',
        // EndDate: '',
        Details: '',
        // State: ''
        }
    ]);
    const handleChangeSchedule = (event) => {
        let changeSchedule = {...scheduleDatas};
        changeSchedule[event.target.name] = event.target.value;
        setScheduleDatas(changeSchedule);
    };

    const [StartDate, setStartDate] = useState(new Date());
    const [EndDate, setEndDate] = useState(new Date());
    
    const [State, setState] = useState('');
    const handleChangeState = (event) => {
        setState(event.target.value);
    };

    useEffect(() => {
        const loadscheduleData = async() => {
            await axios.get(`/api/schedule/${cookies.loginkey}/${scheduleId}`).then((Response) => {
                setScheduleDatas({_id: Response.data._id, Title: Response.data.Title, Details: Response.data.Details});
                setStartDate(new Date(Response.data.StartDate));
                setEndDate(new Date(Response.data.EndDate));
                setState(Response.data.State);
            }).catch((Error) => {
                console.log(Error);
            })
        }
        loadscheduleData();
    }, []); 

    const handleClickSchedule = async() =>{
        const formData = new FormData();
        formData.append('_id', scheduleDatas._id);
        formData.append('Title', scheduleDatas.Title);
        formData.append('Details', scheduleDatas.Details);
        formData.append('StartDate', StartDate);
        formData.append('EndDate', EndDate);
        formData.append('State', State);
        formData.append('User_id', cookies.loginkey);

        const config = {
            headers: {
                "content-type": "multipart/form-data"
            }
        }
        await axios.patch("/api/schedule", formData, config).then((response)=>{
            navigate('/schedule');
        }).catch((Error)=>{
            console.log(Error);
        })
    };

    return(<ScheduleModifyform 
        scheduleDatas={scheduleDatas}
        StartDate={StartDate}
        setStartDate={setStartDate}
        EndDate={EndDate}
        setEndDate={setEndDate}
        State={State}
        handleChangeSchedule={handleChangeSchedule}
        handleChangeState={handleChangeState}
        handleClickSchedule={handleClickSchedule}
        />);
};

export default ScheduleModify;