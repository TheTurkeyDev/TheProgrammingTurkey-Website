
import React from 'react';

export function TextToast(props) {
    return (
        <div className="container text-center">
            <span>{props.text}</span>
        </div >
    );
}