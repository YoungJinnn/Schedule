import React,{useState} from "react";
import {IconButton, Input, InputLabel, InputAdornment, FormControl, Button, FormGroup, FormControlLabel, Checkbox, Grid} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';

const Signupform = (props) => {
    
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    
    const [showPasswordCheck, setShowPasswordCheck] = useState(false);
    const handleClickShowPasswordCheck = () => {
        setShowPasswordCheck(!showPasswordCheck);
    };
 
    return(
        <>
            <Grid className="login_container" container direction="column" justifyContent="center" alignItems="center" width="30vw" height="60vh">
                <Grid item>
                    <h2>회원가입</h2>
                </Grid>
                <Grid item>
                    <FormControl variant="standard" fullWidth>
                        <InputLabel htmlFor="standard-adornment-Id">ID</InputLabel>
                        <Input
                            id="standard-adornment-Id"
                            value={props.signup.id}
                            name='id'
                            onChange={props.handleChangeSignup}
                        />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl variant="standard" fullWidth>
                        <InputLabel htmlFor="standard-adornment-Name">Name</InputLabel>
                        <Input
                            id="standard-adornment-Name"
                            value={props.signup.name}
                            name='name'
                            onChange={props.handleChangeSignup}
                        />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl variant="standard" fullWidth>
                        <InputLabel htmlFor="standard-adornment-Phone number">Phone number</InputLabel>
                        <Input
                            id="standard-adornment-Phone number"
                            value={props.signup.phoneNumber}
                            name='phoneNumber'
                            onChange={props.handleChangeSignup}
                        />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl variant="standard" fullWidth>
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={props.signup.password}
                            name='password'
                            onChange={props.handleChangeSignup}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl variant="standard" fullWidth>
                        <InputLabel htmlFor="standard-adornment-password Check">Password Check</InputLabel>
                        <Input
                            id="standard-adornment-password Check"
                            type={showPasswordCheck ? 'text' : 'password'}
                            value={props.signup.passwordCheck}
                            name='passwordCheck'
                            onChange={props.handleChangeSignup}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton aria-label="toggle password Check visibility" onClick={handleClickShowPasswordCheck}>
                                        {showPasswordCheck ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Grid>
                <br></br>
                <Grid item>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox checked={props.checked.all} />} label="전체 선택" onClick={props.handleClickCheckAll} />
                        <FormControlLabel control={<Checkbox checked={props.checked.agree1} />} label="약관 동의" name="agree1" onClick={props.handleClickChecked} />
                        <FormControlLabel control={<Checkbox checked={props.checked.agree2} />} label="개인정보처리방침" name="agree2" onClick={props.handleClickChecked} />
                    </FormGroup>
                </Grid>
                <Grid item> 
                    <Button variant="outlined" disabled={props.state} onClick={props.handleClickSignUp}>
                        Sign up
                    </Button>
                </Grid>
            </Grid>
            </>
    )};

export default Signupform;