import { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import Promise from 'promise';

import { AuthContext } from '../../../../contexts/auth-context';
import { ToastContext } from '../../../../contexts/toast-context';
import { TextToast } from '../../../../toasts/text-toast';
import { getAppsSiteBase } from '../../../../network/network-helper';
import * as StreamAnimAPI from '../../../../network/stream-animations-network';
import { LoadingWrapper } from '../../../base/page-loading';
import { Button } from '../../../../styles/common-styles';
import { ConnectWithMJRBot } from '../connect-with-mjrbot';
import { StreamAnimationItem } from './stream-animation-item';
import { OverlayContext } from '../../../../contexts/overlay-context';
import { AddNewStreamAnimationOverlay } from '../../../../overlays/auth/add-new-stream-animation-overlay';

const PageWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
    margin: 16px;
`;

const URLWrapper = styled.div`
    display: grid;
    gap: 8px;
    grid-template-columns: auto 1fr;
    align-content: center;
`
const URLLabel = styled.label`
    font-size: 22px;
    max-width: 100px;
    margin: 0;
`;

const URLInput = styled.input`
    border-radius: 8px;
    background-color: #d1d1d1;
    color: #232323;
`;

const StreamAnimationsList = styled.div`
    display: grid;
    grid-template-columns: auto auto auto 1fr;
    gap: 16px;
`;

export const AnimatedStreamOverlaySetup = () => {
    const auth = useContext(AuthContext);
    const toast = useContext(ToastContext);
    const overlay = useContext(OverlayContext);

    const [refreshMJRData, setRefreshMJRData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [connectedToMJRBot, setConnectedToMJRBot] = useState('');
    const [token, setToken] = useState('');
    const [animations, setAnimations] = useState([]);
    const [channelRewards, setchannelRewards] = useState([]);
    const [animationUserData, setAnimationUserData] = useState({});

    useEffect(() => {
        async function loadData() {
            setLoading(true);

            const promise1 = StreamAnimAPI.getAllAnimations().then(json => {
                if (json.success)
                    setAnimations(json.data);
            });

            const promise2 = StreamAnimAPI.getUserData().then(json => {
                if (json.success) {
                    const data = json.data;
                    setToken(data.token);
                    setchannelRewards(data.channel_points);
                    setConnectedToMJRBot(data.connected);
                    setAnimationUserData(data.animation_user_data);
                }
            });

            Promise.all([promise1, promise2]).then(() => {
                setLoading(false);
            })
        }
        if (auth.authState)
            loadData();
    }, [auth.authChecked, refreshMJRData]);

    const updateUserAnimationData = (animId, rewardData) => {
        setAnimationUserData(old => {
            const copy = { ...old }
            copy[animId] = rewardData;
            return copy;
        })
    }

    const removeAnimation = (animationId) => {
        StreamAnimAPI.removeUserAnimation(animationId).then(resp => {
            if (resp)
                setAnimationUserData(old => {
                    const copy = { ...old }
                    delete copy[animationId];
                    return copy;
                })
            else
                toast.pushToast(<TextToast text='An error has occured!' />);
        });
    }

    const saveSettings = () => {
        StreamAnimAPI.saveUserData(animationUserData).then(resp => {
            if (resp)
                toast.pushToast(<TextToast text='Saved!' />);
            else
                toast.pushToast(<TextToast text='An error has occured!' />);
        });
    }

    const addAnimation = (animId) => {
        setAnimationUserData(old => [
            ...old,
            {
                animation_id: animId,
                duration: 10
            }
        ])
    }

    const regenToken = () => {
        StreamAnimAPI.regenToken('stream_animations').then(token => {
            setToken(token);
        });
    }


    const appUrl = `${getAppsSiteBase()}/streamanimations?token=${token}`;

    return (
        <LoadingWrapper loading={loading}>
            <PageWrapper>
                <span>This tool was developed in Partnership with <a href='https://mjrbot.mjrlegends.com/'>MJRBot</a> and thus requires you to connect your Twitch account with the service as well.</span>
                {!connectedToMJRBot && <ConnectWithMJRBot refresh={() => setRefreshMJRData(old => !old)} />}
                {
                    connectedToMJRBot &&
                    <>
                        <URLWrapper>
                            <URLLabel>
                                URL:
                            </URLLabel>
                            <URLInput type='text' readOnly value={appUrl} onClick={() => { navigator.clipboard.writeText(appUrl); toast.pushToast(<TextToast text='Copied to Clipboard!' />) }} />
                            <URLLabel />
                            <Button onClick={regenToken}>Regen Token</Button>
                        </URLWrapper>
                        <hr />

                        <Button onClick={() => {
                            overlay.pushCurrentOverlay(<AddNewStreamAnimationOverlay animations={animations.filter(anim => !animationUserData[anim.id])} addAnimation={addAnimation} />)
                        }}>
                            Add Animation
                        </Button>

                        <StreamAnimationsList>
                            <h5>Actions</h5>
                            <h5>Animation Name</h5>
                            <h5>Channel Point Trigger</h5>
                            <div />
                            {
                                Object.keys(animationUserData).map(animId => {
                                    const anim = animations.find(a => animId === a.id);
                                    return (<StreamAnimationItem key={animId} animation={anim} channelPointRewards={channelRewards} rewardData={animationUserData[animId]} save={updateUserAnimationData} remove={() => removeAnimation(anim.id)} />);
                                })
                            }
                        </StreamAnimationsList>

                        <Button onClick={saveSettings}>
                            Save
                        </Button>
                    </>
                }
            </PageWrapper>
        </LoadingWrapper >
    );
}