export interface ListMedicaments {
    items: items[];
    total: number;
    page: number;
    size: number;
    pages: number;
}

export interface items {
    id: number;
    name: string;
    quantity: number;
    id_product: number;
}