export interface RecoveryJobs {
    certificate_id: number;
    description: string;
    is_visited: boolean;
    is_in_recovery: boolean;
    id: number;
    employee_full_name: string;
    created_at: Date;
    updated_at: Date;
}

export interface UpdateRecoveryJobs {
    is_in_recovery: boolean;
    is_visited: boolean;
}