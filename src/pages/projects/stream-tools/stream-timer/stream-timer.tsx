import { Body1 } from '@theturkeydev/gobble-lib-react';
import { ContainedList, ContainedListItem } from '../../../../components/contained-list';
import { ProjectWrapper } from '../../../../components/project-wrapper';

export const StreamTimer = () => {
    return (
        <ProjectWrapper
            title='Stream Timer'
            subTittle=''
            links={[]}
            videos={[]}
        >
            <Body1>
                Stream timer is a system that allows streams to add timers to their stream! This tool is currently in beta!
                If this is something you are interested in using/ trying out, please reach out to @turkeydev!
            </Body1>
            <Body1>
                Users can create as many different timers as they please!
                Display message, end message, color, and font size 100% customizable!
            </Body1>
            <ContainedList title='Timer Types'>
                <ContainedListItem>
                    <Body1>Countdown To Date</Body1>
                </ContainedListItem>
                <ContainedListItem>
                    <Body1>Countup From Date</Body1>
                </ContainedListItem>
                <ContainedListItem>
                    <Body1>Countdown Timer</Body1>
                </ContainedListItem>
                <ContainedListItem>
                    <Body1>Countup Timer</Body1>
                </ContainedListItem>
            </ContainedList>
        </ProjectWrapper>
    );
};
