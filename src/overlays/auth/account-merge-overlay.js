import React from 'react';

export function AccountMergeOverlay() {
    return (
        <div className="mr-5 ml-5 mt-2">
            <div className="mt-3 fluid-container">
                <div className="row">
                    <div className="col">
                        <p>
                            A Merge request has been made for with this account
                            by ``
                        </p>
                        <p>
                            Would you like to confirm this merge? Data on this
                            account may be lost!
                        </p>
                    </div>
                </div>
                <div className="row">
                    <button className="col m-auto">Confirm</button>
                    <button className="col m-auto">Cancel</button>
                </div>
            </div>
        </div>
    );
}
