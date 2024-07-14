export interface ListUsers {
    items: User[];
    total: number;
    page: number;
    size: number;
    pages: number;
}

export interface User {
    employee_id: number;
    id: number;
    is_active: boolean;
}