export type RestResponseWrapper<T> = {
    readonly success: boolean
    readonly data: T
    readonly message?: string
}

export type BasicMessageResponse = {
    readonly message: string
}