export interface FilterParams {
    doctor_id: number | null;
    manager_id: number | null;
    mode_date: string;
    nbr_days: number | null;
    validation: string | null;
    year: Date;
    exclude_date_planned: boolean;
    page: number;
}