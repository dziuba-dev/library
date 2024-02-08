import { Injectable } from '@angular/core';
import {Data} from "../models/data";
import {InputType} from "../models/input-type";
import {Observable, of} from "rxjs";

@Injectable()
export class CoreService {
  getData(): Observable<Data[]> {
    return of(
      [
        {
          property: 'email',
          inputType: InputType.EMAIL,
          value: ''
        },
        {
          property: 'password',
          inputType: InputType.PASSWORD,
          value: ''
        }
      ]
    )
  }
}
