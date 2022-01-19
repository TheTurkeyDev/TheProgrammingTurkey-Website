import { useState, useEffect, Fragment, createContext, useContext } from 'react';
import styled from 'styled-components';

export const OverlayContext = createContext(null);

const OverlayWrapper = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 3;
    text-align: center;
    display: ${props => props.show ? 'block' : 'none'};
`;

const OverlayContents = styled.div`
    display: grid;
    grid-template-rows: auto 1fr;
    width: 60%;
    padding: 25px;
    margin: auto;
    margin-top: 100px;
    max-height: calc(100vh - 200px);
    overflow-y: hidden;
    border-radius: 3px;
`;

const CloseBtn = styled.p`
    margin: 10px;
    cursor: pointer;
    margin-left: auto;
    
    &:hover {
        color: red;
    }
`;

const SubOverlayWrapper = styled.div`
    overflow-y: auto;
`

export const useOverlay = () => {
    const overlay = useContext(OverlayContext);
    if (!overlay)
        throw new Error('Overlay is undefined! Must be used from within a Overlay Provider!');
    return overlay;
}


export const Overlay = (props) => {
    const [overlay, setOverlay] = useState(<Fragment />);
    const [overlayStack, setOverlayStack] = useState([]);
    const [showOverlay, setOverlayVisibility] = useState(false);

    useEffect(() => {
        if (overlayStack.length > 0)
            setOverlayWrapper(overlayStack[overlayStack.length - 1], true);
        else setOverlayWrapper(<Fragment />, false);
    }, [overlayStack]);

    const setOverlayWrapper = (component, show = true) => {
        setOverlay(component);
        setOverlayVisibility(show);
    };

    const pushCurrentOverlay = (newOverlay) => {
        setOverlayStack((oldStack) => [...oldStack, newOverlay]);
    };

    const popCurrentOverlay = () => {
        //TODO something a bit prettier than filter?
        setOverlayStack((oldStack) =>
            oldStack.filter((elem, index) => index != oldStack.length - 1)
        );
    };

    const overlaydata = {
        overlay: overlay,
        pushCurrentOverlay,
        popCurrentOverlay,
        closeOverlay: () => setOverlayStack([]),
    };

    return (
        <OverlayContext.Provider value={overlaydata}>
            <OverlayWrapper show={showOverlay}>
                <OverlayContents className='bg-secondary pt-1'>
                    <CloseBtn onClick={() => overlaydata.closeOverlay()}>
                        X
                    </CloseBtn>
                    <SubOverlayWrapper>{overlay}</SubOverlayWrapper>
                </OverlayContents>
            </OverlayWrapper>
            {props.children}
        </OverlayContext.Provider>
    );
}
