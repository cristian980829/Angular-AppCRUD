export interface Roles {
  creador?: boolean;
  admin?: boolean;
  observador?:boolean;
}

export interface UserInterface {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  photoUrl?: string;
  roles: Roles;
  remember_me?:boolean;
}