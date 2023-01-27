import {Fragment, useEffect, useState} from "react";
import {useRouter} from "next/router";
import AuthenticationService from "../api/auth/authentication-service";

const LayoutAuthenticated = (props) => {
    const [profile, setProfile] = useState();
    const router = useRouter();

    useEffect(() => {
        fetchProfile();
    }, [])

    const fetchProfile = async () => {
        if (AuthenticationService.isUserLoggedIn()) {
            console.log("git");
        } else {
            console.log("nie zalogowano")

        }
    }

    return (
        <Fragment>
            {profile && <div>{props.children}</div>}
        </Fragment>
    )
}

export default LayoutAuthenticated;