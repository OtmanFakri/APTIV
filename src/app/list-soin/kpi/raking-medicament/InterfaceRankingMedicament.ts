export type InterfaceRankingMedicament = RankingMedicament[];

export interface RankingMedicament {
    category: string;
    medicament_id: number;
    medicament_name: string;
    usage_count: number;
    rank_in_category: number;
}

export interface InterfaceRankingMedicamentParams {
    year: number;
    month?: number;
    day?: number;
}

export type InterfaceRankingMedicament_Depar = RankingMedicament_Department[];

export interface RankingMedicament_Department {
    department: string;
    medicament_id: number;
    medicament_name: string;
    usage_count: number;
    rank_in_category: number;
}

export type InterfaceRankingMedicament_gendre = RankingMedicament_gendre[];

export interface RankingMedicament_gendre {
    gendre: string;
    medicament_id: number;
    medicament_name: string;
    usage_count: number;
    rank_in_category: number;
}