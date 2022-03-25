export type TimerData = {
    readonly timer_id: number,
    readonly timer_display: string,
    readonly type: string,
    readonly reference_datetime: string,
    readonly length: number,
    readonly display_message: string,
    readonly has_end_message: boolean,
    readonly end_message: string,
    readonly prepend_zeros: boolean,
    readonly include_zero_days: boolean,
    readonly include_zero_hours: boolean,
    readonly include_zero_minutes: boolean,
    readonly font: string,
    readonly font_color: string,
    readonly font_size: number
};