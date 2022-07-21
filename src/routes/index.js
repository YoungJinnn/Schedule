import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Main, Signup, Schedule } from './pages';
import NotFound from './NotFound';
import { useCookies } from 'react-cookie';

const MainRoutes = () => {
    const [cookies] = useCookies(["loginkey"])
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        if (cookies.loginkey === undefined && location.pathname !== "/" && location.pathname !== "/login") {//세션이 없는데 로그인페이지가 아닌 경우
            if (location.pathname === "/signup") { // 세션키는 없지만 경로가 회원가입페이지인 경우에는
                return navigate('/signup') // 회원가입으로 이동가능
            }
            navigate('/') //나머지는 무조건 로그인 페이지에서 시작해야 함.
        } else if (cookies.loginkey && cookies.loginkey !== undefined && (location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup")) {
            navigate('/schedule') // 세션키가 있는데 로그인페이지거나 회원가입 페이지인경우 무조건 홈으로 이동
            console.log(2)
        } else{
            console.log(cookies.loginkey)
            console.log()
            console.log(3)
        }

    }, [cookies.sessionKey, location.pathname]); //쿠키의 세션과 경로 이름을 통해 항상 확인
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Main />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/schedule/*" element={<Schedule />} />
            <Route path="/*" element={<NotFound />} />
        </Routes>
    );
};

export default MainRoutes;