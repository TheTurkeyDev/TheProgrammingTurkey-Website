import { PageWrapper } from '../base/page-wrapper';

export const LD35 = () => {
    return (
        <PageWrapper>
            <div className='text-center mr-5 ml-5'>
                <h1 className='mt-2'>Geo Shifter</h1>
                <h3> For LudumDare 35! </h3>
                <p>
                    This game was made for ludum dare 35! Geo Shifter was made
                    using the LibGDX game framwork and it is the 4th Ludum Dare
                    that I have used it in. I was trying to prepare a 3D OpenGL
                    engine for this go around, but I am not quite good enough
                    with all aspects of it to feel comfortable enough to use it
                    for the competition. I also attempted to make a 2D version
                    of the engine and was prepared to use it for the competion,
                    but decided to go with LibGDX after the theme was announced.
                    The goal of the game to survive against hordes of geometric
                    monsters! a more indepth guide and info is available in
                    game. Hope you guys enjoy the game!
                </p>
                <div>
                    <a className='mr-1' href='http://files.theprogrammingturkey.com/index.html?path=ludm_dare/GeoShifter_48hr_Patch_2.jar' target='_blank' rel='noopener noreferrer'>
                        Download
                    </a>
                    |
                    <a className='ml-1 mr-1' href='http://ludumdare.com/compo/ludum-dare-35/?action=preview&uid=24562' target='_blank' rel='noopener noreferrer'>
                        Ludum Dare Page
                    </a>
                    |
                    <a className='ml-1' href='https://github.com/TheTurkeyDev/LudumDare35' target='_blank' rel='noopener noreferrer'>
                        Source Code
                    </a>
                </div>
            </div>
        </PageWrapper>
    );
}
