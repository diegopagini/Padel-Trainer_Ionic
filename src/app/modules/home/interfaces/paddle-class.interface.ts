export interface PaddleClass {
  comment: string;
  date: string;
  finished?: boolean;
  id?: string;
  phone: string;
  user: AppUser;
}

interface AppUser {
  id: string;
  email: string;
}
