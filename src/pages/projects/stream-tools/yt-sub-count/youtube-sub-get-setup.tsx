import { useEffect, useState, createRef } from 'react';
import { ContainedButton, Headline2, Headline3, Headline5, HorizontalRule, Input, InputsFullWidth, InputsWrapper, Loading, TextToast, useToast } from 'gobble-lib-react';
import { useAuth } from '../../../../contexts/auth-context';
import * as authAPI from '../../../../network/auth-network';
import { getAppsSiteBase } from '../../../../network/network-helper';
import { SecretURL } from '../../../../components/secret-url';
import { ColorPicker } from '../../../../components/inputs/color-input';
import { ContentWrapper } from '../../../../components/setup-page-content';
import { YouTubeDisplaySettings } from './youtube-display-settings';

export const YouTubeSubGetSetup = () => {
    const canvasRef = createRef<HTMLCanvasElement>();

    const { authState, authChecked } = useAuth();
    const { pushToast } = useToast();

    const [loading, setLoading] = useState(true);

    const [token, setToken] = useState('');
    const [subCount, setSubcount] = useState(0);

    const [displaySettings, setDisplaySettings] = useState<YouTubeDisplaySettings>();

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
        if (!authState || !token)
            return;

        authAPI.getYTSubsDisplaySettings(token).then(json => {
            setDisplaySettings(json);
        });
    }, [token]);

    const getText = () => {
        if (subCount < 1000) {
            return `${subCount}`;
        }
        else {
            const parts = subCount.toPrecision(3).split('e');
            const exp = parseInt(parts[1]);
            return `${(parseFloat(parts[0]) * Math.pow(10, exp % 3)).toPrecision(3)}${exp > 5 ? 'M' : 'K'}`;
        }
    };

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (!ctx || !displaySettings)
                return;

            const text = getText();

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.textBaseline = 'top';
            ctx.font = `${displaySettings.font_size}px ${displaySettings.font_family}`;
            ctx.strokeStyle = `#${displaySettings.outline_color}`;
            ctx.lineWidth = displaySettings.outline_width;
            ctx.strokeText(text, 0, 0);
            ctx.fillStyle = `#${displaySettings.font_color}`;
            ctx.fillText(text, 0, 0);
        }
    });

    const saveDisplaySettings = () => {
        authAPI.saveYTSubsDisplaySettings(token, displaySettings!).then(json => {
            pushToast(<TextToast text='Settings Saved!' />);
        });
    };

    const regenToken = () => {
        authAPI.regenToken('ytsubget').then(token => {
            setToken(token);
        });
    };

    const ytSubsURL = `${getAppsSiteBase()}/ytsubget?token=${token}`;

    if (!displaySettings)
        return <Loading />;

    return (
        <ContentWrapper>
            <Headline2>YouTube Subs Display</Headline2>
            <SecretURL url={ytSubsURL} regen={regenToken} />
            <HorizontalRule />
            <Headline3>Settings</Headline3>
            <InputsWrapper>
                <InputsFullWidth>
                    <Headline5>View Port</Headline5>
                </InputsFullWidth>
                <Input type='number' name='width' label='View Width' value={displaySettings.width} onChange={e => { setDisplaySettings(() => { return { ...displaySettings, width: parseInt(e.target.value) }; }); }} />
                <Input type='number' name='height' label='View Height' value={displaySettings.height} onChange={e => { setDisplaySettings(() => { return { ...displaySettings, height: parseInt(e.target.value) }; }); }} />
                <InputsFullWidth>
                    <Headline5>Font</Headline5>
                </InputsFullWidth>
                <ColorPicker label='Color' color={displaySettings.font_color} onClose={e => { setDisplaySettings(() => { return { ...displaySettings, font_color: e }; }); }} />
                <Input type='number' name='size' label='Size' value={displaySettings.font_size} onChange={e => { setDisplaySettings(() => { return { ...displaySettings, font_size: parseInt(e.target.value) }; }); }} />
                <ColorPicker label='Outline Color' alpha={true} color={displaySettings.outline_color} onClose={e => { setDisplaySettings(() => { return { ...displaySettings, outline_color: e }; }); }} />
                <Input type='number' name='outline_width' label='Outline Width' value={displaySettings.outline_width} onChange={e => { setDisplaySettings(() => { return { ...displaySettings, outline_width: parseInt(e.target.value) }; }); }} />
            </InputsWrapper>
            <ContainedButton disabled={!displaySettings} onClick={saveDisplaySettings}>
                Save
            </ContainedButton>
            <HorizontalRule />
            <Headline3>Preview</Headline3>
            <InputsWrapper>
                <ColorPicker label='Background' color={displaySettings.preview_bg_color} onClose={e => { setDisplaySettings(() => { return { ...displaySettings, preview_bg_color: e }; }); }} />
            </InputsWrapper>
            <canvas ref={canvasRef} className='m-3 p-1' style={{ backgroundColor: `#${displaySettings.preview_bg_color}` }} width={displaySettings.width} height={displaySettings.height}>

            </canvas>
        </ContentWrapper>
    );
};