import {DoctorRequestInterface} from "./ListdoctorInterface";

export interface CertificationsResponseInterface {
  items: Item[];
  total: number;
  page:  number;
  size:  number;
  pages: number;
}

export interface Item {
  id:           number;
  doctor_name:  string;
  date:         Date;
  date_start:   Date;
  date_end:     Date;
  date_entry:   Date;
  validation:   Validation;
  date_planned: Date;
  nbr_expected: number;
  nbr_days:     number;
  nbr_gap:      number;
}

export enum Validation {
  VALIDE = "VALIDE",
  ITT = "ITT",
  VHJ = "VHJ",
  VPO = "VPO",
}

export interface CertificationsRequestInterface {
  doctor:       DoctorRequestInterface;
  date:         string | null;
  date_start:   string | null;
  date_end:     string | null;
  validation:   string | null;
  date_planned: string | null;
  nbr_days:     number | null;
}

export interface CertificationAnalysEmployee {
  certificates_nbr:     number;
  illness_days_nbr:     number;
  average_illness_days: number;
  nb_day_abs:           number;
}
