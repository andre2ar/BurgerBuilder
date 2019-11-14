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
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    option: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            }
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({loading: true});

        //.json is an specific thing from firebase
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
        };

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            }).catch(error => {
                this.setState({loading: false});
            });
    };

    render() {
        let form = (
            <Fragment>
                <h4>Enter your contact data</h4>

                <form>
                    <Input />
                    <Input type='email' name="email" placeholder="Your Mail"/>
                    <Input type='text' name="street" placeholder="Street"/>
                    <Input type='text' name="postal" placeholder="Postal code"/>

                    <Button clicked={this.orderHandler} btnType="Success">
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