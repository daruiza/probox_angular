// src/utils/array-handle.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class ArrayHandle {

  ObjecToArray(object: any): any[] {    
    return Object.keys(object??{}).map(el=>({[el]:object?.[el]??null}))
  }
  
}
