import React, {useEffect, useState} from 'react';
import {CounterButton} from '../Buttons';
import './Counter.css';

const Counter = () => {
    const [count, setCount] = useState(0);
    const [temp, setTemp] = useState("positive");
    // const [lastValue, setLastValue] = useState(0);

    const increaseCount = () => {
        setCount(count + 1);
    }
    const decreaseCount = () => {
        setCount(count - 1);
    }

    useEffect(() =>{
        if (count < 1) {
            setTemp("negative");
        } else {
            setTemp("positive")
        }
        }, [count]
    );

    return (
        <div className="counting-container">
            <h3 className="count-text" id={temp}>{count}</h3>
            <div className="button-div">
                <CounterButton onClick={() => decreaseCount()} text={'-'} type={'down'}></CounterButton>
                <CounterButton onClick={() => increaseCount()} text={'+'} type={'up'}></CounterButton>
            </div>
        </div>
    );

}

export default Counter;