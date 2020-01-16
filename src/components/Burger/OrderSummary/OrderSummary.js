import React from 'react';
import Button from "../../UI/Button/Button";

const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(ingredient => {
        return (
            <li key={ingredient}>
                <span style={{textTransform: 'capitalize'}}>{ingredient}</span>: {props.ingredients[ingredient]}
            </li>
        );
    });

    return (
        <>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>

            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>

            <p>Total Price: <strong> $ {props.price.toFixed(2)}</strong></p>
            <Button btnType={'Danger'} clicked={props.modalClose}>
                CANCEL
            </Button>
            <Button btnType={'Success'} clicked={props.modalContinue}>
                CONTINUE
            </Button>
        </>
    );
};

export default OrderSummary;