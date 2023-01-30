import { Icon } from './icon';

type CollapseChevronProps = {
    readonly collapsed: boolean
    readonly setCollapsed: (collapsed: boolean) => void
}

export const CollapseChevron = ({ collapsed, setCollapsed }: CollapseChevronProps) => (
    <Icon name={collapsed ? 'fa-chevron-left' : 'fa-chevron-down'} onClick={() => setCollapsed(!collapsed)} />
);