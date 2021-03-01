import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth-context';
import { AuthPageWrapper } from '../../pages/base/auth-page-wrapper';
import { ProfileProjectLink } from './profile-project-link';

export function UserProfile(props) {
    const auth = useContext(AuthContext);

    const adminPerms = [
        'chancecubes.managecontentcreators',
        'projects.editstatus',
        'admin.usermanage',
        'admin.managepermissions',
        'admin.manageprocesses',
    ];
    const adminShow = auth.permissions.some((perm) =>
        adminPerms.includes(perm)
    );
    const betaApps = [
        {
            perm: 'streamtimer.dashboard',
            link: '/streamtimer',
            title: 'Stream Timer Dashboard',
            icon: ''
        },
        {
            perm: 'chancecubes.rewardbuilder',
            link: '/chancecubes/rewardbuilder',
            title: 'Chance Cubes Reward Builder',
            icon: ''
        },
        {
            perm: 'user.accountconnections',
            link: '/user/connectedaccounts',
            title: 'Connected Accounts',
            icon: ''
        },
        {
            perm: 'proc.ytsubget',
            link: '/user/youtubesubget',
            title: 'YouTube Sub Count',
            icon: ''
        },
        {
            perm: 'twitchgame.*',
            link: '/twitchgames',
            title: 'Twitch Games',
            icon: ''
        },
        {
            perm: 'twitchclipfilter',
            link: '/twitchclipfilterer/clips',
            title: 'Twitch Clip Filterer',
            icon: ''
        }
    ]

    const adminApps = [
        {
            perm: 'chancecubes.managecontentcreators',
            link: '/chancecubes/managecontentcreators',
            title: 'Manage Chance Cubes Content Creators',
            icon: ''
        },
        {
            perm: 'projects.editstatus',
            link: '/projects/statusedit',
            title: 'Edit Project Status\'',
            icon: ''
        },
        {
            perm: 'admin.usermanage',
            link: '/admin/usermanage',
            title: 'Manage Users',
            icon: ''
        },
        {
            perm: 'admin.managepermissions',
            link: '/admin/permissionmanage',
            title: 'Manage Permission',
            icon: ''
        },
        {
            perm: 'admin.manageprocesses',
            link: '/admin/processmanage',
            title: 'Manage Processes',
            icon: ''
        }
    ]

    return (
        <AuthPageWrapper history={props.history}>
            <div>
                <h2 className='ml-2 mt-1'>Hello {auth.userName}!</h2>
                <div
                    className='fluid-container mx-auto text-center'
                    style={{ maxWidth: '100%' }}
                >
                    <div className='row m-0'>
                        <h5 className='col'>Beta Access</h5>
                    </div>
                    <hr />
                    <div className='row m-0'>
                        <div className='col ml-auto' style={{ width: '0px' }} />
                        {
                            betaApps.map(app => {
                                if (app.perm === '' || auth.permissions.includes(app.perm)) {
                                    return <ProfileProjectLink key={app.title} link={app.link} title={app.title} />
                                }
                            })
                        }
                        <div className='col mr-auto' style={{ width: '0px' }} />
                    </div>

                    {adminShow && (
                        <>
                            <div className='row m-0 mt-5'>
                                <h5 className='col'>Admin Access</h5>
                            </div>
                            <hr />
                            <div className='row m-0'>
                                <div className='col ml-auto' style={{ width: '0px' }} />
                                {
                                    adminApps.map(app => {
                                        if (app.perm === '' || auth.permissions.includes(app.perm)) {
                                            return (
                                                <div className='col mx-1' style={{ width: '200px' }} >
                                                    <Link to={app.link}>
                                                        {app.title}
                                                    </Link>
                                                </div>
                                            );
                                        }
                                    })
                                }
                                <div className='col mr-auto' style={{ width: '0px' }} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </AuthPageWrapper >
    );
}
