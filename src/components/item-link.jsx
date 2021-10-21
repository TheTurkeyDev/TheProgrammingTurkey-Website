import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ItemWrapper = styled.div`
    background: ${props => props.theme.color.bgSecondary};
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
    margin-top: 8px;

    ${ItemWrapper}:hover & {
        opacity: 0.8;
        transform: translate(0, -20%);
        -ms-transform: translate(0, -20%);
        height: 200%;
    }
`;

const IconWrapper = styled.i`
    margin-top: 8px;
    font-size: 128px;
`

const ImageWrapper = styled.img`
    margin-top: 8px;
    width: 128px;
    height: 128px;
    object-fit: contain;
`

const ProjectTitle = styled.span`
    font-size: 20px;
`

export const ItemLink = ({ item }) => {
    return (
        <ItemWrapper>
            <Link to={item.link}>
                {item.fa_icon && <IconWrapper className={`text-light ${item.icon}`} />}
                {!item.fa_icon && <ImageWrapper src={item.icon} />}
                <ProjectLinkTitle>
                    <ProjectTitle>
                        {item.title}
                    </ProjectTitle>
                </ProjectLinkTitle>
            </Link>
        </ItemWrapper>
    );
}