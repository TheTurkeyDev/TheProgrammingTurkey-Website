import { Headline5 } from '@theturkeydev/gobble-lib-react';
import styled from 'styled-components';
import { useAuth } from '../contexts/auth-context';
import { ItemLink } from './item-link';
import { ItemLinkType } from './item-link-type';

const GroupWrapper = styled.div`
    max-width: 90%;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
`;

const ItemsWrapper = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    gap: 16px;
`;

type ItemLinkGroupProps = {
    readonly groupTitle: string
    readonly items: readonly ItemLinkType[]
}
export const ItemLinkGroup = ({ groupTitle, items }: ItemLinkGroupProps) => {
    const { permissions } = useAuth();

    return (
        <GroupWrapper>
            <Headline5>{groupTitle}</Headline5>
            <hr />
            <ItemsWrapper>
                {
                    items.map(item => {
                        if (item.permission === '' || permissions.includes(item.permission)) {
                            return <ItemLink key={item.title} item={item} />;
                        }
                    })
                }
            </ItemsWrapper>
        </GroupWrapper>
    );
};
