import { ContainedList } from '../../../../components/contained-list';
import { ProjectWrapper } from '../../../../components/project-wrapper';
import { AnimationDemo } from './animation-demo';
export const StreamAnimationsOverlay = () => {
    return (
        <ProjectWrapper
            title='Animated Stream Overlay'
            subTittle=''
            links={[]}
            videos={[]}
        >
            <span>
                Animated Stream Overlay allows streamers to add little animations to their stream video that trigger when redeemed via channel points!
                This tool is currently in beta! If this is something you are interested in using/ trying out, please reach out to @turkeydev!
            </span>
            <ContainedList title='Current Animations' gap={16}>
                <AnimationDemo name='Halloween' id='halloween_1' />
                <AnimationDemo name='Snowflakes' id='snowflake_1' />
                <AnimationDemo name='Christams Lights' id='christmas_lights_1' />
            </ContainedList>
        </ProjectWrapper>
    );
}
