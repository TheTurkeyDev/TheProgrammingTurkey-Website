import { Opacity } from 'gobble-lib-react';
import styled from 'styled-components';

export const TR = styled.tr`
    
    &:hover {
        cursor: pointer;
        opacity: ${Opacity.HOVER_NORMAL};
        background-color: ${({theme}) => theme.primary.color};
    }
`;
