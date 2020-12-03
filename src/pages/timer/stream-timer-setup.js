import React, { useEffect, useState, useRef, useContext } from 'react';
import { PageWrapper } from '../base/page-wrapper';

import { useInterval } from '../../util/use-interval';
import { AuthContext } from '../../contexts/auth-context';
import { getDevAPIBase } from '../../network/network';
import { PageLoading } from '../base/page-loading';
import { AuthPageWrapper } from '../base/auth-page-wrapper';

export function StreamTimerSetup(props) {
    const canvasRef = useRef(null);

    const auth = useContext(AuthContext);

    const [loaded, setLoaded] = useState(0);
    const [refreshtoggle, setRefreshToggle] = useState(false);

    const [validTimerIDs, setValidTimerIDs] = useState([]);
    const [timerID, setTimerID] = useState(0);
    const [timerType, setTimerType] = useState('');
    const [timerDisplay, setTimerDisplay] = useState('');

    const [backgroundColor, setBackgroundColor] = useState("#ffffff");

    const [length, setLength] = useState(0);
    const [date, setDate] = useState(new Date());
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const [prependZeros, setPrependZeros] = useState(true);
    const [displayMessage, setDisplayMessage] = useState("");
    const [hasEndMessage, setHasEndMessage] = useState(false);
    const [endMessage, setEndMessage] = useState("");

    const [font, setFont] = useState("");
    const [fontSize, setFontSize] = useState(12);
    const [fontColor, setFontColor] = useState("");

    useEffect(() => {
        async function loadTimers() {
            fetch(getDevAPIBase() + `/streamtimer/timers`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Authorization': sessionStorage.getItem("access_token")
                }
            }).then(resp => {
                if (resp.status == 200)
                    return resp.json();
                return null;
            }).then(json => {
                if (json)
                    setValidTimerIDs(json);
            })
        }
        if (auth.authState)
            loadTimers();
    }, [auth.authChecked]);

    useEffect(() => {
        async function loadTimer() {
            fetch(getDevAPIBase() + `/streamtimer/timer/${auth.userID}/${timerID}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage.getItem("access_token")
                },
            }).then(resp => {
                if (resp.status == 200)
                    return resp.json();
                return null;
            }).then(json => {
                if (json) {
                    if (json.reference_datetime)
                        setDate(new Date(json.reference_datetime));
                    else
                        setDate(new Date());
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
        if (timerType === "countdown_date")
            distance = date.getTime() - now;
        else if (timerType === "countdown_timer")
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
        let displayMessageEdited = displayMessage.replace("{d}", days > 0 ? `${days}` : ``);
        let firstShown = days > 0;
        displayMessageEdited = displayMessageEdited.replace("{h}", (hours < 10 && prependZeros && firstShown ? '0' : '') + hours);
        firstShown = firstShown || hours > 0;
        displayMessageEdited = displayMessageEdited.replace("{m}", (minutes < 10 && prependZeros && firstShown ? '0' : '') + minutes);
        firstShown = firstShown || minutes > 0;
        displayMessageEdited = displayMessageEdited.replace("{s}", (seconds < 10 && prependZeros && firstShown ? '0' : '') + seconds);

        const timeOver = seconds <= 0 && minutes <= 0 && hours <= 0 && days <= 0;
        const lines = (timeOver && hasEndMessage ? endMessage : displayMessageEdited).split("\n");

        if (canvasRef.current && loaded == 2) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = `${fontSize}px ${font}`;
            ctx.fillStyle = fontColor;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            lines.forEach((line, i) => {
                ctx.fillText(line, canvas.width / 2, (canvas.height / 2) + (i - (lines.length / 2) + 0.5) * fontSize);
            });
        }
    });

    const calcDate = (newDate) => {
        if (newDate == null)
            return;
        const parts = newDate.split("-");
        const currentDate = date;
        currentDate.setFullYear(parts[0]);
        currentDate.setMonth(parts[1] - 1);
        currentDate.setDate(parts[2]);
        setDate(currentDate);
    }

    const calcTime = (time) => {
        if (time == null)
            return;
        const parts = time.split(":");
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
        fetch(getDevAPIBase() + `/streamtimer/start`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem("access_token")
            },
            body: JSON.stringify({
                timer_id: timerID,
            })
        }).then(resp => {
            if (resp.status == 200)
                setRefreshToggle(curr => !curr);
        });
    }

    const saveSettings = () => {
        fetch(getDevAPIBase() + `/streamtimer/save`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem("access_token")
            },
            body: JSON.stringify({
                timer_id: timerID,
                timer_display: timerDisplay,
                type: timerType,
                reference_datetime: date.toISOString(),
                length: length,
                display_msg: displayMessage,
                has_end_msg: hasEndMessage,
                end_msg: endMessage,
                prepend_zeros: prependZeros,
                include_zero_days: false,
                include_zero_hours: false,
                include_zero_minutes: false,
                font: font,
                font_color: fontColor,
                font_size: fontSize
            })
        }).then(resp => {
            if (resp.status == 200) {
                return resp.json();
            }
            return null;
        }).then(json => {
            if (json) {
                const timer = validTimerIDs.filter(t => t.id == json.timer_id);
                timer.display = json.timer_display;
                setValidTimerIDs(ids => [...ids.filter(t => t.id != json.timer_id), timer]);
            }
        });
    }

    const newTimer = () => {
        fetch(getDevAPIBase() + `/streamtimer/newtimer`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem("access_token")
            }
        }).then(resp => {
            if (resp.status == 200)
                return resp.json();
            return null;
        }).then(json => {
            if (json) {
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
        <AuthPageWrapper history={props.history} perm="streamtimer.dashboard">
            <div className="fluid-container pl-3">
                <div className="row m-0 mt-3 mb-2">
                    <label className="col m-0 ml-3 align-center" style={{ fontSize: "22px", maxWidth: "100px" }}>
                        URL:
                    </label>
                    <input className="col ml-2 mr-4" type="text" readOnly value={`http://apps.theprogrammingturkey.com/streamtimer/${auth.userID}/${timerID}`} style={{ width: "800px" }} />
                </div>
                <div className="row m-0">
                    <label className="col m-0 ml-3 align-center" style={{ fontSize: "22px", maxWidth: "100px" }}>Timer:</label>
                    <select className="col-auto ml-2" value={timerID} onChange={(e) => { setTimerID(e.target.value) }}>
                        {
                            validTimerIDs.map(timer => {
                                return (
                                    <option key={timer.id} value={timer.id}>{timer.display}</option>
                                );
                            })
                        }
                    </select>
                    <button className="col-auto ml-2" onClick={() => newTimer()}>+</button>
                </div>
                <div className="row m-0 mt-2">
                    <div className="col m-0 ml-3 align-center" style={{ maxWidth: "100px" }}></div>
                    <button className="col-auto ml-2" onClick={startTimer}>Start Timer</button>
                </div>
                <hr />
                <div className="row m-0">
                    <h2>Settings</h2>
                </div>
                <div className="row m-0 ml-4 mt-1">
                    <label className="col mr-1 timer-label" >Timer Name:</label>
                    <input type="text" value={timerDisplay} onChange={(e) => { setTimerDisplay(e.target.value) }} />
                </div>
                <div className="row m-0 ml-4 mt-1">
                    <label className="col mr-1 timer-label" >TimerType:</label>
                    <select className="col-auto" value={timerType} onChange={(e) => { setTimerType(e.target.value) }}>
                        <option value={"countdown_date"}>Countdown To Date</option>
                        <option value={"countup_date"}>Countup To Date</option>
                        <option value={"countdown_timer"}>Timer Down</option>
                        <option value={"countup_timer"}>Timer Up</option>
                    </select>
                </div>
                <div className="row m-0 ml-4 mt-1">
                    <label className="col mr-1 timer-label">Display:</label>
                    <textarea className="col timer-textarea" value={displayMessage} onChange={(e) => { setDisplayMessage(e.target.value) }} />
                </div>
                <div className="row m-0 ml-4 mt-1">
                    <label className="col mr-1 timer-label">End Message:</label>
                    <div className="toggle-switch">
                        <input type="checkbox" checked={hasEndMessage} onChange={(e) => { setHasEndMessage(e.target.checked) }} />
                        <span className="toggle-slider round"></span>
                    </div>

                </div>
                <div className="row m-0 ml-4 mt-1">
                    <label className="col mr-1 timer-label"></label>
                    <textarea className="col timer-textarea" value={endMessage} onChange={(e) => { setEndMessage(e.target.value) }} />
                </div>
                {
                    timerType == "countdown_date" &&
                    <div className="row m-0 ml-4 mt-1">
                        <label className="col mr-1 timer-label">End Time:</label>
                        <input type="date" value={formatDate(date)} min={formatDate(new Date())} onChange={(e) => { calcDate(e.target.value) }} />
                        <input type="time" value={formatTime(date)} min={(isSameDay(date) ? formatTime(new Date()) : "")} onChange={(e) => { calcTime(e.target.value) }} min />
                    </div>
                }
                {
                    timerType == "countdown_timer" &&
                    <div className="row m-0 ml-4 mt-1">
                        <label className="col mr-1 timer-label">Length:</label>
                        <input className="col-auto" type="number" value={length} onChange={(e) => { setLength(e.target.value) }} />
                    </div>
                }
                <div className="row m-0 ml-2 mt-2">
                    <h4>Font</h4>
                </div>
                <div className="row m-0 ml-4 mt-1">
                    <label className="col mr-1 timer-label">Color:</label>
                    <input type="color" value={fontColor} onChange={(e) => { setFontColor(e.target.value) }} />
                </div>
                <div className="row m-0 ml-4 mt-1">
                    <label className="col mr-1 timer-label">Size:</label>
                    <input className="col-auto" type="number" value={fontSize} onChange={(e) => { setFontSize(e.target.value) }} />
                </div>
                <div className="row m-0 ml-4 mt-1">
                    <button onClick={saveSettings}>
                        Save
                    </button>
                </div>
                <hr />
                <div className="row m-0 mt-1">
                    <h2>Preview</h2>
                </div>
                <div className="row m-0 ml-4 mt-1">
                    <label className="col mr-1 timer-label">Background:</label>
                    <input className="" type="color" value={backgroundColor} onChange={(e) => { setBackgroundColor(e.target.value) }} />
                </div>
                <div className="row m-0 ml-4 mt-1">
                    <canvas ref={canvasRef} className="m-3 p-1" style={{ backgroundColor }} width={200} height={200}>

                    </canvas>
                </div>
            </div>
        </AuthPageWrapper >
    );
}