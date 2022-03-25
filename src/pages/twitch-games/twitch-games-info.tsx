import { Body1 } from '@theturkeydev/gobble-lib-react';
import { ContainedList, ContainedListItem } from '../../components/contained-list';
import { ProjectWrapper } from '../../components/project-wrapper';


export const TwitchGamesProject = () => {
    return (
        <ProjectWrapper
            title='Twitch Games'
            subTittle='Stream Games'
            links={[]}
            videos={[]}
        >
            <Body1>
                Twitch games allows streamers to play interactive games with chat! Similar to the concept as words on stream.
                Originally made to allow for viewers to passively play hangman on my stream while I'm streaming, I have since
                expanded this to also include 2 other games, Battleship, and Rock, Paper, Scissors. The goal is to have all
                the games work with both channel points and via chat, but currently is a bit hodge podged. Each individual game is
                under restricted access, but if this is something you are interested in using/ trying out, please reach out to @turkeydev!
            </Body1>
            <ContainedList title='Games'>
                <ContainedListItem>
                    <Body1>Hangman</Body1>
                </ContainedListItem>
                <ContainedListItem>
                    <Body1>Battleship</Body1>
                </ContainedListItem>
                <ContainedListItem>
                    <Body1>Rock, Paper, Scissors</Body1>
                </ContainedListItem>
            </ContainedList>
        </ProjectWrapper>
    );
};
