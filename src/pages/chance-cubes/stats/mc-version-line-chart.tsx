import { ChanceCubesStats } from '../../../types/chance-cubes/chance-cubes-stats';
import { versionCompare } from './chart-helper';
import { ReactChart } from 'chartjs-react';
import { Loading } from 'gobble-lib-react';

type MCVersionLineChartProps = {
    readonly stats?: ChanceCubesStats
    readonly getColorForKey: (key: string) => string
}
export const MCVersionLineChart = ({ stats, getColorForKey }: MCVersionLineChartProps) => {
    if (!stats)
        return <Loading />;

    const filtered = Object.keys(stats.mc_versions).sort(versionCompare).filter(k => k !== 'All');
    const dataset = filtered.map(key => {
        const keyData = stats.mc_versions[key].map((_, i) => stats.mc_versions[key][i] / stats.mc_versions['All'][i]);
        return {
            label: key,
            fill: false,
            backgroundColor: getColorForKey(key),
            borderColor: getColorForKey(key),
            data: keyData,
        };
    });

    return (
        <ReactChart
            type='line'
            data={{
                labels: [...stats.dates],
                datasets: dataset,
            }}
            options={{
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: 'rgb(217, 217, 217)',
                        },
                    },
                },
                scales: {
                    y: {
                        grid: {
                            color: 'rgba(50, 50, 50, 1)',
                            lineWidth: 1,
                        },
                    },
                },
                maintainAspectRatio: false
            }}
        />
    );
};