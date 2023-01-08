import classes from "./upload-file.module.css";

const UploadFile = (props) => {

    const {file, setFile, buttonText} = props;

    const changeHandler = (event) => {
        setFile(event.target.files);
        setFile(event.target.files);
    }

    return (
        <form className={classes.container}>
            <div className={classes.uploadBox}>
                <div className={classes.upload}>
                    <label>Select a file from your computer</label>
                    <input type='file' onChange={changeHandler}/>
                </div>
            </div>
            <div className={classes.field}>
                <p>{!file ? "Nazwa pliku." : file[0].name}</p>
            </div>
        </form>
    );

}

export default UploadFile;