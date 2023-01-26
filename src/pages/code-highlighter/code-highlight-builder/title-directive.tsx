import { Input, InputsWrapper, TextArea } from 'gobble-lib-react';
import styled from 'styled-components';
import { DirectiveBaseDisplay } from './code-highlighter-styles';
import { Directive } from './directive';

const TitleDirectiveWrapper = styled(InputsWrapper)`
    padding: 8px;
`;

export type TitleDirectiveType = Directive & {
    readonly title: string
}

type TitleDirectiveProps = {
    readonly td: TitleDirectiveType
    readonly onDelete: () => void
    readonly onMove: (up: boolean) => void
    readonly update: (td: TitleDirectiveType) => void
}
export const TitleDirective = ({ td, onDelete, onMove, update }: TitleDirectiveProps) => {
    return (
        <DirectiveBaseDisplay onDelete={onDelete} onMove={onMove}>
            <TitleDirectiveWrapper fullWidth={true}>
                <TextArea label='Title' value={td.title} onChange={e => update({ ...td, title: e.target.value })} />
                <Input label='Duration' type='number' value={td.duration} onChange={e => update({ ...td, duration: parseInt(e.target.value) })} />
            </TitleDirectiveWrapper>
        </DirectiveBaseDisplay>
    );
};