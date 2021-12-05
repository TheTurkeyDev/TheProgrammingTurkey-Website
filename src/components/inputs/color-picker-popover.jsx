import { useCallback, useRef, useState, useEffect } from 'react';
import { RgbColorPicker } from 'react-colorful';
import styled from 'styled-components';

import { useClickOutside } from '../../hooks/use-click-outside';

const Picker = styled.div`
    position: relative;
`;

const Swatch = styled.div`
    width: 28px;
    height: 28px;
    border-radius: 8px;
    border: 3px solid #fff;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    background: #${props => props.color};
`;

const PopOver = styled.div`
    position: absolute;
    top: calc(100% + 2px);
    left: 0;
    border-radius: 9px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    z-index: 5;
`;

const rgbToHex = (rgba) => {
    return intToHexSafe(rgba.r) + intToHexSafe(rgba.g) + intToHexSafe(rgba.b);
}

const hexToRGB = (hex) => {
    return {
        r: parseInt(sliceSafe(hex, 0, 2), 16),
        g: parseInt(sliceSafe(hex, 2, 4), 16),
        b: parseInt(sliceSafe(hex, 4, 6), 16),
    }
}

const intToHexSafe = intVal => {
    const hex = intVal.toString(16)
    return hex.length < 2 ? '0' + hex : hex;
}

const sliceSafe = (hex, start, end) => {
    if (hex.length >= end - 1)
        return hex.slice(start, end);
    else if (hex.length >= start)
        return hex.slice(start);
    return 0;
}

export const ColorPickerPopover = ({ color, onChange = () => { }, onClose = () => { } }) => {
    const popover = useRef();
    const [isOpen, toggle] = useState(false);
    const [internalColor, setInternalColor] = useState(hexToRGB(color));

    const close = useCallback(() => {
        toggle(false);
        onClose(rgbToHex(internalColor));
    }, [internalColor]);

    useClickOutside(popover, close);

    useEffect(() => {
        const timeOutId = setTimeout(() => onChange(rgbToHex(internalColor)), 1000);
        return () => clearTimeout(timeOutId);
    }, [internalColor]);

    return (
        <Picker>
            <Swatch color={color} onClick={() => toggle(true)} />
            {isOpen && (
                <PopOver ref={popover}>
                    <RgbColorPicker color={internalColor} onChange={setInternalColor} />
                </PopOver>
            )}
        </Picker>
    );
};