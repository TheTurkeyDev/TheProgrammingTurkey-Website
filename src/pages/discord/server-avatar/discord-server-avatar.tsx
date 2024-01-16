import { useState } from 'react';
import { Calendar } from '../../../components/calendar/calendar';
import { AddEvent } from './add-event';
import { AvatarChangeEvent } from './avatar-change-event';

export const DiscordServerAvatar = () => {

    const [clickedDate, setClickedDate] = useState<Date>();

    const addEvent = (event: AvatarChangeEvent) => {

    };

    return (
        <div style={{ height: '100%' }}>
            <Calendar onDayClick={setClickedDate} />
            {!!clickedDate && <AddEvent show={!!clickedDate} requestClose={() => setClickedDate(undefined)} date={clickedDate} addEvent={addEvent} />}
        </div>
    );
};