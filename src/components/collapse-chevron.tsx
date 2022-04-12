
type CollapseChevronProps = {
    readonly collapsed: boolean
    readonly setCollapsed: (collapsed: boolean) => void
}

export const CollapseChevron = ({ collapsed, setCollapsed }: CollapseChevronProps) => (
    <i className={`clickable fas ${collapsed ? 'fa-chevron-left' : 'fa-chevron-down'}`} onClick={() => setCollapsed(!collapsed)} />
);