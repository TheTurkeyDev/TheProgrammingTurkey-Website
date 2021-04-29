import { ProjectWrapper } from '../../components/project-wrapper';

export const LD30 = () => {
    return (
        <ProjectWrapper
            title='World Swap'
            subTittle='For LudumDare 30!'
            links={[
                { href: 'http://www.mediafire.com/download/prpdq6htmbaamv9/LudumDare30.jar', text: 'Download' },
                { href: 'http://ludumdare.com/compo/ludum-dare-30/?action=preview&uid=24562', text: 'Ludum Dare Page' },
                { href: 'https://github.com/TheTurkeyDev/LudumDare30', text: 'Source Code' }
            ]}
            videos={[
                { title: 'TimeLapse', url: '24gAKppkGe0' },
            ]}
        >
            <p>
                This game was made for ludum dare 30! This is World Swap!
                The point of the game is to solve each level by swapping
                between 2 worlds! Some things to note: the beginning tile is
                safe on both worlds, so you can freely swap between worlds
                on those tiles. Hope you guys enjoy the game! Time Lapse
                coming soon!
            </p>
            <div>
                <ul>
                    Some help full tips:
                    <li>
                        Pressing shift in the level select will unlock all
                        of the levels if you want to play them that way
                    </li>
                    <li>
                        There are also a few Easter eggs! See if you can
                        find them!
                    </li>
                </ul>
            </div>
        </ProjectWrapper>
    );
}
