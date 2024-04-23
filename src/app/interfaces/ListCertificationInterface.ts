export interface CertificationInterface {
  id: number;
  date: string;
  date_start: string;
  date_end: string;
  date_entry: string;
  validation: string;
  date_planned: string;
  nbr_expected: number;
  nbr_days: number;
  nbr_gap: number;
}

export interface CertificationsResponseInterface {
  items: CertificationInterface[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

