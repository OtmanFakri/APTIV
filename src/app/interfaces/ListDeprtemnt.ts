export interface CategoryItemData {
  key: number;
  category: string;
  nbEmployees: number;
  expand: boolean;
  departments: DepartmentItemData[];
}

export interface DepartmentItemData {
  key: number;
  department: string;
  nbEmployees: number;
  expand: boolean; // Added expand property
  jobs: JobItemData[];
}

export interface JobItemData {
  id: number;
  job: string;
  nbEmployees: number;
}

export interface CreateDepartment {
  color:    string;
  name:     string;
  category: string;
  jobs:     CreateJob[];
}

export interface CreateJob {
  name: string;
}
