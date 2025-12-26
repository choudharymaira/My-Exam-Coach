
export interface CoachResponse {
  greeting: string;
  conceptExplanation: string;
  examinerExpectations: string[];
  commonMistakes: string[];
  modelAnswer: string[];
}

export interface HistoryItem {
  id: string;
  userId: string;
  timestamp: number;
  input: string;
  response: CoachResponse;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password?: string;
  createdAt: number;
}

export interface UserStats {
  totalQueries: number;
  studyMinutes: number;
  lastActive: number;
}
