type CircleLoadingBarProps = {
    readonly percentage: number
    readonly color: string
}

export const CircleLoadingBar = ({ percentage, color }: CircleLoadingBarProps) => {
    const pct = Math.min(Math.max(0, percentage), 100);

    const genCircle = (percent: number, color: string) => {
        const r = 70;
        const circ = 2 * Math.PI * r;
        const strokePct = ((100 - percent) * circ) / 100;
        return (
            <circle
                r={r}
                cx={100}
                cy={100}
                fill='transparent'
                stroke={strokePct !== circ ? color : ''} // remove colour as 0% sets full circumference
                strokeWidth='1rem'
                strokeDasharray={circ}
                strokeDashoffset={percent ? strokePct : 0}
                strokeLinecap='round'
            ></circle>
        );
    };

    return (
        <svg width='100%' height='100%' preserveAspectRatio='xMinYMid meet' viewBox='0 0 200 200'>
            <g transform={`rotate(-90 ${'100 100'})`}>
                {genCircle(0, 'lightgrey')}
                {genCircle(pct, color)}
            </g>
            <text
                x='50%'
                y='50%'
                dominantBaseline='central'
                textAnchor='middle'
                fontSize='3em'
                fontWeight='bolder'
            >
                {pct}%
            </text>
        </svg>
    );
};