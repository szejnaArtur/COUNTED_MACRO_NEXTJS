import {Fragment, useContext} from "react";
import MainNavigation from "./main-navigation";

import Notification from '../ui/notification';
import NotificationContext from '../../store/notification-context';

const Layout = (props) => {

    const notificationCtx = useContext(NotificationContext);
    const activeNotification = notificationCtx.notification;

    return (
        <Fragment>
            <MainNavigation/>
            <main>{props.children}</main>
            <Notification
                title={activeNotification && activeNotification.title}
                message={activeNotification && activeNotification.message}
                status={activeNotification && activeNotification.status}
            />
        </Fragment>
    );
}

export default Layout;