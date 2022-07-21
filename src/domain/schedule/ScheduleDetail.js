import React, { useEffect, useState } from "react";
import { ScheduleDetailform } from "components/schedule";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ScheduleDetail = () => {
    const navigate = useNavigate();
    const { scheduleId } = useParams();
    const [cookies] = useCookies(['loginkey']);
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
            await axios.get(`/api/schedule/${cookies.loginkey}/${scheduleId}`).then((Response) => {
                setScheduleDatas(Response.data);
            }).catch((Error) => {
                console.log(Error);
            })
        }
        loadscheduleData();
    }, []); 
    const handleClickSchedule = async() => {
        let res = await fetch(`/api/schedule`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                _id: scheduleDatas._id,
                User_id: cookies.loginkey
            })
        });
        await res.json().then((Response) => {
            navigate(`/schedule`);
        }).catch((Error) => {
            console.log(Error);
        });
    }

    return(<ScheduleDetailform scheduleDatas={scheduleDatas} handleClickSchedule={handleClickSchedule}/>);
};

export default ScheduleDetail;