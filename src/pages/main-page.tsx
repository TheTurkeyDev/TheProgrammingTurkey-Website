import { Anchor, Body1, Card, CardContent, CardHeader, Headline3, Headline5 } from 'gobble-lib-react';
import styled from 'styled-components';

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

const StyledCardContent = styled(CardContent)`
    display: flex;
    flex-direction: column;
`;

export const MainPage = () => {
    return (
        <ContentWrapper>
            <Card>
                <StyledCardHeader>
                    <Headline3>Welcome to my website!</Headline3>
                </StyledCardHeader>
                <StyledCardContent>
                    <Body1>
                        What's this for? Basically for any and all of my random projects. There's lots here, but a lot of it can be limited to testing and/ or select users. Login with one of the platforms and then go to your profile to see what's publicly available. Maybe I'll make more things public over time.
                        The source code for my website is actually available to everyone <Anchor href='https://github.com/TheTurkeyDev/TheProgrammingTurkey-Website' openInNewTab={true}>on my Github page!</Anchor> It's an amalgamation of code from over 10+ years of learning to program, so expect a lot of quirks.
                    </Body1>
                </StyledCardContent>
                <StyledCardContent>
                    <Headline5>
                        Short code history:
                    </Headline5>
                    <Body1>
                        - This site started out with vanilla HTML & CSS
                    </Body1>
                    <Body1>
                        - Switched to use PHP
                    </Body1>
                    <Body1>
                        - Switched from vanilla CSS to Bootstrap
                    </Body1>
                    <Body1>
                        - Migrated from PHP to React using JavaScript (Backend specific logic was ported to Java)
                    </Body1>
                    <Body1>
                        - Replacing Bootstrap for Styled Components
                    </Body1>
                    <Body1>
                        - Switched from Javascript to Typescript
                    </Body1>
                    <Body1>
                        - Moved to putting everything in a Docker container
                    </Body1>
                </StyledCardContent>
            </Card>
        </ContentWrapper >
    );
};
