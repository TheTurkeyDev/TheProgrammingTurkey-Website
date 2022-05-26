import { ConfirmationModal, ContainedButton, Headline5 } from 'gobble-lib-react';
import { useState } from 'react';
import styled from 'styled-components';
import { CollapseChevron } from '../../../components/collapse-chevron';
import { ChanceCubesRewardTypeType } from '../../../types/chance-cubes/chance-cubes-reward-types';
import { ChanceCubesSettingDefType } from '../../../types/chance-cubes/chance-cubes-setting-def';
import { Mapped } from '../../../types/mapped';
import { RewardType } from './reward-type';

const colors = [
    '#61a11f',
    '#445f8b',
    '#a6142a',
    '#c1fda1',
    '#fd3bf1',
    '#3d9bf3',
    '#62b770',
    '#af2ea2',
];

const RewardTypeWrapper = styled.div`
    max-width: 1000px;
    margin: 16px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
    padding: 8px;
`;

const Header = styled.div`
    display: grid;
    grid-template-columns: 1fr auto auto;
    gap: 16px;
`;

type RewardTypesListProps = {
    readonly typesList: readonly Mapped[]
    readonly color: string
    readonly type: ChanceCubesRewardTypeType
    readonly settings: readonly ChanceCubesSettingDefType[]
    readonly insetRewardTypetoJson: () => void
    readonly changeRewardTypeValue: (index: number, rewardjson: Mapped) => void
    readonly deleteRewardType: () => void
    readonly deleteRewardTypeIndex: (id: number) => void
}
export const RewardTypesList = ({ typesList, color, type, settings, insetRewardTypetoJson, changeRewardTypeValue, deleteRewardType, deleteRewardTypeIndex }: RewardTypesListProps) => {
    const [showModal, setShowModal] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    return (
        <RewardTypeWrapper style={{ border: `1px solid ${color}` }}>
            <Header>
                <Headline5>{type} Events</Headline5>
                <CollapseChevron collapsed={collapsed} setCollapsed={setCollapsed} />
                <i className='clickable fas fa-trash' onClick={() => setShowModal(true)} />
            </Header>
            {
                !collapsed &&
                <>
                    {typesList.map((rewardTypeInst, id) => {
                        return (
                            <RewardType
                                key={id}
                                json={rewardTypeInst}
                                color={colors[id % colors.length]}
                                settings={settings}
                                setRewardTypeState={rewardTypeInst => changeRewardTypeValue(id, rewardTypeInst)}
                                deleteRewardType={() => deleteRewardTypeIndex(id)}
                            />
                        );
                    })}
                    <ContainedButton onClick={() => insetRewardTypetoJson()}>
                        Add {type} Event
                    </ContainedButton>
                </>
            }
            <ConfirmationModal
                show={showModal}
                text='Are you sure you want to delete everything in this reward event?'
                yesText='Yes'
                onYesClick={() => { setShowModal(false); deleteRewardType(); }}
                noText='No'
                onNoClick={() => setShowModal(false)}
            />
        </RewardTypeWrapper>
    );
};
