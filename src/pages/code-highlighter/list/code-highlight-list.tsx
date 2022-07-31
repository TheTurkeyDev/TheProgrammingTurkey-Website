import { ButtonRow, ContainedButton, Headline2, Headline6 } from 'gobble-lib-react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useFetch } from '../../../hooks/use-fetch';
import { CodeHighlightRender } from './code-highlight-render-data';
import { CodeHighlightVideo } from './code-highlight-video';

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

export const CodeHighlightList = () => {
    const navigate = useNavigate();
    const { data } = useFetch<readonly CodeHighlightRender[]>('/render/list');

    return (
        <Content>
            <Headline2>Code Highlighter</Headline2>
            <ButtonRow>
                <ContainedButton onClick={() => navigate('/codehighlighter/build')}>New</ContainedButton>
            </ButtonRow>
            <ListWrapper>
                <Headline6>Display</Headline6>
                <Headline6>Creator</Headline6>
                <Headline6>Type</Headline6>
                <Headline6>Created At</Headline6>
                <Headline6>Download</Headline6>
                {
                    data?.map(v => <CodeHighlightVideo key={v.id} video={v} />)
                }
            </ListWrapper>
        </Content>
    );
};