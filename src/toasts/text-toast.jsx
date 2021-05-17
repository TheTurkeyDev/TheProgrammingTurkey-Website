import styled from 'styled-components';

const TextToastWrapper = styled.div`
    text-align: center;
`;

export const TextToast = (props) => {
    return (
        <TextToastWrapper>
            <span>{props.text}</span>
        </TextToastWrapper>
    );
}