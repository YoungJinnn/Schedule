import React, {useState} from "react";
import { Loginform } from "components/login";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {useCookies} from 'react-cookie'

const Login = (props) => {
    const [cookies, setCookie,] = useCookies(['loginkey'])
    const navigate = useNavigate()
    const [login, setLogin] = useState({
        id: '',
        password: ''     
    });
    const handleChangeLogin = (event) => {
        let changeLogin = {...login};
        changeLogin[event.target.name] = event.target.value;
        setLogin(changeLogin);
    };
    const handleClickLogin = async() =>{
        const formData = new FormData();
        formData.append('Id', login.id);
        formData.append('Password', login.password);
        const config = {
            headers: {
                "content-type": "multipart.form-data"
            }
        }
        await axios.post("/api/users/login", formData, config).then((response)=>{
            if(response.data.login === false){
                alert('실패 ㅅㄱ')
            }
            else if (response.data.login === true){
                alert('로그인 성공')
                setCookie("loginkey", response.data.user._id, {path : '/'})
                navigate('/schedule')
            }
        }).catch((Error)=>{
            console.log(Error);
        })
    };
    
    return(
        <Loginform login={login} handleChangeLogin={handleChangeLogin} handleClickLogin={handleClickLogin}/>
    );
};

export default Login;