import React, { useContext, useState } from "react";
import { OverlayContext } from "../contexts/overlay-context";
import { ToastContext } from "../contexts/toast-context";
import { getDevAPIBase } from "../network/network";
import { TextToast } from "../toasts/text-toast";

export function NewPermissionOverlay(props) {

    const toast = useContext(ToastContext);
    const overlay = useContext(OverlayContext);

    const [permissionID, setPermissionID] = useState("");
    const [description, setDescription] = useState("");

    const createPerm = () => {
        if (!permissionID) {
            toast.pushToast(<TextToast text={"Permission ID not set!"} />);
            return;
        }

        if (!description) {
            toast.pushToast(<TextToast text={"Description not set!"} />);
            return;
        }

        fetch(`${getDevAPIBase()}/admin/createpermissions`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': sessionStorage.getItem("access_token")
                },
                body: JSON.stringify({
                    permission_id: permissionID,
                    description: description
                })
            })
            .then(resp => {
                return resp.json();
            })
            .then(json => {
                if (json.message)
                    toast.pushToast(<TextToast text={json.message} />);
                overlay.popCurrentOverlay();
                props.update();
            });
    }

    return (
        <div className="row text-center">
            <div className="mt-3 container" >
                <div className="row">
                    <h2 className="col">Add New Permission</h2>
                </div>
                <div className="row mt-2">
                    <label className="col-2">Permission ID</label>
                    <input className="col" type="text" value={permissionID} onChange={e => setPermissionID(e.target.value)} />
                </div>
                <div className="row mt-2">
                    <label className="col-2">Description</label>
                    <input className="col" type="text" value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <div className="row mt-2">
                    <button className="col-auto mx-auto" onClick={() => createPerm()}>Create</button>
                </div>
            </div>
        </div>
    );
}