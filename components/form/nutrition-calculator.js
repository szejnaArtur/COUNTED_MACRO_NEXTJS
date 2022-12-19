import classes from './nutrition-calculator.module.css';

import {RxCross1} from 'react-icons/Rx';
import {useRef, useState} from "react";
import useCollapse from "react-collapsed";

import {BsQuestionCircle, BsCalculator, BsCheck} from 'react-icons/bs';

const color = '#ffea56';

const NutritionCalculator = (props) => {

    const [isExpanded, setExpanded] = useState(false);
    const {getCollapseProps, getToggleProps} = useCollapse({isExpanded});

    const [cause, setCause] = useState("Maintain");
    const [sex, setSex] = useState("Male");
    const [height, setHeight] = useState(170);
    const [weight, setWeight] = useState(80);
    const [age, setAge] = useState(25);
    const [bodyfat, setBodyfat] = useState("Medium");

    const [calories, setCalories] = useState(null);
    const [carbohydrate, setCarbohydrate] = useState(null);
    const [protein, setProtein] = useState(null);
    const [fat, setFat] = useState(null);

    const refActivity = useRef();

    const calculateBMR = () => {
        let BMR = 0;

        if (sex === 'Male') {
            BMR = 66 + 13.7 * weight + 5 * height - 6.8 * age;
        } else {
            BMR = 655 + 9.6 * weight + 1.8 * height - 4.7 * age;
        }

        if (cause === "Lose weight") {
            BMR = BMR * 0.8;
        }

        if (cause === "Build muscle") {
            BMR = BMR * 1.15;
        }

        const activity = refActivity.current.value;

        if (activity === "Sedentary") BMR = BMR * 1.2;
        if (activity === "Lightly Active") BMR = BMR * 1.375;
        if (activity === "Moderately Active") BMR = BMR * 1.55;
        if (activity === "Very Active") BMR = BMR * 1.725;
        if (activity === "Extremely Active") BMR = BMR * 1.9;

        return BMR;
    }
    const calculateCarbohydrate = (BMR) => {
        const carbMin = Math.round(BMR * 0.45 / 4);
        const carbMax = Math.round(BMR * 0.65 / 4);
        return carbMin + 'g - ' + carbMax + 'g';
    }
    const calculateFat = (BMR) => {
        const fatMin = Math.round(BMR * 0.20 / 9);
        const fatMax = Math.round(BMR * 0.35 / 9);
        return fatMin + 'g - ' + fatMax + 'g';
    }
    const calculateProtein = (BMR) => {
        const proteinMin = Math.round(BMR * 0.10 / 4);
        const proteinMax = Math.round(BMR * 0.35 / 4);
        return proteinMin + 'g - ' + proteinMax + 'g';
    }

    const calculateMarcoHandle = () => {
        const BMR = calculateBMR();
        setCalories(Math.round(BMR));
        setCarbohydrate(calculateCarbohydrate(BMR));
        setFat(calculateFat(BMR));
        setProtein(calculateProtein(BMR));
        setExpanded(true);
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

                    <button
                        type='button'
                        className={classes.btn}
                        {...getToggleProps({
                            onClick: calculateMarcoHandle,
                        })}
                    >
                        <BsCalculator/>
                        <p>Calculate</p>
                    </button>

                    <div {...getCollapseProps()} className={classes.tableContainer}>
                        <table
                            className={classes.table}
                        >
                            <tr>
                                <th>Suggested Calories</th>
                                <th>Carbs</th>
                                <th>Fat</th>
                                <th>Protein</th>
                            </tr>
                            <tr>
                                <td>{calories} kcal</td>
                                <td>{carbohydrate}</td>
                                <td>{fat}</td>
                                <td>{protein}</td>
                            </tr>
                        </table>
                        <button
                            type='button'
                            className={classes.btnApply}
                            onClick={changeCalories}
                        >
                            <BsCheck/>
                            <p>Apply these setting</p>
                        </button>
                    </div>

            </div>
        </div>
    )
}

export default NutritionCalculator;