import { useEffect, useState } from 'react';
import { getChanceCubesStats } from '../../../network/chance-cubes-network';
import { ChanceCubesStats } from '../../../types/chance-cubes/chance-cubes-stats';
import { Body1, Headline2, Headline3, Headline5 } from '@theturkeydev/gobble-lib-react';
import { VersionLineChart } from './version-line-chart';
import { ChanceCubesCalcStats } from './chance-cubes-calc-stats';
import { VersionPieChart } from './version-pie-graph';
import { MCVersionUsageLineChart } from './mc-version-usage-line-chart';
import { RunTotalsLinechart } from './runs-total-line-chart';
import { MCVersionLineChart } from './mc-version-line-chart';
import { MCVersionPieChart } from './mc-version-pie-graph';
import styled from 'styled-components';

const colors = [
    '#1e90ff',
    '#191970',
    '#9acd32',
    '#ff1493',
    '#00ced1',
    '#db7093',
    '#daa520',
    '#0000ff',
    '#98fb98',
    '#ff00ff',
    '#cd5c5c',
    '#ffa07a',
    '#dda0dd',
    '#800080',
    '#0000cd',
    '#a020f0',
    '#7fffd4',
    '#ffb6c1',
    '#ffd700',
    '#ff0000',
    '#d2691e',
    '#000080',
    '#ff6347',
    '#4682b4',
    '#dc143c',
    '#adff2f',
    '#d2b48c',
    '#ee82ee',
    '#808000',
    '#ff69b4',
    '#9370db',
    '#9932cc',
    '#8fbc8f',
    '#00bfff',
    '#ff8c00',
    '#008080',
    '#32cd32',
    '#f0e68c',
    '#87ceeb',
    '#ffff00',
    '#00ff00',
    '#00fa9a',
    '#708090',
];

const ContentWrapper = styled.div`
    width: 100%;
`;

const DataWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    gap: 8px;
`;

const ChartsDisplay = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 64px;
    justify-items: center;
`;

const ChartWrapper = styled.div`
    justify-items: center;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 500px;
    margin-bottom: 16px;
`;

