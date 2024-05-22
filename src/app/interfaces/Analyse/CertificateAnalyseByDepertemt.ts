export interface CertificateAnalyseByDepertemt {
  department: string;
  certificates_nbr: number;
  illness_days_nbr: number;
  headcount: number;
  certificate_rate: number;
  average_illness_days: number;
}


export interface CertificateAnalyseTotal {
  total_certificates_nbr: number;
  total_illness_todays_nbr: number;
  total_headcount: number;
  total_certificate_rate: number;
  total_average_illness_days: number;
}

export interface CertificateAnalyseByYear {
  month: string;
  year: number;
  certificates_nbr: number;
  illness_days_nbr: number;
  headcount: number;
  certificate_rate: number;
  average_illness_days: number;
}

export interface CertificateAnalyseByCategory {
  category: string;
  certificates_nbr: number;
  illness_days_nbr: number;
  headcount: number;
  certificate_rate: number;
  average_illness_days: number;
}

export interface ExaminitionGendre {
  gender: string;
  headcount: number;
  certificates_nbr: number;
  illness_days_nbr: number;
  average_illness_days: number;
  certificate_rate: number;
}


export type CertificateAnalyseData =
  ExaminitionGendre
  | CertificateAnalyseByDepertemt
  | CertificateAnalyseByYear
  | CertificateAnalyseByCategory;

