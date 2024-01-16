import { Body1, ButtonRow, ContainedButton, Headline3, Input, InputsWrapper, Modal, Option, OutlinedButton, Select, Subtitle1, ToggleSwitch } from 'gobble-lib-react';
import { months } from '../../../components/calendar/calendar';
import { useState } from 'react';
import styled from 'styled-components';
import { AvatarChangeEvent, RepeatType } from './avatar-change-event';

const ModalWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
    justify-items: center;
`;

const formatDate = (d: Date) => {
    var month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
};

type AddEventProps = {
    readonly show: boolean
    readonly requestClose: () => void
    readonly date: Date
    readonly addEvent: (event: AvatarChangeEvent) => void
}

export const AddEvent = ({ show, requestClose, date }: AddEventProps) => {

    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState(formatDate(date));
    const [endDate, setEndDate] = useState(formatDate(date));
    const [file, setFile] = useState('');
    const [priority, setPriority] = useState(0);
    const [repeats, setRepeats] = useState(RepeatType.NONE);

    return (
        <Modal show={show} requestClose={requestClose}>
            <ModalWrapper>
                <Headline3>Schedule Avatar</Headline3>
                <Subtitle1>{months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}</Subtitle1>
                <InputsWrapper>
                    <Input label='Name' type='text' value={name} onChange={e => setName(e.target.value)} />
                    <Input label='Start' type='date' value={startDate} onChange={e => setStartDate(e.target.value)} />
                    <Input label='End' type='date' value={endDate} onChange={e => setEndDate(e.target.value)} />
                    <Input label='File' type='text' value={file} onChange={e => setFile(e.target.value)} />
                    <Input label='Priority' type='number' value={priority} onChange={e => setPriority(parseInt(e.target.value))} />
                    <ToggleSwitch label='Repeats' checked={repeats !== RepeatType.NONE} onClick={() => setRepeats(repeats !== RepeatType.NONE ? RepeatType.NONE : RepeatType.WEEKLY)} />
                    {repeats !== RepeatType.NONE &&
                        <Select label='Occurrence'>
                            <Option value={RepeatType.WEEKLY}>Weekly</Option>
                            <Option value={RepeatType.BI_WEEKLY}>Bi-Weekly</Option>
                            <Option value={RepeatType.MONTHLY}>Monthly</Option>
                            <Option value={RepeatType.QUARTERLY}>Quarterly</Option>
                            <Option value={RepeatType.YEARLY}>Yearly</Option>
                        </Select>
                    }
                </InputsWrapper>
                <ButtonRow style={{ justifySelf: 'end' }}>
                    <OutlinedButton onClick={requestClose}>Cancel</OutlinedButton>
                    <ContainedButton>Add</ContainedButton>
                </ButtonRow>
            </ModalWrapper>
        </Modal>
    );
};