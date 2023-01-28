import classes from './login-and-registration-form.module.css';
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import RegistrationForm from "./registration-form";
import LoginForm from "./login-form";

const LoginAndRegistrationForm = () => {

    const router = useRouter();

    const [isActive, setIsActive] = useState(false);
    const [isHorizontal, setIsHorizontal] = useState(null);

    const [success, setSuccess] = useState(false);

    const updateHandler = () => {
        if (window.innerWidth < 992) {
            setIsHorizontal(true);
        } else {
            setIsHorizontal(false);
        }
    }

    useEffect(() => {
        updateHandler();
        window.addEventListener('resize', updateHandler);
    }, [])

    // useEffect(() => {
    //     userRef.current.focus();
    // }, [])

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
                        <LoginForm />
                    </div>

                    <div className={classes.form}
                         style={isActive ? {left: 0, transitionDelay: '0'} : {left: '100%', transitionDelay: '0.25s'}}>
                        <RegistrationForm/>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default LoginAndRegistrationForm;