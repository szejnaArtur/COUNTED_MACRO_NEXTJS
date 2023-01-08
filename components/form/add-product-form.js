import {Fragment, useContext, useState} from "react";
import classes from './add-product-form.module.css';

import NotificationContext from '../../store/notification-context';

import {RxCross2} from 'react-icons/rx';
import UploadFile from "./upload-forms/upload-file-form";

const FILE_UPLOAD_BASE_ENDPOINT = "http://localhost:8080";

const AddProductForm = () => {

    const notificationCtx = useContext(NotificationContext);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [calories, setCalories] = useState("1");
    const [carbs, setCarbs] = useState("0");
    const [fat, setFat] = useState("0");
    const [protein, setProtein] = useState("0");
    const [water, setWater] = useState("0");

    const [vitaminCount, setVitaminCount] = useState(null);
    const [vitaminUnit, setVitaminUnit] = useState('mg');
    const [vitaminName, setVitaminName] = useState('Vitamin A');
    const [vitaminList, setVitaminList] = useState([]);

    const [file, setFile] = useState(null);

    const [options, setOptions] = useState([
        {
            name: 'Vitamin A',
            active: true,
            value: 0,
            unit: ''
        },
        {
            name: 'Vitamin B6',
            active: true,
            value: 0,
            unit: ''
        },
        {
            name: 'Vitamin B12',
            active: true,
            value: 0,
            unit: ''
        },
        {
            name: 'Vitamin D',
            active: true,
            value: 0,
            unit: ''
        },
        {
            name: 'Vitamin D3',
            active: true,
            value: 0,
            unit: ''
        },
        {
            name: 'Vitamin E',
            active: true,
            value: 0,
            unit: ''
        },
        {
            name: 'Vitamin K',
            active: true,
            value: 0,
            unit: ''
        },
        {
            name: 'Calcium',
            active: true,
            value: 0,
            unit: ''
        },
        {
            name: 'Iron',
            active: true,
            value: 0,
            unit: ''
        },
        {
            name: 'Magnesium',
            active: true,
            value: 0,
            unit: ''
        },
        {
            name: 'Phosphorus',
            active: true,
            value: 0,
            unit: ''
        },
        {
            name: 'Zinc',
            active: true,
            value: 0,
            unit: ''
        },
        {
            name: 'Copper',
            active: true,
            value: 0,
            unit: ''
        },
        {
            name: 'Fluoride',
            active: true,
            value: 0,
            unit: ''
        },
        {
            name: 'Manganese',
            active: true,
            value: 0,
            unit: ''
        },
        {
            name: 'Selenium',
            active: true,
            value: 0,
            unit: ''
        },
        {
            name: 'Retinol',
            active: true,
            value: 0,
            unit: ''
        },
        {
            name: 'Thiamine',
            active: true,
            value: 0,
            unit: ''
        },
        {
            name: 'Riboflavin',
            active: true,
            value: 0,
            unit: ''
        },
        {
            name: 'Niacin',
            active: true,
            value: 0,
            unit: ''
        },
        {
            name: 'Folate',
            active: true,
            value: 0,
            unit: ''
        },
        {
            name: 'Choline',
            active: true,
            value: 0,
            unit: ''
        },
        {
            name: 'Betaine',
            active: true,
            value: 0,
            unit: ''
        },
    ]);



    const handleRemoveVitamin = (name) => {
        options.some(option => {
            if (option.name === name){
                option.active = true;
                return true;
            }
        })

        const newVitaminList = vitaminList.filter(list => list.name !== name);
        setVitaminList(newVitaminList);
    }

    const handleAddVitamin = () => {

        if (vitaminCount === null || vitaminCount <= 0) {
            notificationCtx.showNotification({
                title: 'Error!',
                message: 'The value must be greater than 0.',
                status: 'error'
            });
            return;
        }

        if (!vitaminName || vitaminName === '') {
            notificationCtx.showNotification({
                title: 'Error!',
                message: 'There are no more options.',
                status: 'error'
            });
            return;
        }

        const newVitamin = {
            name: vitaminName,
            unit: vitaminUnit,
            value: vitaminCount
        }

        setVitaminList(oldArray => [...oldArray, newVitamin]);

        options.some(option => {
            if (option.name === vitaminName) {
                option.active = false;
                return true;
            }
            console.log(option);
        })
        findFirstActive(options);
    }

    const findFirstActive = (array) => {
        let firstActive = null;
        array.some(element => {
            if (element.active) {
                firstActive = element.name;
                return true;
            }
        })
        setVitaminName(firstActive);
    }

    async function saveProductHandler(event) {
        event.preventDefault();

        if (
            !name ||
            name.trim() === '' ||
            !description ||
            description.trim() === '' ||
            !calories ||
            calories.trim() === '' ||
            !carbs ||
            carbs.trim() === '' ||
            !fat ||
            fat.trim() === '' ||
            !protein ||
            protein.trim() === '' ||
            !water ||
            water.trim() === ''
        ) {
            notificationCtx.showNotification({
                title: 'Error!',
                message: 'Fields cannot be clear!',
                status: 'error'
            });
            return;
        }

        if (file !== null) {
            if (file[0].size > 1048576) {
                notificationCtx.showNotification({
                    title: 'Error!',
                    message: 'File size exceeded!',
                    status: 'error'
                });
                return;
            }
        }

        notificationCtx.showNotification({
            title: 'Signing up...',
            message: 'Sending to the database.',
            status: 'pending'
        });

        const formData = new FormData();

        if (file !== null){
            formData.append(`file`, file[0]);
        }

        const newProduct = {
            name,
            description,
            calories,
            carbs,
            fat,
            protein,
            water,
            vitaminList,
        }

        formData.append('product',
            new Blob([JSON.stringify(newProduct)], {
                type: 'application/json'
            }));

        console.log(formData);

        try{
            await sendProduct(formData);
            notificationCtx.showNotification({
                title: 'Success!',
                message: 'Successfully saved!',
                status: 'success'
            });
            setName('');
            setDescription('');
            setCalories("0");
            setCarbs("0");
            setFat("0");
            setProtein("0");
            setWater("0");
            setVitaminList([]);
            setFile(null)
        } catch (error) {
            notificationCtx.showNotification({
                title: 'Error!',
                message: error.message || 'Something went wrong!',
                status: 'error'
            });
        }
    }

    return (
        <Fragment>
            <h1 className={classes.title}>Add product</h1>
            <div className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.info}>
                        <label>Information</label>
                        <input
                            type='text'
                            placeholder='Name'
                            value={name}
                            onChange={event => setName(event.target.value)}
                        />
                        <input
                            type='text'
                            placeholder='Description'
                            value={description}
                            onChange={event => setDescription(event.target.value)}
                        />
                    </div>
                    <div className={classes.macro}>
                        <label>Macro</label>
                        <div className={classes.input}>
                            <label>Calories</label>
                            <input
                                type='number'
                                value={calories}
                                onChange={event => setCalories(event.target.value)}
                                min={0}
                                max={100}
                                step={0.1}
                            />
                            <p>kcal</p>
                        </div>
                        <div className={classes.input}>
                            <label>Carbs</label>
                            <input
                                type='number'
                                value={carbs}
                                onChange={event => setCarbs(event.target.value)}
                                min={0}
                                max={100}
                                step={0.1}
                            />
                            <p>g</p>
                        </div>
                        <div className={classes.input}>
                            <label>Fat</label>
                            <input
                                type='number'
                                value={fat}
                                onChange={event => setFat(event.target.value)}
                                min={0}
                                max={100}
                                step={0.1}
                            />
                            <p>g</p>
                        </div>
                        <div className={classes.input}>
                            <label>Protein</label>
                            <input
                                type='number'
                                value={protein}
                                onChange={event => setProtein(event.target.value)}
                                min={0}
                                max={100}
                                step={0.1}
                            />
                            <p>g</p>
                        </div>
                        <div className={classes.input}>
                            <label>Water</label>
                            <input
                                type='number'
                                value={water}
                                onChange={event => setWater(event.target.value)}
                                min={0}
                                max={100}
                                step={0.1}
                            />
                            <p>ml</p>
                        </div>
                    </div>


                    <div className={classes.vitamin}>

                        <label>Vitamins and minerals</label>
                        <div className={classes.tagsContainer}>
                            {vitaminList !== null && vitaminList.map(vit => {
                                return (
                                    <div className={classes.tags} key={vit.name}>
                                        <p>{`${vit.name} - ${vit.value} ${vit.unit}`}</p>
                                        <RxCross2 style={{cursor: 'pointer'}} onClick={() => handleRemoveVitamin(`${vit.name}`)}/>
                                    </div>
                                )
                            })}
                        </div>
                        <div className={classes.vitaminSection}>
                            <input type='number' placeholder='count' min='0' max='100' step='0.1'
                                   onChange={event => setVitaminCount(event.target.value)}/>
                            <select onChange={event => setVitaminUnit(event.target.value)} value={vitaminUnit}>
                                <option>mg</option>
                                <option>μg</option>
                                <option>g</option>
                            </select>
                        </div>
                        <select onChange={event => setVitaminName(event.target.value)} value={vitaminName}>
                            {options.map(option => {
                                if (option.active) {
                                    return <option key={option.name}>{option.name}</option>
                                }
                            })}
                        </select>
                        <button type='button' className={classes.btn} onClick={handleAddVitamin}>Add</button>
                    </div>
                    <UploadFile buttonText='Send' file={file} setFile={setFile}/>
                    <button type='button' onClick={saveProductHandler} className={classes.saveBtn}>Save</button>
                </div>
            </div>
        </Fragment>
    )
}

async function sendProduct(formData) {
    const response = await fetch(FILE_UPLOAD_BASE_ENDPOINT + '/products', {
        method: 'POST',
        body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
        return new Error(data.message || "Something went wrong!");
    }
}

export default AddProductForm;