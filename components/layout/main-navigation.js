import classes from './main-navigation.module.css';
import Image from "next/image";
import {useState} from "react";
import Link from "next/link";

import {BiLogOut, BiMessageAltDetail, BiNotification, BiSupport, BiUser} from 'react-icons/bi';
import {FiSettings} from 'react-icons/fi';

const MainNavigation = () => {

    const [active, setActive] = useState(true);

    const handleClick = () => {
        setActive(prevState => !prevState);
    }

    return (
        <div className={active ? classes.navigation : classes.active}>
            <div className={classes.userBx}>
                <div className={classes.imgBx}>
                    <Image src='/images/user/male.png' alt='/' width={60} height={60} className={classes.img}/>
                </div>
                <p className={classes.username}>Username</p>
            </div>
            <div className={classes.menuToggle} onClick={handleClick}></div>
            <ul className={classes.menu}>
                <li>
                    <Link href='#' className={classes.link}>
                        <BiUser className={classes.icon}/> My Profile
                    </Link>
                </li>
                <li>
                    <Link href='#' className={classes.link}>
                        <BiMessageAltDetail className={classes.icon}/> Messages
                    </Link>
                </li>
                <li>
                    <Link href='#' className={classes.link}>
                        <BiNotification className={classes.icon}/>Notification
                    </Link>
                </li>
                <li>
                    <Link href='#' className={classes.link}>
                        <FiSettings className={classes.icon}/>Settings
                    </Link>
                </li>
                <li>
                    <Link href='#' className={classes.link}>
                        <BiSupport className={classes.icon}/>Help & Support
                    </Link>
                </li>
                <li>
                    <Link href='#' className={classes.link}>
                        <BiLogOut className={classes.icon}/>Logout
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default MainNavigation;