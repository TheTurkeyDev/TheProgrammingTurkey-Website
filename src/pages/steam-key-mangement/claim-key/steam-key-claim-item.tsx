import { Body1, ContainedButton, Input, TextToast, useQuery, useToast } from 'gobble-lib-react';
import { useState } from 'react';
import styled from 'styled-components';
import { getParams } from '../../../network/auth-network';
import { getDevAPIBase } from '../../../network/network-helper';
import { SteamKeyList } from '../steam-key-list';

const ItemWrapper = styled.div`
    width: 400px;
    height: 75px;
    border: 1px solid  ${({ theme }) => theme.inputs.outlineRaised};
    display: grid;
    grid-template-columns: 150px 242px;
    justify-items: center;
    align-items: center;
`;

type SteamKeyClaimItemProps = {
    readonly list: SteamKeyList
}

export const SteamKeyClaimItem = ({ list }: SteamKeyClaimItemProps) => {
    const { pushToast } = useToast();
    const [key, setKey] = useState(list.keys.length > 0 ? list.keys[0].key : '');

    const [query, querying] = useQuery<SteamKeyList>(`${getDevAPIBase()}/steamkeys/claim/${list.id}`, {
        shouldThrow: true,
        requestData: getParams
    });

    const claim = () => {
        query().then(k => setKey(k?.keys[0]?.key ?? 'No Keys Available!')).catch(console.log);
    };

    const copyToClipBoard = () => {
        navigator.clipboard.writeText(key);
        pushToast(<TextToast text='Key copied to clipboard' />);
    };

    return (
        <ItemWrapper>
            <Body1>{list.title}</Body1>
            {
                key === '' ?
                    <ContainedButton onClick={() => claim()} loading={querying} disabled={querying}>Claim</ContainedButton> :
                    <Input onClick={() => copyToClipBoard()} value={key} readOnly={true} />
            }
        </ItemWrapper>
    );
};