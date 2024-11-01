import { Anchor, Body1, Card, CardContent, CardHeader, Headline3, Headline5 } from 'gobble-lib-react';
import styled from 'styled-components';
import { LinkGroup } from '../components/link-group';
import { StrikeThrough } from '../styles/common-styles';

/*
/ Extra small devices (phones, 600px and down) /
@media only screen and (max-width: 600px) {...}

/ Small devices (portrait tablets and large phones, 600px and up) /
@media only screen and (min-width: 600px) {...}

/ Medium devices (landscape tablets, 768px and up) /
@media only screen and (min-width: 768px) {...}

/ Large devices (laptops/desktops, 992px and up) /
@media only screen and (min-width: 992px) {...}

/ Extra large devices (large laptops and desktops, 1200px and up) /
@media only screen and (min-width: 1200px) {...}
*/

const ContentWrapper = styled.div`
    margin: 16px 64px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;

    @media (max-width: 600px) {
        margin: 16px 8px;
    }

    @media (min-width: 600px) {
        margin: 16px 16px;
    }

    @media (min-width: 768px) {
        margin: 16px 32px;
    }

    @media (min-width: 992px) {
        margin: 16px 64px;
        max-width: 1000px;
        margin-inline: auto;
    }
`;

const StyledCardHeader = styled(CardHeader)`
    display: grid;
    justify-items: center;
`;

const CardContent2 = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
`;

const CardFooter = styled.div`
    padding-top: 8px;
    border-top: 1px solid ${({ theme }) => theme.surface.on};
`;

const ListItemWrapper = styled.li`

`;

const ListWrapper = styled.ul`
    width: fit-content;
`;

export const MainPage = () => {
    return (
        <ContentWrapper>
            <Card>
                <StyledCardHeader>
                    <Headline3>Whats Going on Here?</Headline3>
                </StyledCardHeader>
                <CardContent>
                    <Body1>
                        I'm currently in the middle of revamping my website!
                        It was previously written with a very bad mix of php
                        and html with w3css for css organization. Let's just
                        say it wasn't all that great and a bit of a
                        nightmare to work with and update. Now I am redoing
                        it all with React <StrikeThrough>and bootstrap</StrikeThrough>! Why React? Well I'm
                        learning it to work with it on another project, so
                        I'm using it here to aid in my testing and learning.
                        The source code for my website is actually available
                        to everyone <Anchor href='https://github.com/TheTurkeyDev/TheProgrammingTurkey-Website' openInNewTab={true}>
                            on my Github page!
                        </Anchor> Not all pages and links are currently available and
                        over time I will slowly be adding everything back.
                        Please be patient with me!
                    </Body1>
                </CardContent>
            </Card>
            <Card>
                <StyledCardHeader>
                    <Headline3>Website To-Do List</Headline3>
                </StyledCardHeader>
                <CardContent2>
                    <ListWrapper>
                        <ListItemWrapper>
                            Game/ Project Pages
                        </ListItemWrapper>
                        <ListItemWrapper>
                            Twitch View
                        </ListItemWrapper>
                        <ListItemWrapper>
                            Test Section
                        </ListItemWrapper>
                    </ListWrapper>
                </CardContent2>
            </Card>
            <Card>
                <StyledCardHeader>
                    <Headline3>Ludum Dare 50!</Headline3>
                    <Headline5>That's a wrap!</Headline5>
                </StyledCardHeader>
                <CardContent>
                    <Body1>
                        Well another Ludum Dare has come and passed. Check
                        out the links below for the game, main Ludum Dare
                        page, and stats about past Ludum Dare game
                        placements
                    </Body1>
                </CardContent>
                <CardFooter>
                    <LinkGroup links={[
                        { to: '/projects/LD50', text: 'Game' },
                        { href: 'https://ldjam.com', text: 'Ludum Dare' },
                        { to: '/ld-stats', text: 'Stats' }
                    ]} />
                </CardFooter>
            </Card>
        </ContentWrapper >
    );
};
