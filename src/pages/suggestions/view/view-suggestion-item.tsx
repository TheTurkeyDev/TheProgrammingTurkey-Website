import { TD } from 'gobble-lib-react';
import { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '../../../components/icon';
import { Suggestion } from '../suggestion';
import * as SuggestionsAPI from '../suggestions-network';

type StatusIconProps = {
    readonly verified: boolean
    readonly deleted: boolean
}
const StatusIcon = styled.i<StatusIconProps>`
    color: ${({ verified, deleted }: StatusIconProps) => deleted ? 'red' : (verified ? 'green' : 'yellow')};
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

const SpacedIcons = styled.div`
    display: grid;
    grid-template-columns: auto auto 1fr;
    gap: 8px;
`;

function getIcon(verified: boolean, deleted: boolean) {
    if (deleted)
        return 'fas fa-times';
    if (verified)
        return 'fas fa-check';
    return 'fas fa-exclamation';
}

function getTitle(verified: boolean, deleted: boolean) {
    if (deleted)
        return 'Deleted';
    if (verified)
        return 'Verified';
    return 'Requires Verification';
}

type SuggestionItemProps = {
    readonly suggestion: Suggestion
}

export const SuggestionItem = ({ suggestion }: SuggestionItemProps) => {
    const [deleted, setDeleted] = useState(suggestion.deleted);
    const [verified, setVerified] = useState(suggestion.verified);

    const deleteItem = () => SuggestionsAPI.deleteSuggestion(suggestion.id).then(ok => { if (ok) setDeleted(true); });
    const restoreItem = () => SuggestionsAPI.restoreSuggestion(suggestion.id).then(ok => { if (ok) setDeleted(false); });
    const verifyItem = () => SuggestionsAPI.verifySuggestion(suggestion.id).then(ok => { if (ok) setVerified(true); });

    return (
        <TR deleted={deleted}>
            <TD>
                {verified && !deleted && <Icon name='fas fa-trash-alt' onClick={deleteItem} title='Delete This Suggestion' />}
                {!verified && !deleted && <SpacedIcons>
                    <Icon name='fas fa-check' onClick={verifyItem} title='Vefiry This Suggestion' />
                    <Icon name='fas fa-times' onClick={deleteItem} title='Deny This Suggestion' />
                </SpacedIcons>}
                {deleted && <Icon name='fas fa-trash-restore' onClick={restoreItem} title='Restore This Suggestion' />}
            </TD>
            <TD><StatusIcon verified={verified} deleted={deleted} className={getIcon(verified, deleted)} title={getTitle(verified, deleted)} /></TD>
            <TD>{suggestion.suggester}</TD>
            <TD>{suggestion.suggestion}</TD>
        </TR>
    );
};