import { Body1 } from '@theturkeydev/gobble-lib-react';
import { ProjectWrapper } from '../../components/project-wrapper';

export function LD39() {
    return (
        <ProjectWrapper
            title='Power Synergy'
            subTittle='For LudumDare 39!'
            links={[
                { href: 'http://files.theprogrammingturkey.com/index.html?path=ludm_dare/Power_Synergy_48hr_Patch_2.jar', text: 'Download' },
                { href: 'https://ldjam.com/events/ludum-dare/39/power-synergy', text: 'Ludum Dare Page' },
                { href: 'https://github.com/TheTurkeyDev/LudumDare39', text: 'Source Code' }
            ]}
            videos={[
                { title: 'TimeLapse', url: 'QAds-HlyJ70' },
            ]}
        >
            <Body1>
                This game was made for ludum dare 39! After not competing in
                the last Ludum Dare do to my college schedule, I spent a lot
                of time, probably more than any other Ludum Dare, to create
                this game for LD 39. Welcome to power Synergy! A turn based
                game where you try to outwit you opponent (A Computer for
                the moment) by collecting and assigning power to robot units
                in order to destroy the opposing army. More infomarion is
                included in the ingame help screen.
            </Body1>
        </ProjectWrapper>
    );
}
