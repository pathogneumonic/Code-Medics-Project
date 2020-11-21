import React from 'react';
import './button.css';

function Button(props) {
    return <button onClick={props.click}>{props.text}</button>
}

export default Button