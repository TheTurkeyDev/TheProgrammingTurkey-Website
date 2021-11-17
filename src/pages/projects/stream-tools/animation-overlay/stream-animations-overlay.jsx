import styled from 'styled-components';
import { ContainedList, ContainedListItem } from '../../../../components/contained-list';
import { ProjectWrapper } from '../../../../components/project-wrapper';
import { getStreamAnimationsOverlaySiteBase } from '../../../../network/network-helper';

const IFrameWrap = styled.div`
    width: 480px;
    height: 270px;
    padding: 0;
    overflow: hidden;
    border: 3px solid black;
`;

const IFrameCustom = styled.iframe`
    width: 1920px;
    height: 1080px;
    border: 0;
    transform: scale(0.25);
    transform-origin: 0 0;
`;

export const StreamAnimationsOverlay = () => {
    return (
        <ProjectWrapper
            title='Animated Stream Overlay'
            subTittle=''
            links={[]}
            videos={[]}
        >
            <span>
                Animated Stream Overlay allows streamers to add little animations to their stream video that trigger when redeemed via channel points!
                This tool is currently in beta! If this is something you are interested in using/ trying out, please reach out to @turkeydev!
            </span>
            <ContainedList title='Current Animations'>
                <ContainedListItem>Halloween</ContainedListItem>
                <IFrameWrap>
                    <IFrameCustom src={`${getStreamAnimationsOverlaySiteBase()}?forceShow=halloween_1`} height='1080' width='1920' title='Halloween Demo' />
                </IFrameWrap>
                <ContainedListItem>Snowflakes</ContainedListItem>
                <IFrameWrap>
                    <IFrameCustom src={`${getStreamAnimationsOverlaySiteBase()}?forceShow=snowflake_1`} height='1080' width='1920' title='Snow Flake Demo' />
                </IFrameWrap>
                <ContainedListItem>Christams Lights</ContainedListItem>
                <IFrameWrap>
                    <IFrameCustom src={`${getStreamAnimationsOverlaySiteBase()}?forceShow=christmas_lights_1`} height='1080' width='1920' title='Christams Lights Demo' />
                </IFrameWrap>
            </ContainedList>
        </ProjectWrapper>
    );
}
