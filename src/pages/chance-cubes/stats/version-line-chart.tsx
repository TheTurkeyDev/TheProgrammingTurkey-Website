import { ChanceCubesStats } from '../../../types/chance-cubes/chance-cubes-stats';
import { versionCompare } from './chart-helper';
import { ReactChart } from 'chartjs-react';
import { Loading } from 'gobble-lib-react';

type VersionLineChartProps = {
    readonly stats?: ChanceCubesStats
    readonly getColorForKey: (key: string) => string
}

export const VersionLineChart = ({ stats, getColorForKey }: VersionLineChartProps) => {
    if (!stats)
        return <Loading />;

    const datasets = Object.keys(stats.versions).sort(versionCompare).map(key => {
        return {
            label: key,
            fill: false,
            backgroundColor: getColorForKey(key),
            borderColor: getColorForKey(key),
            data: [...stats.versions[key]],
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