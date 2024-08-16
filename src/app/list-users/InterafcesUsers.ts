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

export interface PermstionModels {
    model_name:  string;
    permissions: Permissions;
}

export interface Permissions {
    can_create: boolean;
    can_read:   boolean;
    can_update: boolean;
    can_delete: boolean;
}
