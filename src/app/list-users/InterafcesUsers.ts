export interface ListUsers {
    items: User[];
    total: number;
    page: number;
    size: number;
    pages: number;
}

export interface User {
    employee: EmployeeBases;
    id: number;
    is_active: boolean;
}

export interface EmployeeBases {
    id: number;
    full_name: string;
}
