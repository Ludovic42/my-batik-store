import { Creator } from './Creator'

export interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
  createdAt: Date;
  creator?: Creator;
}

// Password is only used for creation/updates, never returned from API
export interface UserInput {
  email: string;
  password: string;
  name?: string;
  role?: string;
}