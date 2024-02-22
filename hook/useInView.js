const { useState, useEffect } = require('react');

module.exports = function useInView(ref, option = { threshold: 1 }) {

    const [isIntersecting, setIntersecting] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIntersecting(entry.isIntersecting,)
            },
            option
        )
        ref.current && observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    return isIntersecting
}