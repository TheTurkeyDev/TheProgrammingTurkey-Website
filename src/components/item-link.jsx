import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ItemWrapper = styled.div`
    background: ${props => props.theme.color.bg_secondary};
    min-width: 200px;
    max-width: 200px;
    width: 200px;
    height: 200px;
    border-radius: 10px;
    overflow-y: hidden;
`;

const ProjectLinkTitle = styled.div`
    z-index: 1;
    position: relative;
    background: #333333;
    min-height: 75px;
    bottom: 0px;
    opacity: 1;
    transition: .5s ease;
    transform: translate(0, 0%);
    -ms-transform: translate(0, 0%);

    ${ItemWrapper}:hover & {
        opacity: 0.8;
        transform: translate(0, -20%);
        -ms-transform: translate(0, -20%);
        height: 200%;
    }
`;

export const ItemLink = ({ item }) => {
    return (
        <ItemWrapper className='col mx-2 mb-3 p-0 pt-2'>
            <Link to={item.link} style={{ textDecoration: 'none' }}>
                <div className='text-light my-auto'>
                    <i className={item.icon} style={{ fontSize: '128px' }} />
                </div>
                <ProjectLinkTitle className='mb-2'>
                    <span style={{ fontSize: '20px' }}>
                        {item.title}
                    </span>
                </ProjectLinkTitle>
            </Link>
        </ItemWrapper>
    );
}