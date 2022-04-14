import { useEffect, useState, createRef } from 'react';
import { ContainedButton, Headline2, Headline3, Headline5, HorizontalRule, Input, InputsWrapper, TextToast, useToast } from '@theturkeydev/gobble-lib-react';
import { useAuth } from '../../../../contexts/auth-context';
import * as authAPI from '../../../../network/auth-network';
import { getAppsSiteBase } from '../../../../network/network-helper';
import { SecretURL } from '../../../../components/secret-url';
import styled from 'styled-components';
import { ColorPicker } from '../../../../components/inputs/color-input';
import { ContentWrapper } from '../../../../components/setup-page-content';

export const YouTubeSubGetSetup = () => {
    const canvasRef = createRef<HTMLCanvasElement>();

    const { authState, authChecked } = useAuth();
    const { pushToast } = useToast();

    const [loading, setLoading] = useState(true);

    const [token, setToken] = useState('');
    const [subCount, setSubcount] = useState(0);

    const [fontFamily, setFontFamily] = useState('');
    const [fontSize, setFontSize] = useState(12);
    const [fontColor, setFontColor] = useState('');

    const [backgroundColor, setBackgroundColor] = useState('ffffff');

    useEffect(() => {
        async function getToken() {
            authAPI.getToken('ytsubget').then(token => {
                setToken(token);
                authAPI.getYTSubs(token).then(subs => {
                    setSubcount(parseInt(subs));
                    setLoading(false);
                });
            });
        }
        if (authState)
            getToken();
    }, [authChecked]);

    useEffect(() => {
        async function loadDisplay() {
            authAPI.getYTSubsDisplaySettings(token).then(json => {
                if (json.success) {
                    setBackgroundColor(json.data.preview_bg_color);
                    setFontFamily(json.data.font_family);
                    setFontSize(json.data.font_size);
                    setFontColor(json.data.font_color);
                }
            });
        }

        if (authState)
            loadDisplay();
    }, [token]);

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (!ctx)
                return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = `${fontSize}px ${fontFamily}`;
            ctx.fillStyle = `#${fontColor}`;
            // ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            if (loading) {
                ctx.fillText('Loading...', 10, 10);
            }
            else {
                if (subCount < 1000) {
                    ctx.fillText(`${subCount}`, 0, 0);
                }
                else {
                    const parts = subCount.toPrecision(3).split('e');
                    const exp = parseInt(parts[1]);
                    ctx.fillText(`${(parseFloat(parts[0]) * Math.pow(10, exp % 3)).toPrecision(3)}${exp > 5 ? 'M' : 'K'}`, 0, 0);
                }
            }
        }
    });

    const saveDisplaySettings = () => {
        authAPI.saveYTSubsDisplaySettings(token, {
            preview_bg_color: backgroundColor,
            font_family: fontFamily,
            font_size: fontSize,
            font_color: fontColor
        }).then(json => {
            pushToast(<TextToast text={json.success ? 'Settings Saved!' : json.message} />);
        });
    };

    const regenToken = () => {
        authAPI.regenToken('ytsubget').then(token => {
            setToken(token);
        });
    };

    const ytSubsURL = `${getAppsSiteBase()}/ytsubget?token=${token}`;

    return (
        <ContentWrapper>
            <Headline2>YouTube Subs Display</Headline2>
            <SecretURL url={ytSubsURL} regen={regenToken} />
            <HorizontalRule />
            <Headline3>Settings</Headline3>
            <Headline5>Font</Headline5>
            <InputsWrapper>
                <ColorPicker name='color' label='Color' color={fontColor} onClose={color => setFontColor(color)} />
                <Input type='number' name='size' label='Size' value={fontSize} onChange={e => { setFontSize(parseInt(e.target.value)); }} />
            </InputsWrapper>
            <ContainedButton onClick={saveDisplaySettings}>
                Save
            </ContainedButton>
            <HorizontalRule />
            <Headline3>Preview</Headline3>
            <InputsWrapper>
                <ColorPicker name='color' label='Background' color={backgroundColor} onClose={color => setBackgroundColor(color)} />
            </InputsWrapper>
            <canvas ref={canvasRef} className='m-3 p-1' style={{ backgroundColor: `#${backgroundColor}` }} width={200} height={200}>

            </canvas>
        </ContentWrapper>
    );
};