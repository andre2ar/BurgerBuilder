import React, {Component, Fragment} from 'react';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

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
        totalPrice: 1,
        purchasable: false
    };

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(ingredient => {
            return ingredients[ingredient];
        }).reduce((sum, element) => {
            return sum + element;
        }, 0);

        this.setState({purchasable: sum > 0});
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

        this.updatePurchaseState(updatedIngredients);
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
        this.updatePurchaseState(updatedIngredients);
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Fragment>
                <Modal>
                    <OrderSummary ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />

                <BuildControls
                    price={this.state.totalPrice}
                    ingredientAdded={this.addIngredienteHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                />
            </Fragment>
        );
    }
}

export default BurgerBuilder;