import React, {Component, Fragment} from 'react';

import classes from './ContactData.module.css';

import axios from '../../../axios-orders';
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
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
            custumer: {
                name: 'André Alvim Ribeiro',
                adress: {
                    street: 'Street 12',
                    zipCode: '12345678',
                    country: 'Brazil'
                },
                email: 'teste@test.com'
            },
            deliveryMethod: 'fastest'
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
                    <input className={classes.Input} type='text' name="name" placeholder="Your Name"/>
                    <input className={classes.Input} type='email' name="email" placeholder="Your Mail"/>
                    <input className={classes.Input} type='text' name="street" placeholder="Street"/>
                    <input className={classes.Input} type='text' name="postal" placeholder="Postal code"/>

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