export const ChanceCubesStatsCharts = () => {
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1; //January is 0
    const yyyy = today.getFullYear();
    const yearPrior = mm <= 2 ? yyyy - 1 : yyyy;
    const monthPrior = mm + (mm <= 2 ? 10 : -2);

    const startDay = yearPrior + '-' + zeroPadNumber(monthPrior) + '-' + dd;
    const todayStr = yyyy + '-' + zeroPadNumber(mm) + '-' + zeroPadNumber(dd);

    const [usedColors, setUsedColors] = useState<readonly string[]>([]);
    const [startDate, setStartDate] = useState(startDay);
    const [endDate, setEndDate] = useState(todayStr);

    const [pageData, setPageData] = useState<ChanceCubesCalcStats>({
        totalRuns: 0,
        totalDays: 1,
        averageRunsMonth: 0,
        mostRuns: 0,
        mostRunsDay: '1/1/0000',
        mondayAverage: 0,
        tuesdayAverage: 0,
        wednesdayAverage: 0,
        thursdayAverage: 0,
        fridayAverage: 0,
        saturdayAverage: 0,
        sundayAverage: 0,
    });
    const [stats, setStats] = useState<ChanceCubesStats>();

    const updateMoreStats = (json: ChanceCubesStats) => {
        setPageData({
            totalRuns: json.total_runs,
            totalDays: json.total_days,
            averageRunsMonth: json.total_runs_last_month / 30,
            mostRuns: json.most,
            mostRunsDay: json.most_date,
            mondayAverage: json.daily_totals[1].total / json.daily_totals[1].days,
            tuesdayAverage: json.daily_totals[2].total / json.daily_totals[2].days,
            wednesdayAverage: json.daily_totals[3].total / json.daily_totals[3].days,
            thursdayAverage: json.daily_totals[4].total / json.daily_totals[4].days,
            fridayAverage: json.daily_totals[5].total / json.daily_totals[5].days,
            saturdayAverage: json.daily_totals[6].total / json.daily_totals[6].days,
            sundayAverage: json.daily_totals[0].total / json.daily_totals[0].days,
        });
        const numDates = json.dates.length;
        const toSet = {
            ...json,
            mc_versions: {
                ...Object.fromEntries(Object.entries(json.mc_versions).map(([v, runs]) => [v, [...Array(numDates - runs.length).fill(0), ...runs]]))
            },
            versions: {
                ...Object.fromEntries(Object.entries(json.versions).map(([v, runs]) => [v, [...Array(numDates - runs.length).fill(0), ...runs]]))
            },
        };
        setStats(toSet);
    };

    useEffect(() => {
        getChanceCubesStats(startDate, endDate).then(json => {
            const versionsToShow: {
                // eslint-disable-next-line functional/prefer-readonly-type
                [version: string]: {
                    // eslint-disable-next-line functional/prefer-readonly-type
                    [key: string]: number
                }
            } = {};
            Object.keys(json.versions).forEach((key) => {
                const usage = json.versions[key];
                const parts = key.split('-');
                const verParts = parts[0].split('.');
                const ver = verParts[0] + '.' + verParts[1];
                if (!versionsToShow[ver])
                    versionsToShow[ver] = {};

                const runs = usage[usage.length - 1];
                if (runs > 0) {
                    versionsToShow[ver][key] = runs;

                    if (Object.keys(versionsToShow[ver]).length > 3) {
                        removeLowest(versionsToShow[ver], key);
                    }
                }
            });

            const versionsMapped = Object.keys(versionsToShow).flatMap(v => [...Object.keys(versionsToShow[v])]);

            const editedStats = {
                ...json,
                versions: {
                    ...Object.fromEntries(Object.entries(json.versions).filter(([v]) => versionsMapped.includes(v)))
                }
            };
            updateMoreStats(editedStats);
        });
    }, [startDate, endDate]);

    function getColorForKey(key: string) {
        if (usedColors.indexOf(key) === -1) {
            //This is bad
            setUsedColors(old => [
                ...old,
                key
            ]);
            return colors[usedColors.length % colors.length];
        }

        const index = usedColors.indexOf(key) % colors.length;
        return colors[index];
    }

    return (
        <ContentWrapper>
            <header>
                <hgroup className='text-center'>
                    <Headline2>Chance Cubes Version Stats</Headline2>
                    Start:
                    <input
                        type='date'
                        id='date_start'
                        min='2017-05-05'
                        max={todayStr}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    End:
                    <input
                        type='date'
                        id='date_end'
                        min='2017-05-05'
                        max={todayStr}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </hgroup>
            </header>
            <ChartsDisplay>
                <ChartWrapper>
                    <Headline3 className='mt-5'> Version usage </Headline3>
                    <VersionLineChart stats={stats} getColorForKey={getColorForKey} />
                </ChartWrapper>
                <ChartWrapper>
                    <Headline3 className='mt-5'> Version usage % </Headline3>
                    <VersionPieChart stats={stats} getColorForKey={getColorForKey} />
                </ChartWrapper>
                <ChartWrapper>
                    <Headline3 className='mt-5'> MC Version usage</Headline3>
                    <MCVersionUsageLineChart stats={stats} getColorForKey={getColorForKey} />
                </ChartWrapper>
                <ChartWrapper>
                    <Headline3 className='mt-5'> MC Version usage % </Headline3>
                    <MCVersionPieChart stats={stats} getColorForKey={getColorForKey} />
                </ChartWrapper>
                <ChartWrapper>
                    <Headline3 className='mt-5'> MC Version usage % over Time</Headline3>
                    <MCVersionLineChart stats={stats} getColorForKey={getColorForKey} />
                </ChartWrapper>
                <ChartWrapper>
                    <Headline3 className='mt-5'> Run Totals </Headline3>
                    <RunTotalsLinechart stats={stats} />
                </ChartWrapper>
                <DataWrapper>
                    <Body1>
                        {`Total Mod Runs: ${numberWithCommas(pageData.totalRuns)} (${numberWithCommas(pageData.totalDays)} days)`}
                    </Body1>
                    <Body1>
                        {`Average Daily Mod Runs: ${numberWithCommas(pageData.averageRunsMonth)} (Last 30 days)`}
                    </Body1>
                    <Body1>
                        {`Most Single Day Runs: ${numberWithCommas(pageData.mostRuns)} (${pageData.mostRunsDay})`}
                    </Body1>
                    <Headline5>--- Average runs per day ---</Headline5>
                    <Body1>
                        {`Monday: ${numberWithCommas(pageData.mondayAverage)}`}
                    </Body1>
                    <Body1>
                        {`Tuesday: ${numberWithCommas(pageData.tuesdayAverage)}`}
                    </Body1>
                    <Body1>
                        {`Wednesday: ${numberWithCommas(pageData.wednesdayAverage)}`}
                    </Body1>
                    <Body1>
                        {`Thursaday: ${numberWithCommas(pageData.thursdayAverage)}`}
                    </Body1>
                    <Body1>
                        {`Friday: ${numberWithCommas(pageData.fridayAverage)}`}
                    </Body1>
                    <Body1>
                        {`Saturday: ${numberWithCommas(pageData.saturdayAverage)}`}
                    </Body1>
                    <Body1>
                        {`Sunday: ${numberWithCommas(pageData.saturdayAverage)}`}
                    </Body1>
                </DataWrapper>
            </ChartsDisplay>
        </ContentWrapper>
    );
};

function zeroPadNumber(num: number) {
    return (num < 10 ? `0${num}` : num);
}

// eslint-disable-next-line functional/prefer-readonly-type
function removeLowest(versionUsage: { [key: string]: number }, key: string) {
    const toRemove = Object.keys(versionUsage).reduce((prev, curr) => (
        versionUsage[curr] < versionUsage[prev] ? curr : prev
    ));

    delete versionUsage[toRemove];
}

function numberWithCommas(x: number) {
    return Math.round(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

