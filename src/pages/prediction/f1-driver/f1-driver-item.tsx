import styled from 'styled-components';
import { F1Driver } from './f1-driver';
import { Body1 } from 'gobble-lib-react';

const DriverItemWrapper = styled.div`
    display: grid;
    grid-template-columns: 32px 32px;
    gap: 4px;
    align-items: center;
    grid-template-areas:
    "img img"
    "number country"
    "name name";
`;

type F1DriverItemProps = {
    readonly driver: F1Driver
}

export const F1DriverItem = ({ driver }: F1DriverItemProps) => {
    return (
        <DriverItemWrapper>
            <img src={driver.countryImage} width={30} style={{ gridArea: 'country' }} />
            <img src={driver.numberImage} width={30} style={{ gridArea: 'number', filter: 'drop-shadow(1px 1px 0 gray) drop-shadow(-1px -1px 0 gray) drop-shadow(-1px 1px 0 gray) drop-shadow(1px -1px 0 gray)' }} />
            <img src={driver.image} width={64} style={{ gridArea: 'img' }} />
            <Body1 style={{ gridArea: 'name' }}>{driver.id.toUpperCase()}</Body1>
        </DriverItemWrapper>
    );
};