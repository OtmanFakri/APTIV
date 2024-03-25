export interface PersonInformation {
  last_name: string;
  first_name: string;
  cin: string;
  phone: string;
  sexe: string;
  date_birth: Date;
  cnss: string;
  city: string;
  region: string;
}

export interface ProfessionalInformation {
  mtc: string;
  category: string;
  department: string;
  job: string;
  manager: string;
  date_hiring: Date;
  date_start: Date;
  date_visit: Date;
}

export interface FormData {
  personInformation: PersonInformation;
  professionalInformation: ProfessionalInformation;
}
