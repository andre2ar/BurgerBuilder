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
        {controls.map(crtl => (
            <BuildControl key={crtl.label} label={crtl.label}/>
        ))}
    </div>
);

export default BuildControls;