import { TD } from '@theturkeydev/gobble-lib-react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SuggestionBox } from '../suggestion-box';

const TR = styled.tr`
    &:hover {
        cursor: pointer;
    }

    &:hover td {
        background-color: #ffffff22;
    }
`;

type StatusIconProps = {
    readonly open: boolean
}
const StatusIcon = styled.i<StatusIconProps>`
    color: ${({ open }: StatusIconProps) => open ? 'green' : 'red'};
`;

type SuggestionBoxRowProps = {
    readonly box: SuggestionBox;
}

export const SuggestionBoxRow = ({ box }: SuggestionBoxRowProps) => {

    const navigate = useNavigate();

    return (
        <TR onClick={() => navigate(`/suggestions/${box.id}`)}>
            <TD>
                <i className='far fa-arrow-alt-circle-right' />
            </TD>
            <TD>
                <StatusIcon open={box.open} className={`fas ${box.open ? 'fa-check' : 'fa-times'}`} />
            </TD>
            <TD>
                {box.id}
            </TD>
            <TD>
                {box.name}
            </TD>
            <TD>
                {box.creator}
            </TD>
        </TR>
    );
};