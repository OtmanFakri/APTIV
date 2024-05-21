export interface EmployeeExaminition {
  items: Item[];
  total: number;
  page:  number;
  size:  number;
  pages: number;
}

export interface Item {
  id:              number;
  first_name:      string;
  last_name:       string;
  manager_name:    string;
  category:        Category;
  department_name: DepartmentName;
  job_name:        JobName;
}

export enum Category {
  Dh = "DH",
  Is = "IS",
}

export enum DepartmentName {
  Assembly = "ASSEMBLY",
  Engineering = "ENGINEERING",
  Maintenance = "MAINTENANCE",
  ProductEngineering = "PRODUCT ENGINEERING",
  Quality = "QUALITY",
}

export enum JobName {
  AssistantManager = "Assistant Manager",
  GeologicalEngineer = "Geological Engineer",
  GraphicDesigner = "Graphic Designer",
  OccupationalTherapist = "Occupational Therapist",
  Operator = "Operator",
  Pharmacist = "Pharmacist",
  VPProductManagement = "VP Product Management",
}
