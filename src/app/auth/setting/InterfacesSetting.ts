export type NotificationPreferences = NotificationPreferencesChild[];

export interface NotificationPreferencesChild {
    user_id: number;
    model: string;
    receive_web: boolean;
    id: number;
    receive_email: boolean;
    action: string[];
}

export interface requestUserPreferences {
    id: number;
    receive_email: boolean;
    receive_web: boolean;
    action: string[];
}

export interface RespencesNotifcations {
    id: number;
    user: User;
    message: string;
    model: string;
    action: string;
    is_read: boolean;
    create_at: Date;
}

export interface User {
    employee: Employee;
}

export interface Employee {
    id: number;
    full_name: string;
}
