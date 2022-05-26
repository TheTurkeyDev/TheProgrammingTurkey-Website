import { createRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { ChanceCubesStats } from '../../../types/chance-cubes/chance-cubes-stats';
import { ReactChart } from 'chartjs-react';
import { Loading } from 'gobble-lib-react';

type RunTotalsLinechartProps = {
    readonly stats?: ChanceCubesStats
}
export const RunTotalsLinechart = ({ stats }: RunTotalsLinechartProps) => {
    if (!stats)
        return <Loading />;

    return (
        <ReactChart
            type='line'
            data={{
                labels: [...stats.dates],
                datasets: [
                    {
                        label: 'Weekly Totals',
                        fill: false,
                        backgroundColor: '#FF0000',
                        borderColor: '#FF0000',
                        data: [...stats.weekly_totals],
                    },
                    {
                        label: 'Monthly Totals',
                        fill: false,
                        backgroundColor: '#00FF00',
                        borderColor: '#00FF00',
                        data: [...stats.monthly_totals],
                    }
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