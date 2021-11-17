import styled from 'styled-components';

export const CenterContent = styled.div`
    text-align: center;
    margin-left: auto;
    margin-right: auto;
`;

export const Button = styled.button`
    width: fit-content;
    padding: 4px 12px;
`;

export const ButtonSecondary = styled.button`
    width: fit-content;
    padding: 4px 12px;
    background-color: ${props => props.theme.color.bgPrimary};
`;

export const Rule = styled.hr`
    border-color:#757c85;
`;