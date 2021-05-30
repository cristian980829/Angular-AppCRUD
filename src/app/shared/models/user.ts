// export enum Roles {
//   CREADOR: 'CREADOR';
//   ADMIN?: 'ADMIN';
//   OBSERVADOR?:'OBSERVADOR';
// }

export enum Roles {
  ADMIN = 'ADMIN',
  CREATOR = 'CREATOR',
  OBSERVER = 'OBSERVER',
}


export interface UserInterface {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  photoUrl?: string;
  roles: Roles;
  remember_me?:boolean;
  imagen?: string;
  fileRef?: string;
}