import React, {Component, Fragment} from 'react';

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";

const INGREDIENTS_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component{
    state = {
        ingredients: null,
        totalPrice: 1,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount(prevProps, prevState, snapshot) {
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            }).catch(error => {
                this.setState({error: true});
            });
    }

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

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    puchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        /*this.setState({loading: true});

        //.json is an specific thing from firebase
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            custumer: {
                name: 'André Alvim Ribeiro',
                adress: {
                    street: 'Street 12',
                    zipCode: '12345678',
                    country: 'Brazil'
                },
                email: 'teste@test.com'
            },
            deliveryMethod: 'fastest'
        };

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false, purchasing: false});
            }).catch(error => {
                this.setState({loading: false, purchasing: false});
            });*/
        const queryParams = [];
        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p>: <Spinner/>;

        if(this.state.ingredients){
            burger = (
                <Fragment>
                    <Burger ingredients={this.state.ingredients} />

                    <BuildControls
                        price={this.state.totalPrice}
                        ingredientAdded={this.addIngredienteHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                    />
                </Fragment>
            );

            orderSummary = <OrderSummary
                price={this.state.totalPrice}
                ingredients={this.state.ingredients}
                modalClose={this.puchaseCancelHandler}
                modalContinue={this.purchaseContinueHandler}
            />;
        }

        if(this.state.loading) orderSummary = <Spinner/>;

        return (
            <Fragment>
                <Modal show={this.state.purchasing}
                       modalClose={this.puchaseCancelHandler}>
                    {orderSummary}
                </Modal>

                {burger}
            </Fragment>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);