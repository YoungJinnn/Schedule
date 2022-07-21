import React from 'react';
import {Routes, Route} from 'react-router-dom';
import NotFound from 'routes/NotFound';
import { Schedule } from "domain/schedule";
import { ScheduleCreate } from "domain/schedule";
import { ScheduleDetail } from "domain/schedule";
import { ScheduleModify } from "domain/schedule";

const SchedulePresenter = () => {
    return (
        <Routes>
            <Route path="/" element={<Schedule/>}/>
            <Route path="/create" element={<ScheduleCreate/>}/>
            <Route path="/:scheduleId" element={<ScheduleDetail/>}/>
            <Route path="/modify/:scheduleId" element={<ScheduleModify/>}/>
            <Route path="/*" element={<NotFound/>}/>
        </Routes>
    );
};

export default SchedulePresenter;