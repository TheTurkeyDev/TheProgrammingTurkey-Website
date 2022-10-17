import { Anchor, Body1, Headline2, Headline4, Subtitle2 } from 'gobble-lib-react';
import styled from 'styled-components';

const ContentWrapper = styled.div`
    max-width: 1000px;
    margin-inline: auto;
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
`;

export const TermsOfService = () => (
    <ContentWrapper>
        <Headline2>Terms of Service</Headline2>
        <Subtitle2>Last updated October 17, 2022</Subtitle2>
        <Headline4>1. Overview</Headline4>
        <Body1>These terms of service outline the rules and regulations for the use of TurkeyDev's Website & any of its services under the TurkeyDev service.</Body1>
        <Body1>By accessing this website we assume you accept these terms of service in full. Do not continue to use TurkeyDev's website if you do not accept all of the terms of service stated on this page.</Body1>
        <Body1>By continuing to use our services also gives the understanding that you will provided related and direct any users/viewers of your platforms channel to any privacy policy or tos terms we have outlined!</Body1>
        <Body1>The following terminology applies to these Terms of Service, Privacy Statement and Disclaimer Notice and any or all Agreements: "Client", "User", "Channel Owner", "You" and "Your" refers to you, the person accessing this website/service and accepting the Company's terms of service. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves, or either the Client or ourselves.</Body1>
        <Body1>If you have any questions or anything please email us at turkey@theturkey.dev</Body1>
        <Headline4>2. License</Headline4>
        <Body1>Unless otherwise stated, TurkeyDev and/or it's licensors own the intellectual property rights for all material on TurkeyDev. All intellectual property rights are reserved. You may view and/or print pages from theturkey.dev for your own personal use subject to restrictions set in these terms of service.</Body1>
        <Body1>You must not:</Body1>
        <ul>
            <li>Republish material from any of our service</li>
            <li>Sell, rent or sub-license material from any of our service</li>
            <li>Reproduce, duplicate or copy material from any of our service</li>
            <li>Redistribute content from TurkeyDev Services (unless content is specifically made for redistribution).</li>
        </ul>
        <Headline4>3. Prohibited Uses of TurkeyDev</Headline4>
        <Body1>You are not allowed to do the following things,</Body1>
        <ul>
            <li>Hack or cause damage to our site or/and any of our services using any sort of illegal attack in TurkeyDev in anyway including but not limited to DDOS attacks, hacking attacks</li>
            <li>Sell or promote our service for personal gain</li>
            <li>Use our services to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability anyone</li>
            <li>Use our services to commit any sort of crime such as but not limited to uploading virus, hacking, sexual harassment, abuse</li>
            <li>Use our developer websocket system to display or use or promote copyrighted material you dont own</li>
        </ul>
        <Headline4>4. Punishment/Termination</Headline4>
        <Body1>We hold the right to disallow or ban you from our services at any point if we feel our Terms of Service has been broken, we have the last say in the matter.</Body1>
        <Body1>You are not allowed to do the following things, hack our site or/and any of our services, sell or promote our service for personal gain, make money off TurkeyDev by selling our services we offer.</Body1>
        <Headline4>5. Copyrighted Material</Headline4>
        <Body1>We will not have any liability or responsibility for any copyrighted materials you use in any of our services</Body1>
        <Body1>We forbid any use of copyrighted material with TurkeyDev service, including but not limited to creations from/with our public websocket system</Body1>
        <Headline4>6. Personal Information</Headline4>
        <Body1>Check out our <Anchor href='/privacy-policy' openInNewTab={true}>Privacy Policy</Anchor> for details.</Body1>
        <Headline4>7. Third Party Links</Headline4>
        <Body1>We will not have any liability or responsibility for any third-party materials or websites, which using of this service may present you at anytime, you must be carefully and click or/and use links at your own risk.</Body1>
        <Headline4>8. Changes to Terms of Service</Headline4>
        <Body1>We reserve the right to update or change or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check our website periodically for changes. Your continued use of or access to our website or the Service following the posting of any changes to these Terms of Service constitutes acceptance of those changes.</Body1>
    </ContentWrapper>
);