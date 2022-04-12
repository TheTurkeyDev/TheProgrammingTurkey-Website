import { ChanceCubesStats } from '../../../types/chance-cubes/chance-cubes-stats';
import { versionCompare } from './chart-helper';
import { ReactChart } from 'chartjs-react';
import { Loading } from '@theturkeydev/gobble-lib-react';

type MCVersionUsageLineChartProps = {
    readonly stats?: ChanceCubesStats
    readonly getColorForKey: (key: string) => string
}
export const MCVersionUsageLineChart = ({ stats, getColorForKey }: MCVersionUsageLineChartProps) => {
    if (!stats)
        return <Loading />;

    const datasets = Object.keys(stats.mc_versions).sort(versionCompare).map(key => {
        return {
            label: key,
            fill: false,
            backgroundColor: getColorForKey(key),
            borderColor: getColorForKey(key),
            data: [...stats.mc_versions[key]],
        };
    });

    return (
        <ReactChart
            type='line'
            data={{
                labels: [...stats.dates],
                datasets: datasets,
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
                maintainAspectRatio: false,
            }}
        />
    );
};