import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})



export class ValidadoresService {

  constructor() { }

  noPower( control: FormControl )  {
    let cont=0;
    control.value.forEach(element => {
        if(element.length==0){
          cont+=1;
        }
    });
    if(cont>0){
      return {
        noPowers: false
      }
    }
    return null;
  }

}
