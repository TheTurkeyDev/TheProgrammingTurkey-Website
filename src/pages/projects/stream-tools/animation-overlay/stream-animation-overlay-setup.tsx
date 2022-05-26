import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../../../contexts/auth-context';
import { getAppsSiteBase, getSiteURLBase } from '../../../../network/network-helper';
import * as StreamAnimAPI from '../../../../network/stream-animations-network';
import { ConnectWithMJRBot } from '../connect-with-mjrbot';
import { StreamAnimationItem } from './stream-animation-item';
import { AddNewStreamAnimationModal } from '../../../../modals/add-new-stream-animation-modal';
import { SecretURL } from '../../../../components/secret-url';
import { Anchor, Body1, ContainedButton, Headline5, Loading, TextToast, useToast } from 'gobble-lib-react';
import { StreamAnimation } from '../../../../types/stream-animations/stream-animation';
import { TwitchChannelPointReward } from '../../../../types/stream-animations/twitch-channel-point-reward';
import { StreamAnimationUserData } from './mapped-stream-animation-user-data';
import { Mapped } from '../../../../types/mapped';

const PageWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
    margin: 16px;
`;

const URLWrapper = styled.div`
    max-width: 600px;
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
    const { authState, authChecked } = useAuth();
    const { pushToast } = useToast();

    const [showModal, setShowModal] = useState(false);
    const [refreshMJRData, setRefreshMJRData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [connectedToMJRBot, setConnectedToMJRBot] = useState(false);
    const [token, setToken] = useState('');
    const [animations, setAnimations] = useState<readonly StreamAnimation[]>([]);
    const [channelRewards, setchannelRewards] = useState<readonly TwitchChannelPointReward[]>([]);
    const [animationUserData, setAnimationUserData] = useState<StreamAnimationUserData>({});

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
            });
        }
        if (authState)
            loadData();
    }, [authChecked, refreshMJRData]);

    const updateUserAnimationData = (animId: string, rewardData: Mapped) => {
        // This is gross
        const updated = Object.fromEntries(Object.entries(animationUserData).map(
            ([k, v]) => [k, k === animId
                ?
                Object.fromEntries(Object.entries(v).map(([k2, v2]) => [k2, {
                    ...v2,
                    value: rewardData[k2]
                }]))
                :
                v
            ])) as StreamAnimationUserData;

        StreamAnimAPI.saveUserData(updated).then(resp => {
            if (resp)
                setAnimationUserData(updated);
            else
                pushToast(<TextToast text='An error has occured!' />);
        });
    };

    const removeAnimation = (animationId: string) => {
        StreamAnimAPI.removeUserAnimation(animationId).then(resp => {
            if (resp)
                setAnimationUserData((old: StreamAnimationUserData) => {
                    const copy = { ...old };
                    delete copy[animationId];
                    return copy;
                });
            else
                pushToast(<TextToast text='An error has occured!' />);
        });
    };

    const addAnimation = (animId: string) => {
        const updated = { ...animationUserData };
        updated[animId] = {
            channel_point: {
                user_id: '',
                default_val: '',
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
                pushToast(<TextToast text='An error has occured!' />);
        });
    };

    const regenToken = () => {
        StreamAnimAPI.regenToken('stream_animations').then(token => setToken(token));
    };


    const appUrl = `${getAppsSiteBase()}/streamanimations?token=${token}`;

    if (loading)
        return <Loading />;

    return (
        <PageWrapper>
            <Inline>
                <Body1>This tool was developed in Partnership with <Anchor href='https://mjrbot.mjrlegends.com/' openInNewTab={true}>MJRBot</Anchor> and thus requires you to connect your Twitch account with the service as well. </Body1>
                <Anchor href={`${getSiteURLBase()}/mjrbotfaq`} openInNewTab={true}>MJR Bot FAQ</Anchor>
            </Inline>
            <Headline5>OBS Browser Instructions:</Headline5>
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
                    <URLWrapper>
                        <SecretURL url={appUrl} regen={regenToken} />
                    </URLWrapper>
                    <hr />
                    <ContainedButton onClick={() => setShowModal(true)}>
                        Add Animation
                    </ContainedButton>

                    <StreamAnimationsList>
                        <div />
                        <Headline5>Animation</Headline5>
                        <Headline5>Display Name</Headline5>
                        <Headline5>Event Trigger</Headline5>
                        {
                            Object.keys(animationUserData).map(animId => {
                                const anim = animations.find(a => animId === a.id);
                                if (!anim)
                                    return <></>;
                                return (<StreamAnimationItem key={animId} animation={anim} channelPointRewards={channelRewards} animSettings={animationUserData[animId]} save={updateUserAnimationData} remove={() => removeAnimation(anim.id)} />);
                            })
                        }
                    </StreamAnimationsList>
                </>
            }
            {showModal && <AddNewStreamAnimationModal show={showModal} requestClose={() => setShowModal(false)} animations={animations.filter(anim => !animationUserData[anim.id])} addAnimation={addAnimation} />}
        </PageWrapper>
    );
};