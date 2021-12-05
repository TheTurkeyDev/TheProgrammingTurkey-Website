import styled from 'styled-components';
import { LinkGroup } from './components/link-group';
import { ExtLink, StrikeThrough } from './styles/common-styles';

const ContentWrapper = styled.div`
    margin: 16px 64px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
`;

const Card = styled.div`
    background: ${props => props.theme.color.bgSecondary};
    border-radius: 8px;
    padding: 16px 32px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    box-shadow: 0 .5rem 1rem #0000004a;
`;

const CardHeader = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
`;

const CardHeader3 = styled.h3`
    margin: 0;
`;

const CardHeader5 = styled.h5`
    margin: 0;
`;

const CardContent = styled.div`

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

export const App = () => {
    return (
        <ContentWrapper>
            <Card>
                <CardHeader>
                    <CardHeader3>Whats Going on Here?</CardHeader3>
                </CardHeader>
                <CardContent>
                    <span>
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
                    </span>
                    <span>
                        Not all pages and links are currently available and
                        over time I will slowly be adding everything back.
                        Please be patient with me!
                    </span>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardHeader3>Website To-Do List</CardHeader3>
                </CardHeader>
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
                <CardHeader>
                    <CardHeader3>Ludum Dare 48!</CardHeader3>
                    <CardHeader5>That's a wrap!</CardHeader5>
                </CardHeader>
                <CardContent>
                    <span>
                        Well another Ludum Dare has come and passed. Check
                        out the links below for the game, main Ludum Dare
                        page, and stats about past Ludum Dare game
                        placements
                    </span>
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
}
