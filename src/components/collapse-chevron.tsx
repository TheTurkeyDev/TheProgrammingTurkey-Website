import { Icon } from 'gobble-lib-react';

type CollapseChevronProps = {
    readonly collapsed: boolean
    readonly setCollapsed: (collapsed: boolean) => void
}

export const CollapseChevron = ({ collapsed, setCollapsed }: CollapseChevronProps) => (
    <Icon className={collapsed ? 'fa-chevron-left' : 'fa-chevron-down'} onClick={() => setCollapsed(!collapsed)} />
);