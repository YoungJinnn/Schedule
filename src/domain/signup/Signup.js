import React, { useState, useEffect } from "react";
import { Signupform } from "components/signUp";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
    const navigate = useNavigate()
    const [signup, setSignup] = useState({
        id: '',
        name: '',
        phoneNumber: '',
        password: '', 
        passwordCheck: ''
    });
    const [checked, setChecked] = useState({all:false, agree1:false, agree2:false});
    const [state, setState] = useState(true);
    useEffect(()=>{
        if(signup.id.length >=6 
        && signup.id.length <= 13 
        && signup.password === signup.passwordCheck
        && checked.agree1 
        && checked.agree2){
            setState(false);
        }else{
            setState(true);
        }
    },[signup, checked]);

    const handleClickCheckAll = () => {
        let check = {...checked};
        if(check.all){
            setChecked({all:false, agree1:false, agree2:false});
        }else{
            setChecked({all:true, agree1:true, agree2:true});
        }
    };

    const handleClickChecked = (event) => {
        let check = {...checked};
        check[event.target.name]=!checked[event.target.name];
        setChecked(check);
    };
    const handleChangeSignup = (event) => {
        let changeSignup = {...signup};
        changeSignup[event.target.name] = event.target.value;
        setSignup(changeSignup);
    };
    const handleClickSignUp = async() =>{
        const formData = new FormData();
        formData.append('id', signup.id);
        formData.append('name', signup.name);
        formData.append('phoneNumber', signup.phoneNumber);
        formData.append('password', signup.password);

        const config = {
            headers: {
                "content-type": "multipart/form-data"
            }
        }
        await axios.post("/api/users/signup", formData, config).then((response)=>{
            console.log(response);
            navigate('/Schedule');
        }).catch((Error)=>{
            console.log(Error);
        })
    };

    return(
        <Signupform 
            signup={signup} 
            checked={checked}
            state={state}
            handleChangeSignup={handleChangeSignup} 
            handleClickSignUp={handleClickSignUp} 
            handleClickCheckAll={handleClickCheckAll}
            handleClickChecked={handleClickChecked}
        />
    );
};

export default Signup;