import styled from 'styled-components';
import { monthsAbbr, weekdays } from './calendar';
import { Body1 } from 'gobble-lib-react';
import { TodayNumber } from './today-number';

const Day = styled.div`
    border: 1px solid white;
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: 25px;
    justify-items: center;

    &:hover {
        cursor: pointer;
        background: #ffffff22;
    }
`;

type CalendarDayProps = {
    readonly date: Date
    readonly day: number
    readonly month: number
    readonly week: number
    readonly onClick: () => void
}

export const CalendarDay = ({ date, day, month, week, onClick }: CalendarDayProps) => {
    const now = new Date();
    const dateNum = date.getDate();
    const monthNum = date.getMonth();
    const isToday = dateNum === now.getDate() && monthNum === now.getMonth() && date.getFullYear() === now.getFullYear();

    return (
        <Day onClick={onClick}>
            {week === 0 && <Body1>{weekdays[day]}</Body1>}
            {
                isToday ?
                    <TodayNumber date={date}/> :
                    <Body1 style={{ fontWeight: monthNum === month ? 'bold' : '' }}>
                        {dateNum === 1 ? monthsAbbr[monthNum] : ''} {dateNum}
                    </Body1>
            }

        </Day>
    );
};