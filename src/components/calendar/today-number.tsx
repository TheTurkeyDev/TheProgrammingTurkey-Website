import { Body1 } from 'gobble-lib-react';
import styled from 'styled-components';
import { monthsAbbr } from './calendar';

const Wrapper = styled.div`
    width: 25px;
    height: 25px;
    background-color: #3388ff;
    border-radius: 13px;
    display: grid;
    justify-content: center;
    align-items: center;
`;

type TodayNumberProps = {
    readonly date: Date
}

export const TodayNumber = ({ date }: TodayNumberProps) => {
    const dateNum = date.getDate();
    const monthNum = date.getMonth();
    return (
        <Wrapper>
            <Body1>{dateNum === 1 ? monthsAbbr[monthNum] : ''} {dateNum}</Body1>
        </Wrapper>
    );
};