import styled from 'styled-components';
import { Competitor } from './competitor';
import { Body1, Caption, Opacity } from 'gobble-lib-react';

type PickableType = { readonly $pickable: boolean }

const Wrapper = styled.div<PickableType>`
    height: 20px;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    justify-content: center;
    gap: 4px;

    &:hover {
        cursor: ${({ $pickable }) => $pickable ? 'pointer' : ''};
        /* opacity: ${({ $pickable }) => $pickable ? Opacity.HOVER_NORMAL : ''}; */
        background-color: ${({ $pickable }) => $pickable ? '#fff3' : ''};
    }
`;

const TeamNameWrapper = styled.div`
    display: grid;
    grid-template-columns: 12px 1fr;
    gap: 2px;
    align-items: end;
`;

const Text = styled(Body1)`
    font-size: 12px;
    line-height: 12px;
`;

const Seed = styled(Caption)`
    justify-self: end;
    font-size: 10px;
    line-height: 10px;
    opacity: 75%;
`;

type BracketCompetitorProps = {
    readonly isTop: boolean
    readonly competitor: Competitor
    readonly hasWinner: boolean
    readonly isLoser: boolean
    readonly state?: number
    readonly teamClick?: (competitor: Competitor, isTop: boolean) => void
}

export const BracketCompetitor = ({ isTop, competitor, isLoser, state = -1, teamClick }: BracketCompetitorProps) => {
    const pickable = !!teamClick;

    const logo = competitor.team.logo;

    return (
        <Wrapper style={{ opacity: isLoser ? '30%' : '' }} $pickable={pickable} onClick={() => teamClick && teamClick(competitor, isTop)}>
            <img src={logo === '' ? undefined : logo} width={20} />
            <TeamNameWrapper>
                <Seed>{competitor.rank}</Seed>
                <Text style={{ color: state === 0 ? '#007200' : (state === 1 ? '#ba1b1b' : '') }}>{competitor.team.nameShort}</Text>
            </TeamNameWrapper>
            <Text>{competitor.score}</Text>
        </Wrapper>
    );
};