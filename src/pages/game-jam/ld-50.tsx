import { Body1 } from 'gobble-lib-react';
import { ProjectWrapper } from '../../components/project-wrapper';

export const LD50 = () => {
    return (
        <ProjectWrapper
            title={'I\'m Not A Robot'}
            subTittle='For LudumDare 50!'
            links={[
                { href: 'https://games.theturkey.dev/ld50/', text: 'Play The Game' },
                { href: 'https://ldjam.com/events/ludum-dare/50/im-not-a-robot', text: 'Ludum Dare Page' },
                { href: 'https://github.com/TheTurkeyDev/LudumDare50', text: 'Source Code' }
            ]}
            videos={[
                { title: 'Devlog', url: 'KGtvICIY_nk' },
                { title: 'TimeLapse', url: 'dNQhh7RRUNM' },
            ]}
        >
            <Body1>
                We've all been there and we all know the pain when we see a dreaded Captcha pop up on our screen. Yet another check to make sure we aren't a bot. Alas, Captchas seem to be here to stay and new versions seem to pop up all the time, but what if we could make completing Captchas fun? Well that's probably not possible, but I have attempted to do that nonetheless! In this game your whole objective is to correctly answer and complete as many captcha and verification challenge questions as you can. Only stipulation is that you have 30 seconds to do it. Well maybe not quite 30 seconds as every time you answer one right you will have time added to the timer. Get one wrong however and you will have time deducted from the timer! When the timer reaches 0, the page will refresh and you'll start right back here! So how many can you complete?
            </Body1>
        </ProjectWrapper>
    );
};
