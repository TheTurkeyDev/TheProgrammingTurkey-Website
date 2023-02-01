import { Icon, TD } from 'gobble-lib-react';
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
const StatusIcon = styled(Icon) <StatusIconProps>`
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
                <Icon className='far fa-arrow-alt-circle-right' />
            </TD>
            <TD>
                <StatusIcon open={box.open} className={box.open ? 'fas fa-check' : 'fas fa-times'} />
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