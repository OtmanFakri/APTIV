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