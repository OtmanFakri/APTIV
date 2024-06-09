export interface MedicamentCreate {
  name: string;
  quantity: number;
  id_product: number;
}

export interface autocompleteMedicament {
  data: Datum[];
  total: number;
  pageSize: number;
  page: number;
  totalPages: number;
}

export interface Datum {
  id: number;
  name: string;
  snapshot: string;
}

export interface MedicamentDetail {
  id: number;
  name: string;
  snapshot: string;
  url: string;
  hasBarcode: boolean;
  details: Detail[];
}

export interface Detail {
  id: string;
  label: string;
  format: string;
  value: string;
  multiple: boolean;
}

export interface ReadMedicament extends MedicamentCreate {
  id: number;
}
