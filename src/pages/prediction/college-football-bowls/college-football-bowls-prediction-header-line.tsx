import { Body1, Headline5 } from 'gobble-lib-react';
import styled from 'styled-components';
import { UserPicksData } from './college-football-bowls-prediction-user-picks-data';

const UserName = styled.div`
    padding-inline: 4px;
    width: 100%;
    display: grid;
    justify-items: center;
    min-width: 100px;
`;

export const HeaderLine = (text: string, userPicks: readonly UserPicksData[], isSub: boolean, getColumnText: (upd: UserPicksData) => string | number) => {
    const TextComp = isSub ? Body1 : Headline5;
    return (
        <>
            <div />
            <TextComp>{text}</TextComp>
            {
                userPicks.map((k, i) => (
                    <UserName key={k.userId} style={{ backgroundColor: i % 2 === 0 ? '#5d76d933' : '' }}>
                        <TextComp>{getColumnText(k)}</TextComp>
                    </UserName>
                ))
            }
            <div />
        </>
    );
};