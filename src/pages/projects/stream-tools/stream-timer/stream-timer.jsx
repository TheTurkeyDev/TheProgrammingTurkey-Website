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
            <span>
                Stream timer is a system that allows streams to add timers to their stream! This tool is currently in beta!
                If this is something you are interested in using/ trying out, please reach out to @turkeydev!
            </span>
            <span>
                Users can create as many different timers as they please!
                Display message, end message, color, and font size 100% customizable!
            </span>
            <ContainedList title='Timer Types'>
                <ContainedListItem>Countdown To Date</ContainedListItem>
                <ContainedListItem>Countup From Date</ContainedListItem>
                <ContainedListItem>Countdown Timer</ContainedListItem>
                <ContainedListItem>Countup Timer</ContainedListItem>
            </ContainedList>
        </ProjectWrapper>
    );
}
