import { ButtonRow, ContainedButton, Headline2, Headline6, useFetch } from 'gobble-lib-react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getParams } from '../../../network/auth-network';
import { getDevAPIBase } from '../../../network/network-helper';
import { VideoGenRender } from './video-gen-render-data';
import { VideoGenVideo } from './video-gen-video';

const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
    margin: 8px;
    max-width: 800px;
    margin-inline: auto;
`;

const ListWrapper = styled.div`
    display: grid;
    gap: 8px;
    grid-template-columns: auto auto auto auto auto;
`;

export const VideoGenList = () => {
    const navigate = useNavigate();
    const [data] = useFetch<readonly VideoGenRender[]>(`${getDevAPIBase()}/render/list`, {
        requestData: getParams
    });

    return (
        <Content>
            <Headline2>Video Generator</Headline2>
            <ButtonRow>
                <ContainedButton onClick={() => navigate('/videogen/build')}>New</ContainedButton>
            </ButtonRow>
            <ListWrapper>
                <Headline6>Display</Headline6>
                <Headline6>Creator</Headline6>
                <Headline6>Type</Headline6>
                <Headline6>Created At</Headline6>
                <Headline6>Download</Headline6>
                {
                    [...(data ?? [])].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()).map(v => <VideoGenVideo key={v.id} video={v} />)
                }
            </ListWrapper>
        </Content>
    );
};