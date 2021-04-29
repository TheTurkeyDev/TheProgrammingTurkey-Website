import { ProjectWrapper } from '../../components/project-wrapper';

export const LD33 = () => {
    return (
        <ProjectWrapper
            title='God-Kill-A'
            subTittle='For LudumDare 33!'
            links={[
                { href: 'https://www.dropbox.com/s/uf6jy3n7zm76o8s/GodKillA_%28LD33%29.jar?dl=0', text: 'Download' },
                { href: 'http://ludumdare.com/compo/ludum-dare-33/?action=preview&uid=24562', text: 'Ludum Dare Page' },
                { href: 'https://github.com/TheTurkeyDev/LudumDare33', text: 'Source Code' }
            ]}
            videos={[
                { title: 'TimeLapse', url: 'Dq9RVRzxaWs' },
            ]}
        >
            <p>
                This game was made for ludum dare 33! God-Kill-A was made in
                Java just like the previous 6 games and this is also the
                second game to use the LibGDX game library. The Game centers
                around you being God-Zil-A, terrorizing the town. Your goal
                is to stomp, burn, a demolish as much o9f the approaching
                millitary as you can! The game is round/level based and gets
                harder as the game progresses. How long can you survive?
            </p>
        </ProjectWrapper>
    );
}
