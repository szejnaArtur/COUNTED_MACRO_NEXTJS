import classes from './nutrition-calculator.module.css';

import {RxCross1} from 'react-icons/Rx';
import {BsQuestionCircle, BsCheck} from 'react-icons/bs';
import {useRef, useState} from "react";
import {BsCalculator} from 'react-icons/bs'

const color = '#ffea56';

const NutritionCalculator = (props) => {

    const [cause, setCause] = useState("Maintain");
    const [sex, setSex] = useState("Male");
    const [height, setHeight] = useState(170);
    const [weight, setWeight] = useState(80);
    const [age, setAge] = useState(25);
    const [bodyfat, setBodyfat] = useState("Medium");
    const [calories, setCalories] = useState(null);

    const refActivity = useRef();

    const calculateHandle = () => {
        let BMR = 0;

        if (sex === 'Male'){
            BMR = 66 + 13.7 * weight + 5 * height - 6.8 * age;
        } else {
            BMR = 655 + 9.6 * weight + 1.8 * height - 4.7 * age;
        }

        if (cause === "Lose weight"){
            BMR = BMR * 0.8;
        }

        if (cause === "Build muscle"){
            BMR = BMR * 1.15;
        }

        const activity = refActivity.current.value;

        if (activity === "Sedentary") BMR = BMR * 1.2;
        if (activity === "Lightly Active") BMR = BMR * 1.375;
        if (activity === "Moderately Active") BMR = BMR * 1.55;
        if (activity === "Very Active") BMR = BMR * 1.725;
        if (activity === "Extremely Active") BMR = BMR * 1.9;

        setCalories(BMR);
    }

    const changeCalories = () => {
        props.changeCalories(calories);
        props.click();
    }

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <div className={classes.header}>
                    <h3>Nutrition calculator</h3>
                    <RxCross1 className={classes.exit} onClick={props.click}/>
                </div>
                <div className={classes.info}>
                    <p>This calculator uses a standard BMR equation (the Mifflin-St Jeor formula) to estimate your
                        Calorie needs. We also make some rough macronutrient suggestions, but you're free to completely
                        customize these values when you create a free account.</p>
                    <p><b>Keep in mind that this is a general estimate.</b> For best results, consult your healthcare
                        provider.</p>
                </div>
                <div className={classes.calculator}>
                    <div className={classes.label}>
                        <label>I want to</label>
                        <BsQuestionCircle/>
                    </div>
                    <div className={classes.section}>
                        <button
                            type='button'
                            style={cause === 'Lose weight' ? {backgroundColor: color} : {backgroundColor: "transparent"}}
                            onClick={() => setCause('Lose weight')}
                        >Lose weight
                        </button>
                        <button
                            type='button'
                            style={cause === 'Maintain' ? {backgroundColor: color} : {backgroundColor: "transparent"}}
                            onClick={() => setCause('Maintain')}
                        >Maintain
                        </button>
                        <button
                            type='button'
                            style={cause === 'Build muscle' ? {backgroundColor: color} : {backgroundColor: "transparent"}}
                            onClick={() => setCause('Build muscle')}
                        >Build muscle
                        </button>
                    </div>
                    <div className={classes.label}>
                        <label>I am</label>
                    </div>
                    <div className={classes.section}>
                        <button
                            type='button'
                            style={sex === 'Male' ? {backgroundColor: color} : {backgroundColor: "transparent"}}
                            onClick={() => setSex('Male')}
                        >Male
                        </button>
                        <button
                            type='button'
                            style={sex === 'Female' ? {backgroundColor: color} : {backgroundColor: "transparent"}}
                            onClick={() => setSex('Female')}
                        >Female
                        </button>
                    </div>
                    <div className={classes.label}>
                        <label>Height</label>
                    </div>
                    <div className={classes.section}>
                        <input type='number' min="120" max="250" step="1" value={height}
                               onChange={(event) => setHeight(event.target.value)}/>
                        <p>cm</p>
                    </div>
                    <div className={classes.label}>
                        <label>Weight</label>
                    </div>
                    <div className={classes.section}>
                        <input type='number' min="30" max="250" step="1" value={weight}
                               onChange={(event) => setWeight(event.target.value)}/>
                        <p>kgs</p>
                    </div>
                    <div className={classes.label}>
                        <label>Age</label>
                    </div>
                    <div className={classes.section}>
                        <input type='number' min="10" max="120" step="1" value={age}
                               onChange={(event) => setAge(event.target.value)}/>
                        <p>years</p>
                    </div>
                    <div className={classes.label}>
                        <label>Bodyfat</label>
                        <BsQuestionCircle/>
                    </div>
                    <div className={classes.section}>
                        <button
                            type='button'
                            style={bodyfat === 'Low' ? {backgroundColor: color} : {backgroundColor: "transparent"}}
                            onClick={() => setBodyfat('Low')}
                        >Low
                        </button>
                        <button
                            type='button'
                            style={bodyfat === 'Medium' ? {backgroundColor: color} : {backgroundColor: "transparent"}}
                            onClick={() => setBodyfat('Medium')}
                        >Medium
                        </button>
                        <button
                            type='button'
                            style={bodyfat === 'High' ? {backgroundColor: color} : {backgroundColor: "transparent"}}
                            onClick={() => setBodyfat('High')}
                        >High
                        </button>
                    </div>
                    <div className={classes.label}>
                        <label>Activity level</label>
                        <BsQuestionCircle/>
                    </div>
                    <div className={classes.section}>
                        <select ref={refActivity}>
                            <option>Sedentary</option>
                            <option>Lightly Active</option>
                            <option>Moderately Active</option>
                            <option>Very Active</option>
                            <option>Extremely Active</option>
                        </select>
                    </div>
                </div>
                <button type='button' onClick={calculateHandle} className={classes.btn}>
                    <BsCalculator />
                    <p>Calculate</p>
                </button>
                <table className={classes.table}>
                    <tr>
                        <th>Suggested Calories</th>
                        <th>Carbs</th>
                        <th>Fat</th>
                        <th>Protein</th>
                    </tr>
                    <tr>
                        <td>{calories}</td>
                        <td>100g-150g</td>
                        <td>76g-143g</td>
                        <td>110g-321g</td>
                    </tr>
                </table>
                <button type='button' className={classes.btnApply} onClick={changeCalories}>
                    <BsCheck />
                    <p>Apply these setting</p>
                </button>
            </div>
        </div>
    )
}

export default NutritionCalculator;