import { ChanceCubesStats } from '../../../types/chance-cubes/chance-cubes-stats';
import { ChartWrapper, versionCompare } from './chart-helper';
import { ReactChart } from 'chartjs-react';
import { Loading } from 'gobble-lib-react';

type VersionPieChartProps = {
    readonly stats?: ChanceCubesStats
    readonly getColorForKey: (key: string) => string
}
export const VersionPieChart = ({ stats, getColorForKey }: VersionPieChartProps) => {
    if (!stats)
        return <Loading />;

    const info = Object.keys(stats.versions).sort(versionCompare).filter(key => stats.versions[key][stats.versions[key].length - 1] !== 0).map(key => {
        return {
            label: key,
            color: getColorForKey(key),
            data: stats.versions[key][stats.versions[key].length - 1]
        };
    });
    const labels = info.map(i => i.label);
    const pieData = info.map(i => i.data);
    const labelColors = info.map(i => i.color);

    return (
        <ReactChart
            type='pie'
            data={{
                labels: [...labels],
                datasets: [
                    {
                        data: pieData,
                        backgroundColor: labelColors,
                    },
                ],
            }}
            options={{
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: 'rgb(217, 217, 217)',
                        },
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const allData = context.dataset.data;
                                const tooltipLabel = context.label;
                                const tooltipData = allData[context.dataIndex] as number;
                                const total = allData.reduce((prev, curr) => (prev as number) + (curr as number), 0) as number;
                                const tooltipPercentage = Math.round((tooltipData / total) * 100);
                                return `${tooltipLabel}: ${tooltipData} (${tooltipPercentage}%)`;
                            },
                        },
                    },
                },
                maintainAspectRatio: false,
            }}
        />
    );
};