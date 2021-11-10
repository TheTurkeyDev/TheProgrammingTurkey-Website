import { useState } from 'react';
import styled from 'styled-components'
import { LoadingModal } from '../../../modals/loading-modal';
import { ButtonSecondary } from '../../../styles/common-styles';

const ContentWrapper = styled.div`
    display: grid;
    width: 700px;
    background: ${props => props.theme.color.bgSecondary};
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
`

const LogoImage = styled.img`
    max-width: 100px;
    max-height: 100px;
    object-fit: contain;
`;

const PlusSign = styled.span`
    font-size: 75px;
    line-height: 75px;
`;

const ButtonSecondaryWrapper = styled(ButtonSecondary)`
    justify-self: center;
`;

export const ConnectWithMJRBot = ({ refresh }) => {

    const [consentOpen, setConsentOpen] = useState(false);

    const openConsentScreen = () => {
        if (consentOpen)
            return;

        setConsentOpen(true);
        const consent = window.open('https://mjrbot.mjrlegends.com/consent.php?project_id=oS8P303hFqyLrfIx', '_blank');
        const timer = setInterval(() => {
            if (consent.closed) {
                refresh();
                clearInterval(timer);
                setConsentOpen(false);
            }
        }, 500);
    }

    return (
        <>
            <LoadingModal loading={consentOpen} >
                <h4>Waiting For MJRBot Consent</h4>
                <p>Close the MJRBot tab when finished</p>
            </LoadingModal>
            <ContentWrapper>
                <TopImages>
                    <div />
                    <LogoImage src='/images/turkey_avatar.png' />
                    <PlusSign>+</PlusSign>
                    <LogoImage src='https://mjrbot.mjrlegends.com/images/mjrbot_site_logo.png' alt='MJRBot ' />
                </TopImages>
                <span>You must first connnect with MJRNot to use this tool!</span>
                <ButtonSecondaryWrapper onClick={openConsentScreen}>Connect With MJRBot</ButtonSecondaryWrapper>
            </ContentWrapper>
        </>
    )
}