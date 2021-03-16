import { useEffect, useState, useRef, useContext } from 'react';

import { useInterval } from '../../util/use-interval';
import { AuthContext } from '../../contexts/auth-context';
import { ToastContext } from '../../contexts/toast-context';
import * as timerAPI from '../../network/timer-network';
import { TextToast } from '../../toasts/text-toast';
import { AuthPageWrapper } from '../base/auth-page-wrapper';
import styled from 'styled-components';

const URLLabel = styled.label`
    font-size: 22px;
    max-width: 100px;
`;

const URLInput = styled.input`
    width: 800px;
`;

export const StreamTimerSetup = (props) => {
    const canvasRef = useRef(null);

    const auth = useContext(AuthContext);
    const toast = useContext(ToastContext);

    const [loaded, setLoaded] = useState(0);
    const [refreshtoggle, setRefreshToggle] = useState(false);

    const [validTimerIDs, setValidTimerIDs] = useState([]);
    const [timerID, setTimerID] = useState(0);
    const [timerType, setTimerType] = useState('');
    const [timerDisplay, setTimerDisplay] = useState('');

    const [backgroundColor, setBackgroundColor] = useState('#ffffff');

    const [length, setLength] = useState(0);
    const [date, setDate] = useState(new Date());
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const [prependZeros, setPrependZeros] = useState(true);
    const [includeZeroDays, setIncludeZeroDays] = useState(true);
    const [includeZeroHours, setIncludeZeroHours] = useState(true);
    const [includeZeroMinutes, setIncludeZeroMinutes] = useState(true);
    const [displayMessage, setDisplayMessage] = useState('');
    const [hasEndMessage, setHasEndMessage] = useState(false);
    const [endMessage, setEndMessage] = useState('');

    const [font, setFont] = useState('');
    const [fontSize, setFontSize] = useState(12);
    const [fontColor, setFontColor] = useState('');

    useEffect(() => {
        async function loadTimers() {
            timerAPI.getTimers().then(json => {
                setValidTimerIDs(json);
            });
        }
        if (auth.authState)
            loadTimers();
    }, [auth.authChecked]);

    useEffect(() => {
        async function loadTimer() {
            timerAPI.getTimer(auth.userID, timerID).then(json => {
                if (json) {
                    if (json.reference_datetime)
                        setDate(new Date(json.reference_datetime));
                    else
                        setDate(new Date());
                    setTimerType(json.type.toLowerCase());
                    setTimerDisplay(json.timer_display)
                    setLength(json.length);
                    setPrependZeros(json.prepend_zeros);
                    setIncludeZeroDays(json.include_zero_days);
                    setIncludeZeroHours(json.include_zero_hours);
                    setIncludeZeroMinutes(json.include_zero_minutes);
                    setDisplayMessage(json.display_message);
                    setEndMessage(json.end_message);
                    setHasEndMessage(json.has_end_message);
                    setFont(json.font);
                    setFontSize(json.font_size);
                    setFontColor(json.font_color);
                    setLoaded(1);
                }
            });
        }

        if (auth.authState)
            loadTimer();
    }, [timerID, refreshtoggle, auth.authChecked]);

    // Update the count down every 1 second
    useInterval(() => {
        if (date == null) {
            if (loaded == 1)
                setLoaded(2);
            return;
        }

        // Get today's date and time
        let now = new Date().getTime();

        // Find the distance between now and the count down date
        let distance = 0;
        if (timerType === 'countdown_date')
            distance = date.getTime() - now;
        else if (timerType === 'countdown_timer')
            distance = (length * 1000) - (now - date.getTime());


        if (distance < 0) {
            if (loaded == 1)
                setLoaded(2);
            return;
        }

        // Time calculations for days, hours, minutes and seconds
        setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
        setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
        setLoaded(2);
    }, 1000);

    useEffect(() => {
        let showDay = days > 0 || includeZeroDays;
        let displayMessageEdited = displayMessage.replace('{d}', showDay ? `${days}` : '');
        let showHour = showDay || hours > 0 || includeZeroHours;
        displayMessageEdited = displayMessageEdited.replace('{h}', showHour || showDay ? ((hours < 10 && prependZeros && showHour) ? '0' : '') + hours : '');
        let showMinute = showHour || minutes > 0 || includeZeroMinutes;
        displayMessageEdited = displayMessageEdited.replace('{m}', showMinute || showHour ? ((minutes < 10 && prependZeros && showMinute) ? '0' : '') + minutes : '');
        displayMessageEdited = displayMessageEdited.replace('{s}', (seconds < 10 && (showMinute || prependZeros) ? '0' : '') + seconds);

        const timeOver = seconds <= 0 && minutes <= 0 && hours <= 0 && days <= 0;
        const lines = (timeOver && hasEndMessage ? endMessage : displayMessageEdited).split('\n');

        if (canvasRef.current && loaded == 2) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = `${fontSize}px ${font}`;
            ctx.fillStyle = fontColor;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            lines.forEach((line, i) => {
                ctx.fillText(line, canvas.width / 2, (canvas.height / 2) + (i - (lines.length / 2) + 0.5) * fontSize);
            });
        }
    });

    const calcDate = (newDate) => {
        if (newDate == null)
            return;
        const parts = newDate.split('-');
        const currentDate = date;
        currentDate.setFullYear(parts[0]);
        currentDate.setMonth(parts[1] - 1);
        currentDate.setDate(parts[2]);
        setDate(currentDate);
    }

    const calcTime = (time) => {
        if (time == null)
            return;
        const parts = time.split(':');
        const currentDate = date;
        currentDate.setHours(parts[0]);
        currentDate.setMinutes(parts[1]);
        currentDate.setSeconds(parts[2]);
        setDate(currentDate);
    }

    const formatDate = (d) => {
        var month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    const formatTime = (t) => {
        var hour = '' + t.getHours(),
            minutes = '' + t.getMinutes(),
            seconds = '' + t.getSeconds();

        if (hour.length < 2)
            hour = '0' + hour;
        if (minutes.length < 2)
            minutes = '0' + minutes;
        if (seconds.length < 2)
            seconds = '0' + seconds;

        return [hour, minutes, seconds].join(':');
    }

    const startTimer = () => {
        timerAPI.startTimer(timerID).then(json => {
            if (json.success)
                setRefreshToggle(curr => !curr);
        });
    }

    const saveSettings = () => {
        timerAPI.saveTimer({
            timer_id: timerID,
            timer_display: timerDisplay,
            type: timerType,
            reference_datetime: date.toISOString(),
            length: length,
            display_msg: displayMessage,
            has_end_msg: hasEndMessage,
            end_msg: endMessage,
            prepend_zeros: prependZeros,
            include_zero_days: includeZeroDays,
            include_zero_hours: includeZeroHours,
            include_zero_minutes: includeZeroMinutes,
            font: font,
            font_color: fontColor,
            font_size: fontSize
        }).then(json => {
            if (json.success) {
                const timer = validTimerIDs.filter(t => t.id == json.timer_id);
                timer.display = json.timer_display;
                setValidTimerIDs(ids => [...ids.filter(t => t.id != json.timer_id), timer]);
                toast.pushToast(<TextToast text='Timer Saved!' />);
            }
        });
    }

    const newTimer = () => {
        timerAPI.newTimer().then(json => {
            if (json.success) {
                setValidTimerIDs(ids => [...ids, { id: json.timer_id, display: json.timer_display }]);
                setTimerID(json.timer_id);
                setDate(new Date(json.reference_datetime));
                setTimerType(json.timer_type);
                setTimerDisplay(json.timer_display)
                setLength(json.length);
                setPrependZeros(json.prepend_zeros);
                setDisplayMessage(json.display_msg);
                setEndMessage(json.end_msg);
                setHasEndMessage(json.has_end_msg);
                setFont(json.font);
                setFontSize(json.font_size);
                setFontColor(json.font_color);
            }
        });
    }

    const isSameDay = (date) => {
        const now = new Date();
        return date.getFullYear() === now.getFullYear() && date.getMonth() == now.getMonth() && date.getDate() === now.getDate();
    }

    return (
        <AuthPageWrapper history={props.history} perm='streamtimer.dashboard'>
            <div className='fluid-container pl-3'>
                <div className='row m-0 mt-3 mb-2'>
                    <URLLabel className='col m-0 ml-3 align-center'>
                        URL:
                    </URLLabel>
                    <URLInput className='col ml-2 mr-4' type='text' readOnly value={`http://apps.theturkey.dev/streamtimer/${auth.userID}/${timerID}`} />
                </div>
                <div className='row m-0'>
                    <URLLabel className='col m-0 ml-3 align-center'>
                        Timer:
                    </URLLabel>
                    <select className='col-auto ml-2' value={timerID} onChange={(e) => { setTimerID(parseInt(e.target.value)) }}>
                        {
                            validTimerIDs.map(timer => {
                                return (
                                    <option key={timer.id} value={timer.id}>{timer.display}</option>
                                );
                            })
                        }
                    </select>
                    <button className='col-auto ml-2' onClick={() => newTimer()}>+</button>
                </div>
                <div className='row m-0 mt-2'>
                    <URLLabel className='col m-0 ml-3 align-center' />
                    <button className='col-auto ml-2' onClick={startTimer}>Start Timer</button>
                </div>
                <hr />
                <div className='row m-0'>
                    <h2>Settings</h2>
                </div>
                <div className='row m-0 ml-4 mt-1'>
                    <label className='col mr-1 timer-label' >Timer Name:</label>
                    <input type='text' value={timerDisplay} onChange={(e) => { setTimerDisplay(e.target.value) }} />
                </div>
                <div className='row m-0 ml-4 mt-1'>
                    <label className='col mr-1 timer-label' >TimerType:</label>
                    <select className='col-auto' value={timerType} onChange={(e) => { setTimerType(e.target.value) }}>
                        <option value={'countdown_date'}>Countdown To Date</option>
                        <option value={'countup_date'}>Countup To Date</option>
                        <option value={'countdown_timer'}>Timer Down</option>
                        <option value={'countup_timer'}>Timer Up</option>
                    </select>
                </div>
                <div className='row m-0 ml-4 mt-1'>
                    <label className='col mr-1 timer-label'>Display:</label>
                    <textarea className='col timer-textarea' value={displayMessage} onChange={(e) => { setDisplayMessage(e.target.value) }} />
                </div>
                <div className='row m-0 ml-4 mt-1'>
                    <label className='col mr-1 timer-label'>End Message:</label>
                    <div className='toggle-switch'>
                        <input type='checkbox' checked={hasEndMessage} onChange={() => { }} />
                        <span className='toggle-slider round' onClick={() => setHasEndMessage(old => !old)}></span>
                    </div>
                </div>
                <div className='row m-0 ml-4 mt-1'>
                    <label className='col mr-1 timer-label'></label>
                    <textarea className='col timer-textarea' value={endMessage} onChange={(e) => { setEndMessage(e.target.value) }} />
                </div>
                {
                    timerType == 'countdown_date' &&
                    <div className='row m-0 ml-4 mt-1'>
                        <label className='col mr-1 timer-label'>End Time:</label>
                        <input type='date' value={formatDate(date)} min={formatDate(new Date())} onChange={(e) => { calcDate(e.target.value) }} />
                        <input type='time' value={formatTime(date)} min={(isSameDay(date) ? formatTime(new Date()) : '')} onChange={(e) => { calcTime(e.target.value) }} />
                    </div>
                }
                {
                    timerType == 'countdown_timer' &&
                    <div className='row m-0 ml-4 mt-1'>
                        <label className='col mr-1 timer-label'>Length:</label>
                        <input className='col-auto' type='number' value={length} onChange={(e) => { setLength(parseInt(e.target.value)) }} />
                    </div>
                }
                <div className='row m-0 ml-4 mt-1'>
                    <label className='col mr-1 timer-label'>Prepend Zeros:</label>
                    <div className='toggle-switch'>
                        <input type='checkbox' checked={prependZeros} onChange={() => { }} />
                        <span className='toggle-slider round' onClick={() => setPrependZeros(old => !old)}></span>
                    </div>
                </div>
                <div className='row m-0 ml-4 mt-1'>
                    <label className='col mr-1 timer-label'>Include Zero Days:</label>
                    <div className='toggle-switch'>
                        <input type='checkbox' checked={includeZeroDays} onChange={() => { }} />
                        <span className='toggle-slider round' onClick={() => setIncludeZeroDays(old => !old)}></span>
                    </div>
                </div>
                <div className='row m-0 ml-4 mt-1'>
                    <label className='col mr-1 timer-label'>Include Zero Hours:</label>
                    <div className='toggle-switch'>
                        <input type='checkbox' checked={includeZeroHours} onChange={() => { }} />
                        <span className='toggle-slider round' onClick={() => setIncludeZeroHours(old => !old)}></span>
                    </div>
                </div>
                <div className='row m-0 ml-4 mt-1'>
                    <label className='col mr-1 timer-label'>Include Zero Minutes:</label>
                    <div className='toggle-switch'>
                        <input type='checkbox' checked={includeZeroMinutes} onChange={() => { }} />
                        <span className='toggle-slider round' onClick={() => setIncludeZeroMinutes(old => !old)}></span>
                    </div>
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
                    <button onClick={saveSettings}>
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
        </AuthPageWrapper >
    );
}