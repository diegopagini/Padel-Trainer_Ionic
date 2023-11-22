export interface PaddleClass {
  comment: string;
  date: string;
  id?: string;
  phone: string;
  user: AppUser;
}

interface AppUser {
  id: string;
  email: string;
}
