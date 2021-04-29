import { ProjectWrapper } from '../../components/project-wrapper';

export const LD48 = () => {
    return (
        <ProjectWrapper
            title='Scriptless Pipes'
            subTittle='For LudumDare 48!'
            links={[
                { href: 'https://ld48.theturkey.dev/', text: 'Play The Game' },
                { href: 'https://ldjam.com/events/ludum-dare/48/scriptless-pipes', text: 'Ludum Dare Page' },
                { href: 'https://github.com/TheTurkeyDev/LudumDare48', text: 'Source Code' }
            ]}
            videos={[
                { title: 'Devlog' },
                { title: 'TimeLapse', url: 'OtgwO-7BzoE' },
            ]}
        >
            <p>
                Welcome to Scriptless Pipes!
            </p>
            <p>
                This game was made entirely using only HTML and CSS. Not a single drop of script is contained in this project or was used to make this!
            </p>
            <p>
                The goal of Scriptless Pipes is simply to get to the bottom of the webpage! You utilize the pipes to take you deeper and deep to the various layers of each level.
            </p>
            <p>
                Some levels have additional tasks like flipping levers, or finding/ solving a code before you may progress to the next level.
            </p>
            <p>
                This game works on mobile, (It’s HTML and CSS why wouldn’t it), but I do recommend you use landscape mode to prevent things from getting bunched up and over top of each other.
            </p>
        </ProjectWrapper>
    );
}
