import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { TopNav } from './top-nav';

const MainContent = styled.div`
     overflow-y: auto;
`;

const BackIconDiv = styled.div`
    font-size: 24px;
`;

export const PageWrapper = (props) => {
    return (
        <div className='h-100 w-100 d-flex flex-column'>
            <TopNav />
            <MainContent>
                {props.parent && (
                    <BackIconDiv className='ml-2 mt-2 button'>
                        <Link to={props.parent}>
                            <i className='fas fa-arrow-left mr-1' />
                            Back
                        </Link>
                    </BackIconDiv>
                )}
                {props.children}
            </MainContent>
        </div>
    );
}
