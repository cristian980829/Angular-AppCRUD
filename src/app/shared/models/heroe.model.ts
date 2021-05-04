export interface HeroeModel {
  nombre:string;
  estado:string;
  universo:string;
  id?: string;
  poderes:string[];
  imagen?: string;
  fileRef?: string;
  valoracion?:string;
}