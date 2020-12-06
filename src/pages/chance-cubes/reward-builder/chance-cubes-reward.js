import React, { useContext } from 'react';
import { OverlayContext } from '../../../contexts/overlay-context';
import { ChanceCubesAddRewardTypeOverlay } from '../../../overlays/chance-cubes-add-reward-type';
import { RewardTypesList } from './reward-types-list';

const blockSettings = [
    { key: "xOffSet", display: "X Offset", type: "number" },
    { key: "yOffSet", display: "Y Offset", type: "number" },
    { key: "zOffSet", display: "Z Offset", type: "number" },
    { key: "block", display: "Block", type: "text" },
    { key: "falling", display: "Falling", type: "boolean" },
    { key: "relativeToPlayer", display: "Relative to Player", type: "boolean" },
    { key: "removeUnbreakableBlocks", display: "Remove Unbreakable Blocks", type: "boolean" },
    { key: "playSound", display: "Play Sound", type: "boolean" }
]

const messageSettings = [
    { key: "message", display: "Message", type: "text" },
    { key: "delay", display: "Delay", type: "number" },
    { key: "serverWide", display: "Server Wide", type: "boolean" },
    { key: "range", display: "Range", type: "number" }
]

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
        if (type === "Block") {
            const index = typeJson.length;
            typeJson.push({});
            typeJson[index]["xOffSet"] = 0;
            typeJson[index]["yOffSet"] = 0;
            typeJson[index]["zOffSet"] = 0;
            typeJson[index]["block"] = "minecraft:dirt";
            typeJson[index]["falling"] = false;
            typeJson[index]["relativeToPlayer"] = false;
            typeJson[index]["removeUnbreakableBlocks"] = false;
            typeJson[index]["playSound"] = true;
        }
        else if (type === "Message") {
            const index = typeJson.length;
            typeJson.push({});
            typeJson[index]["message"] = "";
            typeJson[index]["delay"] = 0;
            typeJson[index]["serverWide"] = false;
            typeJson[index]["range"] = 32;
        }
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
                props.json["Block"] &&
                <div className="row m-2">
                    <RewardTypesList type="Block" settings={blockSettings} json={props.json["Block"]} insetRewardTypetoJson={insetRewardTypetoJson} changeRewardTypeValue={changeRewardTypeValue} />
                </div>
            }
            {
                props.json["Message"] &&
                <div className="row m-2">
                    <RewardTypesList type="Message" settings={messageSettings} json={props.json["Message"]} insetRewardTypetoJson={insetRewardTypetoJson} changeRewardTypeValue={changeRewardTypeValue} />
                </div>
            }
            <button className="ml-2 mt-2" onClick={() => addRewardType()}>Add Reward Event</button>
        </div>
    )
}