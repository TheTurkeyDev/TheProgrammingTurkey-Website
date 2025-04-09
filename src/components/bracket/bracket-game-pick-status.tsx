import { styled } from 'styled-components';
import { Competitor } from './competitor';
import { Caption } from 'gobble-lib-react';

const CorrectionWrapper = styled.div`
    height: 12px;
    background-color: ${({ theme }) => theme.surface.color}cc;
    color: #ba1b1b;
    text-decoration: line-through;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
`;

const WrongBlock = styled.div`
    background-color: #ba1b1b;
    height: 100%;
    width: 8px;
`;

const TeamName = styled(Caption)`
    color: #ba1b1b;
`;

type BracketGamePickStatusProps = {
    readonly top: boolean
    readonly realComp: Competitor
    readonly pickComp?: Competitor
}

export const BracketGamePickStatus = ({ top, realComp, pickComp }: BracketGamePickStatusProps) => {

    const wrongTeam = !!realComp.team.id && pickComp?.team.id !== realComp.team.id;

    if (!wrongTeam || !pickComp || pickComp.team.id === '')
        return <div />;

    return (
        <CorrectionWrapper style={{ borderTop: top ? '' : '1px solid #888', borderBottom: top ? '1px solid #888' : '' }}>
            <WrongBlock />
            <TeamName>{pickComp.team.nameShort}</TeamName>
        </CorrectionWrapper>
    );
};