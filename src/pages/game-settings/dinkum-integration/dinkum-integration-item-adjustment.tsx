import { Icon, Input } from 'gobble-lib-react';
import { DinkumIntegrationSettings } from './dinkum-integration-setting';

type DinkumIntegrationItemAdjustmentProps = {
    readonly setting: DinkumIntegrationSettings
    readonly update: (setting: DinkumIntegrationSettings) => void
    readonly remove: () => void
    readonly nums: readonly number[]
}
export const DinkumIntegrationItemAdjustment = ({ setting, update, remove, nums }: DinkumIntegrationItemAdjustmentProps) => {
    const getValidNumber = (num: number) => {
        const dir = num - setting.itemId;
        while (nums.includes(num))
            num += dir;
        return num;
    };

    return (
        <>
            <Icon className='fas fa-trash-alt' onClick={remove} />
            <Input placeholder='Item Id' type='number' value={setting.itemId} onChange={e => update({ ...setting, itemId: getValidNumber(parseInt(e.target.value)) })} />
            <Input placeholder='Value' type='number' value={setting.value} onChange={e => update({ ...setting, value: parseInt(e.target.value) })} />
        </>
    );
};