import { Input, useClickOutside } from 'gobble-lib-react';
import { useCallback, useState, createRef } from 'react';
import { RgbaColor, RgbaColorPicker, RgbColorPicker } from 'react-colorful';
import styled from 'styled-components';

const LabelWrapper = styled.label`
    margin: 0;
`;

const Picker = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 8px;
    align-items: center;
`;

type SwatchProps = {
    readonly color: string
}
const Swatch = styled.div<SwatchProps>`
    width: 28px;
    height: 28px;
    border-radius: 8px;
    border: 3px solid #fff;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    background: ${({ color }) => `#${color}`};
`;

const PopOver = styled.div`
    position: absolute;
    top: calc(100% + 2px);
    left: 0;
    border-radius: 9px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    z-index: 5;
`;


const rgbToHex = (rgba: RgbaColor, alpha = false) => {
    return intToHexSafe(rgba.r) + intToHexSafe(rgba.g) + intToHexSafe(rgba.b) + (alpha ? intToHexSafe(Math.floor(rgba.a * 255)) : '');
};

const hexToRGB = (hex: string): RgbaColor => {
    return {
        r: parseInt(sliceSafe(hex, 0, 2), 16),
        g: parseInt(sliceSafe(hex, 2, 4), 16),
        b: parseInt(sliceSafe(hex, 4, 6), 16),
        a: parseInt(sliceSafe(hex, 6, 8), 16) / 255.0,
    };
};

const intToHexSafe = (intVal: number) => {
    const hex = intVal.toString(16);
    return hex.length < 2 ? '0' + hex : hex;
};

const sliceSafe = (hex: string, start: number, end: number) => {
    if (hex.length >= end - 1)
        return hex.slice(start, end);
    else if (hex.length >= start)
        return hex.slice(start);
    return '0';
};

type ColorPickerProps = {
    readonly label: string
    readonly color: string
    readonly alpha?: boolean
    readonly showHexInput?: boolean
    readonly onChange?: (hex: string) => void
    readonly onClose?: (hex: string) => void
}

export const ColorPicker = ({ label, color, alpha = false, showHexInput = false, onChange = () => { } }: ColorPickerProps) => {
    const popover = createRef<HTMLDivElement>();
    const [isOpen, toggle] = useState(false);
    const [pickerColor, setPickerColor] = useState<RgbaColor>(hexToRGB(color));
    const [inputColor, setInputColor] = useState<string>(color);

    const close = useCallback(() => {
        toggle(false);
        onChange(rgbToHex(pickerColor, alpha));
    }, [pickerColor]);

    useClickOutside(popover, close);

    const updatePickerColor = (col: RgbaColor) => {
        setPickerColor(col);
        setInputColor(rgbToHex(pickerColor, alpha));
    };

    const onInputChange = (str: string) => {
        const regex = new RegExp(`^[0-9a-fA-F]{0,${alpha ? 8 : 6}}$`);
        if (regex.test(str)) {
            setInputColor(str);
            setPickerColor(hexToRGB(str));
        }
    };

    return (
        <>
            <LabelWrapper>{label}</LabelWrapper>
            <Picker>
                <Swatch color={rgbToHex(pickerColor, alpha)} onClick={() => toggle(true)} />
                {showHexInput && <Input value={inputColor} onChange={e => onInputChange(e.target.value)} />}
                {isOpen && (
                    <PopOver ref={popover}>
                        {
                            alpha
                                ? <RgbaColorPicker color={pickerColor} onChange={updatePickerColor} />
                                : <RgbColorPicker color={{ r: pickerColor.r, g: pickerColor.g, b: pickerColor.b }} onChange={col => updatePickerColor({ ...col, a: 1 })} />
                        }
                    </PopOver>
                )}
            </Picker>
        </>
    );
};