import { Body1 } from '@theturkeydev/gobble-lib-react';
import { ProjectWrapper } from '../../components/project-wrapper';

export const LD29 = () => {
    return (
        <ProjectWrapper
            title='Maze Sweeper'
            subTittle='For LudumDare 29!'
            links={[
                { href: 'https://www.dropbox.com/s/uw2inytg54vjke2/Turkey2349%20LD29.zip', text: 'Download' },
                { href: 'http://ludumdare.com/compo/ludum-dare-29/?action=preview&uid=24562', text: 'Ludum Dare Page' },
                { href: 'https://github.com/TheTurkeyDev/LudumDare29', text: 'Source Code' }
            ]}
            videos={[]}
        >
            <Body1>
                This game was made for ludum dare 29! The object of the game
                is to solve the maze. Simple enough, but the maze is hidden
                beneath the tiles! In order to solve the maze you have to
                click the tiles to reveal the maze, but be careful because
                you only get a certain amount of clicks To reveal the maze
                with! Due to new java policies and securities I was not able
                to make this game an applet so there for you must download
                it. To run the game simply execute the exe file in the zip.
            </Body1>
        </ProjectWrapper>
    );
};
