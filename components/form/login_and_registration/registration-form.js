import {useContext, useEffect, useState} from "react";
import NotificationContext from "../../../context/notification-context";
import RegistrationService from "../../api/auth/registration-service";
import classes from "./registration-form.module.css";
import {FaCheck, FaInfoCircle, FaTimes} from "react-icons/fa";

const FULL_NAME_REGEX = /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/;
const MAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const RegistrationForm = () => {
    const notificationCtx = useContext(NotificationContext);

    const [fullName, setFullName] = useState('');
    const [validFullName, setValidFullName] = useState(false);
    const [fullNameFocus, setFullNameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    useEffect(() => {
        setValidFullName(FULL_NAME_REGEX.test(fullName));
    }, [fullName])

    useEffect(() => {
        setValidEmail(MAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password));
        setValidMatch(password === matchPassword);
    }, [password, matchPassword])

    const submitHandler = async (e) => {
        e.preventDefault();

        notificationCtx.showNotification({
            title: 'Signing up...',
            message: 'Sending to the database.',
            status: 'pending'
        });

        const v1 = FULL_NAME_REGEX.test(fullName);
        const v2 = MAIL_REGEX.test(email);
        const v3 = PASSWORD_REGEX.test(password);

        if (!v1 || !v2 || !v3) {
            notificationCtx.showNotification({
                title: 'Error!',
                message: 'The data provided is not correct.',
                status: 'error'
            });
            return;
        }

        try {
            await RegistrationService.executeRegistrationService({
                fullName,
                email,
                password
            }).then(response => {
                notificationCtx.showNotification({
                    title: 'Success!',
                    message: 'Successfully saved!',
                    status: 'success'
                });

            })
        } catch (err) {
            if (err.response.status === 409) {
                notificationCtx.showNotification({
                    title: 'Error!',
                    message: err.response.data.message || "The given email is already taken.",
                    status: 'error'
                });
            } else {
                notificationCtx.showNotification({
                    title: 'Error!',
                    message: 'RegistrationForm Failed.',
                    status: 'error'
                });
            }
        }
    }

    return(
        <form className={classes.signup} onSubmit={submitHandler}>
            <h3>Sign Up</h3>
            <div className={classes.input_container}>
                <input
                    type="text"
                    id="fullName"
                    placeholder="Full name"
                    autoComplete="off"
                    required
                    // ref={userRef}
                    aria-invalid={validFullName ? "false" : "true"}
                    aria-describedby="fullnamenote"
                    onChange={e => setFullName(e.target.value)}
                    onFocus={() => setFullNameFocus(true)}
                    onBlur={() => setFullNameFocus(false)}
                />
                <div className={classes.icon}>
                    <FaCheck className={validFullName ? classes.valid : classes.hide}/>
                    <FaTimes className={validFullName || !fullName ? classes.hide : classes.invalid}/>
                </div>
                <p id="fullnamenote" className={fullNameFocus && fullName && !validFullName ? classes.instructions : classes.offscreen}>
                    <FaInfoCircle/>
                    4 to 24 characters.<br/>
                    Must begin with a letter.<br/>
                    Letters, numbers, underscores, hyphens allowed.
                </p>
            </div>
            <div className={classes.input_container}>
                <input
                    type="text"
                    id="email"
                    placeholder="Email"
                    autoComplete="off"
                    required
                    aria-invalid={validEmail ? "false" : "true"}
                    aria-describedby="emailnote"
                    onChange={e => setEmail(e.target.value)}
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                />
                <div className={classes.icon}>
                    <FaCheck className={validEmail ? classes.valid : classes.hide}/>
                    <FaTimes className={validEmail || !email ? classes.hide : classes.invalid}/>
                </div>
                <p id="emailnote" className={emailFocus && email && !validEmail ? classes.instructions : classes.offscreen}>
                    <FaInfoCircle/>
                    This is not a valid email format.
                </p>
            </div>
            <div className={classes.input_container}>
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    autoComplete="off"
                    required
                    aria-invalid={validPassword ? "false" : "true"}
                    aria-describedby="passwordnote"
                    onChange={e => setPassword(e.target.value)}
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                />
                <div className={classes.icon}>
                    <FaCheck className={validPassword ? classes.valid : classes.hide}/>
                    <FaTimes className={validPassword || !password ? classes.hide : classes.invalid}/>
                </div>
                <p id="passwordnote" className={passwordFocus && password && !validPassword ? classes.instructions : classes.offscreen}>
                    <FaInfoCircle/>
                    8 to 24 characters.<br/>
                    Must include uppercase and lowercase letters, a number and special character.<br/>
                    Allowed special characters: ! @ # $ %
                </p>
            </div>
            <div className={classes.input_container}>
                <input
                    type="password"
                    id="confirm_password"
                    placeholder="Confirm Password"
                    autoComplete="off"
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onChange={e => setMatchPassword(e.target.value)}
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />
                <div className={classes.icon}>
                    <FaCheck className={validMatch && matchPassword ? classes.valid : classes.hide}/>
                    <FaTimes className={validMatch || !matchPassword ? classes.hide : classes.invalid}/>
                </div>
                <p id="confirmnote" className={matchFocus && matchPassword && !validMatch ? classes.instructions : classes.offscreen}>
                    <FaInfoCircle/>
                    Must match the first password input field.
                </p>
            </div>
            <button disabled={!validFullName || !validEmail || !validPassword || !validMatch} type="submit">
                Submit
            </button>
        </form>
    )
}

export default RegistrationForm;