export interface ImportResult {
    message: string;
    results: {
        success: any[];
        deleted: any[];
        existing: {
            id: number;
            name: string;
        }[];
        errors: any[];
    };
}

export interface ListEmployee {
    items: Item[];
    total: number;
    page: number;
    size: number;
    pages: number;
}

export interface Item {
    id: number;
    avatar: string | null;
    first_name: string;
    last_name: string;
    manager_name: string;
    category: string;
    department_name: string;
    job_name: string;
}

export interface NewEmployee {
    id: number;
    N_Workday: string,
    department_id: number;
    job_id: number;
    manager_id: number;
    first_name: string;
    last_name: string;
    cin?: string | null;
    cnss?: string | null;
    phone_number?: number | null;
    birth_date: Date;
    Sexe: 'male' | 'female';
    city_id: number;
    date_start: Date;
    date_hiring: Date;
    date_end?: Date | null;
    date_visit?: Date | null;
    avatar?: File;
}

export interface FilterEmployee {
    employee_id?: number | null;
    sex?: string | null;
    min_seniority_years?: number | null;
    department_ids?: number[] | null;
    manger_ids?: number[] | null;
    job_ids?: number[] | null;
    year: number | null,
    include_deleted?: boolean,
}

export interface RegionsResponse {
    items: Region[];
    total: number;
    page: number;
    size: number;
    pages: number;
}

export interface Region {
    id: number
    name: string;
}

export interface City {
    id: number;
    name: string;
}

export interface SearchManger {
    id: number;
    full_name: string;
}

