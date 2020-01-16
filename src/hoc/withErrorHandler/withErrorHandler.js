import React from 'react';

import Modal from "../../components/UI/Modal/Modal";
import useHttpErrorHandler from '../../hoc/hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, clearError] = useHttpErrorHandler(axios);

        return (
            <>
                <Modal show={error} modalClose={clearError}>
                    {error ? error.message : null}
                </Modal>

                <WrappedComponent {...props}/>
            </>
        );
    }
};

export default withErrorHandler;