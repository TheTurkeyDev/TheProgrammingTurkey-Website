import { Competitor } from './competitor';
import { SimplifiedBracketContest } from './bracket-simplified-contes';

type TeamRoundGameInfo = {
    readonly round: number,
    readonly game: number,
    readonly isTop: boolean
}

export const getAllFutureGameNums = (numRounds: number, round: number, gameNum: number): readonly TeamRoundGameInfo[] => {
    const nextGameNum = Math.floor(gameNum / 2);
    const info = { round, game: nextGameNum, isTop: gameNum % 2 === 0 };
    if (round >= numRounds)
        return [info];
    return [info, ...getAllFutureGameNums(numRounds, round + 1, nextGameNum)];
};

export const getRoundAndGameNum = (i: number, numTeams: number, round = 0): readonly [number, number] => {
    const roundNumGames = numTeams / Math.pow(2, round + 1);
    if (i < roundNumGames || roundNumGames === 0)
        return [round, i];
    return getRoundAndGameNum(i - roundNumGames, numTeams, round + 1);
};

export const pickGameWinner = (contests: readonly SimplifiedBracketContest[], numTeams: number, contest: SimplifiedBracketContest, competitorToWin: Competitor): readonly [SimplifiedBracketContest | undefined, readonly TeamRoundGameInfo[]] => {
    const numRounds = numTeams > 0 ? Math.ceil(Math.log2(numTeams)) - 1 : 0;
    const round = parseInt(contest.bracketGameId.substring(1, contest.bracketGameId.indexOf('g')));
    const game = parseInt(contest.bracketGameId.substring(contest.bracketGameId.indexOf('g') + 1));
    const future = getAllFutureGameNums(numRounds, round + 1, game);
    const nextInfo = future[0];
    const nextBracketGameId = `r${nextInfo.round}g${nextInfo.game}`;
    const nextContest = contests?.find(c => c.bracketGameId === nextBracketGameId);
    if (!nextContest)
        return [undefined, []];

    if ((nextInfo.isTop ? nextContest.top : nextContest.bot).team.id === competitorToWin.team.id)
        return [undefined, []];

    const newCompetitor: Competitor = {
        ...competitorToWin,
        score: 0
    };

    const newContest: SimplifiedBracketContest = {
        ...nextContest,
        top: (nextInfo.isTop ? newCompetitor : nextContest.top),
        bot: (!nextInfo.isTop ? newCompetitor : nextContest.bot),
    };
    return [newContest, future];
};

export const getBracketGamesToFix = (contests: readonly SimplifiedBracketContest[], futureGames: readonly TeamRoundGameInfo[], newCompetitor: Competitor, oldCompetitor: Competitor) => {
    return futureGames.reduce((arr, fi) => {
        const bgId = `r${fi.round}g${fi.game}`;
        const futureContest = contests.find(c => c.bracketGameId === bgId);
        if (!futureContest)
            return arr;

        const compToCheck = fi.isTop ? futureContest.top : futureContest.bot;

        if (compToCheck.team.id !== oldCompetitor.team.id)
            return arr;

        const newContest: SimplifiedBracketContest = {
            ...futureContest,
            top: (fi.isTop ? emptyBracketCompetitor : futureContest.top),
            bot: (!fi.isTop ? emptyBracketCompetitor : futureContest.bot),
        };

        return [...arr, newContest];
    }, [] as readonly SimplifiedBracketContest[]);
};

export const emptyBracketCompetitor: Competitor = {
    score: 0,
    position: 0,
    isHome: false,
    isWinner: false,
    rank: '0',
    type: 'TEAM',
    team: {
        id: '',
        logo: '',
        name: '',
        nameShort: '',
        abbr: '',
        primaryColor: 'ffffff',
        secondaryColor: 'ffffff'
    }
};