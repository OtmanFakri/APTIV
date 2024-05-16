export interface ListEmployee {
    items: Item[];
    total: number;
    page: number;
    size: number;
    pages: number;
}

export interface Item {
    id: number;
    first_name: string;
    last_name: string;
    manager_name: string;
    category: string;
    department_name: string;
    job_name: string;
}

export interface NewEmployee {
    id: number;
    department_id: number;
    job_id: number;
    manager_id?: number;
    first_name: string;
    last_name: string;
    cin: string;
    cnss: string;
    phone_number: number;
    birth_date: string;
    Sexe: 'male' | 'female';
    city_id: number;
    date_start: string;
    date_hiring: string;
    date_end?: string;
    date_visit?: string;
    avatar?: File;
}

export interface FilterEmployee {
    employee_id?: number | null;
    sex?: string | null;
    min_seniority_years?: number | null;
    department_ids?: number[] | null;
    manger_ids?: number[] | null;
    job_ids?: number[] | null;
}

export interface RegionsResponse {
    items: Region[];
    total: number;
    page: number;
    size: number;
    pages: number;
}

export interface Region {
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

