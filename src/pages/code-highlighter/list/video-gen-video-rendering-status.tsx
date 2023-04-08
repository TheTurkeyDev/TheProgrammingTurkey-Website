import { Body1, useInterval, useQuery } from 'gobble-lib-react';
import { useState } from 'react';
import styled from 'styled-components';
import { CircleLoadingBar } from '../../../components/circle-loading-bar';
import { getParams, postParams } from '../../../network/auth-network';
import { getDevAPIBase } from '../../../network/network-helper';
import { VideoGenRender } from './video-gen-render-data';

const Wrapper = styled.div`
    height: 100%;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 4px;
    align-items: center;
`;
type VideoGenVideoRenderingStatusProps = {
    readonly id: string
    readonly updateStatus: (state: VideoGenRender) => void
}
export const VideoGenVideoRenderingStatus = ({ id, updateStatus }: VideoGenVideoRenderingStatusProps) => {
    const [percentage, setPercentage] = useState<number>(0);

    const [query] = useQuery<VideoGenRender>(`${getDevAPIBase()}/render/status/${id}`, {
        requestData: getParams
    });
    const [update] = useQuery<VideoGenRender>(`${getDevAPIBase()}/render/status/${id}`, {
        requestData: postParams
    });

    useInterval(() => {
        query().then(resp => {
            if (!resp)
                return;
            setPercentage(Math.floor((resp.extendedStatus?.progress ?? 0) * 100));
            const updated: VideoGenRender = {
                ...resp,
                status: resp.extendedStatus?.status ?? resp.status
            };
            update(JSON.stringify(updated));
            updateStatus(updated);
        });
    }, 5000);

    return (
        <Wrapper>
            <Body1>Rendering...</Body1>
            <CircleLoadingBar percentage={percentage} color='green' />
        </Wrapper>
    );
};