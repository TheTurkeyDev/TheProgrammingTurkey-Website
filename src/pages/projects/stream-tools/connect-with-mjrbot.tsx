import { Anchor, BaseTheme, Body1, ContainedButton, Headline5, Subtitle1 } from '@theturkeydev/gobble-lib-react';
import { useState } from 'react';
import styled, { ThemeProps } from 'styled-components';
import { LoadingModal } from '../../../modals/loading-modal';
import { getSiteURLBase } from '../../../network/network-helper';

const ContentWrapper = styled.div`
    display: grid;
    width: 700px;
    background: ${({ theme }: ThemeProps<BaseTheme>) => theme.surface.color};
    border-radius: 15px;
    padding: 16px;
    gap: 8px;
    margin: 0 auto;
    justify-content: center;
`;

const TopImages = styled.div`
    display: grid;
    grid-template-columns: 1fr auto auto auto 1fr;
    gap: 16px;
`;

const LogoImage = styled.img`
    max-width: 100px;
    max-height: 100px;
    object-fit: contain;
`;

const PlusSign = styled(Body1)`
    font-size: 75px;
    line-height: 75px;
`;

const ButtonSecondaryWrapper = styled(ContainedButton)`
    justify-self: center;
`;

const Inline = styled.div`
    display: inline;
`;

type ConnectWithMJRBot = {
    readonly refresh: () => void
}
export const ConnectWithMJRBot = ({ refresh }: ConnectWithMJRBot) => {

    const [consentOpen, setConsentOpen] = useState(false);

    const openConsentScreen = () => {
        if (consentOpen)
            return;

        setConsentOpen(true);
        const consent = window.open('https://mjrbot.mjrlegends.com/consent.php?project_id=oS8P303hFqyLrfIx', '_blank');
        const timer = setInterval(() => {
            if (consent?.closed) {
                refresh();
                clearInterval(timer);
                setConsentOpen(false);
            }
        }, 500);
    };

    return (
        <>
            <LoadingModal loading={consentOpen} >
                <Headline5>Waiting For MJRBot Consent</Headline5>
                <Subtitle1>Close the MJRBot tab when finished</Subtitle1>
            </LoadingModal>
            <ContentWrapper>
                <TopImages>
                    <div />
                    <LogoImage src='/images/turkey_avatar.png' />
                    <PlusSign>+</PlusSign>
                    <LogoImage src='https://mjrbot.mjrlegends.com/images/mjrbot_site_logo.png' alt='MJRBot ' />
                </TopImages>
                <Body1>You must first connnect with MJRNot to use this tool!</Body1>
                <Inline>
                    <Body1>Learn more about MJR Bot and why I use it here: </Body1>
                    <Anchor href={`${getSiteURLBase()}/mjrbotfaq`} openInNewTab={true}>MJR Bot FAQ</Anchor>
                </Inline>
                <ButtonSecondaryWrapper onClick={openConsentScreen}>Connect With MJRBot</ButtonSecondaryWrapper>
            </ContentWrapper>
        </>
    );
};