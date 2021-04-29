import { ProjectWrapper } from '../../components/project-wrapper';

export function WitherCrumbs() {
    return (
        <ProjectWrapper
            title='Withercrumbs'
            subTittle='Minecraft Mod'
            links={[
                { href: 'https://www.curseforge.com/minecraft/mc-mods/withercrumbs', text: 'Info Page and Download' },
                { href: 'https://github.com/TheTurkeyDev/WitherCrumbs', text: 'Source Code' }
            ]}
            videos={[]}
        >
            <p>
                Withercrumbs is an addon mod to the Headcrumbs mod that adds
                reskins the Wither boss to various player's skins. The
                original idea from the mod came from the Twitch Streamer
                Wyld and was built as a entertainment type aspect to make
                the withers more fun to play around with. This mod is also
                the reason I maintain the Headcrumbs mod.
            </p>
        </ProjectWrapper>
    );
}
