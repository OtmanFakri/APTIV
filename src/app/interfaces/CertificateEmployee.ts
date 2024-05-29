

export interface CertificateEmployee {
  items: Item[];
  total: number;
  page:  number;
  size:  number;
  pages: number;
}

export interface Item {
  id:           number;
  doctor_name:  string;
  doctor_speciality: string;
  date:         Date;
  date_start:   Date;
  date_end:     Date;
  date_entry:   Date;
  validation:   string;
  date_planned: Date;
  nbr_expected: number;
  nbr_days:     number;
  is_visited:   boolean;
  nbr_gap:      number;
  images:        string[] | null;
}



