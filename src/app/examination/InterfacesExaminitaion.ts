import {Item} from "../interfaces/ListEmployee";

export interface EmployeeExaminition {
  items: Item[];
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
  participating_employees:     Item[];
  non_participating_employees: Item[];
}
export interface ExaminitionDepartment {
  department:                  string;
  total_participating:         number;
  total_non_participating:     number;
  "Total CM":                  number;
  "%":                         number;
  participating_employees:     Item[];
  non_participating_employees: Item[];
}
