import { Body1 } from 'gobble-lib-react';
import { ProjectWrapper } from '../../components/project-wrapper';

export const LD31 = () => {
    return (
        <ProjectWrapper
            title='Game Evolution'
            subTittle='For LudumDare 31!'
            links={[
                { href: 'https://www.dropbox.com/s/wllmok9e5gs28zq/LD31.jar?dl=0', text: 'Download' },
                { href: 'http://ludumdare.com/compo/ludum-dare-31/?action=preview&uid=24562', text: 'Ludum Dare Page' },
                { href: 'https://github.com/TheTurkeyDev/LudumDare31', text: 'Source Code' }
            ]}
            videos={[]}
        >
            <Body1>
                This game was made for ludum dare 31! Welcome to Game
                Evolution! What is Game Evolution you may ask? Well Game
                evolution was made in 48 hours (Only about 10 actual hours
                of development in that 48 hour window) and combines a few of
                the the first arcade games that we know. The object of the
                game is to simply beat each arcade game and move onto the
                next!
            </Body1>
        </ProjectWrapper>
    );
};
