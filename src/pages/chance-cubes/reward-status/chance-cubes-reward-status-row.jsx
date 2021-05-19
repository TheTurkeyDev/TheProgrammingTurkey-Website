import styled from 'styled-components';
import { IconWithPopOver } from '../../../components/pop-over';
import { statusInfo } from './chance-cubes-rewards-status';

const CellWrapper = styled.td`
    background-color: ${props => props.bg};
    border-right: 1px solid #ababab;
    height: 40px;
`

export const ChanceCubesRewardStatusCell = ({ notes, status }) => {
    return (
        <CellWrapper bg={statusInfo[status]['bg']}>
            {
                notes.length > 0 &&
                <IconWithPopOver icon='fas fa-info-circle' direction='left'>
                    {
                        notes.map(note => {
                            const date = new Date(note.date);
                            return (
                                <div key={date.toUTCString()}>
                                    <div className='w-100 text-left pl-2' style={{ color: '#b9b9b9' }}>
                                        {date.toUTCString()}
                                    </div>
                                    <div className='w-100 text-center pl-4 pr-4'>
                                        {note.note}
                                    </div>
                                </div>
                            )
                        })
                    }
                </IconWithPopOver>
            }
        </CellWrapper>
    )
}