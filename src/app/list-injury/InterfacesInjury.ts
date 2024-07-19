export interface listInjury {
    items: ListInjuryItems[];
    total: number;
    page: number;
    size: number;
    pages: number;
}

export interface ListInjuryItemsEmployeeDepartment {
    id: number;
    name: string;
}

export interface ListInjuryItemsEmployee {
    id: number;
    full_name: string;
    department: ListInjuryItemsEmployeeDepartment;
    manager?: any;
}

export interface ListInjuryItems {
    id: number
    shift: string;
    incident_datetime: string;
    location_of_incident: string;
    work_station: string;
    type_of_incident: string;
    body_parts_affected: string;
    is_visited: boolean;
    object_that_caused_injury: string;
    description_of_incident?: any;
    transfer_to_hospital: boolean;
    number_of_days_of_absence: number;
    employee: ListInjuryItemsEmployee;
}

export interface InjuryQueryParams {
    employee_id?: number;
    department_id?: number;
    shift?: string;
    day?: number;
    month?: number;
    year?: number;
    page?: number;
    size?: number;
}

export interface CreateOrUpdateRequest {
    shift: string;
    incident_datetime: Date;
    location_of_incident: string;
    work_station: string;
    type_of_incident: string;
    body_parts_affected: string;
    is_visited: boolean;
    object_that_caused_injury: string;
    description_of_incident: string;
    transfer_to_hospital: boolean;
    number_of_days_of_absence: number;
    employee_id: number;
}