import { BaseTheme, Headline6, LinkButton } from 'gobble-lib-react';
import styled, { ThemeProps } from 'styled-components';
import { ItemLinkType } from './item-link-type';

const ItemWrapper = styled.div`
    background: ${({ theme }: ThemeProps<BaseTheme>) => theme.surface.color};
    width: 200px;
    height: 200px;
    border-radius: 10px;
    overflow-y: hidden;

    &:hover a {
        text-decoration: none;
    }
`;

const ProjectLinkTitle = styled.div`
    z-index: 1;
    position: relative;
    background: ${({ theme }: ThemeProps<BaseTheme>) => theme.surface.color};
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
    color: ${({ theme }: ThemeProps<BaseTheme>) => theme.surface.on};
`;

const ImageWrapper = styled.img`
    margin-top: 8px;
    width: 128px;
    height: 128px;
    object-fit: contain;
`;

type ItemLinkProps = {
    readonly item: ItemLinkType
}
export const ItemLink = ({ item }: ItemLinkProps) => {
    return (
        <ItemWrapper>
            <LinkButton to={item.link}>
                {item.fa_icon && <IconWrapper className={item.icon} />}
                {!item.fa_icon && <ImageWrapper src={item.icon} />}
                <ProjectLinkTitle>
                    <Headline6>
                        {item.title}
                    </Headline6>
                </ProjectLinkTitle>
            </LinkButton>
        </ItemWrapper>
    );
};