import React, { useContext, useEffect, useState } from "react";
import { OverlayContext } from "../contexts/overlay-context";
import { ToastContext } from "../contexts/toast-context";
import { getDevAPIBase } from "../network/network";
import { TextToast } from "../toasts/text-toast";
import { AddUserPermission } from "./add-user-permission";

export function UserManageOverlay(props) {

    const toast = useContext(ToastContext);
    const overlay = useContext(OverlayContext);

    const [update, setUpdate] = useState(false);

    const [userId, setUserId] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [permissions, setPermissions] = useState([]);

    useEffect(() => {
        fetch(`${getDevAPIBase()}/admin/getuser`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': sessionStorage.getItem("access_token")
                },
                body: JSON.stringify({
                    user_id: props.userId
                })
            })
            .then(resp => {
                return resp.json();
            })
            .then(json => {
                setUserId(json.user_id);
                setDisplayName(json.display_name);
                setPermissions(json.permissions);
            });
    }, [update]);

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

    const addNewPerm = () => {
        overlay.pushCurrentOverlay(<AddUserPermission userId={userId} assignedPerms={permissions} update={() => setUpdate(old => !old)} />);
    }

    return (
        <div className="row text-center">
            <div className="mt-3 container" >
                <div className="row">
                    <h2 className="col">Manage User: {displayName}</h2>
                </div>
                <div className="row mt-2">
                    <label className="col-2">User ID</label>
                    <input className="col" type="text" value={userId} readOnly />
                </div>
                <div className="row mt-2">
                    <label className="col-2">DisplayName</label>
                    <input className="col" type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} />
                </div>
                <hr />
                <div className="row mt-2">
                    <h4 className="col">Permissions</h4>
                </div>
                {
                    permissions.map(perm => {
                        return (
                            <div key={perm} className="row">
                                <span className="col-auto mx-auto">{perm}</span>
                            </div>
                        );
                    })
                }
                <div className="row">
                    <div className="col mr-2">
                        <button onClick={() => addNewPerm()}>Add Permission</button>
                    </div>
                </div>
            </div>
        </div>
    );
}