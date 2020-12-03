import * as React from 'react';

export function ConfirmationOverlay(props) {
    return (
        <div>
            <span>{props.text}</span>
            <div>
                {
                    props.options.map((option, index) => {
                        return (
                            <button key={index} className='mr-2 btn-secondary' onClick={() => option.callback()} style={{ marginTop: "15px" }}>{option.text}</button>
                        );
                    })
                }
            </div>
        </div >
    );
}