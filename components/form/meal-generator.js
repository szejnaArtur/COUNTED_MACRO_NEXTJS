import classes from './meal-generator.module.css';
import {GiAubergine, GiAvocado, GiBananaBunch, GiFriedEggs, GiMeat, GiSandwich} from 'react-icons/gi';
import {useState} from "react";

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

    const [selectedDiet, setSelectedDiet] = useState('Anything')

    return (
        <div className={classes.container}>
            <div className={classes.icons}>
                {diets.map(diet =>
                    <div
                        key={diet.name}
                        className={classes.item}
                        style={selectedDiet === diet.name ? {backgroundColor: '#f6f930dd'} : {backgroundColor: 'transparent'}}
                        onClick={() => setSelectedDiet(diet.name)}
                    >
                        {diet.icon}
                        <p>{diet.name}</p>
                    </div>
                )}
            </div>
            <form className={classes.form}>
                <div>
                    <label>I want to eat</label>
                    <input type='number'/>
                </div>
                <div>
                    <label>in</label>
                    <select>
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

            </form>
        </div>
    )
}

export default MealGeneratorForm;