const { useState, useRef, useEffect } = require("react");

module.exports = function useExtendedState(initialState) {
    const [state, setState] = useState(initialState);
    const ref = useRef(state);

    useEffect(() => {
        ref.current = state;
    }, [state])

    const getLatestState = () => {
        return ref.current;
    };

    return [state, setState, getLatestState];
}