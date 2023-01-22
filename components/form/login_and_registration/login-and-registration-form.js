import classes from './login-and-registration-form.module.css';
import {Fragment, useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import AuthenticationService from "../../api/authentication/authentication-service";

import {BsFillCheckCircleFill, BsFillExclamationCircleFill} from 'react-icons/bs';
import axios from "axios";
import RegistrationService from "../../api/registration/registration-service";
import NotificationContext from "../../../store/notification-context";


const LoginAndRegistrationForm = () => {

    const router = useRouter();
    const notificationCtx = useContext(NotificationContext);

    const [isActive, setIsActive] = useState(false);
    const [isHorizontal, setIsHorizontal] = useState(null);

    const [usernameToRegistration, setUsernameToRegistration] = useState("");
    const [emailToRegistration, setEmailToRegistration] = useState("");
    const [passwordToRegistration, setPasswordToRegistration] = useState("");
    const [confirmPasswordToRegistration, setConfirmPasswordToRegistration] = useState("");

    const [usernameValidMessage, setUsernameValidMessage] = useState(null);
    const [emailValidMessage, setEmailValidMessage] = useState(null);
    const [passwordValidMessage, setPasswordValidMessage] = useState(null);
    const [confirmPasswordValidMessage, setConfirmPasswordValidMessage] = useState(null);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const usernameChangeHandler = (e) => {
        setUsernameToRegistration(e.target.value);
        if (e.target.value.length <= 4) {
            setUsernameValidMessage("Username must be at least 5 characters long.");
        } else {
            console.log("dobrze");
            setUsernameValidMessage(null);
        }
    }

    const emailChangeHandler = (e) => {
        setEmailToRegistration(e.target.value);
        if (e.target.value.includes("@")) {
            setEmailValidMessage(null);
        } else {
            setEmailValidMessage("Incorrect email format.");
        }
    }

    const passwordChangeHandler = (e) => {
        setPasswordToRegistration(e.target.value);
        if (e.target.value.length <= 7) {
            setPasswordValidMessage("Username must be at least 8 characters long.")
        } else if (!e.target.value.match(/[a-z]/)) {
            setPasswordValidMessage("The password must contain uppercase and lowercase characters.");
        } else if (!e.target.value.match(/[A-Z]/)) {
            setPasswordValidMessage("The password must contain uppercase characters.");
        } else if (!e.target.value.match(/\d+/)) {
            setPasswordValidMessage("The password must have at least one number.");
        } else if (!e.target.value.match(/.[!,@,#,$,%,^,&,*,?,_,~]/)) {
            setPasswordValidMessage("The password must have at least one special character.");
        } else {
            setPasswordValidMessage(null);
        }
    }

    const confirmPasswordChangeHandler = (e) => {
        setConfirmPasswordToRegistration(e.target.value);
        if (e.target.value === passwordToRegistration) {
            setConfirmPasswordValidMessage(null);
        } else {
            setConfirmPasswordValidMessage("The passwords are different.");
        }
    }

    const registrationHandler = async () => {
        notificationCtx.showNotification({
            title: 'Signing up...',
            message: 'Sending to the database.',
            status: 'pending'
        });

        await RegistrationService.executeRegistrationService({
            name: usernameToRegistration,
            username: emailToRegistration,
            password: passwordToRegistration
        }).then(() => {
            notificationCtx.showNotification({
                title: 'Success!',
                message: 'Successfully saved!',
                status: 'success'
            });
        }).catch(err => {
            notificationCtx.showNotification({
                title: 'Error!',
                message: err.message || 'Something went wrong!',
                status: 'error'
            });
        })
    }

    const updateHandler = () => {
        if (window.innerWidth < 992) {
            setIsHorizontal(true);
        } else {
            setIsHorizontal(false);
        }
    }

    const signInHandle = async () => {
        AuthenticationService.executeJwtAuthenticationService(username, password)
            .then(response => {
                AuthenticationService.registerSuccessfulLoginForJwt(response.data.access_token);
                router.push("/");
            }).catch(err => {
            console.log(err.message);
        })
    }

    useEffect(() => {
        updateHandler();
        window.addEventListener('resize', updateHandler);
    }, [])

    return (
        <div className={classes.content}>
            <div className={classes.container}>
                <div className={classes.blueBg}>
                    <div className={classes.box}>
                        <h2>Already Have an Account ?</h2>
                        <button onClick={() => setIsActive(prevState => !prevState)}>
                            Sign in
                        </button>
                    </div>
                    <div className={classes.box} style={isHorizontal ? {top: 0} : null}>
                        <h2>Don't Have an Account ?</h2>
                        <button onClick={() => setIsActive(prevState => !prevState)}>
                            Sign up
                        </button>
                    </div>
                </div>
                <div className={classes.formBx} style={
                    isHorizontal ? (
                        isActive ? {
                            top: 0
                        } : {
                            top: '150px'
                        }) : (
                        isActive ? {
                            left: '50%'
                        } : {
                            left: 0
                        }
                    )
                }>
                    <div className={classes.form}
                         style={isActive ? {left: '-100%', transitionDelay: '0.25s'} : {left: 0, transitionDelay: '0'}}>
                        <form className={classes.signin}>
                            <h3>Sign In</h3>
                            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                            <input type="password" placeholder="Password"
                                   onChange={(e) => setPassword(e.target.value)}/>
                            <input type="button" value="Login" onClick={signInHandle}/>
                            <a href='#' className={classes.forgot}>Forgot Password</a>
                        </form>
                    </div>

                    <div className={classes.form}
                         style={isActive ? {left: 0, transitionDelay: '0'} : {left: '100%', transitionDelay: '0.25s'}}>
                        <form className={classes.signup}>
                            <h3>Sign Up</h3>
                            <div className={classes.input_container}>
                                <input type="text" placeholder="Username" onChange={usernameChangeHandler}/>
                                <div>{usernameToRegistration ?
                                    usernameValidMessage ? <Fragment>
                                            <span
                                                className={classes.info}>{usernameValidMessage}</span><BsFillExclamationCircleFill
                                            className={classes.fail}/>
                                        </Fragment> :
                                        <BsFillCheckCircleFill className={classes.success}/> : null}</div>
                            </div>
                            <div className={classes.input_container}>
                                <input type="email" placeholder="Email" onChange={emailChangeHandler}/>
                                <div>{emailToRegistration ?
                                    emailValidMessage ? <Fragment>
                                            <span
                                                className={classes.info}>{emailValidMessage}</span><BsFillExclamationCircleFill
                                            className={classes.fail}/>
                                        </Fragment> :
                                        <BsFillCheckCircleFill className={classes.success}/> : null}</div>
                            </div>
                            <div className={classes.input_container}>
                                <input type="password" placeholder="Password" onChange={passwordChangeHandler}/>
                                <div>{passwordToRegistration ?
                                    passwordValidMessage ? <Fragment>
                                            <span
                                                className={classes.info}>{passwordValidMessage}</span><BsFillExclamationCircleFill
                                            className={classes.fail}/>
                                        </Fragment> :
                                        <BsFillCheckCircleFill className={classes.success}/> : null}</div>
                            </div>
                            <div className={classes.input_container}>
                                <input type="password" placeholder="Confirm Password"
                                       onChange={confirmPasswordChangeHandler}/>
                                <div>{confirmPasswordToRegistration ?
                                    confirmPasswordValidMessage ? <Fragment>
                                            <span
                                                className={classes.info}>{confirmPasswordValidMessage}</span><BsFillExclamationCircleFill
                                            className={classes.fail}/>
                                        </Fragment> :
                                        <BsFillCheckCircleFill className={classes.success}/> : null}</div>
                            </div>
                            <input type="button" value="Confirm" onClick={registrationHandler} className={
                                usernameValidMessage || emailValidMessage || passwordValidMessage || confirmPasswordValidMessage ||
                                usernameToRegistration === "" || emailToRegistration === "" || passwordToRegistration === "" || confirmPasswordToRegistration === "" ?
                                    classes.btn_inactive : classes.btn_active
                            }/>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default LoginAndRegistrationForm;