import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Box, Fab, Button} from '@mui/material';
import {Edit, Add, Delete } from '@mui/icons-material';

const ScheduleDetailform = (props) => {
    const navigate = useNavigate();
    // useEffect(() => {
    // }, [props.scheduleDatas])

    return(
        <div className="container">
            <div>
                <div className="header-detail" sx={{maxWidth: '100%'}}>
                    <h2> 일정 제목 </h2>
                    <div className="icon">
                        <Box sx={{ '& > :not(style)': { m: 1 } }}>
                            <Fab color="secondary" aria-label="edit" onClick={()=>navigate(`/schedule/modify/${props.scheduleDatas._id}`)}>
                                <Edit/>
                            </Fab>
                        </Box>
                        <Box sx={{ '& > :not(style)': { m: 1 } }}>
                            <Fab color="error" aria-label="delete" onClick={props.handleClickSchedule}>
                                <Delete/>
                            </Fab>
                        </Box>
                    </div>    
                </div>

                <div>
                    <Box className="textBox" component="form" sx={{maxWidth: '100%'}}>
                        <div>{props.scheduleDatas.Title}</div>
                    </Box>
                </div>
            </div>
            <div>
                <h2>일정 기간</h2>
                <Box className="textBox" component="form" sx={{maxWidth: '100%'}}>
                    <div>시작날짜: {props.scheduleDatas.StartDate}</div>
                    <div>마감날짜: {props.scheduleDatas.EndDate}</div>
                </Box>
            </div>
            <div>
                <h2> 세부정보 </h2>
                <Box className="textBox" component="form" sx={{maxWidth: '100%'}}>
                    <div>{props.scheduleDatas.Details}</div>
                </Box>
            </div>   
            <div className='marginbottom'>
                <h2>진행상태</h2>
                <Box className="textBox" component="form" sx={{maxWidth: '100%'}}>
                    <div>{props.scheduleDatas.State}</div>
                </Box>
            </div>

        </div>
        )};

export default ScheduleDetailform;