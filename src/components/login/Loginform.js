import React,{useState} from "react";
import {IconButton, Input, InputLabel, InputAdornment, FormControl, Button, Grid} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

const Loginform = (props) => {
    const navigate = useNavigate()
    
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return(
        <>
        <Grid className="login_container" container direction="column" justifyContent="center" alignItems="center" width="30vw" height="60vh">
            <Grid item>
                <h2>로그인</h2>
                <br></br>
            </Grid>
            <Grid item>
                <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="standard-adornment-Id">ID</InputLabel>
                <Input
                    id="standard-adornment-Id"
                    value={props.login.id}
                    name='id'
                    onChange={props.handleChangeLogin}
                />
                </FormControl>
            </Grid>
            <Grid item>
                <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                    id="standard-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    value={props.login.password}
                    name='password'
                    onChange={props.handleChangeLogin}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                />
                </FormControl>
            </Grid> 
            <Grid item><br></br><br></br><br></br><br></br></Grid>
            <Grid item>
                <Button variant="outlined" disabled={props.login.id && props.login.password ?false:true} onClick={props.handleClickLogin}>Login</Button>
                <Button variant="outlined" onClick={()=>{navigate('/signup')}}>
                Sign Up
                </Button> 
            </Grid>
        </Grid>
        </>
)};

export default Loginform;