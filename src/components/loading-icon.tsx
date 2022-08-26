import styled, { keyframes } from 'styled-components';

const Rotate = keyframes`
    100% { 
        transform:rotate(360deg); 
    } 
`;

const Dash = keyframes`
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
`;

const Spinner = styled.svg`
    animation: ${Rotate} 2s linear infinite;
    width: 50px;
    height: 50px;
    
    & .path {
      stroke: white;
      stroke-linecap: round;
      animation: ${Dash} 1.5s ease-in-out infinite;
    }
`;


export const LoadingIcon = () => {
    return (
        <Spinner viewBox='0 0 50 50'>
            <circle className='path' cx='25' cy='25' r='20' fill='none' strokeWidth='5'></circle>
        </Spinner>
    );
};