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
  job: string;
  nbEmployees: number;
}
