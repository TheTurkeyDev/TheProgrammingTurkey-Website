import styled from 'styled-components';
import { CenterContent, ExtLink, Rule } from '../styles/common-styles';

const ContentWrapper = styled(CenterContent)`
    max-width: 750px;
    padding: 8px;
`;

const Question = styled.p`
    font-size: 1.2rem;
    font-weight: bold;
`;

const Response = styled.p`
    color: ${props => props.theme.color.textPrimary};
`;

const LogoImage = styled.img`
    max-width: 100px;
    max-height: 100px;
    object-fit: contain;
`;

export const MJRBotFAQ = () => {
    return (
        <ContentWrapper>
            <div>
                <LogoImage src='https://mjrbot.mjrlegends.com/images/mjrbot_site_logo.png' alt='MJRBot ' />
                <h1>MJR Bot Integration FAQ</h1>
            </div>
            <Rule />
            <Question>What is MJR Bot?</Question>
            <Response>
                MJR Bot is a Twitch bot written and developed by MJRLegends. MJRBot offers a lot of various twitch features
                and if you are looking for a bot to use should definitely look into it! As you will read below Me and MJR have
                teamed up to bring some cool integrations for Streamers and thus I utilize his Twitch infrastructure to allow me to
                develop more things while not having to deal with the nuisances  of Twitch.
            </Response>
            <Rule />
            <Question>Why use MJR Bot and not make your own Twitch Interface?</Question>
            <Response>
                Simply put, because it's less work for me not to. MJR is a good friend of mine and I trust the work and
                product he has put forth and made. Doing this allows us to both focus on specific tasks and work together
                to make better products. My website and back end currently do not store any of your Twitch tokens thus
                making it impossible to do a lot of Twitch integrations myself. I very well could make my system support all this
                and build it up, but I enjoy working with MJR more and I would rather  leverage his work.
            </Response>
            <Rule />
            <Question>Do I need to always log into the MJR Bot website/ panel?</Question>
            <Response>
                No. Once you login to MJR Bot the first time and connect the bot with your channel you do not need to keep
                revisiting  the website. The initial connection and setup are purely for transparency so that you, the end user
                know what's going on. After the initial process we handle all further connections and communications behind
                the scenes so that you have a better and more simple user experience. You are able to revoke the connection
                between our services  at any time and can be done via the below link. That being said, you can also check out
                the other features MJR has to offer in his bot and suggest things to him that you want to see! He's constantly
                looking for feedback and new ideas!
            </Response>
            <ExtLink href='' onClick={() => window.open('')}>Revoke Permission</ExtLink>
        </ContentWrapper>
    );
}
