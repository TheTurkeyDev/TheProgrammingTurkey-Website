import { gameVersions } from './chance-cubes-rewards-status';
import { Table, TH } from '@theturkeydev/gobble-lib-react';
import { CCVersionReward } from '../../../types/chance-cubes/chance-cubes-versioned-reward';
import { ChanceCubesRewardNote } from '../../../types/chance-cubes/chance-cubes-reward-note';
import { ChanceCubesRewardStatusTableItem } from './chance-cubes-reward-status-table-item';

type ChanceCubesRewardStatusTableProps = {
    readonly allRewards: CCVersionReward
    readonly shownRewards: readonly string[]
    readonly notes: readonly ChanceCubesRewardNote[]
    readonly highlightedReward: string
    readonly canEdit: boolean
}

export const ChanceCubesRewardStatusTable = ({ allRewards, shownRewards, notes, highlightedReward, canEdit }: ChanceCubesRewardStatusTableProps) => {
    return (
        <Table>
            <thead>
                <tr>
                    <TH></TH>
                    <TH>Reward/ Version</TH>
                    <TH>Chance</TH>
                    {
                        gameVersions.map(v => <TH key={v}>{v}</TH>)
                    }
                </tr>
            </thead>
            <tbody>
                {
                    shownRewards.map(reward => (
                        <ChanceCubesRewardStatusTableItem
                            reward={reward}
                            rewardData={allRewards[reward]}
                            notes={notes}
                            highlightedReward={highlightedReward}
                            canEdit={canEdit}
                        />
                    ))
                }
            </tbody>
        </Table>
    );
};