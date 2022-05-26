import { Body1, Headline6 } from 'gobble-lib-react';
import { Fragment } from 'react';
import styled from 'styled-components';
import { CCVersionReward } from '../../../types/chance-cubes/chance-cubes-versioned-reward';
import { Mapped } from '../../../types/mapped';
import { gameVersions } from './chance-cubes-rewards-status';

const StatsWrapper = styled.div`
    display: grid;
    grid-template-columns: auto auto auto auto auto;
    column-gap: 16px;
    row-gap: 4px;
    max-width: 900px;
    margin-inline: auto;
`;

type ChanceCubesRewardStatusStatsProps = {
    readonly rewards: CCVersionReward
}

export const ChanceCubesRewardStatusStats = ({ rewards }: ChanceCubesRewardStatusStatsProps) => {
    return (
        <StatsWrapper>
            <Headline6>
                Game Version
            </Headline6>
            <Headline6>
                Reward Status
            </Headline6>
            <Headline6>
                %
            </Headline6>
            <Headline6>
                Rewards Working
            </Headline6>
            <Headline6>
                %
            </Headline6>
            {
                Object.entries(computeVersionCompletion(rewards)).map(entry => {
                    return (
                        <Fragment key={entry[0]}>
                            <Body1>
                                {entry[0]}
                            </Body1>
                            <Body1>
                                {entry[1].completed}/{entry[1].total}
                            </Body1>
                            <Body1>
                                {(entry[1].completed / entry[1].total * 100).toFixed(2)}%
                            </Body1>
                            <Body1>
                                {entry[1].working} / {entry[1].completed}
                            </Body1>
                            <Body1>
                                {(entry[1].working / (entry[1].completed === 0 ? 1 : entry[1].completed) * 100).toFixed(2)}%
                            </Body1>
                        </Fragment>
                    );
                })
            }
        </StatsWrapper >
    );
};

function computeVersionCompletion(rewards: CCVersionReward) {

    const base = gameVersions.reduce((prev, curr) => { return { ...prev, [curr]: { completed: 0, total: 0, working: 0 } }; }, {} as Mapped);

    return Object.keys(rewards).reduce((prev, curr) => {
        if (!curr.startsWith('chancecubes:cr')) {
            gameVersions.forEach(version => {
                const status = rewards[curr].versions[version] ?? 0;
                if (status !== 4) {
                    prev[version].total += 1;

                    if (status !== 0) {
                        prev[version].completed += 1;
                        if (status === 1) {
                            prev[version].working += 1;
                        }
                    }
                }
            });
        }
        return prev;
    }, base);
}
