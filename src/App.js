import React, { Suspense, useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {authCheckState} from "./store/actions";

import Layout from './containers/Layout/Layout';
import Spinner from "./components/UI/Spinner/Spinner";

const BurgerBuilder = React.lazy(() => import('./containers/BurgerBuilder/BurgerBuilder'));
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Auth = React.lazy(() => import('./containers/Auth/Auth'));
const Logout = React.lazy(() => import('./containers/Auth/Logout/Logout'));

const App = props => {
    const { onTryAutoSignup } = props;
    useEffect(() => {
        onTryAutoSignup();
    }, [onTryAutoSignup]);

    let routes = null;
    if(props.isAuthenticated) {
        routes = (
            <Switch>
                <Route path='/checkout' render={() => <Checkout /> } />
                <Route path='/orders' render={() => <Orders /> } />
                <Route path='/logout' component={() => <Logout/> } />
                <Route path='/auth' render={() => <Auth /> } />
                <Route path='/' component={() => <BurgerBuilder/> } />
            </Switch>
        );
    } else {
        routes = (
            <Switch>
                <Route path='/auth' render={() => <Auth />} />
                <Route path='/' component={() => <BurgerBuilder/>} />
            </Switch>
        );
    }

    return (
        <div>
            <Layout>
                <Suspense fallback={<Spinner/>}>
                    { routes }
                </Suspense>
            </Layout>
        </div>
    );
};

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