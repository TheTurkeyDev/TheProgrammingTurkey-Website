import { ContainedButton, Headline3, Modal, OutlinedButton } from '@theturkeydev/gobble-lib-react';
import styled from 'styled-components';
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

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 4px;
    justify-items: center;
`;

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
        <Modal show={show} requestClose={requestClose}>
            <Wrapper>
                <Headline3 style={{ textDecoration: 'underline' }}>
                    Add Event
                </Headline3>
                {
                    events.filter(event => !json[event.code]).map(event => (
                        <ContainedButton key={event.code} onClick={() => onEventPick(event)}>
                            {event.display}
                        </ContainedButton>
                    ))
                }
                <OutlinedButton onClick={() => requestClose()}>
                    Cancel
                </OutlinedButton>
            </Wrapper>
        </Modal>
    );
};
