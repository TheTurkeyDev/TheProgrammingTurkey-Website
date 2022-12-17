import { ConfirmationModal, Headline5, Input, InputsWrapper, OutlinedButton, ToggleSwitch } from 'gobble-lib-react';
import { useState } from 'react';
import styled from 'styled-components';
import { CollapseChevron } from '../../../components/collapse-chevron';
import { ChanceCubesAddRewardTypeModal } from '../../../modals/chance-cubes/chance-cubes-add-reward-type-overlay';
import { EventType } from '../../../types/chance-cubes/chance-cubes-event-type';
import { ChanceCubesRewardType } from '../../../types/chance-cubes/chance-cubes-reward';
import { ChanceCubesRewardSettings } from '../../../types/chance-cubes/chance-cubes-reward-settings';
import { ChanceCubesRewardTypeType } from '../../../types/chance-cubes/chance-cubes-reward-types';
import { Mapped } from '../../../types/mapped';
import { DependencyList } from './dependency-list';
import { settings } from './raw-settings';
import { RewardTypesList } from './reward-types-list';

const colors = ['#06f0fa', '#e0ab02', '#05568f', '#9708d8', '#318209', '#be3921'];

const RewardWrapper = styled.div`
    max-width: 1000px;
    margin: 16px;
    display: grid;
    grid-template-columns: 1fr;
    padding: 8px;
`;

const RewardHeader = styled.div`
    display: grid;
    grid-template-columns: 1fr auto auto;
    gap: 16px;
`;

type ChanceCubesRewardProps = {
    readonly reward: ChanceCubesRewardType
    readonly color: string
    readonly rewardId: string
    readonly setRewardID: (currId: string, newId: string) => void
    readonly setRewardState: (rewardId: string, reward: ChanceCubesRewardType) => void
    readonly removeReward: () => void
}
export const ChanceCubesReward = ({ reward, color, rewardId, setRewardID, setRewardState, removeReward }: ChanceCubesRewardProps) => {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    const changeRewardID = (id: string) => {
        setRewardID(rewardId, id);
    };

    const changeChanceValue = (chance: number) => {
        setRewardState(rewardId, {
            ...reward,
            chance: chance ? Math.min(100, Math.max(-100, chance)) : chance
        });
    };

    const setIsGiantCC = () => {
        setRewardState(rewardId, {
            ...reward,
            isGiantCubeReward: !reward.isGiantCubeReward
        });
    };


    const changeRewardTypeValue = (rewardType: ChanceCubesRewardTypeType, index: number, rewardJson: Mapped) => {
        const updated = reward[rewardType] ?? [];
        updated[index] = rewardJson;
        setRewardState(rewardId, {
            ...reward,
            [rewardType]: updated
        });
    };

    const addRewardTypeToJson = (event: EventType) => {
        const jsonCopy = { ...reward };
        // eslint-disable-next-line functional/prefer-readonly-type
        const typeJson: Mapped[] = [];
        insetRewardType(event.code, typeJson);
        (jsonCopy as Mapped)[event.code] = typeJson;
        setRewardState(rewardId, jsonCopy);
    };

    const insetRewardTypeToJson = (type: ChanceCubesRewardTypeType) => {
        const jsonCopy = { ...reward };
        const typeJson = (jsonCopy as Mapped)[type];
        insetRewardType(type, typeJson);
        (jsonCopy as Mapped)[type] = typeJson;
        setRewardState(rewardId, { ...reward });
    };

    // eslint-disable-next-line functional/prefer-readonly-type
    const insetRewardType = (type: ChanceCubesRewardTypeType, typeJson: Mapped[]) => {
        const index = typeJson.length;
        typeJson.push({});
        settings[type].forEach(setting => {
            typeJson[index][setting.key] = setting.default;
        });
    };

    const deleteRewardTypeIndex = (type: ChanceCubesRewardTypeType, index: number) => {
        const jsonCopy = { ...reward };
        (jsonCopy as Mapped)[type] = ((jsonCopy as Mapped)[type] as readonly Mapped[]).filter((_, i) => i !== index);
        setRewardState(rewardId, jsonCopy);
    };


    const deleteRewardType = (type: string) => {
        const jsonCopy = { ...reward };
        delete (jsonCopy as Mapped)[type];
        setRewardState(rewardId, jsonCopy);
    };

    const changeDepValue = (dep: string, value: string) => {
        const jsonCopy = { ...reward };
        (jsonCopy.dependencies as Mapped)[dep] = value;
        setRewardState(rewardId, jsonCopy);
    };

    const deleteDepValue = (dep: string) => {
        const jsonCopy = { ...reward };
        delete (jsonCopy.dependencies as Mapped)[dep];
        setRewardState(rewardId, jsonCopy);
    };

    return (
        <RewardWrapper style={{ border: `1px solid ${color}` }}>
            <RewardHeader>
                <Headline5>Reward</Headline5>
                <CollapseChevron collapsed={collapsed} setCollapsed={setCollapsed} />
                <i className='clickable fas fa-trash' onClick={() => setShowDeleteModal(true)} />
            </RewardHeader>
            {
                !collapsed &&
                <>
                    <InputsWrapper>
                        <Input type='text' name='rewardId' label='Reward ID' value={rewardId} onChange={e => changeRewardID(e.target.value)} />
                        <Input type='number' name='chanceValue' label='Chance Value' min={-100} max={100} value={reward.chance} onChange={e => changeChanceValue(parseInt(e.target.value))} />
                        <ToggleSwitch label='Giant Chance Cube Reward' checked={reward.isGiantCubeReward} onClick={() => setIsGiantCC()} />
                    </InputsWrapper>
                    <DependencyList deps={reward.dependencies ?? []} insertDependency={changeDepValue} changeValue={changeDepValue} deleteDependency={deleteDepValue} />
                    {
                        Object.keys(settings).map((t, i) => {
                            const type = t as keyof ChanceCubesRewardSettings;
                            if ((reward as Mapped)[type]) {
                                return (
                                    <RewardTypesList
                                        type={type}
                                        color={colors[i % colors.length]}
                                        settings={(settings as Mapped)[type]}
                                        typesList={(reward as Mapped)[type]}
                                        insetRewardTypeToJson={() => insetRewardTypeToJson(type)}
                                        changeRewardTypeValue={(id, blockJson) => changeRewardTypeValue(type, id, blockJson)}
                                        deleteRewardTypeIndex={index => deleteRewardTypeIndex(type, index)}
                                        deleteRewardType={() => deleteRewardType(type)} />
                                );
                            }
                        })
                    }
                    <OutlinedButton className='ml-2 mt-2' onClick={() => setShowAddModal(true)}>Add Reward Event</OutlinedButton>
                </>
            }
            <ConfirmationModal
                show={showDeleteModal}
                text='Are you sure you want to delete this reward?'
                yesText='Yes'
                onYesClick={() => { setShowDeleteModal(false); removeReward(); }}
                noText='No'
                onNoClick={() => setShowDeleteModal(false)}
            />
            <ChanceCubesAddRewardTypeModal
                show={showAddModal}
                requestClose={() => setShowAddModal(false)}
                json={reward}
                add={addRewardTypeToJson}
            />
        </RewardWrapper>
    );
};