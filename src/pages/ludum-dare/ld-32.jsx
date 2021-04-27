import { PageWrapper } from '../base/page-wrapper';

export const LD32 = () => {
    return (
        <PageWrapper>
            <div className='text-center mr-5 ml-5'>
                <h1 className='mt-2'>Unconventional Dungeon</h1>
                <h3> For LudumDare 32! </h3>
                <p>
                    This game was made for ludum dare 32! Unconventional Dungeon
                    was my first Ludum Dare game where I used an outside library
                    (LibGDX) and I am very happy with how the game turned out.
                    The game resembles that of a Binding of Isaac style of game
                    play where the goal is to navigate your way through each of
                    the 4 paths and kill the boss at the end of each path. The
                    theme of "Unconventional Weapon" was incorporated through
                    what other than the weapons! You start out with a nifty
                    spoon and if you gain enough gold you can upgrade that spoon
                    into a severed limb. Give the game a try and let me know
                    what you think!
                </p>
                <div>
                    <a className='mr-1' href='https://www.dropbox.com/s/frl19eo272tc7f8/LD32.jar?dl=0' target='_blank' rel='noopener noreferrer'>
                        Download
                    </a>
                    |
                    <a className='ml-1 mr-1' href='http://ludumdare.com/compo/ludum-dare-32/?action=preview&uid=24562' target='_blank' rel='noopener noreferrer'>
                        Ludum Dare Page
                    </a>
                    |
                    <a className='ml-1' href='https://github.com/TheTurkeyDev/LudumDare32' target='_blank' rel='noopener noreferrer'>
                        Source Code
                    </a>
                </div>
            </div>
        </PageWrapper>
    );
}
