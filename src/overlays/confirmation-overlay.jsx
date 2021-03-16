import styled from 'styled-components';

const ButtonWrapper = styled.button`
    margin-top: 15px;
`;

export const ConfirmationOverlay = (props) => {
    return (
        <div>
            <span>{props.text}</span>
            <div>
                {props.options.map((option, index) => {
                    return (
                        <ButtonWrapper key={index} className='mr-2 btn-secondary' onClick={() => option.callback()}>
                            {option.text}
                        </ButtonWrapper>
                    );
                })}
            </div>
        </div>
    );
}
