import React, { useContext } from 'react';
import { OverlayContext } from '../contexts/overlay-context';

const events = [
    { display: "Block Event", code: "Block" },
    { display: "Message Event", code: "Message" },
    { display: "Entity Event", code: "Entity" },
    { display: "Experience Event", code: "Experience" },
    { display: "Item Event", code: "Item" },
    { display: "Command Event", code: "Command" },
    { display: "Potion Event", code: "Potion" },
    { display: "Sound Event", code: "Sound" },
    { display: "Schematic Event", code: "Schematic" },
    { display: "Chest Event", code: "Chest" },
    { display: "Particle Event", code: "Particle" },
    { display: "Status Event", code: "Status" },
    { display: "UI Event", code: "Title" },
    { display: "Block Area Event", code: "Area" }
];

export function ChanceCubesAddRewardTypeOverlay(props) {
    const overlay = useContext(OverlayContext);

    const onEventPick = (event) => {
        props.add(event);
        overlay.popCurrentOverlay();
    }

    return (
        <div className="container">
            <div className="row">
                <h2 className="col-auto mx-auto" style={{ textDecoration: "underline" }}>Add Event</h2>
            </div>
            {
                events.filter(event => !props.json[event.code]).map(event => {
                    return (
                        <div key={event.code} className="row">
                            <button className="col-auto mx-auto mt-1 mb-2" onClick={() => onEventPick(event)}>{event.display}</button>
                        </div>
                    );
                })
            }
        </div >
    );
}