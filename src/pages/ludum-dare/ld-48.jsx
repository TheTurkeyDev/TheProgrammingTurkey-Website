import { PageWrapper } from '../base/page-wrapper';

export const LD48 = () => {
    return (
        <PageWrapper>
            <div className='text-center mr-5 ml-5'>
                <h1 className='mt-2'>Scriptless Pipes</h1>
                <h3> For LudumDare 48! </h3>
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
                <div>
                    <a className='mr-1' href='https://ld48.theturkey.dev/' target='_blank' rel='noopener noreferrer'>
                        Play The Game
                    </a>
                    |
                    <a className='ml-1 mr-1' href='https://ldjam.com/events/ludum-dare/48/scriptless-pipes' target='_blank' rel='noopener noreferrer'>
                        Ludum Dare Page
                    </a>
                    |
                    <a className='ml-1' href='https://github.com/TheTurkeyDev/LudumDare48' target='_blank' rel='noopener noreferrer'>
                        Source Code
                    </a>
                </div>
                <div className='mt-3'>
                    <h1>Devlog</h1>
                    <span>Coming Soon!</span>
                </div>
                <div className='mt-3'>
                    <h1>TimeLapse!</h1>
                    <iframe
                        width='560'
                        height='315'
                        src='https://www.youtube.com/embed/OtgwO-7BzoE'
                        frameBorder='0'
                        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </PageWrapper>
    );
}
