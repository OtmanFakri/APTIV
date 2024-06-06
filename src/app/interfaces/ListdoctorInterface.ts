export interface ListdoctorInterface {
    id: number;
    name: string;
    specialty: string;
}

export interface DoctorRequestInterface {
    name: string;
    specialty: string;
}

export interface GetdoctorInterface {
    items: Item[];
    total: number;
    page: number;
    size: number;
    pages: number;
}

export interface Item {
    id: number;
    name: string;
    specialty: string;
}

export interface SpecialtyDistributionBygendre {
    gendre: string;
    data: Datum[];
}

export interface Datum {
    specialty: string;
    certification_count: number;
    doctors_count: number;
}


export interface SpecialtyDistributionByCategory {
    category: string;
    data: Datum[];
}

export interface SpecialtyDistributionByDepartment {
    Department: string;
    data: Datum[];
}
