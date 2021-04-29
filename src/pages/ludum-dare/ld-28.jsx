import { ProjectWrapper } from '../../components/project-wrapper';

export const LD28 = () => {
    return (
        <ProjectWrapper
            title='Ninja Thief'
            subTittle='For LudumDare 28!'
            links={[
                { href: '', text: 'Download Coming Soon!' },
                { href: 'http://ludumdare.com/compo/ludum-dare-28/?action=preview&uid=24562', text: 'Ludum Dare Page' },
                { href: 'https://github.com/TheTurkeyDev/LudumDare28', text: 'Source Code' }
            ]}
            videos={[]}
        >
            <p>- To move use WASD.</p>
            <p>- To fire the gun use the space bar.</p>
            <p>
                Due to new java policies and securities this game will no
                longer work as an applet so i will convert it to a
                downloadable file. To run the game simply execute the exe
                file in the zip.
            </p>
        </ProjectWrapper>
    );
}
