import { ContainedButton, Headline3, Loading, Option, Select, Table, TH } from 'gobble-lib-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Suggestion } from '../suggestion';
import { SuggestionBox } from '../suggestion-box';
import * as SuggestionsAPI from '../suggestions-network';
import { SuggestionItem } from './view-suggestion-item';

const Wrapper = styled.div`
    display: grid;
`;

const Settings = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    padding-left: 16px;
`;

const ButtonWrapper = styled.div`
    justify-self: center;
    padding: 16px 0;
`;

export const ViewSuggestionBox = () => {
    const { id } = useParams();

    const [box, setBox] = useState<SuggestionBox>();
    const [viewAmount, setViewAmount] = useState(25);
    const [suggestions, setSuggestions] = useState<readonly Suggestion[]>([]);
    const [startSuggestionId, setStartSuggestionId] = useState(-1);

    useEffect(() => {
        if (!id)
            return;
        SuggestionsAPI.getSuggestionBox(id).then(box => {
            setBox(box);
        });
    }, [id]);

    useEffect(() => {
        setSuggestions([]);
    }, [viewAmount]);

    useEffect(() => {
        if (!id)
            return;

        SuggestionsAPI.getSuggestions(id, startSuggestionId, viewAmount).then(suggestions => {
            setSuggestions(old => [...old, ...suggestions]);
        });
    }, [startSuggestionId, id, viewAmount]);

    if (!box)
        return <Loading />;

    return (
        <Wrapper>
            <Headline3>{box.name}</Headline3>
            <Settings>
                <Select label='Items Per Page' onChange={e => setViewAmount(parseInt(e.target.value))}>
                    <Option value='10'>10</Option>
                    <Option value='25'>25</Option>
                    <Option value='50'>50</Option>
                    <Option value='100'>100</Option>
                    <Option value='250'>250</Option>
                </Select>
            </Settings>
            <Table tableColumns='80px auto auto 1fr'>
                <thead>
                    <tr>
                        <TH></TH>
                        <TH></TH>
                        <TH>Suggester</TH>
                        <TH>Suggestion</TH>
                    </tr>
                </thead>
                <tbody>
                    {
                        suggestions.map(s => <SuggestionItem key={s.id} suggestion={s} />)
                    }
                </tbody>
            </Table>
            <ButtonWrapper>
                <ContainedButton disabled={suggestions.length % viewAmount !== 0} onClick={() => setStartSuggestionId(suggestions[suggestions.length - 1].id)}>Next</ContainedButton>
            </ButtonWrapper>
        </Wrapper>
    );
};