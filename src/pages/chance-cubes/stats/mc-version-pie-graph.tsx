import { Loading } from '@theturkeydev/gobble-lib-react';
import { ReactChart } from 'chartjs-react';
import { ChanceCubesStats } from '../../../types/chance-cubes/chance-cubes-stats';
import { ChartWrapper, versionCompare } from './chart-helper';

type MCVersionPieChartProps = {
    readonly stats?: ChanceCubesStats
    readonly getColorForKey: (key: string) => string
}
export const MCVersionPieChart = ({ stats, getColorForKey }: MCVersionPieChartProps) => {
    if (!stats)
        return <Loading />;

    const info = Object.keys(stats.mc_versions).sort(versionCompare).filter(key => key !== 'All' && stats.mc_versions[key][stats.mc_versions[key].length - 1] !== 0).map(key => {
        return {
            label: key,
            color: getColorForKey(key),
            data: stats.mc_versions[key][stats.mc_versions[key].length - 1]
        };
    });
    const labels = info.map(i => i.label);
    const pieData = info.map(i => i.data);
    const labelColors = info.map(i => i.color);

    return (
        <ChartWrapper>
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
                                label: context => {
                                    const allData = context.dataset.data;
                                    const tooltipLabel = context.label;
                                    const tooltipData = allData[context.dataIndex] as number;
                                    const total = allData.reduce((prev, curr) => (prev as number) + (curr as number), 0) as number;
                                    const tooltipPercentage = Math.round((tooltipData / total) * 100);
                                    return (`${tooltipLabel}: ${tooltipData} (${tooltipPercentage}%)`);
                                },
                            },
                        },
                    }
                }}
                height={995}
                width={995}
            />
        </ChartWrapper>
    );
};