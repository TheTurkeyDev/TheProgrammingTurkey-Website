import { Body1 } from '@theturkeydev/gobble-lib-react';
import { ProjectWrapper } from '../../components/project-wrapper';

export const LD34 = () => {
    return (
        <ProjectWrapper
            title='Turkeyconn Simulator 2016'
            subTittle='For LudumDare 34!'
            links={[
                { href: 'https://www.dropbox.com/s/0dvnlsvj4rzwt85/Turkeyconn%20Sim%20LD34.jar?dl=0&preview=Turkeyconn+Sim+LD34.jar', text: 'Download' },
                { href: 'http://ludumdare.com/compo/ludum-dare-34/?action=preview&uid=24562', text: 'Ludum Dare Page' },
                { href: 'https://github.com/TheTurkeyDev/LudumDare34', text: 'Source Code' }
            ]}
            videos={[
                { title: 'TimeLapse', url: '01lhNBa5Mno' },
            ]}
        >
            <Body1>
                This game was made for ludum dare 34! Turkeyconn Simulator
                2016 was my eigth Ludum Dare game and third using the LibGDX
                game library! This game revolves around you managing your
                smart phone producing factory! Controll workers to train,
                build and manage machines to help you make the most product.
                Each machine has it's own function in the phone making
                process and require workers to transport each machines raw
                materials for further use. For more information read the in
                game help screen. Hope you guys enjoy this game!
            </Body1>
        </ProjectWrapper>
    );
};
