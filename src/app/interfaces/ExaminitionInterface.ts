export interface POSTExamination {
  name: string | null;  // Not nullable
  seniority: number | null;  // Can be null
  category: string[] | null;  // Array of strings, ensure this is correct
  department_ids: number[] | null;  // Can be null
  job_ids: number[] | null;  // Can be null
  date_start: string;  // Not nullable
  date_end: string;  // Not nullable
}
