import { Body1, Headline6 } from 'gobble-lib-react';
import styled from 'styled-components';
import { F1Constructor } from './f1-constructor';

type F1TeamItemProps = {
    readonly team: F1Constructor
    readonly points: number
    readonly showTeamName?: boolean
}

const ItemWrapper = styled.div`
    display: grid;
    grid-template-columns: 24px 8px auto 1fr 16px;
    align-items: center;
    min-width: 100px;
`;

const TeamColor = styled.div`
    margin: 3px 2px;
    height: calc(100% - 6px);
`;

export const F1TeamItem = ({ team, points, showTeamName = false }: F1TeamItemProps) => {
    return (
        <ItemWrapper>
            <Body1 style={{ color: points === 0 && !showTeamName  ? 'green' : '' }}>{points}</Body1>
            <TeamColor style={{ backgroundColor: team.color }} />
            <img src={team.logo} width={32} height={32} />
            {showTeamName && <Body1>{team.name}</Body1>}
        </ItemWrapper>
    );
};