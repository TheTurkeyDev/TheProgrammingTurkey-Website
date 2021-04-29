import { ProjectWrapper } from '../../components/project-wrapper';

export function HeadCrumbs() {
    return (
        <ProjectWrapper
            title='Headcrumbs'
            subTittle='Minecraft Mod'
            links={[
                { href: 'https://www.curseforge.com/minecraft/mc-mods/headcrumbs', text: 'Info Page and Download' },
                { href: 'https://github.com/ganymedes01/Headcrumbs', text: 'Source Code' }
            ]}
            videos={[]}
        >
            <p>
                Headcrumbs is a mod intially written and maintained by
                gamnymedes01. I took over maintaining the mod in early 2017.
                Since then I have been porting the mod to newer versions and
                imporiving the code. I have not really added any new
                features do to lack of time and wanting to keep the mod in
                it's current state since it isn't my project and vision.
            </p>
            <p>
                The mod mainly adds both enemy entities that are skinned
                with various player skins as well as additional mobs heads
                that can drop from their respective mobs.
            </p>
        </ProjectWrapper >
    );
}
