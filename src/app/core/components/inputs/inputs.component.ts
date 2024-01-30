import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Data} from "../../models/data";
import {AbstractControl, FormControl} from "@angular/forms";
import {InputType} from "../../models/input-type";

@Component({
  selector: 'lib-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss']
})
export class InputsComponent {
  @Input() data!: Data;
  @Input() control!: AbstractControl;
  @Output() showInputType: EventEmitter<InputType> = new EventEmitter<InputType>();

  isFormControl(control: AbstractControl): control is FormControl {
    return control instanceof FormControl;
  }
}
