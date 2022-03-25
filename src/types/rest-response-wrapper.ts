export type RestResponseWrapper<T> = {
    readonly success: boolean
    readonly data: T
    readonly message?: string
}