import {useContext, useEffect, useState} from "react";
import classes from "./login-form.module.css";
import NotificationContext from "../../../context/notification-context";
import AuthContext from "../../../context/auth-context";
import AuthenticationService from "../../api/auth/authentication-service";

const LoginForm = () => {
    const notificationCtx = useContext(NotificationContext);

    const {setAuth} = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await AuthenticationService.executeJwtAuthenticationService(email, password)
                .then(response => {
                    const accessToken = response?.data?.access_token;
                    const refreshToken = response?.data?.refresh_token;

                    console.log(response);

                    setAuth({email, password, accessToken, refreshToken});

                    notificationCtx.showNotification({
                        title: 'Success!',
                        message: 'Successfully logged.',
                        status: 'success'
                    });

                    setEmail('');
                    setPassword('');
                })

        } catch (err) {
            if (!err?.response) {
                notificationCtx.showNotification({
                    title: 'Error!',
                    message: 'No Server Response.',
                    status: 'error'
                });
            } else if (err.response?.status === 400) {
                notificationCtx.showNotification({
                    title: 'Error!',
                    message: 'Missing email or password.',
                    status: 'error'
                });
            } else if (err.response?.status === 401) {
                notificationCtx.showNotification({
                    title: 'Error!',
                    message: 'Unauthorized.',
                    status: 'error'
                });
            } else {
                notificationCtx.showNotification({
                    title: 'Error!',
                    message: 'Login Failed.',
                    status: 'error'
                });
            }
        }
    }

    return (
        <form className={classes.sign_in} onSubmit={handleSubmit}>
            <h3>Sign In</h3>
            <input
                type="text"
                id="email"
                autoComplete="off"
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}
                value={email}
                required
            />
            <input
                type="password"
                id="password"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
                value={password}
                required
            />
            <button type="submit">Login</button>
            <a href='#' className={classes.forgot}>Forgot Password</a>
        </form>
    )
}

export default LoginForm;