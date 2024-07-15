export type InterfaceRankingMedicament = RankingMedicament[];

export interface RankingMedicament {
    category: string;
    medicament_id: number;
    medicament_name: string;
    usage_count: number;
    rank_in_category: number;
}

export interface InterfaceRankingMedicamentParams {
    year: number ;
    month?: number;
    day?: number;
}