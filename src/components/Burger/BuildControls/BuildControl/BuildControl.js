import React from 'react';
import classes from './BuildControl.module.css'

const BuildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>

        <button className={classes.Less}
                onClick={() => props.removed(props.type)}>Less</button>

        <button className={classes.More}
                onClick={() => props.added(props.type)}>More</button>
    </div>
);

export default BuildControl;