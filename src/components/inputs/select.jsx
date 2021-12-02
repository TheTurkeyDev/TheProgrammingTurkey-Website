import styled from 'styled-components'

const SelectWrapper = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 8px;
    align-items: center;
`

const LabelWrapper = styled.label`
    margin: 0px;
`;

export const Select = ({ label, children, ...props }) => {
    return (
        <SelectWrapper>
            <LabelWrapper>{label}</LabelWrapper>
            <select {...props}>
                {children}
            </select>
        </SelectWrapper>
    )
}