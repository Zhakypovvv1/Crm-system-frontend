interface TaskDetails {
  text: string;
  _id: string
}

export interface TasksType {
  category?: null;
  details?: null | TaskDetails;
  notes?: string[];
  status: boolean | string;
  tags?: string[];
  title: string;
  userId?: string;
  _id: string;
}
