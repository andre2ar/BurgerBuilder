import React, { Component, Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {authCheckState} from "./store/actions";

import Layout from './containers/Layout/Layout';
import Spinner from "./components/UI/Spinner/Spinner";
import Order from "./components/Order/Order";

const BurgerBuilder = React.lazy(() => import('./containers/BurgerBuilder/BurgerBuilder'));
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Auth = React.lazy(() => import('./containers/Auth/Auth'));
const Logout = React.lazy(() => import('./containers/Auth/Logout/Logout'));

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        let routes = null;
        if(this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path='/checkout' render={() =>
                        <Suspense fallback={<Spinner/>}>
                            <Checkout />
                        </Suspense>
                    } />

                    <Route path='/orders' render={() =>
                        <Suspense fallback={<Spinner/>}>
                            <Orders />
                        </Suspense>
                    } />

                    <Route path='/logout' render={() =>
                        <Suspense fallback={<Spinner/>}>
                            <Logout/>
                        </Suspense>
                    } />

                    <Route path='/auth' render={() =>
                        <Suspense fallback={<Spinner/>}>
                            <Auth />
                        </Suspense>
                    } />

                    <Route path='/' render={() =>
                        <Suspense fallback={<Spinner/>}>
                            <BurgerBuilder/>
                        </Suspense>
                    } />
                </Switch>
            );
        } else {
            routes = (
                <Switch>
                    <Route path='/auth' render={() =>
                        <Suspense fallback={<Spinner/>}>
                            <Auth />
                        </Suspense>
                    } />

                    <Route path='/' render={() =>
                        <Suspense fallback={<Spinner/>}>
                            <BurgerBuilder/>
                        </Suspense>
                    } />
                </Switch>
            );
        }

        return (
            <div>
                <Layout>
                    { routes }
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(authCheckState())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
