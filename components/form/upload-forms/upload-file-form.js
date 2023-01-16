import classes from "./upload-file.module.css";
import {useEffect, useState} from "react";
import {RxCross1} from 'react-icons/rx';

const UploadFile = (props) => {

    const {file, setFile, buttonText} = props;
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const changeHandler = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedImage(event.target.files[0]);
            setFile(event.target.files);
        }
    }

    const clickHandle = () => {
        setSelectedImage(null);
        setFile(null);
    }

    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
            console.log(selectedImage);
        }
    }, [selectedImage]);

    return (
        <form className={classes.container}>

            <div className={classes.uploadBox}>
                <div className={classes.upload}>
                    <label>Select a file from your computer</label>
                    <input accept="image/*" type='file' onChange={changeHandler}/>
                </div>
            </div>
            {imageUrl && selectedImage && (
                <div className={classes.imageContainer}>
                    <img src={imageUrl} alt={selectedImage.name} height={35} width={35} className={classes.image}/>
                    <RxCross1 onClick={clickHandle} className={classes.cross}/>
                </div>
            )}
            <div className={classes.field}>
                <p>{!file ? "Nazwa pliku." : file[0].name}</p>
            </div>
        </form>
    );

}

export default UploadFile;