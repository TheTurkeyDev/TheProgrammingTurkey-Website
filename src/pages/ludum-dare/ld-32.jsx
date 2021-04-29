import { ProjectWrapper } from '../../components/project-wrapper';

export const LD32 = () => {
    return (
        <ProjectWrapper
            title='Unconventional Dungeon'
            subTittle='For LudumDare 32!'
            links={[
                { href: 'https://www.dropbox.com/s/frl19eo272tc7f8/LD32.jar?dl=0', text: 'Download' },
                { href: 'http://ludumdare.com/compo/ludum-dare-32/?action=preview&uid=24562', text: 'Ludum Dare Page' },
                { href: 'https://github.com/TheTurkeyDev/LudumDare32', text: 'Source Code' }
            ]}
            videos={[]}
        >
            <p>
                This game was made for ludum dare 32! Unconventional Dungeon
                was my first Ludum Dare game where I used an outside library
                (LibGDX) and I am very happy with how the game turned out.
                The game resembles that of a Binding of Isaac style of game
                play where the goal is to navigate your way through each of
                the 4 paths and kill the boss at the end of each path. The
                theme of "Unconventional Weapon" was incorporated through
                what other than the weapons! You start out with a nifty
                spoon and if you gain enough gold you can upgrade that spoon
                into a severed limb. Give the game a try and let me know
                what you think!
            </p>
        </ProjectWrapper>
    );
}
