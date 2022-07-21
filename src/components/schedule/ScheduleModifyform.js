import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import {Box, TextField, Button, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

const ScheduleModifyform = (props) => {
    return(
        <div className="container">
        <div>
            <h2> 일정 제목 </h2>
            <Box
                component="form"
                sx={{width: 500, maxWidth: '100%',}}
            >
            <TextField 
                value={props.scheduleDatas.Title} 
                name='Title'
                onChange={props.handleChangeSchedule} 
                fullWidth id="standard-basic" 
                label="일정 제목을 입력하세요" 
                variant="filled"
            />
            </Box>
        </div>
        <div>
            <h2>일정 기간</h2>
            <DatePicker 
                dateFormat="yyyy년 MM월 dd일"
                selected = {props.StartDate} 
                onChange={date => props.setStartDate(date)}
                selectsStart
                startDate={props.StartDate}
                endDate={props.EndDate}
            />
            <DatePicker 
                dateFormat="yyyy년 MM월 dd일"
                selected = {props.EndDate} 
                onChange={date => props.setEndDate(date)}
                selectsEnd
                startDate={props.StartDate}
                endDate={props.EndDate}
                minDate={props.StartDate}
            />
        </div>
        <div>
            <h2>세부정보</h2>
            <Box
                component="form"
                sx={{width: 500, maxWidth: '100%',}}
            >
            <TextField 
                value={props.scheduleDatas.Details} 
                name='Details'
                onChange={props.handleChangeSchedule} 
                fullWidth id="standard-basic" 
                label="세부정보를 입력하세요" 
                variant="filled"  
            />
            </Box>
        </div>
        <div className='marginbottom'>
            <h2>진행상태</h2>
            <FormControl variant="filled" sx={{ minWidth: '100%', maxWidth: '100%' }}>
                <InputLabel id="demo-simple-select-filled-label">진행상태를 입력하세요</InputLabel>
                <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={props.State}
                onChange={props.handleChangeState}
                >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value="To Do">To Do</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Done">Done</MenuItem>
                </Select>
            </FormControl>
        </div>
        <div>
            <Button variant="outlined" onClick={props.handleClickSchedule}>제출</Button>    
            
        </div>   
        </div>
        )};
export default ScheduleModifyform;