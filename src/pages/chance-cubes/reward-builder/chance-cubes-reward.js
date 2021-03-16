import { useContext, useState } from 'react';
import { OverlayContext } from '../../../contexts/overlay-context';
import { ChanceCubesAddRewardTypeOverlay } from '../../../overlays/chance-cubes/chance-cubes-add-reward-type-overlay';
import { ConfirmationOverlay } from '../../../overlays/confirmation-overlay';
import { DependencyList } from './dependency-list';
import { RewardTypesList } from './reward-types-list';

const settings = {
    'Block': [
        { key: 'xOffSet', display: 'X Offset', type: 'number', default: 0, description: 'Block offset in the x direction from the location of the broken chance cube, or the player' },
        { key: 'yOffSet', display: 'Y Offset', type: 'number', default: 0, description: 'Block offset in the y direction from the location of the broken chance cube, or the player' },
        { key: 'zOffSet', display: 'Z Offset', type: 'number', default: 0, description: 'Block offset in the z direction from the location of the broken chance cube, or the player' },
        { key: 'block', display: 'Block', type: 'text', default: 'minecraft:dirt', description: 'Id of the block to place' },
        { key: 'falling', display: 'Falling', type: 'boolean', default: false, description: 'Whether or not the block should fall into place, or be placed directly' },
        { key: 'relativeToPlayer', display: 'Relative to Player', type: 'boolean', default: false, description: "If enabled, the offsets will be relative to the player's location and not the chance cube's" },
        { key: 'removeUnbreakableBlocks', display: 'Remove Unbreakable Blocks', type: 'boolean', default: false, description: 'If enabled, placed blocks can replace unbreakable blocks.' },
        { key: 'playSound', display: 'Play Sound', type: 'boolean', default: true, description: 'Play the sound of the block being placed' },
        { key: 'delay', display: 'Delay', type: 'number', default: 0, min: 0, description: 'Delay amount (in ticks) from after the cube is broken till the block gets placed' }
    ],
    'Message': [
        { key: 'message', display: 'Message', type: 'text', default: '', description: 'Message to be sent' },
        { key: 'serverWide', display: 'Server Wide', type: 'boolean', default: false, description: 'If enabled sends the message to all players on the server' },
        { key: 'range', display: 'Range', type: 'number', default: 32, min: 0, description: 'All Players within this amount of blocks will recieve the message (server wide over rules this)' },
        { key: 'delay', display: 'Delay', type: 'number', default: 0, min: 0, description: 'Delay amount (in ticks) from after the cube is broken till the message is sent' }
    ],
    'Entity': [
        { key: 'entity', display: 'Enity', type: 'text', default: '', description: 'NBT data of the entity to spawn' },
        { key: 'removeBlocks', display: 'Remove Blocks', type: 'boolean', default: true, description: 'If enabled clears a 3x3x3 space around the cube to spawn the entities in' },
        { key: 'copies', display: 'Copies', type: 'number', default: 0, min: 0, description: 'Number of additional times this entitiy should be spawned in' },
        { key: 'delay', display: 'Delay', type: 'number', default: 0, min: 0, description: 'Delay amount (in ticks) from after the cube is broken till the entity is spawned' }
    ],
    'Experience': [
        { key: 'experienceAmount', display: 'Experience Amount', type: 'number', default: 1, description: 'Amount of experience in total in all the orbs' },
        { key: 'numberOfOrbs', display: 'Number Of Orbs', type: 'number', default: 1, description: 'Number of orbs to spawn' },
        { key: 'delay', display: 'Delay', type: 'number', default: 0, min: 0, description: 'Delay amount (in ticks) from after the cube is broken till the experience is spawned' }
    ],
    'Item': [
        { key: 'item', display: 'Item NBT', type: 'string', default: '', description: 'NBT of the item to be spawned in' },
        { key: 'delay', display: 'Delay', type: 'number', default: 0, min: 0, description: 'Delay amount (in ticks) from after the cube is broken till the item is spawned' }
    ],
    'Command': [
        { key: 'command', display: 'Command', type: 'text', default: '/help', description: 'Command to be run. Placeholder values: TDB' },
        { key: 'copies', display: 'Copies', type: 'number', default: 0, min: 0, description: 'Number of additional times the command should be run' },
        { key: 'copies_soft', display: 'Copies Soft', type: 'boolean', default: false, description: 'If enabled, the aditional runs of the command will regenerate their dynamic values' },
        { key: 'delay', display: 'Delay', type: 'number', default: 0, min: 0, description: 'Delay amount (in ticks) from after the cube is broken till the command is run' }
    ],
    'Potion': [
        { key: 'potionid', display: 'Potion ID', type: 'text', default: 'speed', description: 'Id of the potion to be spawned in' },
        { key: 'delay', display: 'Delay', type: 'number', default: 0, min: 0, description: 'Delay amount (in ticks) from after the cube is broken till the potion is spawned' }
    ],
    'Sound': [
        { key: 'sound', display: 'Sound', type: 'text', default: '', description: 'Id of the sound to play' },
        { key: 'serverWide', display: 'Server Wide', type: 'boolean', default: false, description: 'If enabled, play the sound server wide' },
        { key: 'range', display: 'Range', type: 'number', default: 16, min: 0, description: 'All Players within this amount of blocks will hear the sound (server wide over rules this)' },
        { key: 'playAtPlayersLocation', display: 'Play At Players Location', type: 'boolean', default: false, description: "The source of the sound is at the players location instead of the Chance Cube's locaiton" },
        { key: 'volume', display: 'Volume', type: 'decimal', default: 1, min: 0, max: 1, description: 'volume of the sound' },
        { key: 'pitch', display: 'Pitch', type: 'decimal', default: 1, min: 0, max: 1, description: 'Pitch of the sound' },
        { key: 'delay', display: 'Delay', type: 'number', default: 0, min: 0, description: 'Delay amount (in ticks) from after the cube is broken till the sound is played' }
    ],
    'Schematic': [
        { key: 'fileName', display: 'File Name', type: 'text', default: '', description: 'Name of the file to load in' },
        { key: 'xOffSet', display: 'X Offset', type: 'number', default: 0, description: 'Schematic center offset in the x direction from the location of the broken chance cube, or the player' },
        { key: 'yOffSet', display: 'Y Offset', type: 'number', default: 0, description: 'Schematic bottom in the y direction from the location of the broken chance cube, or the player' },
        { key: 'zOffSet', display: 'Z Offset', type: 'number', default: 0, description: 'Schematic center offset in the z direction from the location of the broken chance cube, or the player' },
        { key: 'falling', display: 'Falling', type: 'boolean', default: true, description: 'Whether or not the blocks should fall into place, or be placed directly' },
        { key: 'relativeToPlayer', display: 'Relative to Player', type: 'boolean', default: false },
        { key: 'includeAirBlocks', display: 'Include Air Blocks', type: 'boolean', default: false },
        { key: 'playSound', display: 'Play Sound', type: 'boolean', default: true },
        { key: 'spacingDelay', display: 'Spacing Delay', type: 'decimal', default: 0.1, min: 0 },
        { key: 'delay', display: 'Delay', type: 'number', default: 0, min: 0, description: 'Delay amount (in ticks) from after the cube is broken till the structure begins building' }
    ],
    'Chest': [
        { key: 'item', display: 'Item', type: 'text', default: 'minecraft:dirt' },
        { key: 'amount', display: 'Amount', type: 'number', default: 1, min: 0 },
        { key: 'chance', display: 'Chance', type: 'number', default: 50, min: 0, max: 100 }
    ],
    'Particle': [
        { key: 'particle', display: 'Particle', type: 'text', default: 'explode' },
        { key: 'delay', display: 'Delay', type: 'number', default: 0, min: 0, description: 'Delay amount (in ticks) from after the cube is broken till the paticle is spawned' }
    ],
    'Effect': [
        { key: 'potionid', display: 'Potion ID', type: 'text', default: 'speed' },
        { key: 'duration', display: 'Duration', type: 'number', default: 1, min: 0 },
        { key: 'amplifier', display: 'Amplifier', type: 'number', default: 0, min: 0 },
        { key: 'radius', display: 'Radius', type: 'number', default: 1, min: 0 },
        { key: 'delay', display: 'Delay', type: 'number', default: 0, min: 0, description: 'Delay amount (in ticks) from after the cube is broken till the effect is given' }
    ],
    'Title': [
        { key: 'message', display: 'Message', type: 'text', default: '' },
        { key: 'type', display: 'Type', type: 'text', default: 'TITLE' },
        { key: 'fadeInTime', display: 'Fade In Time', type: 'number', default: 0, min: 0 },
        { key: 'displayTime', display: 'Display Time', type: 'number', default: 0, min: 0 },
        { key: 'fadeOutTime', display: 'Fade Out Time', type: 'number', default: 0, min: 0 },
        { key: 'isServerWide', display: 'Server Wide', type: 'boolean', default: false },
        { key: 'range', display: 'Range', type: 'number', default: 16, min: 0 },
        { key: 'delay', display: 'Delay', type: 'number', default: 0, min: 0, description: 'Delay amount (in ticks) from after the cube is broken till the title is placed' }
    ],
    'Area': [
        { key: 'xSize', display: 'X Size', type: 'number', default: 1, min: 0 },
        { key: 'ySize', display: 'Y Size', type: 'number', default: 1, min: 0 },
        { key: 'zSize', display: 'Z Size', type: 'number', default: 1, min: 0 },
        { key: 'block', display: 'Block', type: 'text', default: 'minecraft:dirt' },
        { key: 'xOffSet', display: 'X Offset', type: 'number', default: 0 },
        { key: 'yOffSet', display: 'Y Offset', type: 'number', default: 0 },
        { key: 'zOffSet', display: 'Z Offset', type: 'number', default: 0 },
        { key: 'falling', display: 'Falling', type: 'boolean', default: true },
        { key: 'causesUpdate', display: 'Causes Update', type: 'boolean', default: false },
        { key: 'relativeToPlayer', display: 'Relative to Player', type: 'boolean', default: false },
        { key: 'delay', display: 'Delay', type: 'number', default: 0, min: 0, description: 'Delay amount (in ticks) from after the cube is broken till the blocks gets placed' }
    ]
}

