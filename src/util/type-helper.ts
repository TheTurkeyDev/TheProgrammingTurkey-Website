export function isNullOrUndef(v: unknown | undefined | null) {
    return v === null || v === undefined;
}

export function isNotNullOrUndef(v: unknown | undefined | null) {
    return v !== null && v !== undefined;
}