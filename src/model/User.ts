export interface User {
  id: number;
  login: string;
  avatarUrl: string;
}

export interface UserDetails extends User {
  name: string | null;
  email: string | null;
  location: string | null;
}