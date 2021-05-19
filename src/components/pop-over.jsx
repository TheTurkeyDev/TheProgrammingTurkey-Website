import styled from 'styled-components'

const PlatformIcon = styled.i`
    color: white;
`

const PopOverText = styled.div`
    visibility: hidden;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 8px;
    position: absolute;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.3s;
    width: 300px;

    top: -50%;
    right: ${props => props.direction === 'left' ? '100%' : ''};
    left: ${props => props.direction === 'right' ? '125%' : ''};
    margin-left: ${props => props.direction === 'left' ? '-200px' : '0'};
    margin-right: ${props => props.direction === 'right' ? '-200px' : '0'};
`;

const PopOverWrapper = styled.div`
    position: relative;
    display: inline-block;

    &:hover ${PopOverText}{
        visibility: visible;
        opacity: 1;
    }
`

export const IconWithPopOver = ({ icon, direction, children }) => {
    return (
        <PopOverWrapper className='text-center'>
            <PlatformIcon className={icon} />
            <PopOverText direction={direction}>
                {children}
            </PopOverText>
        </PopOverWrapper>
    )
}