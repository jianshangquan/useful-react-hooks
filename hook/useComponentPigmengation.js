const { useEffect, useState } = require('react');
const useMounted = require('./useMounted');

module.exports = function useComponentPigmengation(ref, onPigment, { threshold = 0.99, attatch = true, triggerOnce = true, dependicies = [], autoPauseTriggerWhenNoData = true }) {

    const mounted = useMounted();
    const [pause, setPause] = useState(false);
    const [triggered, setTriggered] = useState(false);
    

    const trigger = async () => {
        if(!mounted) return;
        if(onPigment){
            const hasData = await onPigment();
            if(hasData == false && autoPauseTriggerWhenNoData) setPause(true); 
        }
        setTriggered(true);
    }

    useEffect(() => {
        if(!attatch) return;
        const compoment = ref.current;
        if(compoment == null) return;
        const onScroll = (event) => {
            if(pause) return;
            
            const scroll = compoment.scrollTop + compoment.offsetHeight;
            const scrollHeight = compoment.scrollHeight;
            if (scroll / scrollHeight >= threshold) {
                if (triggerOnce) {
                    if(!triggered){
                        trigger();
                        return;
                    }
                    return;
                }

                trigger();
            }else{
                setTriggered(false);
            }
        };
        compoment.addEventListener('scroll', onScroll);
        return () => {
            compoment.removeEventListener('scroll', onScroll);
        }
    }, [ triggered, attatch, ref.current, ...dependicies]);


    return {
        pause: () => setPause(true),
        start: () => setPause(false)
    }
    
}