import { Body1 } from 'gobble-lib-react';
import { ProjectWrapper } from '../../components/project-wrapper';


export const LD47 = () => {
    return (
        <ProjectWrapper
            title='A Timed Loop'
            subTittle='For LudumDare 47!'
            links={[
                { href: 'https://turkeydev.itch.io/a-timed-loop', text: 'Download' },
                { href: 'https://ldjam.com/events/ludum-dare/47/a-timed-loop', text: 'Ludum Dare Page' },
                { href: 'https://github.com/TheTurkeyDev/LudumDare47', text: 'Source Code' }
            ]}
            videos={[
                { title: 'Devlog', url: 'O3uM_OytnlM' },
                { title: 'TimeLapse', url: 'R-_M3WDOAuQ' },
            ]}
        >
            <Body1>
                My first game ludum dare where I made a game and didn't
                program it in Java! This time around we gave C# and Monogame
                a shot! Overall, I thought it went well. For once, I
                actually didn't overscope. On the other hand though, I think
                that the game lacked features and had a very small feature
                set. Art and sounds were good this time, better than past
                attempts in my opinion. End of the day, I feel good and I
                think that this is one of my more complete and fluid games
                I've made.
            </Body1>
            <Body1>
                So C# or Java? LibGDX or Monogame? Well.... I still like
                Java a bit more, but honestly Monogame was much better...
                Not sure what I'll use going forward.
            </Body1>
        </ProjectWrapper>
    );
};
