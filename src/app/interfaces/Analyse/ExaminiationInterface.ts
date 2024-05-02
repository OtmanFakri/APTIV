export interface Examiniation {
  date:                    DateClass;
  total_non_participating: number;
  total_participating:     number;
}

export interface DateClass {
  id:          number;
  category:    Category;
  date_end:    Date | null;
  name:        string;
  seniority:   number;
  date_start:  Date;
  jobs:        Job[];
  departments: Department[];
}

export enum Category {
  Dh = "DH",
  Ih = "IH",
  Is = "IS",
}

export interface Department {
  id:       number;
  category: Category;
  color:    string;
  name:     string;
}

export interface Job {
  name:          string;
  department_id: number;
  id:            number;
}
