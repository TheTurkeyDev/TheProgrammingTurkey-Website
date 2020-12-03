import React, { useState, useEffect } from 'react';

export const OverlayContext = React.createContext(null);

export function Overlay(props) {
    const [overlay, setOverlay] = useState(<React.Fragment />);
    const [overlayStack, setOverlayStack] = useState([]);
    const [showOverlay, setOverlayVisibility] = useState(false);

    useEffect(() => {
        if (overlayStack.length > 0)
            setOverlayWrapper(overlayStack[overlayStack.length - 1], true);
        else
            setOverlayWrapper(<React.Fragment />, false)
    }, [overlayStack])

    const setOverlayWrapper = (component, show = true) => {
        setOverlay(component);
        setOverlayVisibility(show);
    };

    const pushCurrentOverlay = (newOverlay) => {
        setOverlayStack(oldStack => [...oldStack, newOverlay]);
    }

    const popCurrentOverlay = () => {
        //TODO something a bit prettier than filter?
        setOverlayStack(oldStack => oldStack.filter((elem, index) => index != oldStack.length - 1));
    }

    const overlaydata = {
        overlay: overlay,
        pushCurrentOverlay,
        popCurrentOverlay,
        closeOverlay: () => setOverlayStack([])
    }

    return (
        <OverlayContext.Provider value={overlaydata}>
            <div id="overlay" style={{ display: `${showOverlay ? "block" : "none"}` }}>
                <div className="container overlay_contents bg-secondary pt-1">
                    <div className="row">
                        <p className="ml-auto mb-0 button closeBtn" onClick={() => overlaydata.closeOverlay()}>X</p>
                    </div>
                    <div>
                        {overlay}
                    </div>
                </div>
            </div>
            {props.children}
        </OverlayContext.Provider>
    );
}