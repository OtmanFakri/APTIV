export interface InjuryInterfcae {
  items: Item[];
  total: number;
  page:  number;
  size:  number;
  pages: number;
}

export interface Item {
  shift:                     string;
  incident_datetime:         Date;
  location_of_incident:      string;
  work_station:              string;
  type_of_incident:          string;
  body_parts_affected:       string;
  is_visited:                boolean;
  object_that_caused_injury: string;
  description_of_incident:   null;
  transfer_to_hospital:      boolean;
  number_of_days_of_absence: number;
  employee:                  Employee;
}

export interface Employee {
  id:         number;
  full_name:  string;
  department: Department;
  manager:    Manager;
}

export interface Department {
  id:   number;
  name: string;
}

export interface Manager {
  id:        number;
  full_name: string;
}

export interface InjuryQueryParams {
  employeeId?: number;
  departmentId?: number;
  shift?: string;
  day?: number;
  month?: number;
  year?: number;
  page?: number;
  size?: number;
}
