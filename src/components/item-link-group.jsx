import { useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../contexts/auth-context';
import { ItemLink } from './item-link';

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

export const ItemLinkGroup = (props) => {
    const auth = useContext(AuthContext);

    return (
        <GroupWrapper>
            <h5>{props.groupTitle}</h5>
            <hr />
            <ItemsWrapper>
                {
                    props.items.map(item => {
                        if (item.permission === '' || auth.permissions.includes(item.permission)) {
                            return <ItemLink key={item.title} item={item} />;
                        }
                    })
                }
            </ItemsWrapper>
        </GroupWrapper>
    );
}
