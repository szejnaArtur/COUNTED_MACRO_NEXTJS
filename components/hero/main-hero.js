import classes from './main-hero.module.css';
import MealGeneratorForm from "../form/meal-generator";

const MainHero = () => {
    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <h2>Put your diet on autopilot</h2>
                <p>
                    Eat This Much creates personalized meal plans based on your food preferences, budget, and schedule.
                    Reach your diet and nutritional goals with our calorie calculator, weekly meal plans, grocery lists
                    and more. <b>Create your meal plan right here in seconds.</b>
                </p>
                <h4>Ready to give it a shot? Let us know your diet.</h4>
            </div>
            <MealGeneratorForm/>
        </div>
    )
}

export default MainHero;