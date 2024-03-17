const { useState } = require('react');

const FetchState = Object.freeze({
    LOADING: 'loading',
    COMPLETED: 'completed',
    ERROR: 'error',
    NOT_INITIALIZE: 'not-initialized'
})
module.exports.FetchState =  FetchState;

module.exports.useFetchState = function useFetchState(){
    const [state, setState] = useState({
        status: FetchState.NOT_INITIALIZE,
        data: null,
        message: null,
        error: null,
        progress: 0,
    });

    const func = {
        status: state,
        notInitialize: () => setState({ status: FetchState.NOT_INITIALIZE, data: null, error: null, progress: 0, message: '' }),
        completed: ({data, message} = {}) => setState({ status: FetchState.COMPLETED, data, error: null, progress: 100, message }),
        error: ({error, message} = {}) => setState({ status: FetchState.ERROR, data: null, error, progress: 0, message: message || error.message }),
        pending: ({ progress = 0, message }) => func.loading(progress, message),
        loading: (progress = 0, message) => setState({ status: FetchState.LOADING, data: null, error: null, progress, message }),
    }
    return func;
}


