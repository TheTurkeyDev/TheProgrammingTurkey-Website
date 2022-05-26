import { useEffect, useState, useRef } from 'react';
import { ButtonRow, ContainedButton, Headline2, Headline4, HorizontalRule, Input, InputsWrapper, Option, Select, TextArea, TextToast, ToggleSwitch, useInterval, useToast } from '@theturkeydev/gobble-lib-react';

import { useAuth } from '../../../../contexts/auth-context';
import * as timerAPI from './timer-network';
import { getAppsSiteBase } from '../../../../network/network-helper';
import { ColorPicker } from '../../../../components/inputs/color-input';
import { Timer } from '../../../../types/timer';
import { ContentWrapper } from '../../../../components/setup-page-content';
import { useFetch } from '../../../../hooks/use-fetch';

export const StreamTimerSetup = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const { authState, authChecked, userID } = useAuth();
    const { pushToast } = useToast();

    const [loaded, setLoaded] = useState(0);
    const [refreshtoggle, setRefreshToggle] = useState(false);

    const [validTimerIDs, setValidTimerIDs] = useState<readonly Timer[]>([]);
    const [timerID, setTimerID] = useState(0);
    const [timerType, setTimerType] = useState('');
    const [timerDisplay, setTimerDisplay] = useState('');

    const [backgroundColor, setBackgroundColor] = useState('ffffff');

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

    useFetch<readonly Timer[]>('/streamtimer/timers', {
        skip: !authChecked,
        onComplete: timers => setValidTimerIDs(timers)
    });

    useEffect(() => {
        async function loadTimer() {
            timerAPI.getTimer(userID, timerID).then(json => {
                if (json) {
                    if (json.reference_date)
                        setDate(new Date(json.reference_date));
                    else
                        setDate(new Date());
                    setTimerType(json.type.toLowerCase());
                    setTimerDisplay(json.timer_display);
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

        if (authState)
            loadTimer();
    }, [timerID, refreshtoggle, authChecked]);

    // Update the count down every 1 second
    useInterval(() => {
        if (date === null) {
            if (loaded === 1)
                setLoaded(2);
            return;
        }

        // Get today's date and time
        const now = new Date().getTime();

        // Find the distance between now and the count down date
        const distance = timerType === 'countdown_date' ? date.getTime() - now : (timerType === 'countdown_timer' ? (length * 1000) - (now - date.getTime()) : 0);

        if (distance < 0) {
            if (loaded === 1)
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
        const showDay = days > 0 || includeZeroDays;
        // eslint-disable-next-line functional/no-let
        let displayMessageEdited = displayMessage.replace('{d}', showDay ? `${days}` : '');
        const showHour = showDay || hours > 0 || includeZeroHours;
        displayMessageEdited = displayMessageEdited.replace('{h}', showHour || showDay ? ((hours < 10 && prependZeros && showHour) ? '0' : '') + hours : '');
        const showMinute = showHour || minutes > 0 || includeZeroMinutes;
        displayMessageEdited = displayMessageEdited.replace('{m}', showMinute || showHour ? ((minutes < 10 && prependZeros && showMinute) ? '0' : '') + minutes : '');
        displayMessageEdited = displayMessageEdited.replace('{s}', (seconds < 10 && (showMinute || prependZeros) ? '0' : '') + seconds);

        const timeOver = seconds <= 0 && minutes <= 0 && hours <= 0 && days <= 0;
        const lines = (timeOver && hasEndMessage ? endMessage : displayMessageEdited).split('\n');

        if (canvasRef.current && loaded === 2) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (!ctx)
                return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = `${fontSize}px ${font}`;
            ctx.fillStyle = `#${fontColor}`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            lines.forEach((line, i) => {
                ctx.fillText(line, canvas.width / 2, (canvas.height / 2) + (i - (lines.length / 2) + 0.5) * fontSize);
            });
        }
    });

    const calcDate = (newDate: string) => {
        if (newDate === null)
            return;
        const parts = newDate.split('-');
        const currentDate = date;
        currentDate.setFullYear(parseInt(parts[0]));
        currentDate.setMonth(parseInt(parts[1]) - 1);
        currentDate.setDate(parseInt(parts[2]));
        setDate(currentDate);
    };

    const calcTime = (time?: string) => {
        if (!time)
            return;
        const parts = time.split(':');
        const currentDate = date;
        currentDate.setHours(parseInt(parts[0]));
        currentDate.setMinutes(parseInt(parts[1]));
        currentDate.setSeconds(parseInt(parts[2]));
        setDate(currentDate);
    };

    const formatDate = (d: Date) => {
        var month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    };

    const formatTime = (t: Date) => {
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
    };

    const startTimer = () => {
        timerAPI.startTimer(timerID).then(json => {
            if (json.success)
                setRefreshToggle(curr => !curr);
        });
    };

    const saveSettings = () => {
        timerAPI.saveTimer({
            timer_id: timerID,
            timer_display: timerDisplay,
            type: timerType,
            reference_date: date.toISOString(),
            length: length,
            display_message: displayMessage,
            has_end_message: hasEndMessage,
            end_message: endMessage,
            prepend_zeros: prependZeros,
            include_zero_days: includeZeroDays,
            include_zero_hours: includeZeroHours,
            include_zero_minutes: includeZeroMinutes,
            font: font,
            font_color: fontColor,
            font_size: fontSize
        }).then(json => {
            if (json.success) {
                const timer = validTimerIDs.find(t => t.id === json.timer_id);
                if (timer)
                    setValidTimerIDs(ids => [...ids.filter(t => t.id !== json.timer_id), { ...timer, display: json.timer_display }]);
                pushToast(<TextToast text='Timer Saved!' />);
            }
        });
    };

    const newTimer = () => {
        timerAPI.newTimer().then(json => {
            if (json.success) {
                setValidTimerIDs(ids => [...ids, { id: json.timer_id, display: json.timer_display }]);
                setTimerID(json.timer_id);
                setDate(new Date(json.reference_datetime));
                setTimerType(json.timer_type);
                setTimerDisplay(json.timer_display);
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
    };

    const isSameDay = (date: Date) => {
        const now = new Date();
        return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate();
    };

    const timerUrl = `${getAppsSiteBase()}/streamtimer?userId=${userID}&timerId=${timerID}`;

    return (
        <ContentWrapper>
            <Headline2>Stream Timer</Headline2>
            <InputsWrapper fullWidth={true}>
                <Input label='URL' type='text' readOnly value={timerUrl} onClick={() => { navigator.clipboard.writeText(timerUrl); pushToast(<TextToast text='Copied to Clipboard!' />); }} />
                <Select name='timer' label='Timer' value={timerID} onChange={e => { setTimerID(parseInt(e.target.value)); }}>
                    {
                        validTimerIDs.map(timer => <Option key={timer.id} value={timer.id}>{timer.display}</Option>)
                    }
                </Select>
            </InputsWrapper>
            <ButtonRow>
                <ContainedButton onClick={() => newTimer()}>Add Timer</ContainedButton>
                <ContainedButton onClick={startTimer}>Start Timer</ContainedButton>
            </ButtonRow>
            <HorizontalRule />
            <Headline4>Settings</Headline4>
            <InputsWrapper>
                <Input name='timerName' label='Timer Name' value={'timerDisplay'} onChange={e => { setTimerDisplay(e.target.value); }} />
                <Select name='timerType' label='TimerType' value={timerType} onChange={e => { setTimerType(e.target.value); }}>
                    <Option value='countdown_date'>Countdown To Date</Option>
                    <Option value='countup_date'>Countup To Date</Option>
                    <Option value='countdown_timer'>Timer Down</Option>
                    <Option value='countup_timer'>Timer Up</Option>
                </Select>
                <TextArea name='display' label='Display' value={displayMessage} onChange={e => { setDisplayMessage(e.target.value); }} />
                <ToggleSwitch label='Show End Message' checked={hasEndMessage} onClick={() => setHasEndMessage(old => !old)} />
                <TextArea name='endMessage' label='End Message' value={endMessage} onChange={e => { setEndMessage(e.target.value); }} />
                {
                    timerType === 'countdown_date' &&
                    <>
                        <label className='col mr-1 timer-label'>End Date:</label>
                        <input type='date' value={formatDate(date)} min={formatDate(new Date())} onChange={e => { calcDate(e.target.value); }} />
                        <label className='col mr-1 timer-label'>End Time:</label>
                        <input type='time' value={formatTime(date)} min={(isSameDay(date) ? formatTime(new Date()) : '')} onChange={e => { calcTime(e.target.value); }} />
                    </>
                }
                {
                    timerType === 'countdown_timer' &&
                    <Input type='number' name='length' label='Length' value={length} onChange={e => { setLength(parseInt(e.target.value)); }} />
                }
                <ToggleSwitch label='Prepend Zeros' checked={prependZeros} onClick={() => setPrependZeros(old => !old)} />
                <ToggleSwitch label='Include Zero Days' checked={includeZeroDays} onClick={() => setIncludeZeroDays(old => !old)} />
                <ToggleSwitch label='Include Zero Hours' checked={includeZeroHours} onClick={() => setIncludeZeroHours(old => !old)} />
                <ToggleSwitch label='Include Zero Minutes' checked={includeZeroMinutes} onClick={() => setIncludeZeroMinutes(old => !old)} />
            </InputsWrapper>
            <Headline4>Font</Headline4>
            <InputsWrapper>
                <ColorPicker name='color' label='Color' color={fontColor} onClose={color => setFontColor(color)} />
                <Input type='number' name='size' label='Size' value={fontSize} onChange={e => { setFontSize(parseInt(e.target.value)); }} />
            </InputsWrapper>
            <ContainedButton onClick={saveSettings}>
                Save
            </ContainedButton>
            <HorizontalRule />
            <Headline4>Preview</Headline4>
            <InputsWrapper>
                <ColorPicker name='bg_color' label='Background' color={backgroundColor} onClose={color => setBackgroundColor(color)} />
            </InputsWrapper>
            <canvas ref={canvasRef} className='m-3 p-1' style={{ backgroundColor: `#${backgroundColor}` }} width={200} height={200}>

            </canvas>
        </ContentWrapper>
    );
};