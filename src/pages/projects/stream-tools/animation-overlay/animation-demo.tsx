import { useState } from 'react';
import styled from 'styled-components';
import { getTwitchOverlaySiteBase } from '../../../../network/network-helper';


const ContainedListItemWrapper = styled.div`
    width: 480px;

    &:hover {
        cursor: pointer;
    }
`;

const NameHeader = styled.div`
    background: ${({ theme }) => theme.background.on};
    width: 100%;
    border-radius: 5px 5px 0px 0px;
`;

const Header = styled.h4`
    margin: 0;
    color: ${({ theme }) => theme.background.color};
`;

const IFrameWrap = styled.div`
    width: 480px;
    height: 270px;
    padding: 0;
    overflow: hidden;
    border: 3px solid ${({ theme }) => theme.background.on};
    background: url('/images/stream_demo_bg.png');
    background-size: cover;
`;

const IFrameCustom = styled.iframe`
    width: 1920px;
    height: 1080px;
    border: 0;
    transform: scale(0.25);
    transform-origin: 0 0;
`;

type AnimationDemoProps = {
    readonly name: string
    readonly id: string
}
export const AnimationDemo = ({ name, id }: AnimationDemoProps) => {
    const [expanded, setExpanded] = useState(false);
    return (
        <ContainedListItemWrapper onClick={() => setExpanded(old => !old)}>
            <NameHeader>
                <Header>{name}</Header>
            </NameHeader>
            {
                expanded &&
                <IFrameWrap>
                    <IFrameCustom src={`${getTwitchOverlaySiteBase()}/streamanimations/test?forceShow=${id}`} height='1080' width='1920' title={`${name} Demo`} />
                </IFrameWrap>
            }
        </ContainedListItemWrapper>
    );
};
