import styled from 'styled-components';
import { IconWithPopOver } from '../../../components/pop-over';
import { ChanceCubesRewardNote } from '../../../types/chance-cubes/chance-cubes-reward-note';
import { statusInfo } from './chance-cubes-rewards-status';

type CellWrapperProps = {
    readonly bg: string
}
const CellWrapper = styled.td<CellWrapperProps>`
    background-color: ${({ bg }) => bg};
    border-right: 1px solid #ababab;
    height: 40px;
`;

type ChanceCubesRewardStatusCellProps = {
    readonly notes: readonly ChanceCubesRewardNote[]
    readonly status: number
}

export const ChanceCubesRewardStatusCell = ({ notes, status }: ChanceCubesRewardStatusCellProps) => {
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
                            );
                        })
                    }
                </IconWithPopOver>
            }
        </CellWrapper>
    );
};