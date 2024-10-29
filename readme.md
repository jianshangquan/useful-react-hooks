# useful-react-boilerplate-hooks


## Now support react 19!


<br>

#### useMounted()

**useMounted** hook help to prevent run code from initial render in react by using it with useEffect react hook 


```javascript 
import { useMounted } from 'useful-react-boilerplate-hooks';
import { useEffect } from 'react';

function Component(){
    const mounted = useMounted();

    useEffect(() => {
        if(!mounted) return;
        // run code after component mounted;
        // ...
    }, [mounted]) // <== track mounted value
    
    return (
        <div></div>
    )
}

```




<br>

#### useExtendedState()

**useExtendedState** hook help to make sure get to latest changed value from state in event handler callbacks or any other callback functions


```javascript 
import { useExtendedState, useMounted } from 'useful-react-boilerplate-hooks';
import { useEffect, useRef, useState } from 'react';

function Component(){
    const ref = useRef();
    const mounted = useMounted();
    const [value, setValue] = useState(1);
    const [state, setState, getLatestState] = useExtendedState(1);

    useEffect(() => {
        if(!mounted) return; // check ref has mounted
        const eventCallBack = (event) => {
            // by using useState, value will not update in event 
            // callback handler.
            console.log("react default state", value);

            // with useExtendedState hook, getLatestState() function
            // will help to make sure latest state value from changes
            console.log("state from useExtendedState", getLatestState());
        };
        ref.current.addEventListener('click', eventCallBack);

        return () => {
            ref.current.removeEventListener('click', eventCallBack);
        }
    }, [mounted])

    return (
        <div ref={ref}>

             <button 
                onClick={() => {
                    setValue(val => val + 1); // update state using useState
                }}
            >Add using useState</button>

            <button 
                onClick={() => {
                    setState(val => val + 1); // update state using useExtendedState
                }}
            >Add using useExtendedState</button>
            
        </div>
    )
}

```




<br>

#### useInView()

**useInView** hook help to detect a HTML element is in viewport or not


```javascript 
import { useInView } from 'useful-react-boilerplate-hooks';
import { useRef } from 'react';

function Component(){
    const ref = useRef();
    const inView = useInView(ref); // <== add ref in parameter 

    return (
        <div style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
            // add ref in div
            <div ref={ref}>check in view</div>
        </div>
    )
}

```




<br>

#### useMediaQuery()

**useMediaQuery** hook help to detect a window size and update width and heigth in px


```javascript 
import { useMediaQuery } from 'useful-react-boilerplate-hooks';

function Component(){
    const media = useMediaQuery();



    // default screen sizes =>  [sm] = 640;
    // default screen sizes =>  [md] = 768;
    // default screen sizes =>  [lg] = 1024;
    // default screen sizes =>  [xl] = 1280;
    // default screen sizes =>  [xl2] = 1536;
    //
    //
    // media => {
    //      sm: <boolean>,  -->  < 640 
    //      md: <boolean>,  -->  width between -> 640 ~ 768 
    //      lg: <boolean>,  -->  width between -> 768 ~ 1024
    //      xl: <boolean>,  -->  width between -> 1024 ~ 1280
    //      xl2: <boolean>, -->  width between -> 1280 ~ 1536
    //      graterThen: {
    //          sm: <boolean>, -->  > 640
    //          md: <boolean>, -->  > 768
    //          lg: <boolean>, -->  > 1024
    //          xl: <boolean>, -->  > 1280
    //          xl2: <boolean> -->  > 1536
    //      },
    //      lessThen: {
    //          sm: <boolean>, -->  < 640
    //          md: <boolean>, -->  < 768
    //          lg: <boolean>, -->  < 1024
    //          xl: <boolean>, -->  < 1280
    //          xl2: <boolean> -->  < 1536
    //      },
    //      dimension: {
    //          width: <current window width in px>,
    //          height: <current window height in px>
    //      },
    // }
    //
    //

    return (
        <div>
            {
                // less then mobile device screen 
                media.lessThen.md ? 
                    <div> mobile view </div> : 
                    <div>Desktop view</div>
            }
        </div>
    )
}

```







<br>

#### useOnFocusWindow()

**useOnFocusWindow** hook help to detect a HTML element is in viewport or not <br>
useOnFocusWindow hook also return a two function <code style='color: red;'>attatchEvent</code> and 
<code style='color: red;'>detachEvent</code> functions 
by calling to force attatch and  detach event


```javascript 
import { useOnFocusWindow } from 'useful-react-boilerplate-hooks';
import { useRef } from 'react';

function Component(){
    const ref = useRef();


    useOnFocusWindow(() => {
        // run code when window was focused 
        // ...
    }, [dependencies]);


    const { attatchEvent, detachEvent } = useOnFocusWindow(() => {
        // run code when window was focused 
        // ...
    }, [dependencies]);

    return (
        <div></div>
    )
}

```









<br>

#### useFetchState()

**useFetchState** hook allow you to handle http request status easily


```javascript 
import { useFetchState, FetchState } from 'useful-react-boilerplate-hooks';
import { useEffect } from 'react';

function Component(){

    const fetchState = useFetchState();
    // fetchState.status has following property
    //
    //  status: 'loading' | 'not-initialized' | 'error' | 'completed',
    //  data: <data passed from complete() method>,
    //  message: <message passed from methods>,
    //  error: <error object passed from error() method>,
    //  progress: <percentage passed from loading() and pending() method>,
    //


    const loadData = () => {
        fetchState.loading(); // -> start mark as loading 
        // you can also call
        // fetchState.loading(<percentage of loading>, 'Loading...');
        // fetchState.pending({ progress: <percentage of loading>, message: 'Loading...' });

        fetch("/your-api").then(res => res.json()).then(res => {
            if(res.code == 200){
                fetchState.completed(); // -> mark as fetch complete 
                // 
                // You can also call complete() function with parameter
                // fetchState.completed({ 
                //    message: 'Load succeed', 
                //    data: res,  
                //    autoSetNotInitializedTimeout: 1000 // --> setting timeout will automatically reset to 'not-initialize' after certain period
                // }); // -> mark as fetch complete 
                //

                return res;
            }
            throw new Error('Fail to fetch data');
        }).catch(error => {
            // -> mark as fetch error 
            fetchState.error({ error, message: error.message });
        })
    }

    return (
        <div>   
            // 
            // fetchState.status.message 
            // if completed() called -> message will be 'Load succeed'
            // if error() called -> message will be given error message above
            // if loading() called -> message will show empty string '' or the message set in pending() method.
            // 
            // there is an enum value `FetchState` their atributes are as follow
            //      NOT_INITIALIZE: 
            //      COMPLETED:
            //      LOADING:
            //      ERROR:
            <div style={{
                // you can set styling depend on fetchState
                color: fetstate.status.status === FetchState.COMPLETED ? 'green' : 
                            fetstate.status.status === FetchState.LOADING ? 'orange' : 
                                fetstate.status.status === FetchState.ERROR ? 'red' : 'black'
            }}>Load status {fetstate.status.message}</div> // --> message will be shown here
            <button onClick={loadData}>Fetch data</button>
        </div>
    )
}

```







<br>

#### useResize()

**useResize** allow you to detect event of resizing html element


```javascript 
import { useResize } from 'useful-react-boilerplate-hooks';
import { useRef } from 'react';

function Component(){
    const ref = useRef();
    const [size, entry] = useResize(ref);
    //
    // size: { width: number, height: number }
    // entry: ResizeObserver
    //

    return (
        <div>
            <div ref={ref}>element to detech size change</div>
        </div>
    )
}

```
