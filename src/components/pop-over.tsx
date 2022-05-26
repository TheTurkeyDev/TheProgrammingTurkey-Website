import { WithChildren } from 'gobble-lib-react';
import styled from 'styled-components';

const PlatformIcon = styled.i`
    color: white;
`;

type PopOverTextProps = {
    readonly direction: string
}
const PopOverText = styled.div<PopOverTextProps>`
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
    right: ${({ direction }) => direction === 'left' ? '100%' : ''};
    left: ${({ direction }) => direction === 'right' ? '125%' : ''};
    margin-left: ${({ direction }) => direction === 'left' ? '-200px' : '0'};
    margin-right: ${({ direction }) => direction === 'right' ? '-200px' : '0'};
`;

const PopOverWrapper = styled.div`
    position: relative;
    display: inline-block;

    &:hover ${PopOverText}{
        visibility: visible;
        opacity: 1;
    }
`;

type IconWithPopOverProps = WithChildren & {
    readonly icon: string
    readonly direction: string
}
export const IconWithPopOver = ({ icon, direction, children }: IconWithPopOverProps) => {
    return (
        <PopOverWrapper className='text-center'>
            <PlatformIcon className={icon} />
            <PopOverText direction={direction}>
                {children}
            </PopOverText>
        </PopOverWrapper>
    );
};