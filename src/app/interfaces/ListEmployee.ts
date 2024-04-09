export interface ListEmployee {
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
  category:        string;
  department_name: string;
}
