import {useState, useRef, Fragment} from "react";

import classes from './meal-generator.module.css';

import {GiAubergine, GiAvocado, GiBananaBunch, GiFriedEggs, GiMeat, GiSandwich} from 'react-icons/gi';
import {BsCalculator} from 'react-icons/bs'
import NutritionCalculator from "./nutrition-calculator";

const diets = [
    {
        name: 'Anything',
        icon: <GiSandwich className={classes.icon}/>
    }, {
        name: 'Paleo',
        icon: <GiMeat className={classes.icon}/>
    }, {
        name: 'Vegetarian',
        icon: <GiAubergine className={classes.icon}/>
    }, {
        name: 'Vegan',
        icon: <GiAvocado className={classes.icon}/>
    }, {
        name: 'Ketogenic',
        icon: <GiFriedEggs className={classes.icon}/>
    }, {
        name: 'Mediterranean',
        icon: <GiBananaBunch className={classes.icon}/>
    },
]

const MealGeneratorForm = () => {

    const [calories, setCalories] = useState(2000);
    const [selectedDiet, setSelectedDiet] = useState('Anything');
    const [isActiveCaloriesCalculator, setIsActiveCaloriesCalculator] = useState(false);

    const mealInputRef = useRef();

    const sendDietHandler = () => {
        const enteredMeals = mealInputRef.current.value;

        const dietToGenerate = {
            diet: selectedDiet,
            calories: calories,
            numberOfMeals: enteredMeals.substring(0,1)
        }

        console.log(dietToGenerate);
    }

    const clickHandler = () => {
        setIsActiveCaloriesCalculator(prevState => !prevState);
    }

    return (
        <Fragment>
            {isActiveCaloriesCalculator && <NutritionCalculator click={clickHandler} changeCalories={setCalories}/>}
            <div className={classes.container}>

                <div className={classes.icons}>
                    {diets.map(diet =>
                        <button
                            type='button'
                            key={diet.name}
                            className={classes.item}
                            style={selectedDiet === diet.name ? {backgroundColor: '#f6f930dd'} : {backgroundColor: 'transparent'}}
                            onClick={() => setSelectedDiet(diet.name)}
                        >
                            {diet.icon}
                            <p>{diet.name}</p>
                        </button>
                    )}
                </div>
                <form className={classes.form}>
                    <div className={classes.row}>
                        <label>I want to eat</label>
                        <input type='number' className={classes.input} min="500" max="12000" step="100" value={calories} onChange={(event) => setCalories(event.target.value)}/>
                        <button className={classes.calculator} onClick={clickHandler} type='button'>
                            <BsCalculator className={classes.calcIcon}/>
                            <p>Not Sure?</p>
                        </button>
                        <div className={classes.calories}>
                            <p>Calories</p>
                        </div>
                    </div>
                    <div className={classes.row}>
                        <label>in</label>
                        <select className={classes.input} ref={mealInputRef}>
                            <option>1 meal</option>
                            <option>2 meal</option>
                            <option>3 meal</option>
                            <option>4 meal</option>
                            <option>5 meal</option>
                            <option>6 meal</option>
                            <option>7 meal</option>
                            <option>8 meal</option>
                            <option>9 meal</option>
                        </select>
                    </div>
                    <button type='button' className={classes.btn} onClick={sendDietHandler}>Generate</button>
                </form>
            </div>
        </Fragment>
    )
}

export default MealGeneratorForm;