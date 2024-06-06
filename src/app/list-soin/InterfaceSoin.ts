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
