import { ProjectWrapper } from '../../components/project-wrapper';

export const LD27 = () => {
    return (
        <ProjectWrapper
            title='Flash Memory'
            subTittle='For LudumDare 27!'
            links={[
                { href: '', text: 'Download Coming Soon!' },
                { href: 'http://ludumdare.com/compo/ludum-dare-27/?action=preview&uid=24562', text: 'Ludum Dare Page' }
            ]}
            videos={[]}
        >
            <p>
                This game was made for ludum dare 27! The object of the game
                is to memorize the 25 cards as best as you can. Then when
                the 10 seconds of the memorizing period is over you will be
                asked 10 hard questions about what you saw. This was my
                first Ludum Dare and I was only an amature java coder!
            </p>
            <p>
                Due to new java policies and securities this game will no
                longer work as an applet so I will convert it to a
                downloadable file. To run the game simply execute the exe
                file in the zip.
            </p>
        </ProjectWrapper>
    );
}
