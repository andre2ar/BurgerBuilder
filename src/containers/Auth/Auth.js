import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from "../../components/UI/Spinner/Spinner";
import { checkValidity } from "../../shared/utility";

const Auth = props => {
    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Mail Address'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false
        }
    });

    const [isSignup, setIsSignup] = useState(false);

    const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props;

    useEffect(() => {
        if(!buildingBurger && authRedirectPath !== '/') {
            onSetAuthRedirectPath();
        }
    }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

    const inputChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...controls,
            [controlName]: {
                ...controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation)
            }
        };

        setControls(updatedControls);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(
            controls.email.value,
            controls.password.value,
            isSignup
        );
    };

    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup);
    };

    const formElementsArray = [];
    for(let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key]
        });
    }

    let form = formElementsArray.map(formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            changed={(event) => inputChangeHandler(event, formElement.id)}
        />
    ));

    if(props.loading) {
        form = <Spinner/>;
    }

    let errorMessage = null;
    if(props.error){
        errorMessage = (
            <p>
                {props.error.message}
            </p>
        );
    }

    let auth = (
        <div className={classes.Auth}>
            <form onSubmit={submitHandler}>
                {form}

                <Button btnType="Success">SUBMIT</Button>
            </form>
            {errorMessage}
            <Button
                clicked={switchAuthModeHandler}
                btnType="Danger">
                SWITCH TO SIGN{isSignup ? 'IN' : 'UP'}
            </Button>
        </div>
    );

    if(props.isAuthenticated) {
        auth = <Redirect to={props.authRedirectPath} />;
    }

    return auth;
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);