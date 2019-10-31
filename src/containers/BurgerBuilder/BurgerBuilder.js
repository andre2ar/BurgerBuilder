import React, {Component, Fragment} from 'react';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENTS_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component{
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 1
    };

    addIngredienteHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = this.state.ingredients[type] + 1;
        const newPrice = this.state.totalPrice + INGREDIENTS_PRICE[type];

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
    };

    removeIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        };

        if(updatedIngredients[type] - 1 >= 0) {
            updatedIngredients[type] = this.state.ingredients[type] - 1;
            const newPrice = this.state.totalPrice - INGREDIENTS_PRICE[type];

            this.setState({
                totalPrice: newPrice,
                ingredients: updatedIngredients
            });
        }
    };

    render() {
        return (
            <Fragment>
                <Burger ingredients={this.state.ingredients} />

                <BuildControls
                    ingredientAdded={this.addIngredienteHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                />
            </Fragment>
        );
    }
}

export default BurgerBuilder;