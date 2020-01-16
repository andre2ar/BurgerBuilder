import React, { Fragment, useState, useEffect } from 'react';

import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [ error, setError ] = useState(null);

        const reqInterceptor = axios.interceptors.request.use(request => {
            setError(null);
            return request;
        });

        const resInterceptor = axios.interceptors.response.use(response => response, err => {
            setError(err);
        });

        /*Component will unmount*/
        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            }
        }, [reqInterceptor, resInterceptor]);


        const errorConfirmedHandler = () => {
            setError(null);
        };

        return (
            <Fragment>
                <Modal show={error} modalClose={errorConfirmedHandler}>
                    {error ? error.message : null}
                </Modal>

                <WrappedComponent {...props}/>
            </Fragment>
        );
    }
};

export default withErrorHandler;