import styled from 'styled-components'

const CheckboxWrapper = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 8px;
    align-items: center;
`

const LabelWrapper = styled.label`
    margin: 0px;
`;

export const Checkbox = ({ label, ...props }) => {
    return (
        <CheckboxWrapper>
            <LabelWrapper>{label}</LabelWrapper>
            <input type='checkbox' {...props} />
        </CheckboxWrapper>
    )
}