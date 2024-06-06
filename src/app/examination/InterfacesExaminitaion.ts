import {Item as employee} from "../interfaces/ListEmployee";

export interface EmployeeExaminition {
  items: employee[];
  total: number;
  page:  number;
  size:  number;
  pages: number;
}

export interface ExaminitionMonth {
  month:                string;
  participations:       Participation[];
  total_participations: number;
  rest_participations:  number;
  "Total CM":           number;
  "%":                  number;
}

export interface Participation {
  employee_id:        number;
  participation_date: Date;
}
export interface ExaminitionGendre {
  Sexe:                        string;
  total_participating:         number;
  total_non_participating:     number;
  "Total CM":                  number;
  "%":                         number;
  participating_employees:     employee[];
  non_participating_employees: employee[];
}
export interface ExaminitionDepartment {
  department:                  string;
  total_participating:         number;
  total_non_participating:     number;
  "Total CM":                  number;
  "%":                         number;
  participating_employees:     employee[];
  non_participating_employees: employee[];
}
export interface ExaminitionCategory {
  category:                    string;
  total_participating:         number;
  total_non_participating:     number;
  "Total CM":                  number;
  "%":                         number;
  participating_employees:     employee[];
  non_participating_employees: employee[];
}

export interface ExaminitionRespence {
  items: Item[];
  total: number;
  page:  number;
  size:  number;
  pages: number;
}

export interface Item {
  id:                      number;
  name:                    string;
  seniority:               number;
  category:                Category[];
  date_start:              Date;
  date_end:                Date;
  departments:             any[];
  total_participating:     number;
  total_non_participating: number;
}

export enum Category {
  Dh = "DH",
  Ih = "IH",
  Is = "IS",
}
