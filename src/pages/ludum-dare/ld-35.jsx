import { ProjectWrapper } from '../../components/project-wrapper';

export const LD35 = () => {
    return (
        <ProjectWrapper
            title='Geo Shifter'
            subTittle='For LudumDare 35!'
            links={[
                { href: 'http://files.theprogrammingturkey.com/index.html?path=ludm_dare/GeoShifter_48hr_Patch_2.jar', text: 'Download' },
                { href: 'http://ludumdare.com/compo/ludum-dare-35/?action=preview&uid=24562', text: 'Ludum Dare Page' },
                { href: 'https://github.com/TheTurkeyDev/LudumDare35', text: 'Source Code' }
            ]}
            videos={[]}
        >
            <p>
                This game was made for ludum dare 35! Geo Shifter was made
                using the LibGDX game framwork and it is the 4th Ludum Dare
                that I have used it in. I was trying to prepare a 3D OpenGL
                engine for this go around, but I am not quite good enough
                with all aspects of it to feel comfortable enough to use it
                for the competition. I also attempted to make a 2D version
                of the engine and was prepared to use it for the competion,
                but decided to go with LibGDX after the theme was announced.
                The goal of the game to survive against hordes of geometric
                monsters! a more indepth guide and info is available in
                game. Hope you guys enjoy the game!
            </p>
        </ProjectWrapper>
    );
}
