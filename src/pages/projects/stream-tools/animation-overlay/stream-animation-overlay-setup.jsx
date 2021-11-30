import { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import Promise from 'promise';

import { AuthContext } from '../../../../contexts/auth-context';
import { ToastContext } from '../../../../contexts/toast-context';
import { TextToast } from '../../../../toasts/text-toast';
import { getAppsSiteBase, getSiteURLBase } from '../../../../network/network-helper';
import * as StreamAnimAPI from '../../../../network/stream-animations-network';
import { LoadingWrapper } from '../../../base/page-loading';
import { Button } from '../../../../styles/common-styles';
import { ConnectWithMJRBot } from '../connect-with-mjrbot';
import { StreamAnimationItem } from './stream-animation-item';
import { OverlayContext } from '../../../../contexts/overlay-context';
import { AddNewStreamAnimationOverlay } from '../../../../overlays/auth/add-new-stream-animation-overlay';
import { SecretURL } from '../../../../components/secret-url';

const PageWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
    margin: 16px;
`;

const StreamAnimationsList = styled.div`
    display: grid;
    grid-template-columns: auto auto auto 1fr;
    gap: 16px;
`;

const Inline = styled.div`
    display: inline;
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
                    setConnectedToMJRBot(data.connected);
                    if (!data.connected)
                        return;
                    setToken(data.token);
                    setchannelRewards(data.channel_points);
                    setAnimationUserData(data.animation_user_data ?? {});
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
        const updated = { ...animationUserData }
        updated[animId] = rewardData;
        StreamAnimAPI.saveUserData(updated).then(resp => {
            if (resp)
                setAnimationUserData(updated);
            else
                toast.pushToast(<TextToast text='An error has occured!' />);
        });
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

    const addAnimation = (animId) => {
        const updated = { ...animationUserData }
        updated[animId] = {
            channel_point: {
                animation_id: animId,
                display: 'Channel Point',
                setting_id: 'channel_point',
                type: 'string',
                value: ''
            }
        };
        StreamAnimAPI.saveUserData(updated).then(resp => {
            if (resp)
                setAnimationUserData(updated);
            else
                toast.pushToast(<TextToast text='An error has occured!' />);
        });
    }

    const regenToken = () => {
        StreamAnimAPI.regenToken('stream_animations').then(token => setToken(token));
    }


    const appUrl = `${getAppsSiteBase()}/streamanimations?token=${token}`;

    return (
        <LoadingWrapper loading={loading}>
            <PageWrapper>
                <Inline>
                    <span>This tool was developed in Partnership with <a href='https://mjrbot.mjrlegends.com/'>MJRBot</a> and thus requires you to connect your Twitch account with the service as well. </span>
                    <a href='' onClick={() => window.open(`${getSiteURLBase()}/mjrbotfaq`)}>MJR Bot FAQ</a>
                </Inline>
                <h4>OBS Browser Instructions:</h4>
                <ul>
                    <li>Open OBS and add a new source</li>
                    <li>In the new sources dropdown, select "Broswer"</li>
                    <li>Next find the Browser source you just added under your current sources and Right Click -&gt; Properties</li>
                    <li>Now copy your generated URL from below and paste it into the URL field on the properties popup</li>
                    <li>Do not share this URL! If you accidentally do, click the regen button and update all your links</li>
                    <li>Lastly set the width and height feilds of the browser source to your streams width and height</li>
                    <li>DO NOT resize the source with the red bounding box! This only scales the source and does not change the width and height! It will make things look weird!</li>
                </ul>
                {!connectedToMJRBot && <ConnectWithMJRBot refresh={() => setRefreshMJRData(old => !old)} />}
                {
                    connectedToMJRBot &&
                    <>
                        <SecretURL url={appUrl} regen={regenToken} />
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
                    </>
                }
            </PageWrapper>
        </LoadingWrapper >
    );
}