import { Headline3, InputsWrapper, Loading, Table, TD, TH, ToggleSwitch } from '@theturkeydev/gobble-lib-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Suggestion } from '../suggestion';
import { SuggestionBox } from '../suggestion-box';
import * as SuggestionsAPI from '../suggestions-network';

export const Wrapper = styled.div`
    display: grid;
`;

type StatusIconProps = {
    readonly verified: boolean
}
const StatusIcon = styled.i<StatusIconProps>`
    color: ${({ verified }: StatusIconProps) => verified ? 'green' : 'red'};
`;

type TRProps = {
    readonly deleted: boolean
}
const TR = styled.tr<TRProps>`
    & td {
        background-color: ${({ deleted }: TRProps) => deleted ? '#880000' : ''};
    }

    &:hover td {
        background-color: #ffffff22;
    }
`;

const Settings = styled.div`
    display: grid;
    grid-template-columns: auto auto auto 1fr;
    gap: 16px;
    padding: 4px 8px;
`;

function getIcon(verified: boolean, deleted: boolean) {
    if (deleted)
        return 'fas fa-times';
    if (verified)
        return 'fas fa-check';
    return 'fas fa-exclamation';

}

export const ViewSuggestionBox = () => {
    const { id } = useParams();

    const [box, setBox] = useState<SuggestionBox>();
    const [page, setPage] = useState(-1);
    const [viewAmount, setViewAmount] = useState(25);
    const [suggestions, setSuggestions] = useState<readonly Suggestion[]>([]);

    useEffect(() => {
        if (!id)
            return;
        SuggestionsAPI.getSuggestionBox(id).then(box => {
            setBox(box);
            setPage(1);
        });
    }, [id]);

    useEffect(() => {
        setPage(1);
    }, [viewAmount]);

    useEffect(() => {
        if (!id || page === -1)
            return;

        SuggestionsAPI.getSuggestions(id, page, viewAmount).then(setSuggestions);

        //TODO: add old to id and viewAmount
    }, [page, id, viewAmount]);

    if (!box)
        return <Loading />;

    return (
        <Wrapper>
            <Headline3>{box.name}</Headline3>
            <Table tableColumns='80px auto auto 1fr'>
                <thead>
                    <tr>
                        <TH></TH>
                        <TH>Verified</TH>
                        <TH>Suggester</TH>
                        <TH>Suggestion</TH>
                    </tr>
                </thead>
                <tbody>
                    {
                        suggestions.map(s =>
                            <TR deleted={s.deleted}>
                                <TD>
                                    {s.verified && !s.deleted && <i className='fas fa-trash-alt' />}
                                    {!s.verified && <i className='fas fa-check' />}
                                    {s.deleted && <i className='fas fa-trash-restore' />}
                                </TD>
                                <TD><StatusIcon verified={s.verified} className={getIcon(s.verified, s.deleted)} /></TD>
                                <TD>{s.suggester}</TD>
                                <TD>{s.suggestion}</TD>
                            </TR>
                        )
                    }
                </tbody>
            </Table>
        </Wrapper>
    );
};