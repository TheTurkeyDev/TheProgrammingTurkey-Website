import { useState } from 'react';
import styled from 'styled-components';
import { getDevAPIBase, getTwitchOverlaySiteBase } from '../../../../network/network-helper';
import { StreamAnimationItem } from './stream-animation-item';
import { AddNewStreamAnimationModal } from '../../../../modals/add-new-stream-animation-modal';
import { SecretURL } from '../../../../components/secret-url';
import { ContainedButton, Headline5, Loading, useFetch } from 'gobble-lib-react';
import { StreamAnimation } from '../../../../types/stream-animations/stream-animation';
import { Mapped } from '../../../../types/mapped';
import { getGetAuthParams } from '../../../../network/auth-network';
import { useRestObject } from '../../../../hooks/use-rest-object';
import { useRestObjectArray } from '../../../../hooks/use-rest-object-array';
import { TwitchChannelPointReward } from '../../../../types/stream-animations/twitch-channel-point-reward';
import { UserAnimationSetting } from './mapped-stream-animation-user-data';

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

export const AnimatedStreamOverlaySetup = () => {
    const [showModal, setShowModal] = useState(false);
    const [animations, loadingAnimations] = useFetch<readonly StreamAnimation[]>(`${getDevAPIBase()}/stream-animations`, { requestData: getGetAuthParams() });
    const [channelPoints, loadingChannelPoints] = useFetch<readonly TwitchChannelPointReward[]>(`${getDevAPIBase()}/stream-animations/channel-point-rewards`, { requestData: getGetAuthParams() });
    const [userAnimations, addUserAnimation, saveUserAnimation, deleteUserAnimation, loadingUserData] = useRestObjectArray<UserAnimationSetting>(`${getDevAPIBase()}/stream-animations/user-data`, false);
    const [token, regenToken, loadingToken] = useRestObject<{ readonly token: string }>(`${getDevAPIBase()}/stream-animations/token`, undefined, false);

    const updateUserAnimationData = (animId: string, rewardData: Mapped) => saveUserAnimation({ id: animId, settings: rewardData });

    const addAnimation = (animId: string) => {
        //TODO: default settings
        addUserAnimation({ id: animId, settings: {} });
    };

    const appUrl = `${getTwitchOverlaySiteBase()}/streamanimations/${token?.token}`;

    if (loadingUserData || loadingAnimations || loadingToken || loadingChannelPoints)
        return <Loading />;

    return (
        <PageWrapper>
            <Headline5>OBS Browser Instructions:</Headline5>
            <ul>
                <li>Open OBS and add a new source</li>
                <li>In the new sources dropdown, select "Browser"</li>
                <li>Next find the Browser source you just added under your current sources and Right Click -&gt; Properties</li>
                <li>Now copy your generated URL from below and paste it into the URL field on the properties popup</li>
                <li>Do not share this URL! If you accidentally do, click the regen button and update all your links</li>
                <li>Lastly set the width and height fields of the browser source to your streams width and height</li>
                <li>DO NOT resize the source with the red bounding box! This only scales the source and does not change the width and height! It will make things look weird!</li>
            </ul>
            <URLWrapper>
                <SecretURL url={appUrl} regen={() => regenToken()} />
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
                    userAnimations.map(ua => {
                        const anim = animations?.find(a => ua.id === a.id);
                        if (!anim)
                            return <></>;
                        return (<StreamAnimationItem key={ua.id} animation={anim} channelPointRewards={channelPoints ?? []} animSettings={userAnimations.find(ua => ua.id === anim.id)?.settings ?? {}} save={updateUserAnimationData} remove={() => deleteUserAnimation(anim.id)} />);
                    })
                }
            </StreamAnimationsList>
            {showModal && <AddNewStreamAnimationModal show={showModal} requestClose={() => setShowModal(false)} animations={animations?.filter(anim => !userAnimations.find(ua => ua.id === anim.id)) ?? []} addAnimation={addAnimation} />}
        </PageWrapper>
    );
};