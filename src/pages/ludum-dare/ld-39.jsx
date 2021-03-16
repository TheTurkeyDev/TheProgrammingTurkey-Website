import { PageWrapper } from '../base/page-wrapper';

export function LD39() {
    return (
        <PageWrapper>
            <div className='text-center mr-5 ml-5'>
                <h1 className='mt-2'>Power Synergy</h1>
                <h3> For LudumDare 39! </h3>
                <p>
                    This game was made for ludum dare 39! After not competing in
                    the last Ludum Dare do to my college schedule, I spent a lot
                    of time, probably more than any other Ludum Dare, to create
                    this game for LD 39. Welcome to power Synergy! A turn based
                    game where you try to outwit you opponent (A Computer for
                    the moment) by collecting and assigning power to robot units
                    in order to destroy the opposing army. More infomarion is
                    included in the ingame help screen.
                </p>
                <div>
                    <a className='mr-1' href='http://files.theprogrammingturkey.com/index.html?path=ludm_dare/Power_Synergy_48hr_Patch_2.jar'>
                        Download
                    </a>
                    |
                    <a className='ml-1 mr-1' href='' onClick={() => window.open('https://ldjam.com/events/ludum-dare/39/power-synergy')}>
                        Ludum Dare Page
                    </a>
                    |
                    <a className='ml-1' href='' onClick={() => window.open('https://github.com/TheTurkeyDev/LudumDare39')}>
                        Source Code
                    </a>
                </div>
                <div className='mt-3'>
                    <h1>TimeLapse!</h1>
                    <iframe
                        width='560'
                        height='315'
                        src='https://www.youtube.com/embed/QAds-HlyJ70'
                        frameBorder='0'
                        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </PageWrapper>
    );
}
