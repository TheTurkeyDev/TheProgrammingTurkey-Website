import { Body1, Card, CardContent, CardHeader, Headline3, Headline5 } from '@theturkeydev/gobble-lib-react';
import styled from 'styled-components';
import { LinkGroup } from '../components/link-group';
import { ExtLink, StrikeThrough } from '../styles/common-styles';

const ContentWrapper = styled.div`
    margin: 16px 64px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
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
    border-top: 1px solid #222222;
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
                        nightnare to work with and update. Now I am redoing
                        it all with React <StrikeThrough>and bootstrap</StrikeThrough>! Why React? Well I'm
                        learning it to work with it on another project, so
                        I'm using it here to aid in my testing and learning.
                        The source code for my website is actually available
                        to everyone <ExtLink href='https://github.com/TheTurkeyDev/TheProgrammingTurkey-Website'>
                            on my Github page!
                        </ExtLink>
                    </Body1>
                    <Body1>
                        Not all pages and links are currently available and
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
                    <Headline3>Ludum Dare 48!</Headline3>
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
                        { to: '/projects/LD48', text: 'Game' },
                        { href: 'https://ldjam.com', text: 'Ludum Dare' },
                        { to: '/ld-stats', text: 'Stats' }
                    ]} />
                </CardFooter>
            </Card>
        </ContentWrapper >
    );
};
