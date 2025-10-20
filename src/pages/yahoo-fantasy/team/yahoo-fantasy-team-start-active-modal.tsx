import { Body1, ButtonRow, ContainedButton, Headline5, Modal, OutlinedButton, useQuery } from 'gobble-lib-react';
import { YahooFantasyTeam } from '../rest/yahoo-fantasy-team';
import { getDevAPIBase } from '../../../network/network-helper';
import { YahooFantasyLeague } from '../rest/yahoo-fantasy-league';
import { putParams } from '../../../network/auth-network';
import { useState } from 'react';
import { HStack, VStack } from '../../../components/stack';

type YahooFantasyStartActiveModalProps = {
    readonly show: boolean
    readonly requestClose: () => void
    readonly gameId: string
    readonly league: YahooFantasyLeague
    readonly teamId: string
    readonly date: Date
}

type DayConfirmation = {
    readonly date: Date
    readonly status: number //0: Waiting | 1: Running | 2: Success | 3: Fail
}

const getIconForStatus = (status: number) => {
    switch (status) {
        case 0: return 'fas fa-minus';
        case 1: return 'fas fa-spinner';
        case 2: return 'fas fa-check';
        case 3: return 'fas fa-times';
        default: return 'fas fa-question';
    }
};

export const YahooFantasyStartActiveModal = ({ show, requestClose, gameId, league, teamId, date }: YahooFantasyStartActiveModalProps) => {

    const [startActive] = useQuery<YahooFantasyTeam>(`${getDevAPIBase()}/yahoo/game/${gameId}/league/${league.leagueId}/team/${teamId}/roster/start-active`, { requestData: putParams, shouldThrow: true });

    const [dayConfirmations, setDayConfirmations] = useState<readonly DayConfirmation[]>([]);
    const [inProgress, setInProgress] = useState(false);

    const onConfirmClick = async () => {
        setInProgress(true);
        const numDays = 7;
        const dates = Array.from({ length: numDays }).map((_, i) => ({
            date: new Date(date.getTime() + (i * 1000 * 60 * 60 * 24)),
            status: 0
        }));
        setDayConfirmations(dates);
        // eslint-disable-next-line functional/no-loop-statements
        for (let i = 0; i < numDays; i++) {
            const day = dates[i];
            setDayConfirmations(old => old.map((o, ii) => ii === i ? { ...o, status: 1 } : o));
            try {
                await startActive(undefined, undefined, `date=${day.date.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })}`);
                setDayConfirmations(old => old.map((o, ii) => ii === i ? { ...o, status: 2 } : o));
            }
            catch {
                setDayConfirmations(old => old.map((o, ii) => ii === i ? { ...o, status: 3 } : o));
            }
        }

        setInProgress(false);
    };

    return (
        <Modal show={show} requestClose={requestClose}>
            <VStack>
                <Headline5>Start Active Players</Headline5>
                {
                    dayConfirmations.map(dc => (
                        <HStack>
                            <Body1>{dc.date.toLocaleDateString()}</Body1>
                            <Body1><i className={getIconForStatus(dc.status)} /></Body1>
                        </HStack>
                    ))
                }
                <ButtonRow>
                    <OutlinedButton onClick={requestClose} disabled={inProgress}>Cancel</OutlinedButton>
                    <ContainedButton onClick={onConfirmClick} loading={inProgress}>Update</ContainedButton>
                </ButtonRow>
            </VStack>
        </Modal>
    );
};