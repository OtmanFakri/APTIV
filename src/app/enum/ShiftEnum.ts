export enum ShiftEnum {
    Morning = "Morning",
    Night = "Night",
    Swing = "Swing",
    HC = "HC"
}


export interface ShiftOption {
    value: keyof typeof ShiftEnum;
    label: ShiftEnum;
}

export function getShiftOptions(): ShiftOption[] {
    return Object.entries(ShiftEnum).map(([key, value]) => ({
        value: key as keyof typeof ShiftEnum,
        label: value
    }));
}