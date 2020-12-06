import React, { useContext } from 'react';
import { OverlayContext } from '../../../contexts/overlay-context';
import { ChanceCubesAddRewardTypeOverlay } from '../../../overlays/chance-cubes-add-reward-type';
import { ConfirmationOverlay } from '../../../overlays/confirmation-overlay';
import { RewardTypesList } from './reward-types-list';

const settings = {
    "Block": [
        { key: "xOffSet", display: "X Offset", type: "number", default: 0 },
        { key: "yOffSet", display: "Y Offset", type: "number", default: 0 },
        { key: "zOffSet", display: "Z Offset", type: "number", default: 0 },
        { key: "block", display: "Block", type: "text", default: "minecraft:dirt" },
        { key: "falling", display: "Falling", type: "boolean", default: false },
        { key: "relativeToPlayer", display: "Relative to Player", type: "boolean", default: false },
        { key: "removeUnbreakableBlocks", display: "Remove Unbreakable Blocks", type: "boolean", default: false },
        { key: "playSound", display: "Play Sound", type: "boolean", default: true },
        { key: "delay", display: "Delay", type: "number", default: 0 }
    ],
    "Message": [
        { key: "message", display: "Message", type: "text", default: "" },
        { key: "serverWide", display: "Server Wide", type: "boolean", default: false },
        { key: "range", display: "Range", type: "number", default: 32 },
        { key: "delay", display: "Delay", type: "number", default: 0 }
    ],
    "Entity": [
        { key: "entity", display: "Enity", type: "text", default: "" },
        { key: "removeBlocks", display: "Remove Blocks", type: "boolean", default: true },
        { key: "copies", display: "Copies", type: "number", default: 0 },
        { key: "delay", display: "Delay", type: "number", default: 0 }
    ],
    "Experience": [
        { key: "experienceAmount", display: "Experience Amount", type: "number", default: 1 },
        { key: "numberOfOrbs", display: "Number Of Orbs", type: "number", default: 1 },
        { key: "delay", display: "Delay", type: "number", default: 0 }
    ],
    "Item": [
        { key: "item", display: "Item NBT", type: "string", default: "" },
        { key: "delay", display: "Delay", type: "number", default: 0 }
    ],
    "Command": [
        { key: "command", display: "Command", type: "text", default: "/help" },
        { key: "copies", display: "Copies", type: "number", default: 0 },
        { key: "copies_soft", display: "Copies Soft", type: "boolean", default: false },
        { key: "delay", display: "Delay", type: "number", default: 0 }
    ],
    "Potion": [
        { key: "potionid", display: "Potion ID", type: "text", default: "speed" },
        { key: "delay", display: "Delay", type: "number", default: 0 }
    ],
    "Sound": [
        { key: "sound", display: "Sound", type: "text", default: "" },
        { key: "serverWide", display: "Server Wide", type: "boolean", default: false },
        { key: "range", display: "Range", type: "number", default: 16 },
        { key: "playAtPlayersLocation", display: "Play At Players Location", type: "boolean", default: false },
        { key: "volume", display: "Volume", type: "decimal", default: 1 },
        { key: "pitch", display: "Pitch", type: "decimal", default: 1 },
        { key: "delay", display: "Delay", type: "number", default: 0 }
    ],
    "Schematic": [
        { key: "fileName", display: "File Name", type: "text", default: "" },
        { key: "xOffSet", display: "X Offset", type: "number", default: 0 },
        { key: "yOffSet", display: "Y Offset", type: "number", default: 0 },
        { key: "zOffSet", display: "Z Offset", type: "number", default: 0 },
        { key: "block", display: "Block", type: "text", default: "minecraft:dirt" },
        { key: "falling", display: "Falling", type: "boolean", default: true },
        { key: "relativeToPlayer", display: "Relative to Player", type: "boolean", default: false },
        { key: "includeAirBlocks", display: "Include Air Blocks", type: "boolean", default: false },
        { key: "playSound", display: "Play Sound", type: "boolean", default: true },
        { key: "spacingDelay", display: "Spacing Delay", type: "decimal", default: 0.1 },
        { key: "delay", display: "Delay", type: "number", default: 0 }
    ],
    "Chest": [
        { key: "item", display: "Item", type: "text", default: "minecraft:dirt" },
        { key: "amount", display: "Amount", type: "number", default: 1 },
        { key: "chance", display: "Chance", type: "number", default: 50 }
    ],
    "Particle": [
        { key: "particle", display: "Particle", type: "text", default: "explode" },
        { key: "delay", display: "Delay", type: "number", default: 0 }
    ],
    "Effect": [
        { key: "potionid", display: "Potion ID", type: "text", default: "speed" },
        { key: "duration", display: "Duration", type: "number", default: 1 },
        { key: "amplifier", display: "Amplifier", type: "number", default: 0 },
        { key: "radius", display: "Radius", type: "number", default: 1 },
        { key: "delay", display: "Delay", type: "number", default: 0 }
    ],
    "Title": [
        { key: "message", display: "Message", type: "text", default: "" },
        { key: "type", display: "Type", type: "text", default: "TITLE" },
        { key: "fadeInTime", display: "Fade In Time", type: "number", default: 0 },
        { key: "displayTime", display: "Display Time", type: "number", default: 0 },
        { key: "fadeOutTime", display: "Fade Out Time", type: "number", default: 0 },
        { key: "isServerWide", display: "Server Wide", type: "boolean", default: false },
        { key: "range", display: "Range", type: "number", default: 16 },
        { key: "delay", display: "Delay", type: "number", default: 0 }
    ],
    "Area": [
        { key: "xSize", display: "X Size", type: "number", default: 1 },
        { key: "ySize", display: "Y Size", type: "number", default: 1 },
        { key: "zSize", display: "Z Size", type: "number", default: 1 },
        { key: "block", display: "Block", type: "text", default: "minecraft:dirt" },
        { key: "xOffSet", display: "X Offset", type: "number", default: 0 },
        { key: "yOffSet", display: "Y Offset", type: "number", default: 0 },
        { key: "zOffSet", display: "Z Offset", type: "number", default: 0 },
        { key: "falling", display: "Falling", type: "boolean", default: true },
        { key: "causesUpdate", display: "Causes Update", type: "boolean", default: false },
        { key: "relativeToPlayer", display: "Relative to Player", type: "boolean", default: false },
        { key: "delay", display: "Delay", type: "number", default: 0 }
    ]
}

