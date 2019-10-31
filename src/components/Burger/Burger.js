import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = (props) => {
    const ingredients = Object.keys(props.ingredients).map(ingredient => {
        return [...Array(props.ingredients[ingredient])].map((_, i) => {
            return <BurgerIngredient type={ingredient} key={ingredient + i}/>;
        });
    });

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type={"bread-top"}/>
            {ingredients}
            <BurgerIngredient type={"bread-bottom"}/>
        </div>
    );
};

export default Burger;