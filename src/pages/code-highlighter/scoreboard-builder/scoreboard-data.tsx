export type ScoreboardBaseData = {
  readonly width: number,
  readonly height: number,
  readonly split: number,
}
export type ScoreboardTeamData = {
  readonly primaryColor: string
  readonly secondaryColor: string
  readonly primaryText: readonly string[]
  readonly primaryFontSize: number
  readonly primaryFontColor: string
  readonly primaryOutlineWidth: number
  readonly primaryOutlineColor: string
  readonly primaryAmimOffset: number
  readonly secondaryText: readonly string[]
  readonly secondaryFontSize: number
  readonly secondaryFontColor: string
  readonly secondaryOutlineWidth: number
  readonly secondaryOutlineColor: string
  readonly secondaryAmimOffset: number
  readonly textShowLength: number
  readonly animationDuration: number
}
