import { Body1 } from 'gobble-lib-react';
import { ProjectWrapper } from '../../components/project-wrapper';

export const LD28 = () => {
    return (
        <ProjectWrapper
            title='Ninja Thief'
            subTittle='For LudumDare 28!'
            links={[
                { href: 'ld28', text: 'Download Coming Soon!' },
                { href: 'http://ludumdare.com/compo/ludum-dare-28/?action=preview&uid=24562', text: 'Ludum Dare Page' },
                { href: 'https://github.com/TheTurkeyDev/LudumDare28', text: 'Source Code' }
            ]}
            videos={[]}
        >
            <Body1>- To move use WASD.</Body1>
            <Body1>- To fire the gun use the space bar.</Body1>
            <Body1>
                Due to new java policies and securities this game will no
                longer work as an applet so i will convert it to a
                downloadable file. To run the game simply execute the exe
                file in the zip.
            </Body1>
        </ProjectWrapper>
    );
};
