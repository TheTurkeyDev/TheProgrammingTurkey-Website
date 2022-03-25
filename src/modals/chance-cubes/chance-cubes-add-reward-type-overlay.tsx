import { ContainedButton } from '@theturkeydev/gobble-lib-react';
import { EventType } from '../../types/chance-cubes/chance-cubes-event-type';
import { Mapped } from '../../types/mapped';

const events: readonly EventType[] = [
    { display: 'Block Event', code: 'Block' },
    { display: 'Message Event', code: 'Message' },
    { display: 'Entity Event', code: 'Entity' },
    { display: 'Experience Event', code: 'Experience' },
    { display: 'Item Event', code: 'Item' },
    { display: 'Command Event', code: 'Command' },
    { display: 'Potion Event', code: 'Potion' },
    { display: 'Sound Event', code: 'Sound' },
    { display: 'Schematic Event', code: 'Schematic' },
    { display: 'Chest Event', code: 'Chest' },
    { display: 'Particle Event', code: 'Particle' },
    { display: 'Status Event', code: 'Status' },
    { display: 'UI Event', code: 'Title' },
    { display: 'Block Area Event', code: 'Area' },
];

type ChanceCubesAddRewardTypeModalProps = {
    readonly show: boolean
    readonly requestClose: () => void
    readonly json: Mapped
    readonly add: (event: EventType) => void
}
export const ChanceCubesAddRewardTypeModal = ({ show, requestClose, json, add }: ChanceCubesAddRewardTypeModalProps) => {
    const onEventPick = (event: EventType) => {
        add(event);
        requestClose();
    };

    return (
        <div className='container'>
            <div className='row'>
                <h2 className='col-auto mx-auto' style={{ textDecoration: 'underline' }}>
                    Add Event
                </h2>
            </div>
            {
                events.filter(event => !json[event.code]).map(event => (
                    <div key={event.code} className='row'>
                        <ContainedButton className='col-auto mx-auto mt-1 mb-2' onClick={() => onEventPick(event)}>
                            {event.display}
                        </ContainedButton>
                    </div>
                ))
            }
        </div>
    );
};
