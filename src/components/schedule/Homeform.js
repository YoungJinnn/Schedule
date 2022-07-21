import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {Box, Fab, Avatar, Button} from '@mui/material';
import { Add, Person } from '@mui/icons-material';

const Homeform = (props) => {
    const navigate = useNavigate();
    const date = new Date();

    const renderCalendar = () => {
        const viewYear = date.getFullYear();
        const viewMonth = date.getMonth();

        document.querySelector('.year-month').textContent = `${viewYear}년 ${viewMonth + 1}월`;

        const prevLast = new Date(viewYear, viewMonth, 0);
        const thisLast = new Date(viewYear, viewMonth + 1, 0);
        
        const PLDate = prevLast.getDate();           //지난달 마지막날짜
        const PLDay = prevLast.getDay();             //지난달 마지막요일

        const TLDate = thisLast.getDate();           //이번달 마지막날짜
        const TLDay = thisLast.getDay();             //이번달 마지막요일
        
        const prevDates = [];                                       //저번달 날짜들을 담아둔 배열
        const thisDates = [...Array(TLDate + 1).keys()].slice(1);   //이번달 날짜들을 담아둔 배열
        const nextDates = [];                                       //다음달 날짜들을 담아둔 배열

        if (PLDay !== 6) {                                //마지막요일이 토요일이 아닌 경우
            for (let i = 0; i < PLDay + 1; i++) {         //0부터 마지막요일까지
            prevDates.unshift(PLDate - i);              //마지막날짜부터 1씩 줄어든 값을 앞쪽에 채워넣음
            }
        }
        for (let i = 1; i < 7 - TLDay; i++) {
            nextDates.push(i);                            //다음달 날짜
        }

        const dates = prevDates.concat(thisDates, nextDates);      //concat method활용 배열 합침
        const firstDateIndex = dates.indexOf(1);
        const lastDateIndex = dates.lastIndexOf(TLDate);

        const str2datenum = (str) => {           // '2022-09-02T07:33:34.000Z' -> 20220902
            const date = new Date(str);
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const year = date.getFullYear();

            return day + month * 100 + year * 10000;
        }

        const num2datenum = (num, month) => {          // 19 -> 20220719
            return num + month * 100 + viewYear * 10000;
        }

        var month = viewMonth;                          // 연하게 색칠되어 있는 날짜들은 다른 달이므로 이를 계산하기 위한 변수

        dates.forEach((date, i) => {                               //forEach method로 요소를 돌며 수정
            const condition = i >= firstDateIndex && i < lastDateIndex + 1 ? 'this': 'other';
            dates[i] =`<div class="date"><span class="${condition}"><div class="date-number">${date}</div>`
            if (date === 1) {
                month++;
            }
            props.scheduleDatas.forEach((scheduleData, j) => {
                if(str2datenum(scheduleData.StartDate) <= num2datenum(date, month) && num2datenum(date, month) <= str2datenum(scheduleData.EndDate)){
                    dates[i] += `<div class="schedule-container schedule-container${(j%3)}" onclick="location.href='/schedule/${scheduleData._id}'">${scheduleData.Title}</div>`;  
                }
            });
            dates[i] += `</span></div>`;    
        })

        document.querySelector('.dates').innerHTML = dates.join('');

        const today = new Date();
        if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {   
          for (let date of document.querySelectorAll('.this')) {         //this 클래스를 가진 테그 반복문
            if (Number(date.getElementsByClassName("date-number")[0].innerText) === today.getDate()) {                   //문자 -> 숫자, 오늘 날짜와 비교
              date.classList.add('today');                               //해당 span 태그에 today 클래스 추가
              document.getElementsByClassName("today")[0].innerHTML = '<div class="date-number"><span class="today_point">'+today.getDate()+'</span></div>';
              break;
            }
          }
        }
    }
    
    const prevMonth = () => {
        date.setDate(1);
        date.setMonth(date.getMonth() - 1);
        renderCalendar();
    }
      const nextMonth = () => {
        date.setDate(1);
        date.setMonth(date.getMonth() + 1);
        renderCalendar();
    }
      const goToday = () => {
        date = new Date();
        renderCalendar();
    }   
    useEffect(() => {
        renderCalendar()
    }, [props.scheduleDatas])

    return(
        <>  
        <Button variant="outlined" className = 'logout' onClick={props.handleClickLogOut}>
            <Avatar sx={{ mr: 1, width: 30, height: 30 }}>
                <Person />
            </Avatar>
            <div>로그아웃</div>
        </Button>   
        <div className = "calendar">
            
            <div className = "header">                              
                <div className ="nav">
                    <button className = "nav-btn go-prev" onClick={prevMonth}>&lt;</button>
                    <button className = "nav-btn go-today" onClick={goToday}>Today</button>
                    <button className = "nav-btn go-next" onClick={nextMonth}>&gt;</button>
                </div>
                <div className ="year-month"></div>
                <div>
                    <Box sx={{ '& > :not(style)': { m: 1 } }}>
                        <Fab color="primary" aria-label="add" onClick={()=>{navigate('/schedule/create')}}>
                            <Add/>
                        </Fab>
                    </Box>
                </div>
            </div>
            <div className ="main">
                <div className ="days">
                    <div className ="day">일</div>
                    <div className ="day">월</div>
                    <div className ="day">화</div>
                    <div className ="day">수</div>
                    <div className ="day">목</div>
                    <div className ="day">금</div>
                    <div className ="day">토</div>
                </div>
                <div className ="dates">
                </div>
            </div>
        </div>

        {/* {props.scheduleDatas.map((schedule) => (
            <div>{schedule.Title}</div>
        ))} */}
        </>
)};

export default Homeform;