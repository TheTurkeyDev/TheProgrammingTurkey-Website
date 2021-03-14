import React from 'react';

export const TextToast = (props) => {
    return (
        <div className="container text-center">
            <span>{props.text}</span>
        </div>
    );
}