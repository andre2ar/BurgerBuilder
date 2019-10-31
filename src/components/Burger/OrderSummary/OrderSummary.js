import React, {Fragment} from 'react';

const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(ingredient => {
        return (
            <li key={ingredient}>
                <span style={{textTransform: 'capitalize'}}>{ingredient}</span>: {props.ingredients[ingredient]}
            </li>
        );
    });
    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>

            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
        </Fragment>
    );
};

export default OrderSummary;