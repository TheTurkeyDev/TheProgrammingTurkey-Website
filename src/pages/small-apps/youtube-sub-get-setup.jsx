import { useEffect, useState, useRef, useContext } from 'react';
import { TextToast } from '../../toasts/text-toast';
import { AuthContext } from '../../contexts/auth-context';
import { ToastContext } from '../../contexts/toast-context';
import * as authAPI from '../../network/auth-network';
import styled from 'styled-components';
import { getAppsSiteBase } from '../../network/network-helper';

const URLLabel = styled.label`
    font-size: 22px;
    max-width: 100px;
`;

const URLInput = styled.input`
    width: 800px;
`;


export const YouTubeSubGetSetup = () => {
    const canvasRef = useRef(null);

    const auth = useContext(AuthContext);
    const toast = useContext(ToastContext);

    const [loading, setLoading] = useState(true);

    const [token, setToken] = useState('');
    const [subCount, setSubcount] = useState(0);
    const [showURL, setShowURL] = useState(false);

    const [fontFamily, setFontFamily] = useState('');
    const [fontSize, setFontSize] = useState(12);
    const [fontColor, setFontColor] = useState('');

    const [backgroundColor, setBackgroundColor] = useState('#ffffff');

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
        if (auth.authState)
            getToken();
    }, [auth.authChecked]);

    useEffect(() => {
        async function loadDisplay() {
            authAPI.getYTSubsDisplaySettings(token).then(json => {
                if (json.success) {
                    setBackgroundColor(json.data.preview_bg_color);
                    setFontFamily(json.data.font_family);
                    setFontSize(json.data.font_size);
                    setFontColor(json.data.font_color)
                }
            });
        }

        if (auth.authState)
            loadDisplay();
    }, [token]);

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = `${fontSize}px ${fontFamily}`;
            ctx.fillStyle = fontColor;
            // ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            if (loading) {
                ctx.fillText('Loading...', 10, 10);
            }
            else {
                let dispCount;
                if (subCount < 1000) {
                    dispCount = subCount;
                }
                else {
                    const parts = subCount.toPrecision(3).split('e');
                    const exp = parseInt(parts[1]);
                    dispCount = (parseFloat(parts[0]) * Math.pow(10, exp % 3)).toPrecision(3);
                    dispCount += exp > 5 ? 'M' : 'K';
                }
                ctx.fillText(dispCount, 0, 0);
            }
        }
    });

    const saveDisplaySettings = () => {
        console.log(fontSize);
        authAPI.saveYTSubsDisplaySettings(token, {
            preview_bg_color: backgroundColor,
            font_family: fontFamily,
            font_size: fontSize,
            font_color: fontColor
        }).then(json => {
            if (json.success)
                toast.pushToast(<TextToast text='Settings Saved!' />);
            else
                toast.pushToast(<TextToast text={json.message} />);
        });
    }

    const regenToken = () => {
        authAPI.regenToken('ytsubget').then(token => {
            setToken(token);
        })
    }

    const ytSubsURL = `${getAppsSiteBase()}/ytsubget?token=${token}`;

    return (
        <div className='fluid-container pl-3'>
            <div className='row m-0 mt-3 mb-2'>
                <URLLabel className='col m-0 ml-3 align-center'>
                    URL:
                </URLLabel>
                <URLInput className={`col ml-2 mr-4 ${showURL ? '' : 'hidden'}`} type='text' readOnly value={ytSubsURL} onClick={() => { navigator.clipboard.writeText(ytSubsURL); toast.pushToast(<TextToast text='Copied to Clipboard!' />) }} />
            </div>
            <div className='row m-0 mt-2'>
                <URLLabel className='col m-0 ml-3 align-center' />
                <button className='col-auto ml-2' onClick={() => setShowURL(old => !old)}>{showURL ? 'Hide URL' : 'Show Url'}</button>
            </div>
            <div className='row m-0 mt-2'>
                <URLLabel className='col m-0 ml-3 align-center' />
                <button className='col-auto ml-2' onClick={regenToken}>Regen Token</button>
            </div>
            <hr />
            <div className='row m-0'>
                <h2>Settings</h2>
            </div>
            <div className='row m-0 ml-2 mt-2'>
                <h4>Font</h4>
            </div>
            <div className='row m-0 ml-4 mt-1'>
                <label className='col mr-1 timer-label'>Color:</label>
                <input type='color' value={fontColor} onChange={(e) => { setFontColor(e.target.value) }} />
            </div>
            <div className='row m-0 ml-4 mt-1'>
                <label className='col mr-1 timer-label'>Size:</label>
                <input className='col-auto' type='number' value={fontSize} onChange={(e) => { setFontSize(parseInt(e.target.value)) }} />
            </div>
            <div className='row m-0 ml-4 mt-1'>
                <button onClick={saveDisplaySettings}>
                    Save
                </button>
            </div>
            <hr />
            <div className='row m-0 mt-1'>
                <h2>Preview</h2>
            </div>
            <div className='row m-0 ml-4 mt-1'>
                <label className='col mr-1 timer-label'>Background:</label>
                <input className='' type='color' value={backgroundColor} onChange={(e) => { setBackgroundColor(e.target.value) }} />
            </div>
            <div className='row m-0 ml-4 mt-1'>
                <canvas ref={canvasRef} className='m-3 p-1' style={{ backgroundColor }} width={200} height={200}>

                </canvas>
            </div>
        </div>
    );
}