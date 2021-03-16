import { useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../contexts/auth-context';
import { ItemLink } from './item-link';

const GroupWrapper = styled.div`
    max-width: 90%;
`;

const ItemsWrapper = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
`;

export const ItemLinkGroup = (props) => {
    const auth = useContext(AuthContext);

    return (
        <GroupWrapper className='fluid-container mx-auto text-center'>
            <div className='row m-0 mt-5'>
                <h5 className='col'>{props.groupTitle}</h5>
            </div>
            <hr />
            <div className='row m-0'>
                <ItemsWrapper className='w-100'>
                    {
                        props.items.map(item => {
                            if (item.permission === '' || auth.permissions.includes(item.permission)) {
                                return <ItemLink key={item.title} item={item} />;
                            }
                        })
                    }
                </ItemsWrapper>
            </div>
        </GroupWrapper>
    );
}
