import { PageWrapper } from '../base/page-wrapper';

export const LD28 = () => {
    return (
        <PageWrapper>
            <div className='text-center mr-5 ml-5'>
                <h1 className='mt-2'>Ninja Thief</h1>
                <h3> For LudumDare 28! </h3>
                <p>This game was made for ludum dare 28!</p>
                <p>- To move use WASD.</p>
                <p>- To fire the gun use the space bar.</p>
                <p>
                    Due to new java policies and securities this game will no
                    longer work as an applet so i will convert it to a
                    downloadable file. To run the game simply execute the exe
                    file in the zip.
                </p>
                <div>
                    <a className='mr-1'>
                        Download Coming Soon!
                    </a>
                    |
                    <a className='ml-1 mr-1' href='http://ludumdare.com/compo/ludum-dare-28/?action=preview&uid=24562' target='_blank' rel='noopener noreferrer'>
                        Ludum Dare Page
                    </a>
                    |
                    <a className='ml-1' href='https://github.com/TheTurkeyDev/LudumDare28' target='_blank' rel='noopener noreferrer'>
                        Source Code
                    </a>
                </div>
            </div>
        </PageWrapper>
    );
}