const colors = ["#06f0fa", "#e0ab02", "#05568f", "#9708d8", "#318209", "#be3921"];

export function ChanceCubesReward(props) {

    const overlay = useContext(OverlayContext);

    const changeRewardID = (id) => {
        props.setRewardID(props.rewardId, id);
    }

    const changeChanceValue = (chance) => {
        const json = { ...props.json };
        if (chance)
            json["chance"] = Math.min(100, Math.max(-100, chance));
        else
            json["chance"] = chance;
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
        overlay.pushCurrentOverlay(<ConfirmationOverlay text={`Are you sure you want to delete everything in this reward event?`} options={
            [
                { text: "Yes", callback: () => { overlay.popCurrentOverlay(); deleteRewardTypeConfirm(type); } },
                { text: "No", callback: () => overlay.popCurrentOverlay() }
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

    return (
        <div className="m-2 container" style={{ border: `1px solid ${props.color}` }}>
            <div className="row m-2">
                <h4>Reward</h4>
            </div>
            <div className="row m-2">
                <label className="col timer-label">Reward ID:</label>
                <input className="col-9" style={{ maxWidth: "250px" }} type="text" value={props.rewardId} onChange={(e) => changeRewardID(e.target.value)} />
            </div>
            <div className="row m-2">
                <label className="col-3 timer-label">Chance Value:</label>
                <input className="col-9" style={{ maxWidth: "250px" }} type="number" min={-100} max={100} value={props.json.chance} onChange={(e) => changeChanceValue(e.target.value)} />
            </div>
            {
                Object.keys(settings).map((type, i) => {
                    if (props.json[type]) {
                        return (
                            <div className="row m-2" key={type}>
                                <RewardTypesList type={type} color={colors[i % colors.length]} settings={settings[type]} json={props.json[type]} insetRewardTypetoJson={() => insetRewardTypetoJson(type)} changeRewardTypeValue={(id, blockJson) => changeRewardTypeValue(type, id, blockJson)} deleteRewardTypeIndex={(index) => deleteRewardTypeIndex(type, index)} deleteRewardType={() => deleteRewardType(type)} />
                            </div>
                        );
                    }
                })
            }
            <button className="ml-2 mt-2" onClick={() => addRewardType()}>Add Reward Event</button>
        </div>
    )
}