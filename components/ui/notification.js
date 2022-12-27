import classes from './notification.module.css';
import NotificationContext from "../../store/notification-context";
import {useContext} from "react";

function Notification(props) {

    const notificationContext = useContext(NotificationContext);
    const { title, message, status } = props;

    let statusClasses = '';

    if (status === 'success') {
        statusClasses = classes.success;
    }

    if (status === 'error') {
        statusClasses = classes.error;
    }

    if (status === 'pending') {
        statusClasses = classes.pending;
    }

    const activeClasses = `${classes.notification} ${statusClasses}`;

    return (
        <div
            className={activeClasses}
            style={notificationContext.notification ? {left: 0} : {left: '-100%'}}
            onClick={notificationContext.hideNotification}
        >
            <h2>{title}</h2>
            <p>{message}</p>
        </div>
    );
}

export default Notification;
