import { Headline3, Table, TH } from '@theturkeydev/gobble-lib-react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SuggestionBoxRow } from './manage-suggestion-boxes-row';
import * as SuggestionsAPI from '../suggestions-network';
import { SuggestionBox } from '../suggestion-box';

const Wrapper = styled.div`
    display: grid;
`;


export const ManageSuggestionBoxes = () => {

    const [boxes, setBoxes] = useState<readonly SuggestionBox[]>([]);

    useEffect(() => {
        SuggestionsAPI.getManagedSuggestionBoxes().then(setBoxes);
    }, []);

    return (
        <Wrapper>
            <Headline3>Manage Suggestion Boxes</Headline3>
            <Table tableColumns='auto auto auto auto 1fr'>
                <thead>
                    <tr>
                        <TH>Actions</TH>
                        <TH>Open</TH>
                        <TH>ID</TH>
                        <TH>Name</TH>
                        <TH>Creator</TH>
                    </tr>
                </thead>
                <tbody>
                    {
                        boxes.map(box => <SuggestionBoxRow key={box.id} box={box} />)
                    }
                </tbody>
            </Table>
        </Wrapper>
    );
};