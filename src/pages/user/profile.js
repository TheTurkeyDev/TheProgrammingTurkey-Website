import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth-context';
import { AuthPageWrapper } from '../base/auth-page-wrapper';

export function UserProfile(props) {
    const auth = useContext(AuthContext);

    const adminPerms = ["chancecubes.managecontentcreators", "projects.editstatus", "admin.usermanage", "admin.managepermissions", "admin.manageprocesses"];
    const adminShow = auth.permissions.some(perm => adminPerms.includes(perm));

    return (
        <AuthPageWrapper history={props.history} >
            <div>
                <h2 className="ml-2 mt-1">Hello {auth.userName}!</h2>
                <div className="fluid-container mx-auto text-center" style={{ maxWidth: "500px" }}>
                    <div className="row m-0">
                        <h5 className="col">Beta Access</h5>
                    </div>
                    <hr />
                    {
                        auth.permissions.includes("streamtimer.dashboard") &&
                        <div className="row m-0">
                            <Link className="col" to="/streamtimer">Stream Timer Dashboard</Link>
                        </div>
                    }
                    {
                        auth.permissions.includes("chancecubes.rewardbuilder") &&
                        <div className="row m-0">
                            <Link className="col" to="/chancecubes/rewardbuilder">Chance Cubes Reward Builder</Link>
                        </div>
                    }
                    {
                        auth.permissions.includes("user.accountconnections") &&
                        <div className="row m-0">
                            <Link className="col" to="/user/connectedaccounts">Connected Accounts</Link>
                        </div>
                    }
                    {
                        auth.permissions.includes("proc.ytsubget") &&
                        <div className="row m-0">
                            <Link className="col" to="/user/youtubesubget">YouTube Sub Count</Link>
                        </div>
                    }
                    {
                        auth.permissions.includes("twitchclipfilter") &&
                        <div className="row m-0">
                            <Link className="col" to="/twitchclipfilterer">Twitch Clip Filterer</Link>
                        </div>
                    }

                    {
                        adminShow &&
                        <>
                            <div className="row m-0 mt-5">
                                <h5 className="col">Admin Access</h5>
                            </div>
                            <hr />
                            {
                                auth.permissions.includes("chancecubes.managecontentcreators") &&
                                <div className="row m-0">
                                    <Link className="col" to="/chancecubes/managecontentcreators">Manage Chance Cubes Content Creators</Link>
                                </div>
                            }
                            {
                                auth.permissions.includes("projects.editstatus") &&
                                <div className="row m-0">
                                    <Link className="col" to="/projects/statusedit">Edit Project Status'</Link>
                                </div>
                            }
                            {
                                auth.permissions.includes("admin.usermanage") &&
                                <div className="row m-0">
                                    <Link className="col" to="/admin/usermanage">Manage Users</Link>
                                </div>
                            }
                            {
                                auth.permissions.includes("admin.managepermissions") &&
                                <div className="row m-0">
                                    <Link className="col" to="/admin/permissionmanage">Manage Permission</Link>
                                </div>
                            }
                            {
                                auth.permissions.includes("admin.manageprocesses") &&
                                <div className="row m-0">
                                    <Link className="col" to="/admin/processmanage">Manage Processes</Link>
                                </div>
                            }
                        </>
                    }
                </div>
            </div>
        </AuthPageWrapper >
    );
}