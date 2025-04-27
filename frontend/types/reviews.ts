export type Review = {
  id: string;
  assignment_id: string;
  reviewer_id: string;
  feedback: string;
  rating: number;
  created_at: string; // ISO 8601 date format (e.g., 2025-04-27T08:38:10.000000Z)
  updated_at: string; // ISO 8601 date format (e.g., 2025-04-27T08:38:10.000000Z)
};
