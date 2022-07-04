import { AbstractControl } from '@angular/forms';

// custom validation to userName
export function minusculoValidator(control: AbstractControl) {
  const valor = control.value as string;
  if (valor !== valor.toLowerCase()) {
    return { minusculo: true };
  }
  return null;
}
