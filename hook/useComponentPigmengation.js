const { useEffect, useState } = require('react');
const useMounted = require('./useMounted');

module.exports = function useComponentPigmengation(ref, onPigment, { threshold = 0.99, attatch = true, triggerOnce = true, dependicies = [], autoPauseTriggerWhenNoData = true }) {

    const mounted = useMounted();
    // const [pause, setPause] = useState(false);
    const pause = useRef();
    const [triggered, setTriggered] = useState(false);
    

    const trigger = async () => {
        if(!mounted) return;
        if(pause.current) return;
        if(onPigment){
            pause.current = true;
            const hasData = await onPigment();
            if(hasData == false && autoPauseTriggerWhenNoData) {
                pause.current = true;
            }
        }
        setTriggered(true);
    }

    useEffect(() => {
        if(!attatch) return;
        const compoment = ref.current;
        if(compoment == null) return;
        const onScroll = async (event) => {
            if(pause.current) return;
            

            const scroll = compoment.scrollTop + compoment.offsetHeight;
            const scrollHeight = compoment.scrollHeight;
            if (scroll / scrollHeight >= threshold) {
                if (triggerOnce) {
                    if(!triggered){
                        await trigger();
                        return;
                    }
                    return;
                }

                await trigger();
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
        pause: () => pause.current = true,
        start: () => pause.current = false
    }
    
}