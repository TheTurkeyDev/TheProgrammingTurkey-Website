import styled from 'styled-components';
import { CenterContent, Rule } from '../styles/common-styles';

const ContentWrapper = styled(CenterContent)`
    max-width: 750px;
`;

const Question = styled.p`
    font-size: 1.2rem;
    font-weight: bold;
`;

const Response = styled.p`
    color: ${props => props.theme.color.textPrimary};
`;

export const MJRBotFAQ = () => {
    return (
        <ContentWrapper>
            <h1>MJR Bot Integration FAQ</h1>
            <Rule />
            <Question>What is MJR Bot?</Question>
            <Response>Text</Response>
            <Rule />
            <Question>Why use MJR Bot and not make your own Twitch Interface?</Question>
            <Response>
                Simply put, because it's less work for me not to. MJR is a good friend of mine and I trust the work and
                product he has put forth and made. Doing this allows us to both focus on specific tasks and work together
                to make better products. My website and back end currently do not store any of your Twitch tokens thus
                making it impossible to do alot of Twitch integrations myself. I very could make my system support all this
                and build it up, but I enjoy working with MJR more and I would reather leverage his work.
            </Response>
            <Rule />
            <Question>Do I need to always log into the MJR Bot website/ panel?</Question>
            <Response>
                No. Once you login to MJR Bot the first time and connect the bot with your channel you do not need to keep
                revisting the website. The initial connection and setup are purely for transparency so that you, the end user
                know what is going on. After the initial process we handle all further connections and communications behind
                the scenes so that you have a better and more simple user experience. You are able to revoke the connection
                between our servies at any time and can be done via the following link.
            </Response>
        </ContentWrapper>
    );
}
