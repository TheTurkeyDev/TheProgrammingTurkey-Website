import { BaseTheme, ButtonRow, ContainedButton, Input, InputsWrapper, Subtitle1, TextArea, TextButton } from 'gobble-lib-react';
import { useState } from 'react';
import styled, { ThemeProps } from 'styled-components';
import { CollapseChevron } from '../../../components/collapse-chevron';
import { DiscordRolesGroup } from './discord-roles-group';

const RolesWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
`;

const RolesHeader = styled.div`
    display: grid;
    grid-template-columns: auto auto 1fr auto;
    gap: 8px;
    background-color: ${({ theme }: ThemeProps<BaseTheme>) => theme.surface.color};
    border: 3px solid ${({ theme }: ThemeProps<BaseTheme>) => theme.surface.color};
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    padding: 8px;
    align-items: center;
`;

const RolesContent = styled.div`
    border: 3px solid ${({ theme }: ThemeProps<BaseTheme>) => theme.surface.color};
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 8px;
    align-items: center;
    padding: 8px;
`;

type DiscordRolesOptionsProps = {
    readonly group: DiscordRolesGroup
}
export const DiscordRolesOptions = ({ group }: DiscordRolesOptionsProps) => {
    const [collapsed, setCollapsed] = useState(true);
    return (
        <RolesWrapper>
            <RolesHeader>
                <Subtitle1>Server</Subtitle1>
                <Subtitle1>Channel</Subtitle1>
                <Subtitle1>Name</Subtitle1>
                <CollapseChevron collapsed={collapsed} setCollapsed={setCollapsed} />
            </RolesHeader>
            {
                !collapsed &&
                <RolesContent>
                    <Input label='Name' value={group.name} />
                    <TextArea label='Description' value={group.description} />
                    <div></div>
                    <ButtonRow>
                        <ContainedButton>Save</ContainedButton>
                    </ButtonRow>
                </RolesContent>
            }
        </RolesWrapper>
    );
};