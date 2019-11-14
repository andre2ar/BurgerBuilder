import React, {Component, Fragment} from 'react';

import classes from './ContactData.module.css';

import axios from '../../../axios-orders';
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    option: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: '',
                valid: true
            }
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({loading: true});
        const formData = {};

        for(let id in this.state.orderForm) {
            formData[id] = this.state.orderForm[id].value;
        }

        //.json is an specific thing from firebase
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        };

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            }).catch(error => {
                this.setState({loading: false});
            });
    };

    checkValidity(value, rules) {
        if (rules && rules.required) {
            return value.trim() !== '';
        }else return true;
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };

        updatedFormElement.value = event.target.value;

        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);

        updatedOrderForm[inputIdentifier] = updatedFormElement;

        this.setState({orderForm: updatedOrderForm});
    };

    render() {
        const formElementsArray = [];
        for(let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <Fragment>
                <h4>Enter your contact data</h4>

                <form onSubmit={this.orderHandler}>
                    {formElementsArray.map(formElement => (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            changed={(event) => this.inputChangeHandler(event, formElement.id)}
                        />
                    ))}

                    <Button btnType="Success">
                        ORDER
                    </Button>
                </form>
            </Fragment>
        );

        if(this.state.loading) {
            form = <Spinner/>;
        }
        return (
            <div className={classes.ContactData}>
                {form}
            </div>
        );
    }
}

export default ContactData;