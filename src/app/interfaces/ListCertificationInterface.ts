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
  date:         string;
  date_start:   string;
  date_end:     string;
  validation:   string;
  date_planned: string | null;
  nbr_days:     number;
}

