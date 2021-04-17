import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})



export class ValidadoresService {

  constructor() { }

  powerEntered( control: FormControl )  {
    let cont=0;
    control.value.forEach(element => {
        if(element.length==0){
          cont+=1;
        }
    });
    if(cont>0){
      return {
        powerEntered: false
      }
    }
    return null;
  }

  validValoration( control: FormControl )  {
    const valor = control.value.split('.' || ',')
    const val1=parseInt(valor[0]);
    if(val1>5){
      return {
        validValoration: false
      }
    }
    
    if(valor.length>0){
      const val2=parseInt(valor[1]);
      if(val1==5 && val2>0){
        return {
          validValoration: false
        }
      }
    }
    return null;
  }

}
