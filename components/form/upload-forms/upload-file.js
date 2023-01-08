import {useContext, useState} from "react";

import classes from './upload-file.module.css';
import NotificationContext from "../../../store/notification-context";
import {type} from "os";

const UploadFile = (props) => {

    const notificationCtx = useContext(NotificationContext);

    //base end point url
    const FILE_UPLOAD_BASE_ENDPOINT = "http://localhost:8080";

    const [files, setFiles] = useState(null);

    const fileSubmitHandler = async (event) => {
        event.preventDefault();

        if (files !== null) {
            if (files[0].size > 1048576) {
                notificationCtx.showNotification({
                    title: 'Error!',
                    message: 'File size exceeded!',
                    status: 'error'
                });
                return;
            }

            notificationCtx.showNotification({
                title: 'Uploading...',
                message: 'Uploading File(s)',
                status: 'pending'
            });

            const formData = new FormData();
            formData.append(`file`, files[0]);

            //TESTOWO

            const product = {
                name: "Egg",
                description: "Testowe Jajko",
                calories: 45,
                carbs: 12,
                fat: 15,
                protein: 17,
                water: 24
            }
            // formData.append(`product`, product)
            formData.append('product',
                new Blob([JSON.stringify(product)], {
                    type: 'application/json'
                }));

            // KONIEC TESTÓW

            const requestOptions = {
                method: 'POST',
                body: formData,
            };

            console.log(requestOptions)

            await fetch(FILE_UPLOAD_BASE_ENDPOINT + '/upload', requestOptions)
                .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();

                    if (!response.ok) {
                        const error = (data && data.message) || response.status;
                        notificationCtx.showNotification({
                            title: 'Error!',
                            message: data.message,
                            status: 'error'
                        });
                        return Promise.reject(error);
                    }

                    notificationCtx.showNotification({
                        title: 'Success!',
                        message: data.message,
                        status: 'success'
                    });
                }).catch(error => {
                    console.log(error || 'Error while uploading file!')
                    notificationCtx.showNotification({
                        title: 'Error!',
                        message: error.message,
                        status: 'error'
                    });
                })

        } else {
            return;
        }
    }

    const uploadFileHandler = (event) => {
        setFiles(event.target.files);
    };

    return (
        <form onSubmit={fileSubmitHandler} className={classes.container}>
            <div className={classes.field}>
                <p>{!files ? "Nazwa pliku." : files[0].name}</p>
            </div>
            <div className={classes.uploadBox}>
                <div className={classes.upload}>
                    <label>Select a file from your computer</label>
                    <input type='file' onChange={uploadFileHandler}/>
                </div>
                <button type='submit'>{props.buttonText}</button>
            </div>
        </form>
    )
}

export default UploadFile;