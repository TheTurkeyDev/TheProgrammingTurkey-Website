import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const CenterContent = styled.div`
    text-align: center;
    margin-left: auto;
    margin-right: auto;
`;

export const Button = styled.button`
    width: fit-content;
    padding: 4px 12px;
    background-color: ${props => props.theme.color.bgSecondary};
    color: ${props => props.theme.color.textSecondary};
    border: 1px solid ${props => props.theme.color.borderGray};
    border-radius: 5px;

    &:hover {
        background-color: ${props => props.theme.color.borderGray};
        color: ${props => props.theme.color.textSecondary};
        border: 1px solid ${props => props.theme.color.borderGray};
        border-radius: 5px;
        text-decoration: none;
        cursor: pointer;
    }

    &:disabled {
        background-color:${props => props.theme.color.bgPrimary};
        color:  ${props => props.theme.color.textPrimary};
        border: 1px solid ${props => props.theme.color.borderGray};
        border-radius: 5px;
        cursor: not-allowed;
    }
`;

export const ButtonLink = styled(Link)`
    width: fit-content;
    padding: 4px 12px;
    background-color: ${props => props.theme.color.bgSecondary};
    color: ${props => props.theme.color.textSecondary};
    border: 1px solid ${props => props.theme.color.borderGray};
    border-radius: 5px;

    &:hover {
        background-color: ${props => props.theme.color.borderGray};
        color: ${props => props.theme.color.textSecondary};
        border: 1px solid ${props => props.theme.color.borderGray};
        border-radius: 5px;
        text-decoration: none;
        cursor: pointer;
    }

    &:disabled {
        background-color:${props => props.theme.color.bgPrimary};
        color:  ${props => props.theme.color.textPrimary};
        border: 1px solid ${props => props.theme.color.borderGray};
        border-radius: 5px;
        cursor: not-allowed;
    }
`;

export const ButtonSecondary = styled.button`
    width: fit-content;
    padding: 4px 12px;
    background-color: ${props => props.theme.color.bgPrimary};
    color: ${props => props.theme.color.textSecondary};
    border: 1px solid ${props => props.theme.color.borderGray};
    border-radius: 5px;

    &:hover {
        background-color: ${props => props.theme.color.borderGray};
        color: ${props => props.theme.color.textSecondary};
        border: 1px solid ${props => props.theme.color.borderGray};
        border-radius: 5px;
        text-decoration: none;
        cursor: pointer;
    }

    &:disabled {
        background-color:${props => props.theme.color.bgSecondary};
        color:  ${props => props.theme.color.textPrimary};
        border: 1px solid ${props => props.theme.color.borderGray};
        border-radius: 5px;
        cursor: not-allowed;
    }
`;

export const Rule = styled.hr`
    border-color:#757c85;
`;

export const IntLink = styled(Link)`
    color: #00B4D8;
`

export const ExtLink = styled.a`
    color: #00B4D8;
`

export const Label = styled.label`
    margin: 0;
`

export const StrikeThrough = styled.span`
    text-decoration: line-through;
`;