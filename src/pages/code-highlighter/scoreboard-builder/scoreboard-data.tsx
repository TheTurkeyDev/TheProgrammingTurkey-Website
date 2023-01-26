export type ScoreboardData = {
  readonly width: number,
  readonly height: number,
  readonly split: number,
  readonly primaryColor: string
  readonly secondaryColor: string
  readonly primaryFontSize: number
  readonly primaryFontColor: string
  readonly secondaryFontSize: number
  readonly secondaryFontColor: string
  readonly textShowLength: number,
  readonly primaryText: readonly string[],
  readonly secondaryText: readonly string[],
  readonly outlineWidth: number,
  readonly outlineColor: string,
  readonly animationDuration: number,
  readonly primaryAmimOffset: number,
  readonly secondaryAmimOffset: number
}
