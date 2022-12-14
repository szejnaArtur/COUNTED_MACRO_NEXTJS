import {useState, useEffect} from "react";

import classes from './main-navigation.module.css';
import Link from "next/link";

const MainNavigation = () => {
    const [nav, setNav] = useState(false);
    const [color, setColor] = useState('transparent');
    const [textColor, setTextColor] = useState('#fcfcfc');

    const handleNav = () => {
        setNav(!nav);
    }

    useEffect(() => {
        const changeColor = () => {

            if (window.scrollY >= 90) {
                setColor('#fcfcfc');
                setTextColor('#2f2f2f');
            } else {
                setTextColor('#fcfcfc');
                setColor('transparent');
            }
        }
        window.addEventListener('scroll', changeColor);
    }, []);

    return (
        <div
            style={
                textColor === '#fcfcfc' ? {
                    backgroundColor: `${color}`,
                    boxShadow: 'none'
                } : {
                    backgroundColor: `${color}`,
                    boxShadow: '0 0.3rem 1.9rem #000'
                }
            }
            className={classes.container}
        >
            <div className={classes.content}>
                <Link href='/'>
                    <h1>Count Macro</h1>
                </Link>
                <ul className={classes.links} style={{color: `${textColor}`}}>
                    <li className={classes.link}>
                        <Link href='/' scroll={true}>Home</Link>
                    </li>
                    <li className={classes.link}>
                        <Link href='/about' scroll={true}>About</Link>
                    </li>
                </ul>
                <ul className={classes.btnContainer}>
                    <li className={classes.btn}>
                        <Link href='/login'>Login</Link>
                    </li>
                    <li className={classes.btn}>
                        <Link href='/login'>Register</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default MainNavigation;