import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../store/actions/index';
import {withRouter} from "react-router-dom";

const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);

    const { onInitIngredients } = props;

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    const updatePurchasable = (ingredients) => {
        const sum = Object.keys(ingredients).map(ingredient => {
            return ingredients[ingredient];
        }).reduce((sum, element) => {
            return sum + element;
        }, 0);

        return sum > 0;
    };

    const purchaseHandler = () => {
        if(!props.isAuthenticated) {
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        } else setPurchasing(true);
    };

    const puchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push({
            pathname: '/checkout'
        });
    };

    const disabledInfo = {
        ...props.ings
    };

    for(let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = props.error ? <p>Ingredients can't be loaded</p>: <Spinner/>;

    if(props.ings){
        burger = (
            <>
                <Burger ingredients={props.ings} />

                <BuildControls
                    price={props.totalPrice}
                    ingredientAdded={props.onIngredientAdded}
                    ingredientRemoved={props.onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={updatePurchasable(props.ings)}
                    ordered={purchaseHandler}
                    isAuth={props.isAuthenticated}
                />
            </>
        );

        orderSummary = <OrderSummary
            price={props.totalPrice}
            ingredients={props.ings}
            modalClose={puchaseCancelHandler}
            modalContinue={purchaseContinueHandler}
        />;
    }

    return (
        <>
            <Modal show={purchasing}
                   modalClose={puchaseCancelHandler}>
                {orderSummary}
            </Modal>

            {burger}
        </>
    );
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios)));