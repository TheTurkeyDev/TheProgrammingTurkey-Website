import { Body1 } from 'gobble-lib-react';
import { ProjectWrapper } from '../../components/project-wrapper';

export const FPDStats = () => {
    return (
        <ProjectWrapper
            title='FPDStats'
            subTittle='Hockey Stat Tracker'
            links={[]}
            videos={[]}
        >
            <Body1>
                FPD Stats was a Project I worked on and off with for about 2 years.
                The idea behind the project behind the project was to allow anyone to able
                to run a game and provide a live stat feed of the game to everyone as well
                as act as a game stat saving system. This project was initially started as
                a Python, Flask backend and vanilla JS frontend. As I started to lean React
                though, the front endwas slowly ported over to it.
            </Body1>
            <Body1>
                This project was publicly hosted for a short time, but I have since turned off
                the server to save cost, but I do still have the fpdstats.com domain. Maybe
                one day this project will come back.
            </Body1>
        </ProjectWrapper>
    );
};
