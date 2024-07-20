// changepost.interfaces.ts

export interface EmployeeBase {
    id: number;
    full_name: string;
}

export interface ChangePostBase {
    status?: StatusEnum;
    observation?: string;
    employee: EmployeeBase;
}

export interface ChangePostCreate {
    status?: StatusEnum;
    observation?: string;
    employee_id: number;
}

export interface ChangePostUpdate {
    status?: StatusEnum;
    observation?: StatusEnum;
}

export interface ChangePostResponse extends ChangePostBase {
    id: number;
    created_at: Date;
}

export enum StatusEnum {
    PENDING = 'Pending',
    APPROVED = 'Approved',
    REJECTED = 'Rejected'
}

export interface Page<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
}

export interface QueryParams {
    status?: StatusEnum,
    year?: number,
    employee_id?: number,
    month?: number,
    day?: number
}