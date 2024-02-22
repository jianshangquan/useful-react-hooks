const { useRef, useEffect } = require('react');


module.exports = function useComponentDidMount() {
  const ref = useRef();
  useEffect(() => {
    ref.current = true;
  }, []);
  return ref.current;
};