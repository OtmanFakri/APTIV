import {Category} from "../examination/InterfacesExaminitaion";
import {Region} from "../interfaces/ListEmployee";

export interface CategoryInfo {
    category: Category;
    departments: Department[];
}


export interface Department {
    id: number;
    name: string;
    category: Category;
    jobs: Job[];
}

export interface Job {
    id: number;
    name: string;
}

export interface EmployeeDetails {
    id: number;
    first_name: string;
    last_name: string;
    cin: string;
    cnss: string;
    N_Workday: string
    phone_number: number;
    birth_date: string;
    Sexe: string;
    date_start: string;
    date_hiring: string;
    date_visit: string;
    profile_picture?: any;
    date_end?: any;
    job: EmployeeDetailsJob;
    manager: EmployeeDetailsManager;
    city: EmployeeDetailsCity;
    department: EmployeeDetailsDepartment;
}

export interface EmployeeDetailsJob {
    id: number;
    name: string;
}

export interface EmployeeDetailsManager {
    id: number;
    full_name: string;
}

export interface EmployeeDetailsCity {
    id: number;
    name: string;
    region: Region;
}

export interface EmployeeDetailsDepartment {
    id: number;
    name: string;
    category: string;
}

export interface EmployeeUpdate {
    department_id: number;
    job_id: number;
    manager_id: number;
    first_name: string;
    last_name: string;
    cin: string;
    cnss: string;
    phone_number: number;
    birth_date: string;
    Sexe: string;
    city_id: number;
    region_id: number;
    date_start: string;
    date_hiring: string;
    date_visit: string;
    date_end: string;
}
