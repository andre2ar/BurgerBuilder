import React, {Component, Fragment} from 'react';
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

class BurgerBuilder extends Component{
    state = {
        purchasing: false
    };

    componentDidMount(prevProps, prevState, snapshot) {
        this.props.onInitIngredients();
    }

    updatePurchasable = (ingredients) => {
        const sum = Object.keys(ingredients).map(ingredient => {
            return ingredients[ingredient];
        }).reduce((sum, element) => {
            return sum + element;
        }, 0);

        return sum > 0;
    };

    purchaseHandler = () => {
        if(!this.props.isAuthenticated) {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        } else this.setState({purchasing: true});
    };

    puchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push({
            pathname: '/checkout'
        });
    };

    render() {
        const disabledInfo = {
            ...this.props.ings
        };

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded</p>: <Spinner/>;

        if(this.props.ings){
            burger = (
                <Fragment>
                    <Burger ingredients={this.props.ings} />

                    <BuildControls
                        price={this.props.totalPrice}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchasable(this.props.ings)}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                    />
                </Fragment>
            );

            orderSummary = <OrderSummary
                price={this.props.totalPrice}
                ingredients={this.props.ings}
                modalClose={this.puchaseCancelHandler}
                modalContinue={this.purchaseContinueHandler}
            />;
        }

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