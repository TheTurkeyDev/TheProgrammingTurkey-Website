import { Body1, Headline3, Headline5, Subtitle2 } from '@theturkeydev/gobble-lib-react';
import styled from 'styled-components';
import { CenterContent } from '../styles/common-styles';

const SectionWrapper = styled(Subtitle2)`
    text-decoration: underline;
`;

export const Info = () => {
    return (
        <CenterContent>
            <Headline3>Contact Me!</Headline3>
            <Subtitle2>Email:</Subtitle2>
            <Body1>turkey@theturkey.dev</Body1>
            <Headline5>Programming languages</Headline5>
            <SectionWrapper>
                Familiar with
            </SectionWrapper>
            <Body1>Java</Body1>
            <SectionWrapper>
                Worked with a decent amount
            </SectionWrapper>
            <Body1>Python</Body1>
            <Body1>JavaScript (React)</Body1>
            <Body1>C#</Body1>
            <Body1>HTML / css</Body1>
            <Body1>C / Arduino</Body1>
            <Body1>SQL</Body1>
            <SectionWrapper>
                Worked with a few times, but would need refreshers
            </SectionWrapper>
            <Body1>PHP</Body1>
            <Body1>MatLab</Body1>
        </CenterContent>
    );
};
