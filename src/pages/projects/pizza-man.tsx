import { Body1 } from 'gobble-lib-react';
import { ProjectWrapper } from '../../components/project-wrapper';

export const PizzaMan = () => {
    return (
        <ProjectWrapper
            title='Pizza Man'
            subTittle='Test game'
            links={[
                { href: 'http://www.mediafire.com/file/69blf3oc7a5bgpo/PizzaMan.jar', text: 'Download' }
            ]}
            videos={[]}
        >
            <Body1>
                Pizza man was created as a test game before Ludum Dare and
                is based off of the classic game of PAC-Man. Feel free to
                download it and tell me how you enjoy it!
            </Body1>
        </ProjectWrapper>
    );
};
