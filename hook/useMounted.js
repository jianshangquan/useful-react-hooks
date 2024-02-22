const { useEffect, useState } = require('react');

module.exports = function useMounted(){
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, [])

    return mounted;
}