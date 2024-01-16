import { Headline4, Icon, OutlinedButton } from 'gobble-lib-react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CalendarDay } from './calendar-day';

const CalendarWrapper = styled.div`
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
`;

const CalendarHeader = styled.div`
    display: grid;
    grid-template-columns: auto auto auto 1fr;
    gap: 16px;
    align-items: center;
    margin-left: 16px;
`;

const DatesWrapper = styled.div`
    height: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
`;

export const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const monthsAbbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

type CalendarProps = {
    readonly onDayClick: (date: Date) => void
}

export const Calendar = ({ onDayClick }: CalendarProps) => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth());
    const [isTodayMonth, setIsTodayMonth] = useState(true);
    const monthFirst = new Date(year, month, 1);
    const monthSunday = new Date(year, month, 1 - monthFirst.getDay());
    const monthLast = new Date(year, month + 1, 0);
    const monthLastSaturday = new Date(year, month, monthLast.getDate() + (6 - monthLast.getDay()));
    const weeks = Math.ceil((monthLastSaturday.getTime() - monthSunday.getTime()) / (1000 * 3600 * 24 * 7));

    useEffect(() => {
        const today = new Date();
        setIsTodayMonth(year === today.getFullYear() && month === today.getMonth());
    }, [year, month]);

    const today = () => {
        const today = new Date();
        setYear(today.getFullYear());
        setMonth(today.getMonth());
    };

    const prevMonth = () => {
        if (month > 0) {
            setMonth(month - 1);
        }
        else {
            setYear(year - 1);
            setMonth(11);
        }
    };

    const nextMonth = () => {
        if (month < 11) {
            setMonth(month + 1);
        }
        else {
            setYear(year + 1);
            setMonth(0);
        }
    };

    return (
        <CalendarWrapper>
            <CalendarHeader>
                <OutlinedButton onClick={today} disabled={isTodayMonth}>Today</OutlinedButton>
                <Icon className='fas fa-chevron-left' onClick={prevMonth} />
                <Icon className='fas fa-chevron-right' onClick={nextMonth} />
                <Headline4>{months[month]} {year}</Headline4>
            </CalendarHeader>
            <DatesWrapper>
                {
                    [...Array(weeks)].map((_, week) => (
                        [...Array(7)].map((_, day) => {
                            const days = week * 7 + day;
                            const date = new Date(monthSunday.getFullYear(), monthSunday.getMonth(), monthSunday.getDate() + days);
                            return <CalendarDay key={days} date={date} day={day} month={month} week={week} onClick={() => onDayClick(date)} />;
                        })
                    ))
                }
            </DatesWrapper>
        </CalendarWrapper>
    );
};