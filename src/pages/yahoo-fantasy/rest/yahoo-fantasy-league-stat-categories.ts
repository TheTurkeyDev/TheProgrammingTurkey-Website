import { YahooFantasyLeagueStatCategoriesGroups } from './yahoo-fantasy-league-stat-categories-groups';
import { YahooFantasyLeagueStatCategoriesStats } from './yahoo-fantasy-league-stat-categories-stats';

export type YahooFantasyLeagueStatCategories = {
    readonly groups: readonly YahooFantasyLeagueStatCategoriesGroups[]
    readonly stats: readonly YahooFantasyLeagueStatCategoriesStats[]
}