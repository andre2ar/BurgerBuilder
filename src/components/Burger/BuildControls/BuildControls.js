import React from 'react';
import BuildControl from "./BuildControl/BuildControl";
import classes from './BuildControls.module.css';

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'}
];

const BuildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current price: <strong>$ {props.price.toFixed(2)}</strong></p>
        {controls.map(crtl => (
            <BuildControl
                key={crtl.label}
                label={crtl.label}
                type={crtl.type}
                added={props.ingredientAdded}
                removed={props.ingredientRemoved}
                disabled={props.disabled[crtl.type]}
            />
        ))}

        <button disabled={!props.purchasable}
                className={classes.OrderButton}
                onClick={props.ordered}>
            {props.isAuth ? 'ORDER NOW' : 'SIGN-IN TO ORDER'}
        </button>
    </div>
);

export default BuildControls;