const colors = ['#06f0fa', '#e0ab02', '#05568f', '#9708d8', '#318209', '#be3921'];

export function ChanceCubesReward(props) {

    const overlay = useContext(OverlayContext);

    const [collapsed, setCollapsed] = useState(false);

    const changeRewardID = (id) => {
        props.setRewardID(props.rewardId, id);
    }

    const changeChanceValue = (chance) => {
        const json = { ...props.json };
        if (chance)
            json.chance = Math.min(100, Math.max(-100, chance));
        else
            json.chance = chance;
        props.setRewardState(props.rewardId, json);
    }

    const setIsGiantCC = () => {
        const json = { ...props.json };
        json.isGiantCubeReward = !json.isGiantCubeReward;
        props.setRewardState(props.rewardId, json);
    }


    const changeRewardTypeValue = (rewardType, index, rewardjson) => {
        const json = { ...props.json };
        json[rewardType][index] = rewardjson;
        props.setRewardState(props.rewardId, json);
    }

    const addRewardTypetoJson = (event) => {
        const json = { ...props.json };
        const typeJson = [];
        insetRewardType(event.code, typeJson);
        json[event.code] = typeJson;
        props.setRewardState(props.rewardId, json);
    }

    const insetRewardTypetoJson = (type) => {
        const json = { ...props.json };
        const typeJson = json[type];
        insetRewardType(type, typeJson);
        json[type] = typeJson;
        props.setRewardState(props.rewardId, json);
    }

    const insetRewardType = (type, typeJson) => {
        const index = typeJson.length;
        typeJson.push({});
        settings[type].forEach(setting => {
            typeJson[index][setting.key] = setting.default;
        });
    }

    const deleteRewardTypeIndex = (type, index) => {
        const json = { ...props.json };
        json[type] = json[type].filter((element, i) => i !== index);
        props.setRewardState(props.rewardId, json);
    }

    const deleteRewardType = (type) => {
        overlay.pushCurrentOverlay(<ConfirmationOverlay text={'Are you sure you want to delete everything in this reward event?'} options={
            [
                { text: 'Yes', callback: () => { overlay.popCurrentOverlay(); deleteRewardTypeConfirm(type); } },
                { text: 'No', callback: () => overlay.popCurrentOverlay() }
            ]
        } />);
    }

    const deleteRewardTypeConfirm = (type) => {
        const json = { ...props.json };
        delete json[type];
        props.setRewardState(props.rewardId, json);
    }

    const addRewardType = () => {
        overlay.pushCurrentOverlay(<ChanceCubesAddRewardTypeOverlay json={props.json} add={addRewardTypetoJson} />);
    }

    const changeDepValue = (dep, value) => {
        const json = { ...props.json };
        json.dependencies[dep] = value
        props.setRewardState(props.rewardId, json);
    }

    const deleteDepValue = (dep) => {
        const json = { ...props.json };
        delete json.dependencies[dep];
        props.setRewardState(props.rewardId, json);
    }


    return (
        <div className='m-2 container' style={{ border: `1px solid ${props.color}` }}>
            <div className='row m-2'>
                <h4>Reward</h4>
                <div className='ml-auto' onClick={() => setCollapsed(old => !old)}>
                    {collapsed && <i className='clickable fas fa-chevron-left' />}
                    {!collapsed && <i className='clickable fas fa-chevron-down' />}
                </div>
                <div className='ml-3' onClick={() => props.deleteReward()}>
                    <i className='clickable fas fa-trash' />
                </div>
            </div>
            <div className={`row m-2 ${collapsed ? 'hidden' : ''}`}>
                <label className='col timer-label'>Reward ID:</label>
                <input className='col-9' style={{ maxWidth: '250px' }} type='text' value={props.rewardId} onChange={(e) => changeRewardID(e.target.value)} />
            </div>
            <div className={`row m-2 ${collapsed ? 'hidden' : ''}`}>
                <label className='col-3 timer-label'>Chance Value:</label>
                <input className='col-9' style={{ maxWidth: '250px' }} type='number' min={-100} max={100} value={props.json.chance} onChange={(e) => changeChanceValue(e.target.value)} />
            </div>
            <div className={`row m-2 ${collapsed ? 'hidden' : ''}`}>
                <label className='col-3 timer-label'>Giant Chance Cube Reward:</label>
                <div className='toggle-switch'>
                    <input type='checkbox' checked={props.json.isGiantCubeReward} onChange={() => { }} />
                    <span className='toggle-slider round' onClick={() => setIsGiantCC()}></span>
                </div>
            </div>
            <div className={`row m-2 ${collapsed ? 'hidden' : ''}`}>
                <DependencyList json={props.json.dependencies} insertDependency={changeDepValue} changeValue={changeDepValue} delete={deleteDepValue} />
            </div>
            {
                Object.keys(settings).map((type, i) => {
                    if (props.json[type]) {
                        return (
                            <div className={`row m-2 ${collapsed ? 'hidden' : ''}`} key={type}>
                                <RewardTypesList type={type} color={colors[i % colors.length]} settings={settings[type]} json={props.json[type]} insetRewardTypetoJson={() => insetRewardTypetoJson(type)} changeRewardTypeValue={(id, blockJson) => changeRewardTypeValue(type, id, blockJson)} deleteRewardTypeIndex={(index) => deleteRewardTypeIndex(type, index)} deleteRewardType={() => deleteRewardType(type)} />
                            </div>
                        );
                    }
                })
            }
            <div className={`row m-2 ${collapsed ? 'hidden' : ''}`}>
                <button className='ml-2 mt-2' onClick={() => addRewardType()}>Add Reward Event</button>
            </div>

        </div>
    )
}