import { Project } from './project';

export type ProjectGroup = {
    readonly display: string
    readonly order: number
    readonly projects: readonly Project[]
}