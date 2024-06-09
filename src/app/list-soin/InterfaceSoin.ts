export interface CreateSoin {
  employee_id:          number;
  diagnostic:           string[];
  medicaments:          Medicament[];
  soins:                string[];
  soins_poste_de_garde: string;
}

export interface Medicament {
  medicament_id: number;
  quantite:      number;
}
export interface ReadSoinInterface {
  items: Item[];
  total: number;
  page:  number;
  size:  number;
  pages: number;
}

export interface Item {
  id:                      number;
  employee_id:             number;
  created_at:              Date;
  updated_at:              Date;
  diagnostic:              string[];
  soins:                   string[];
  soins_poste_de_garde:    string;
  medicament_associations: MedicamentAssociation[];
}

export interface MedicamentAssociation {
  medicament: Medicament ;
  quantite:   number;
}

export interface Medicament {
  id:         number;
  name:       string;
  quantity:   number;
  id_product: number;
}
export interface Last10 {
  id:         number;
  soins:      string[];
  diagnostic: string[];
}
